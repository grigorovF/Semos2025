const form = document.getElementById("resetForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`/api/auth/resetPassword/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (res.ok) {
      message.style.color = "green";
      message.innerText = "Password reset successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      message.style.color = "red";
      message.innerText = data.message || "Error resetting password";
    }
  } catch (err) {
    message.style.color = "red";
    message.innerText = "Server error";
    console.error(err);
  }
});
