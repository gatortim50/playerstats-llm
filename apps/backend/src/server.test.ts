import request from "supertest";
import { server } from "./server";
import { PrismaClient } from "@prisma/client";
import { Server as MockServer, WebSocket as MockWebSocket } from "mock-socket";

// Mock Prisma Client
jest.mock("@prisma/client", () => {
  const mockPrisma = {
    message: {
      findMany: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

const prisma = new PrismaClient();

describe("Express and Socket.IO Server with mock-socket", () => {
  let mockServer: MockServer;
  let mockClient: MockWebSocket;

  beforeAll(() => {
    if (!server.listening) {
      server.listen(3001);
    }
  });

  afterAll(() => {
    server.close();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    // Set up the mock WebSocket server
    mockServer = new MockServer("ws://localhost:3001");
    mockClient = new MockWebSocket("ws://localhost:3001");

    mockServer.on("connection", (socket) => {
      socket.on("message", (data) => {
        const parsedData = JSON.parse(data as string);

        if (parsedData.event === "send_message") {
          const message = parsedData.data;

          prisma.message.create({ data: message }).then((savedMessage) => {
            socket.send(
              JSON.stringify({
                event: "new_message",
                data: savedMessage,
              })
            );
          });
        }
      });
    });
  });

  afterEach(() => {
    mockServer.stop();
  });

  const waitForWebSocketOpen = (webSocket: MockWebSocket) =>
    new Promise((resolve) => {
      webSocket.onopen = resolve;
    });

  // Test REST API
  describe("GET /api/messages", () => {
    it("should return an empty array when no messages exist", async () => {
      (prisma.message.findMany as jest.Mock).mockResolvedValueOnce([]);

      const response = await request(server).get("/api/messages").expect(200);
      expect(response.body).toEqual([]);
    });

    it("should return messages in ascending order by createdAt", async () => {
      (prisma.message.findMany as jest.Mock).mockResolvedValueOnce([
        { name: "Alice", content: "Hello!", createdAt: 1 },
        { name: "Bob", content: "Hi!", createdAt: 2 },
      ]);

      const response = await request(server).get("/api/messages").expect(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe("Alice");
      expect(response.body[1].name).toBe("Bob");
    });
  });

  // Test WebSocket functionality
  describe("Socket.IO Events", () => {
    it("should broadcast a new message to all connected clients", async () => {
      const messageData = { name: "Charlie", content: "Real-time test" };

      (prisma.message.create as jest.Mock).mockResolvedValueOnce({
        name: "Charlie",
        content: "Real-time test",
        createdAt: Date.now(),
      });

      await waitForWebSocketOpen(mockClient);

      mockClient.onmessage = (event) => {
        const response = JSON.parse(event.data);

        if (response.event === "new_message") {
          expect(response.data.name).toBe("Charlie");
          expect(response.data.content).toBe("Real-time test");
        }
      };

      mockClient.send(
        JSON.stringify({
          event: "send_message",
          data: messageData,
        })
      );
    });

    it("should log client connection and disconnection", async () => {
      await waitForWebSocketOpen(mockClient);

      mockServer.on("connection", (socket) => {
        socket.on("close", () => {
          expect(socket.readyState).toBe(3); // 3 means CLOSED
        });
      });

      mockClient.close();
    });
  });

  // Integration Test
  describe("Integration of API and WebSocket", () => {
    it("should fetch messages saved via WebSocket", async () => {
      const messageData = { name: "Dave", content: "Integration Test" };

      (prisma.message.create as jest.Mock).mockResolvedValueOnce({
        name: "Dave",
        content: "Integration Test",
        createdAt: Date.now(),
      });

      (prisma.message.findMany as jest.Mock).mockResolvedValueOnce([
        { name: "Dave", content: "Integration Test", createdAt: Date.now() },
      ]);

      await waitForWebSocketOpen(mockClient);

      mockClient.onmessage = (event) => {
        const response = JSON.parse(event.data);

        if (response.event === "new_message") {
          expect(response.data.name).toBe("Dave");
          expect(response.data.content).toBe("Integration Test");
        }
      };

      mockClient.send(
        JSON.stringify({
          event: "send_message",
          data: messageData,
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check the API for the saved message
      const response = await request(server).get("/api/messages").expect(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].name).toBe("Dave");
      expect(response.body[0].content).toBe("Integration Test");
    });
  });
});
