let shows = [];
  

fetch("https://api.tvmaze.com/shows")
  .then((res) => res.json())
  .then((res) => {
    shows = res;
    console.log(res);
    renderShows();
});

window.onload = function() {
  const nameSpan = document.getElementById("namespan");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    nameSpan.textContent = currentUser.username;
  } else {
    nameSpan.textContent = "Guest";
  }
}

function renderShows(){
   const mainContainer = document.getElementById("main-container");
   mainContainer.innerHTML = "";

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   let users = JSON.parse(localStorage.getItem("users")) || [];
   let favs = [];

   if (currentUser) {
     const user = users.find(u => u.username === currentUser.username);
     favs = user?.favorites || [];
   }

   shows.forEach(show => {
     const isFav = favs.includes(String(show.id));

     mainContainer.innerHTML += `
        <div class="show-card">
          <div class="favorite-icon">
            <span class="material-symbols-outlined ${isFav ? "favourited" : ""}"
              data-id="${show.id}"
              onclick="toggleFavorite(this)">
              favorite
            </span>
          </div>
        <img src="${show.image ? show.image.medium : "defaultImage.jpg"}" />
        <h2 id="movie-name">${show.name}</h2>
        <a id="more" href="../Casts/casts.html?id=${show.id}">View Show</a>
      </div>
     `;
   });
}

function toggleFavorite(iconElement) {
  const showId = String(iconElement.dataset.id);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("You must be logged in to favorite shows.");
    iconElement.classList.remove("favourited");
    return;
  }
  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userIndex = users.findIndex(u => u.username === currentUser.username);
  if (userIndex === -1) return;

  let userFavorites = users[userIndex].favorites || [];
  iconElement.classList.toggle("favourited");

  if (userFavorites.includes(showId)) {
    userFavorites = userFavorites.filter(id => id !== showId);
  } else {
    userFavorites.push(showId);
  }

  users[userIndex].favorites = userFavorites;
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("favorites", JSON.stringify(userFavorites));
  console.log("Favorites updated:", userFavorites);
}

function logOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "../LogIn/login.html";
}

document.getElementById('title-input').addEventListener('keyup', function(e) {
  const query = e.target.value.toLowerCase();
  const filteredShows = shows.filter(show => show.name.toLowerCase().includes(query));

  renderFilteredShows(filteredShows);
});

function renderFilteredShows(filteredShows) {
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";

  filteredShows.forEach((show) => {
    mainContainer.innerHTML += `
        <div class="show-card">
          <div class="favorite-icon">
           <span class="material-symbols-outlined"
      data-id="${show.id}"
      onclick="toggleFavorite(this)">favorite</span>
          </div>
        <img src="${show.image ? show.image.medium : "defaultImage.jpg"}" />
        <h2 id="movie-name">${show.name}</h2>
        <a id="more" href="show.html?id=${show.id}">View Show</a>
      </div>
    `;
  });
}