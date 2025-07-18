export default function Header() {
  return (
    <header className="w-screen h-[8vh] bg-slate-900 flex items-center justify-between px-4 border-b border-slate-700 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-sky-400 rounded-t" />

      <h1 className="text-gray-200 text-xl font-semibold tracking-wide">
        Bitespeed Chat
      </h1>

      <div className="flex items-center gap-1 text-gray-300 text-sm sm:text-base font-medium">
        <span>Made by Nanda Varma</span>
        <span className="animate-pulse">❤️</span>
      </div>
    </header>
  );
}
