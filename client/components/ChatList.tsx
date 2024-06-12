import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useChat } from '@/context/ChatContext';

interface Chat {
  _id: string;
  lastMessage: {
    text: string;
    sender: string;
    createdAt: string;
  };
}

interface ChatListProps {
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { createChat } = useChat();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chats/');
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const handleCreateChat = async () => {
    const newChat = await createChat();
    if (newChat) {
      setChats([...chats, newChat]);
      onSelectChat(newChat._id);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 pt-16">
      {chats.map(chat => (
        <div
          key={chat._id}
          className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
          onClick={() => onSelectChat(chat._id)}
        >
          <div className="text-sm font-bold">{chat.lastMessage?.text || 'No messages yet'}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(chat.lastMessage?.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
      <button
  onClick={handleCreateChat}
  className="fixed bottom-4 left-4 bg-blue-500 text-white w-12 h-12 flex items-center justify-center text-xl rounded-full shadow-lg hover:bg-blue-600"
>
  +
</button>
    </div>
  );
};

export default ChatList;
