import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        alert(error);
       localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload(); // Рефреш за целосно чистење на состојбата
  };

  return (
    <div className="min-h-screen bg-[#0b1220] overflow-hidden">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <div className="relative h-screen overflow-hidden">
        {/* BACKGROUND */}
        <img
          src="https://t3.ftcdn.net/jpg/02/45/93/48/360_F_245934836_D5jQ4AHkgWbs9exJluOLpNIuc2AbgJFk.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[2px]"
        />

        <div className="absolute inset-0 bg-[#081120]/80"></div>

        {/* NAVBAR */}
        {/* Можеш да му го пратиш `user` проп-от и на Navbar-от доколку сакаш и таму промени */}
        <Navbar onOpenLogin={() => setShowAuthModal(true)} />

        {/* MAIN */}
        <main className="relative z-10 h-[calc(100vh-100px)] flex items-center justify-between px-16">
          {/* RESERVATION */}
          <div className="w-[45%] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[35px] p-10 shadow-2xl">
            <h2 className="text-4xl text-white font-black mb-8">Reservation</h2>

            <div className="space-y-5">
              <div className="relative">
                <MapPin className="absolute top-1/2 -translate-y-1/2 left-4 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="From"
                  className="w-full bg-white/10 text-white rounded-2xl py-4 pl-12 pr-4 border border-white/10 outline-none focus:border-cyan-500"
                />
              </div>

              <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-2xl text-white font-bold text-lg">
                Reserve Now
              </button>
            </div>
          </div>

          {/* RIGHT SIDE (WITH CONDITIONAL RENDERING) */}
          <div className="w-[45%]">
            {user ? (
              // Приказ кога корисникот Е логиран
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[35px] p-10 text-white">
                <h1 className="text-5xl font-black leading-tight">
                  Welcome back, <br />
                  <span className="text-cyan-400">
                    {user.firstName} {user.lastName}
                  </span>
                  !
                </h1>
                <p className="text-gray-300 mt-4 text-lg">
                  Ready for your next adventure? Manage your trips and settings
                  seamlessly.
                </p>
                <div className="mt-8 flex gap-4">
                  <button className="bg-cyan-500 hover:bg-cyan-600 transition text-white px-8 py-4 rounded-full font-bold text-md">
                    My Account
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition px-8 py-4 rounded-full font-bold text-md"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              // Приказ кога корисникот НЕ е логиран (Оригиналниот приказ)
              <>
                <h1 className="text-7xl font-black text-white leading-[1.1]">
                  TRAVEL <br />
                  <span className="text-cyan-400">WITHOUT</span>
                  <br />
                  LIMITS
                </h1>

                <p className="text-gray-300 mt-8 text-lg leading-relaxed max-w-md">
                  Modern transport reservation platform with online booking,
                  seat selection, installments, route management and check-in
                  system.
                </p>

                <button
                  onClick={() => setShowAuthModal(true)}
                  className="mt-10 bg-cyan-500 hover:bg-cyan-600 transition text-white px-10 py-4 rounded-full font-bold text-lg"
                >
                  Explore Trips
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
