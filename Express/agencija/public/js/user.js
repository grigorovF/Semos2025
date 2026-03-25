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
  const res = await fetch("/api/reservations/my", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await res.json();
  const container = document.getElementById("reservationsContainer");
  container.innerHTML = "";

  data.forEach((r) => {
    // 1. Ги наоѓаме објектите на градовите во низата stops на рутата
    const startStop = r.route.stops.find((s) => s.city._id === r.fromCity);
    const endStop = r.route.stops.find((s) => s.city._id === r.toCity);

    // 2. Ги земаме имињата (ако не ги најде, става "Непознато")
    const fromName = startStop ? startStop.city.name : "Непознат град";
    const toName = endStop ? endStop.city.name : "Непознат град";

    const div = document.createElement("div");
    const isPaid = r.paymentStatus === "paid";
    div.className = "route-card";
    div.innerHTML = `
        <div style="border-left: 4px solid #8b5cf6; padding-left: 15px;">
            <h4 style="margin: 0; color: #fff;">${fromName} → ${toName}</h4>
            <p style="margin: 5px 0; font-size: 0.9rem; opacity: 0.8;">
                👥 Патници: <strong>${r.passengers}</strong> | 
                💰 Цена: <strong>${r.totalPrice} ден.</strong>
            </p>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
        ${!isPaid ? `<button onclick="pay('${r._id}')" style="background: #10b981; font-size: 0.8rem; padding: 5px;">Плати</button>` : '<span style="color: #10b981;">✅ Платено</span>'}
        <button onclick="cancel('${r._id}')" style="background: #ef4444; font-size: 0.8rem; padding: 5px;">Откажи</button>
    </div>
            <span style="font-size: 0.75rem; color: #10b981;">● Статус: Потврдено</span>
        </div>
    `;
    container.appendChild(div);
  });
}

async function pay(id) {
  const res = await fetch(`/api/reservations/pay/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    alert("Успешна уплата!");
    loadReservations();
  }
}

async function cancel(id) {
  if (!confirm("Дали сте сигурни дека сакате да ја откажете резервацијата?"))
    return;
  const res = await fetch(`/api/reservations/cancel/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    alert("Откажано!");
    loadReservations();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadRoutes();
  loadReservations();
  setupRouteChange();
  setupReserveBtn();
});
