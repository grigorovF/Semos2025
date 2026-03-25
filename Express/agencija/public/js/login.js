document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    email: form.email.value,
    password: form.password.value,
  };

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });

  const result = await res.json();

  if (res.ok) {
    localStorage.setItem("token", result.token);
    localStorage.setItem("role", result.role);
    if (result.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/user";
    }
  }
});
