import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onOpenLogin }) {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <div>
      <header className="relative border-b border-white/50 backdrop-blur-md z-20 flex items-center justify-between px-16 py-8">
        <h1 className="text-3xl font-black text-white">SEMOS TRAVEL</h1>

        <nav className="flex items-center gap-10 font-bold text-white">
          <a className="hover:text-cyan-400 hover:cursor-pointer">Routes</a>
          <a className="hover:text-cyan-400 hover:cursor-pointer">
            Reservations
          </a>
          <a className="hover:text-cyan-400 hover:cursor-pointer">Trips</a>

          {!user ? (
            <button
              onClick={onOpenLogin}
              className="bg-cyan-500 hover:bg-cyan-700 transition px-6 py-3 rounded-full font-bold text-white hover:cursor-pointer"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 transition px-4 py-2 rounded-full hover:cursor-pointer text-white font-bold"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
