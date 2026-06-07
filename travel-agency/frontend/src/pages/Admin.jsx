import { useState } from "react";
import Navbar from "../components/AdminComponents/AdminNavbar";
import AuthModal from "../components/AuthModal";
import BusManager from "../components/AdminComponents/BussManager"

//import { useAuth } from "../context/AuthContext";

export default function AAdminPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  //const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Navbar onOpenLogin={() => setShowAuthModal(true)} />

      <main className="relative z-10 mt-10 flex items-center px-16">
        <div className="w-[100%]">
          <BusManager/>        
        </div>
      </main>
    </div>
  );
}
