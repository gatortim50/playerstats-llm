import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, styled } from '@mui/material';
import MessageItem from './MessageItem';
import MessageInputer from './MessageInputer';
import socket from '@/utils/socket';
import axios from 'axios'; // Add axios for HTTP requests

interface Message {
  name: string;
  id: string;
  content: string;
  createdAt: number;
  socketId?: string;
}

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  padding: theme.spacing(2),
  maxWidth: '1440px',
  width: '90%',
  gap: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1),
  },
}));

const MessageList = styled(Box)(({ theme }) => ({
  height: '100%',
  overflowY: 'auto',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(1),
}));

const MessagePanel = styled(Box)(() => ({
  flex: 1,
  overflowY: 'hidden',
}));

const MessageBoard: React.FC = () => {
  const [socketId, setSocketId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const handleSend = (name: string, message: string) => {
    if (socketId) socket.emit('send_message', { name, content: message });
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Listen for socket connection
    socket.on('connect', () => {
      setSocketId(socket.id); // Set the socket ID
      console.log('Connected with socket ID:', socket.id);
    });

    // Listen for new messages
    socket.on('new_message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('new_message');
    };
  }, []);

  useEffect(() => {
    if (socketId) {
      // Fetch all messages from the backend once socketId is available
      axios
        .get('http://localhost:3001/api/messages') // Replace with your API endpoint
        .then((response: { data: Message[]}) => {
          setMessages(response.data); // Set the messages
          setLoading(false); // Stop loading
        })
        .catch((error: unknown) => {
          console.error('Error fetching messages:', error);
          setLoading(false); // Stop loading even if there's an error
        });
    }
  }, [socketId]);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <MessagePanel>
        <MessageList ref={messageListRef}>
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              name={msg.name}
              message={msg.content}
              isSender={socketId === msg.socketId}
            />
          ))}
        </MessageList>
      </MessagePanel>
      <MessageInputer onSend={handleSend} />
    </Container>
  );
};

export default MessageBoard;
