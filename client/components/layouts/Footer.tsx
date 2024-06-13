import React, { useState } from 'react';
import { useChat } from '@/context/ChatContext';

const Footer: React.FC = () => {
  const { sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline from being inserted
      handleSend();
    }
  };

  return (
    <footer className="flex items-center justify-between">
      <div className="container mx-auto flex items-center justify-between h-full relative gap-4">
        <textarea
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-lg text-black border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button className="flex-shrink-0 ml-4" onClick={handleSend}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
          <span className="sr-only">Send</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
