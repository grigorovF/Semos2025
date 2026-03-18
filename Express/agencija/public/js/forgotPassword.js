const form = document.getElementById("forgotForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const res = await fetch("/api/auth/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = "green";
      alert = "Link sent!";
      window.location.href = "/login";
    } else {
      message.style.color = "red";
      message.innerText = data.message || "Error";
    }

    window.location.href = "/login";
  } catch (err) {
    message.innerText = "Server error";
    console.error(err);
  }
});
