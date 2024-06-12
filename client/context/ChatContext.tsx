import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

interface Message {
  _id: string;
  text: string;
  sender: {
    _id: string;
    username: string;
  } | null;
  chat: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatContextProps {
  messages: Message[];
  sendMessage: (message: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  createChat: () => Promise<void>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<{ _id: string, username: string } | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const chatId = localStorage.getItem('chatId');
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!chatId || !storedUser) return;

    setUser(storedUser);

    socketRef.current = io('http://localhost:8000', {});

    socketRef.current.emit('join_room', chatId);

    socketRef.current.on('receive_message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (storedUser && storedUser._id !== user?._id) {
      setUser(storedUser);
    }
  }, [user]);

  const sendMessage = async (message: string) => {
    if (socketRef.current && message.trim() !== '' && user) {
      const chatId = localStorage.getItem('chatId');
      if (!chatId) return;

      const messageData = {
        sender: {
          _id: user._id,
          username: user.username,
        },
        text: message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        chat: chatId,
      };

      socketRef.current.emit('send_message', { roomId: chatId, ...messageData });

      await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          sender: user._id,
          chat: chatId,
        }),
      });
    }
  };

  const createChat = async () => {
    if (user) {
      try {
        const response = await axios.post('http://localhost:8000/api/chats', { participants: [user._id] });
        setChats([...chats, response.data]);
      } catch (error) {
        console.error('Error creating chat:', error);
      }
    }
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, setMessages, createChat }}>
      {children}
    </ChatContext.Provider>
  );
};
