let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

fetch("https://api.tvmaze.com/shows")
  .then(res => res.json())
  .then(allShows => {
      const favShows = allShows.filter(show => favorites.includes(show.id));
      renderFavoriteShows(favShows);
  });

function renderFavoriteShows(favShows) {
  const container = document.getElementById("fav-container");
  container.innerHTML = "";

  favShows.forEach(show => {
    container.innerHTML += `
      <div class="show-card">
        <img src="${show.image ? show.image.medium : "defaultImage.jpg"}">
           
       
        <h2>${show.name}</h2>
        <a href="show.html?id=${show.id}">View Show</a>
      </div>
    `;
  });
}
