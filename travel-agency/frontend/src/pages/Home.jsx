import { useState } from "react";
import Navbar from "../components/UserComponents/UserNavbar";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Navbar onOpenLogin={() => setShowAuthModal(true)} />

      <main className="relative z-10 h-screen flex items-center px-16 text-white">
        <div className="w-[45%]">
          <h1 className="text-4xl font-bold">Book your trip</h1>

          {!user ? (
            <p className="mt-4 text-gray-300">You can book without login</p>
          ) : (
            <div className="mt-4">
              <p className="text-green-400">Welcome back {user.firstName}</p>
              <p className="text-gray-300">
                You have access to discounts & trips
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
