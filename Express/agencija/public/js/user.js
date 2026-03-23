let routesData = [];
const token = localStorage.getItem("token");

async function loadRoutes() {
  const res = await fetch("/api/routes");
  routesData = await res.json();

  const routeSelect = document.getElementById("routeSelect");

  routeSelect.innerHTML = `<option value="">Select Route</option>`;

  routesData.forEach((route) => {
    const stops = route.stops
      .sort((a, b) => a.order - b.order)
      .map((s) => s.city.name)
      .join(" → ");

    routeSelect.innerHTML += `
      <option value="${route._id}">
        ${stops}
      </option>
    `;
  });
}

function setupRouteChange() {
  const routeSelect = document.getElementById("routeSelect");

  if (!routeSelect) return;

  routeSelect.addEventListener("change", (e) => {
    const routeId = e.target.value;

    const route = routesData.find((r) => r._id === routeId);
    if (!route) return;

    const fromSelect = document.getElementById("fromCity");
    const toSelect = document.getElementById("toCity");

    const options = route.stops
      .sort((a, b) => a.order - b.order)
      .map((s) => `<option value="${s.city._id}">${s.city.name}</option>`)
      .join("");

    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;
  });
}

async function reserve() {
  const route = document.getElementById("routeSelect").value;
  const fromCity = document.getElementById("fromCity").value;
  const toCity = document.getElementById("toCity").value;
  const passengers = document.getElementById("passengers").value;

  if (!route || !fromCity || !toCity || !passengers) {
    return alert("Fill all fields");
  }

  const res = await fetch("/api/reservations/reserve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ route, fromCity, toCity, passengers }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Reservation successful!");
    loadReservations();
  } else {
    alert(data.message || "Error");
  }
}

function setupReserveBtn() {
  const btn = document.getElementById("reserveBtn");
  if (!btn) return;

  btn.addEventListener("click", reserve);
}
async function loadReservations() {
  const token = localStorage.getItem("token");

  const res = await fetch("/api/reservations/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  console.log("RES:", data);

  if (!res.ok) {
    alert(data.message || "Error loading reservations");
    return;
  }

  if (!Array.isArray(data)) {
    console.error("Not array:", data);
    return;
  }

  const container = document.getElementById("reservationsContainer");
  container.innerHTML = "";

  data.forEach((r) => {
    const div = document.createElement("div");

    div.innerHTML = `
        <p><strong>Passengers:</strong> ${r.passengers}</p>
        <p><strong>Total:</strong> ${r.totalPrice}</p>
        <hr/>
      `;

    container.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadRoutes();
  loadReservations();
  setupRouteChange();
  setupReserveBtn();
});
