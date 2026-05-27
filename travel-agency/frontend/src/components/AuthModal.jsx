import { useState } from "react";
import { X } from "lucide-react";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";
import ResetPasswordForm from "./auth/ResetPasswordForm";

export default function AuthModal({ isOpen, onClose }) {
  const [view, setView] = useState("login");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="w-125px bg-[#101826]/95 border border-white/10 rounded-[35px] shadow-2xl p-10 relative text-white max-h-[90vh] overflow-y-auto">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {view === "login" && (
          <LoginForm
            onSwitchToRegister={() => setView("register")}
            onSwitchToForgot={() => setView("forgot")}
            onClose={onClose}
          />
        )}

        {view === "register" && (
          <RegisterForm onSwitchToLogin={() => setView("login")} />
        )}

        {view === "forgot" && (
          <ForgotPasswordForm onSwitchToLogin={() => setView("login")} />
        )}

        {view === "reset" && (
          <ResetPasswordForm onSwitchToLogin={() => setView("login")} />
        )}
      </div>
    </div>
  );
}
