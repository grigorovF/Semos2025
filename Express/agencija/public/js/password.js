//alert("Raboti");

const sendMail = document.getElementById("sendMail");
const emailAddress = document.querySelector("input[name='email']");

sendMail.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailAddress.value;

  const res = await fetch("/password/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  //alert("I Tuka");

  const data = await res.json();
  alert(data.message);

  window.location.href = "/login";
});
