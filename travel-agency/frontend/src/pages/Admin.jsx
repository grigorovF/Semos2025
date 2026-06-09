import { useState } from "react";
import Navbar from "../components/AdminComponents/AdminNavbar";
import AuthModal from "../components/AuthModal";
import BusManager from "../components/AdminComponents/BussManager"
import RoutesManager from "../components/AdminComponents/RoutesManager"

//import { useAuth } from "../context/AuthContext";

export default function AAdminPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeSection, setActiveSection] = useState("busses");
  //const { user, logout } = useAuth();

  const renderSection = () => {
    switch (activeSection){
      case "busses": 
        return <BusManager/>
      case "routes":
        return <RoutesManager/>
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      <Navbar onOpenLogin={() => setShowAuthModal(true)} setActiveSection={setActiveSection} />

      <main className="relative z-10 mt-10 flex items-center px-16">
        <div className="w-full">
          {renderSection()}        
        </div>
      </main>
    </div>
  );
}
