import React, { useEffect, useRef } from 'react';
import { useChat } from '@/context/ChatContext';
import axios from 'axios';
import Footer from '@/components/layouts/Footer'; // Ensure the Footer component is imported

interface ChatRoomProps {
  chatId: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ chatId }) => {
  const { messages, setMessages } = useChat();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chats/${chatId}/messages`);
        setMessages(response.data);
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [chatId, setMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 overflow-y-auto p-6 pt-16 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-4 ${msg.sender?._id === user._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-4 max-w-[70%] ${msg.sender?._id === user._id ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <p className="text-sm font-bold">{msg.sender?.username}</p>
              <p className="text-sm">{msg.text}</p>
              <div className={`text-xs mt-1 ${msg.sender?._id === user._id ? 'text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>
                {new Date(msg.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-gray-100 p-4">
        <Footer />
      </div>
    </div>
  );
};

export default ChatRoom;
