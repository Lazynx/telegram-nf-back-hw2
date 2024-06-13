"use client"
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'; 
import "./globals.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { ChatProvider } from '@/context/ChatContext';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
          {!isLoginPage && <Header />}
          {children}
      </body>
    </html>
  );
}
