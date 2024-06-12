"use client"
import React, { useState, useEffect } from 'react';
import ChatList from '@/components/ChatList';
import ChatRoom from '@/components/ChatRoom';
import { ChatProvider } from '@/context/ChatContext';

const App: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    const initialChatId = localStorage.getItem('chatId') || '666996e84e8223d070f61abf';
    setSelectedChatId(initialChatId);
  }, []);

  return (
    <ChatProvider>
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/4 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
          <ChatList onSelectChat={setSelectedChatId} />
        </div>
        <div className="flex-1 flex flex-col h-full">
          {selectedChatId && <ChatRoom chatId={selectedChatId} />}
        </div>
      </div>
    </ChatProvider>
  );
};

export default App;
