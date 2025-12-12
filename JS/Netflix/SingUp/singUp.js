//email validation
function returnEmail() {
  const emailValidate = document.getElementById("emailInput");
  const mailspan = document.getElementById("mailSpan");
  if (
    !emailValidate.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
  ) {
    mailspan.innerText = "Please Enter Valid e-mail adress!";
    mailspan.style.color = "red";
    mailspan.style.fontWeight = "bolder";
  } else {
    mailspan.innerText = "E-mail adress is correct";
    mailspan.style.color = "green";
    mailspan.style.fontWeight = "bolder";
  }
}

//passwordValidation
function returnPassword() {
  const passwordInput = document.getElementById("passwordInput");
  const repasswordInput = document.getElementById("repasswordInput");
  const passSpan = document.getElementById("passSpan");

  if (passwordInput.value === repasswordInput.value) {
    passSpan.innerText = "Passwords are the same";
    passSpan.style.color = "green";
    passSpan.style.fontWeight = "bolder";
  } else {
    passSpan.innerText = "Please Enter the same password!";
    passSpan.style.color = "red";
    passSpan.style.fontWeight = "bolder";
  }
}

//submit
document.getElementById("singUpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstNameInput").value.trim();
  const lastName = document.getElementById("lastNameInput").value.trim();
  const username = document.getElementById("userNameInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (!firstName || !lastName || !username || !email || !password) {
    alert("All fields are required!");
    return;
  }

  if (
    users.find((user) => user.email === email) ||
    users.find((user) => user.username === username)
  ) {
    alert("User with this e-mail address or user name already exists!");
    return;
  }

  const newUser = {
    firstName,
    lastName,
    username,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Sign up successful! You will be autoaticaly redirect!");
  window.location.href = "../LogIn/login.html";
});


