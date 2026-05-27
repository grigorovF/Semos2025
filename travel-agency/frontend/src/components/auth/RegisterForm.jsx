import { useState } from "react";
import axios from "axios";
import "../../index.css";

export default function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    passportNumber: "",
    expiredDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.expiredDate) {
      alert("Please select a passport expiry date");
      return;
    }

    const expiredDate = new Date(formData.expiredDate);
    const today = new Date();

    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (expiredDate < today || expiredDate  < threeMonthsFromNow) {
      alert("Passport expiry date must be between now and 3 months from now");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user-routes/register",
        formData,
      );

      alert("Account created successfully");
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
            Create Account
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Please fill in the details to register
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 space-y-6">
          <div className=" flex flex-col gap-6">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div>
              <input
                type="text"
                name="passportNumber"
                placeholder="Passport Number"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div className="relative group">
              <input
                type="date"
                name="expiredDate"
                onChange={handleChange}
                required
                className="peer w-full bg-white/5 hover:bg-white/10 text-white rounded-2xl py-4 px-5 pt-6 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all text-left appearance-none 
    [&::-webkit-calendar-picker-indicator]:invert 
    [&::-webkit-calendar-picker-indicator]:opacity-40 
    [&::-webkit-calendar-picker-indicator]:absolute 
    [&::-webkit-calendar-picker-indicator]:right-4
    [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <label
                className="absolute text-gray-500 text-sm duration-300 transform 
    -translate-y-3 scale-75 top-4 z-10 left-1
    peer-placeholder-shown:scale-100 
    peer-placeholder-shown:translate-y-0 
    peer-focus:scale-75 
    peer-focus:-translate-y-3 
    peer-focus:text-cyan-400 
    pointer-events-none"
              >
                Passport Expiry Date
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                className="w-full bg-white/5 hover:bg-white/10 text-white placeholder-gray-500 rounded-2xl py-4 px-5 outline-none focus:bg-white/10 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              />
            </div>
          </div>

          {/* Порака за лозинките */}
          {formData.confirmPassword && (
            <div className="text-center pt-1 animate-fade-in">
              {formData.password !== formData.confirmPassword ? (
                <span className="text-red-400 text-sm font-medium">
                  ✕ Passwords do not match
                </span>
              ) : (
                <span className="text-emerald-400 text-sm font-medium">
                  ✓ Passwords match
                </span>
              )}
            </div>
          )}

          {/* Главно копче */}
          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-2xl font-bold tracking-wide active:scale-[0.99] transition-all shadow-lg shadow-cyan-500/10 mt-2">
            Create Account
          </button>

          {/* Линк за најава */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-gray-400 hover:text-gray-300 text-1xl transition-colors"
            >
              Already have an account?{" "}
              <span className="text-cyan-400 font-semibold hover:underline">
                Sign In
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
