"use client"
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'; 
import "./globals.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { ChatProvider } from '@/context/ChatContext';
// import { ProtectedRoute } from "@/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isMainPage = pathname === '/';

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* <ChatProvider> */}
          {!isLoginPage && <Header />}
          {children}
          {/* {!isLoginPage && !isMainPage && <Footer />} */}
        {/* </ChatProvider> */}
      </body>
    </html>
  );
}
