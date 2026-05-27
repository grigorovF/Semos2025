import { useState } from "react";
import axios from "axios";
import "../../index.css";
import { useParams } from "react-router-dom";

export default function ResetPasswordForm  ({ onSwitchToLogin }) {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    newConfirmPassword: "",
    
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.newConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/user-routes/password-reset", {
        token,
        newPassword: formData.newPassword,
      });

      alert("Password reset successfully");
      onSwitchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="w-125  items-center justify-center text-white px-3 py-6">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Reset Password
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Type your new password below and confirm it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 space-y-6">
          <div className=" flex flex-col gap-6">
            <div>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                name="newConfirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>
          </div>

          

          {/* Главно копче */}
          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-2xl font-bold tracking-wide active:scale-[0.99] transition-all shadow-lg shadow-cyan-500/10 mt-2">
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}
