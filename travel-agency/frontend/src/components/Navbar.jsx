export default function Navbar({ onOpenLogin }) {
  return (
    <header className="relative border-b border-white/50 backdrop-blur-md z-20 flex items-center justify-between px-16 py-8">
      {/* LOGO */}
      <h1 className="text-3xl font-black text-white">SEMOS TRAVEL</h1>

      {/* NAVIGATION */}
      <nav className="flex items-center gap-10 font-bold text-2xel text-white">
        <a
          href="#"
          className="relative text-white hover:text-cyan-400 transition
             after:content-[''] after:absolute after:left-0 after:-bottom-2
             after:h-0.5 after:w-0 after:bg-cyan-400
             after:transition-all after:duration-300
             hover:after:w-full"
        >
          Home
        </a>

        <a
          href="#"
          className="relative text-white hover:text-cyan-400 transition
             after:content-[''] after:absolute after:left-0 after:-bottom-2
             after:h-0.5 after:w-0 after:bg-cyan-400
             after:transition-all after:duration-300
             hover:after:w-full"
        >
          Trips
        </a>

        <a
          href="#"
          className="relative text-white hover:text-cyan-400 transition
             after:content-[''] after:absolute after:left-0 after:-bottom-2
             after:h-0.5 after:w-0 after:bg-cyan-400
             after:transition-all after:duration-300
             hover:after:w-full"
        >
          About
        </a>

        <a
          href="#"
          className="relative text-white hover:text-cyan-400 transition
             after:content-[''] after:absolute after:left-0 after:-bottom-2
             after:h-0.5 after:w-0 after:bg-cyan-400
             after:transition-all after:duration-300
             hover:after:w-full"
        >
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
