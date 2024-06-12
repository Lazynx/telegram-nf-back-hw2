import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-1 flex items-center justify-center overflow-y-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Telegram</h1>
          <Link href="/login" className="inline-block px-6 py-3 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
          </Link>
        </div>
      </main>
    </div>
  );
}
