async function loadPopular() {
  const res = await fetch("/api/reservations/popular");
  const data = await res.json();

  const container = document.getElementById("popularRoutes");

  data.forEach((r) => {
    const stops = r._id.stops
      .sort((a, b) => a.order - b.order)
      .map((s) => s.city.name)
      .join(" → ");

    container.innerHTML += `
        <div class="card">
          <h3>${stops}</h3>
          <p>👥 Патници: ${r.totalPassengers}</p>
        </div>
      `;
  });
}

loadPopular();
