import { useState } from "react";
import axios from "axios";

export default function LoginForm({
  onSwitchToRegister,
  onSwitchToForgot,
  onClose,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user-routes/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onClose();

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error logging in");
    }
  };

  return (
    <>
      <h2 className="text-4xl font-black mb-2">Welcome Back</h2>
      <p className="text-gray-400 mb-8">Sign in to continue</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/10 rounded-2xl py-4 px-4 text-white border border-white/10 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/10 rounded-2xl py-4 px-4 text-white border border-white/10 outline-none"
        />

        <button className="w-full bg-cyan-500 py-4 rounded-2xl font-bold text-white hover:bg-cyan-600 transition">
          Sign In
        </button>

        <div className="flex flex-col gap-3 text-center mt-4">
          <button
            type="button"
            onClick={onSwitchToForgot}
            className="text-cyan-400 hover:underline text-sm"
          >
            Forgot Password?
          </button>
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-gray-400 hover:text-white text-sm"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
