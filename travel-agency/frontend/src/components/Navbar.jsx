export default function Navbar({ onOpenLogin }) {
  return (
    <header className="relative z-20 flex items-center justify-between px-16 py-8">
      {/* LOGO */}
      <h1 className="text-3xl font-black text-white">SEMOS TRAVEL</h1>

      {/* NAVIGATION */}
      <nav className="flex items-center gap-10">
        <a href="#" className="text-white hover:text-cyan-400 transition">
          Home
        </a>

        <a href="#" className="text-white hover:text-cyan-400 transition">
          Trips
        </a>

        <a href="#" className="text-white hover:text-cyan-400 transition">
          About
        </a>

        <a href="#" className="text-white hover:text-cyan-400 transition">
          Contact
        </a>

        <button
          onClick={onOpenLogin}
          className="bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-full font-bold text-white"
        >
          Sign In
        </button>
      </nav>
    </header>
  );
}
