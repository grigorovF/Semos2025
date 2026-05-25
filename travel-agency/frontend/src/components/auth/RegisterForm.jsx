import { useState } from "react";
import axios from "axios";

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

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user-routes/register",
        formData,
      );

      alert("Account created successfully");

      onSwitchToLogin();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-black mb-2">Create Account</h2>

      <p className="text-gray-400 mb-8">Create your SEMOS account</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <input
          type="text"
          name="passportNumber"
          placeholder="Passport Number"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <input
          type="date"
          name="expiredDate"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="w-full bg-white/10 rounded-2xl py-4 px-4"
        />

        <button className="w-full bg-cyan-500 py-4 rounded-2xl font-bold">
          Create Account
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-gray-400"
          >
            Already have an account? Sign In
          </button>
        </div>
      </form>
    </>
  );
}
