let users = JSON.parse(localStorage.getItem("users")) || [];


document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    const user = users.find((u) => u.username === username && u.password === password);

    if(user){
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "../Home/home.html";
    }

    else{
        alert("Incorrect username or password!");
    }
})