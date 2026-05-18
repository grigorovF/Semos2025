import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    const res = await fetch("http://localhost:9002/api/v1/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    const result = await res.json();

    localStorage.setItem("token", result.token);

    alert("Logged in");
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={changeData}
      />

      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={changeData}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

