"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/AuthService';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
