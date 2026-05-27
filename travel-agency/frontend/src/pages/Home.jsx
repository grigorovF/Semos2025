import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
//import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  //const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Navbar onOpenLogin={() => setShowAuthModal(true)} />

      <main className="relative z-10 h-screen flex items-center px-16">
        <div className="w-[45%]">
        
        </div>
      </main>
    </div>
  );
}
