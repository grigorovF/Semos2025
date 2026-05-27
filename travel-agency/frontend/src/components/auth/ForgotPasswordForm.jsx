import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordForm({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user-routes/forgot-password",
        { email },
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <h2 className="text-4xl font-black mb-2 text-center">Reset Password</h2>
      <p className="text-gray-400 mb-8  text-center">
        Enter your email to receive a reset link
      </p>

      {message && <p className="text-cyan-400 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/10 rounded-2xl py-4 px-4 text-white border border-white/10 outline-none"
          required
        />

        <button className="w-full bg-cyan-500 py-4 rounded-2xl font-bold text-white hover:bg-cyan-600 transition">
          Send Reset Link
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-gray-400 hover:text-white"
          >
            <span className="text-cyan-400 font-semibold hover:underline cursor-pointer">
              Back to Sign In
            </span>
          </button>
        </div>
      </form>
    </>
  );
}
