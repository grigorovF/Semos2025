const urlParams = new URLSearchParams(window.location.search);
const showId = urlParams.get("id");


fetch(`https://api.tvmaze.com/shows/${showId}/cast`)
  .then(res => res.json())
  .then(data => renderCast(data))
  .catch(err => console.error(err));

fetch(`https://api.tvmaze.com/shows/${showId}/seasons`)
  .then(res => res.json())
  .then(seasons => loadEpisodesForAllSeasons(seasons))
  .catch(err => console.error(err));


function renderCast(cast) {
  const container = document.getElementById("character-container");
  container.innerHTML = "";

  cast.forEach(item => {
    const person = item.person;
    const character = item.character;

    container.innerHTML += `
      <div class="cast-card">
        <img src="${person.image ? person.image.medium : 'default.jpg'}" />
        <h3>${person.name}</h3>
        <p><strong>Character:</strong> ${character.name}</p>
      </div>
    `;
  });
}

function loadEpisodesForAllSeasons(seasons) {
  const container = document.getElementById("episodes-container");
  container.innerHTML = "";

  seasons.forEach(season => {
    fetch(`https://api.tvmaze.com/seasons/${season.id}/episodes`)
      .then(res => res.json())
      .then(episodes => {
        renderSeasonEpisodes(season, episodes);
      })
      .catch(err => console.error(err));
  });
}

function renderSeasonEpisodes(season, episodes) {
  const container = document.getElementById("episodes-container");

  container.innerHTML += `
    <h3>Season ${season.number}</h3>
    <div class="season-block" id="season-${season.id}"></div>
  `;

  const block = document.getElementById(`season-${season.id}`);

  episodes.forEach(ep => {
    block.innerHTML += `
      <div class="episode-card">
        <h4>${ep.number}. ${ep.name}</h4>
        <p><strong>Airdate:</strong> ${ep.airdate}</p>
        ${ep.image ? `<img src="${ep.image.medium}" />` : ""}
      </div>
    `;
  });
}
