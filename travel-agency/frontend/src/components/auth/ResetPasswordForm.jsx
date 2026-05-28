import { useState } from "react";
import axios from "axios";
import "../../index.css";
import { useParams } from "react-router-dom";

export default function ResetPasswordForm  ({ onSwitchToLogin }) {
  const { token } = useParams();
  console.log("Токенот на Frontend е:", token);
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

      await axios.post(
        `http://localhost:3000/api/user-routes/reset-password/${token}`,
        {
          password: formData.newPassword,
        },
      );

      alert("Password reset successfully");
      onSwitchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <h2 className="text-4xl font-black mb-2 text-center">Reset Password</h2>

      <p className="text-gray-400 mb-8 text-center">
        Type your new password below and confirm it
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4 text-white border border-white/10 outline-none placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition"
          required
        />

        <input
          type="password"
          name="newConfirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4 text-white border border-white/10 outline-none placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition"
          required
        />

        <button className="w-full bg-cyan-500 py-4 rounded-2xl font-bold text-white hover:bg-cyan-600 transition">
          Reset Password
        </button>
      </form>
    </div>
  );
}
