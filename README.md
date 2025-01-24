# **Playstas app with Turborepo, Docker, React, Express, Prisma and Open AI(gpt-4 model)**

This monorepo is built using **Turborepo** for managing a multi-package project efficiently. It includes:

- **Frontend**: React, TypeScript, Tailwind CSS and Shadcn
- **Backend**: Express, Prisma
- **Database**: MongoDB (running in Docker)
- **LLM**: Open AI (GPT-4)

---

## **Features**
- **Database Management**: MongoDB with Prisma ORM for schema management.
- **Monorepo Management**: Turborepo for efficient task orchestration across workspaces.
- **Frontend & Backend**: Integrated React frontend and Express backend.
- **TypeScript**: Strong typing for both frontend and backend.
- **LLM**: Generated Player's description using LLM, Open AI (GPT-4)

---

## **Project Structure**
```
monorepo-root/
├── apps/
│   ├── frontend/         # React, TypeScript, and MUI app
│   ├── backend/          # Express server with Socket.IO and Prisma
|        |---- docker-compose.yml  # docker compose file for Mongo DB
├── turbo.json            # Turborepo configuration
├── package.json          # Monorepo package.json
└── README.md             # Project documentation
```

---

## **Getting Started**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Docker](https://www.docker.com/) installed and running
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### **Installation**

   ```bash
   npm install
   ```

### **Available Scripts**

#### **1. Database Setup**
- Run migrations and generate Prisma client:
  ```bash
  cp ./apps/backend/.env.example ./apps/backend/.env
  npm run db
  ```
  This will:
  - Start MongoDB via Docker
  - Run Prisma migrations (`db:setup`)
  - Generate Prisma client files (`db:prisma`)

#### **2. Load Initial Data from API**
- Load data from API(https://api.sampleapis.com/baseball/hitsSingleSeason) and store them into Mongo DB:
  ```bash
  npm run db:seed
  ```

#### **3. Development**
- Start both the frontend and backend simultaneously:
  ```bash
  npm run dev
  ```
  This will:
  - Start the **frontend** development server.
  - Start the **backend** development server.

### **Frontend**
The frontend is built with:
- **React**: Component-based UI.
- **TypeScript**: Type-safe development.
- **Shadcn-UI**: Component library for styling.

**Frontend Development Server**:
```bash
cd apps/frontend
npm run dev
```

The app will be available at `http://localhost:5137`.

---

### **Backend**
The backend is built with:
- **Express**: REST API and server-side logic.
- **Prisma**: ORM for database interaction.

**Backend Development Server**:
```bash
cd apps/backend
npm run dev
```

The backend will be available at `http://localhost:8080`.

---

### **Docker**
To start MongoDB via Docker:
```bash
docker-compose up -d
```

**docker-compose.yml** ensures MongoDB runs in a containerized environment with data persisted locally.

---

## **Turborepo**
This project uses **Turborepo** to manage tasks across the monorepo.

### **Turbo Configuration**
- `dev`: Runs both frontend and backend development servers.
- `db:run`: Runs database migrations.
- `prisma:generate`: Generates Prisma client.
- `prisma:seed`: Load initial data and store them into MongoDB from API
- `test`: Runs tests for all apps.

Example:
```bash
npx turbo run dev --filter=frontend
```
This runs the development server for the `frontend` workspace only.

---

## **Testing**
To run tests for both frontend and backend:
```bash
npm run test
```

You can also run tests for a specific workspace:
```bash
npx turbo run test --filter=backend
```

---

## **Environment Variables**
Ensure you have a `.env` file in the `backend` workspace with the following:
```env
DATABASE_URL=mongodb://localhost:27018/db
PORT=8080
```

---

## **Additional Notes**
- Ensure Docker is running before running `npm run db`.
- To stop MongoDB:
  ```bash
  docker-compose down
  ```

---

## **License**
This project is licensed under [MIT License](LICENSE).
