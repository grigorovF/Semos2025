let shows = [];
let favoriteList = [];

window.onload = function() {
  favoriteList = JSON.parse(localStorage.getItem("favorites")) || [];

  fetch("https://api.tvmaze.com/shows")
    .then(res => res.json())
    .then(data => {
      shows = data;
      renderFavoriteShow();
    });
}

function renderFavoriteShow() {
  const container = document.getElementById("main-container");
  container.innerHTML = "";

  const favShows = shows.filter(show =>
    favoriteList.includes(String(show.id))
  );

  favShows.forEach(show => {
    container.innerHTML += `
      <div class="show-card">
          <div class="favorite-icon">
            <span class="material-symbols-outlined"
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


