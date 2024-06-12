"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
