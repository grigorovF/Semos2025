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
      message.innerText = "Check console for reset link";
    } else {
      message.style.color = "red";
      message.innerText = data.message || "Error";
    }
  } catch (err) {
    message.innerText = "Server error";
    console.error(err);
  }
});
