let shows = []; 

fetch("https://api.tvmaze.com/shows")
        .then((res) => res.json())
        .then((res) => {
            shows = res;
            console.log(res);
            
            renderShows();
        }
    )

    function renderShows() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const showContainer = document.getElementById("shows-container");
  showContainer.innerHTML = '';

  shows.forEach(show => {
    const isFavorite = favorites.includes(show.id);

    showContainer.innerHTML += `
      <div class="show-card">
        <img src="${show.image ? show.image.medium : 'defaultImage.jpg'}" />
        
        <div class="fav-class">
          <span 
            class="material-symbols-outlined ${isFavorite ? "active" : ""}" 
            data-id="${show.id}"
            onclick="toggleFavorite(${show.id})"
          >
            favorite
          </span>
        </div>

        <h2>${show.name}</h2>
        <a href="show.html?id=${show.id}">View Show</a>
      </div>
    `;
  });
}

function toggleFavorite(id) {
    const icon = document.querySelector(`.material-symbols-outlined[data-id="${id}"]`);
    if (!icon) return;
    icon.classList.toggle("active");

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}