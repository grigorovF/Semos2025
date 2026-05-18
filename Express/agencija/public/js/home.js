async function loadPopularRoutes() {
  const res = await fetch("/api/reservations/popular");
  const data = await res.json();

  const container = document.getElementById("popularRoutes");

  container.innerHTML = "";

  data.forEach((route) => {
    const stops = route.stops
      .sort((a, b) => a.order - b.order)
      .map((s) => s.city.name)
      .join(" → ");

    container.innerHTML += `
      <div class="route-card">
        <h3>${stops}</h3>
        <p>🔥 ${route.totalReservations} резервации</p>
        <button onclick="handleReserveClick('${route._id}')">
          Резервирај
        </button>
      </div>
    `;
  });
}

loadPopularRoutes();

function handleReserveClick(routeId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Мора да се најавите за да резервирате!");

    localStorage.setItem("redirectAfterLogin", `/routes?reserve=${routeId}`);

    window.location.href = "/login";
    return;
  }

  window.location.href = `/routes?reserve=${routeId}`;
}
