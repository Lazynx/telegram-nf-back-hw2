import Link from "next/link";

export const Header: React.FC = () => {
    return (
        <header className="bg-[#3390ec] text-white py-4 px-6 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto flex items-center justify-between h-full relative">
                <h1 className="text-xl font-bold">Telegram</h1>
            </div>
      </header>
    );
};