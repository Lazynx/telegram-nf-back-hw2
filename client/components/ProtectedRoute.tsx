import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && router.pathname !== '/login' && router.pathname !== '/') {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return (
        <>
            {isAuthenticated || router.pathname === '/login' || router.pathname === '/' ? children : null}
        </>
    );
};