const token = localStorage.getItem("token");

async function loadRoutes() {
  const res = await fetch("/api/routes/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const routes = await res.json();

  const container = document.getElementById("routesContainer");
  container.innerHTML = "";

  routes.forEach((route) => {
    const stops = route.stops
      .sort((a, b) => a.order - b.order)
      .map((s) => s.city.name)
      .join(" → ");

    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${stops}</h3>

      <p><strong>Max passengers:</strong> ${route.maxPassengers}</p>
      <p><strong>Reserved:</strong> ${route.totalReserved}</p>
      <p><strong>Available:</strong> ${route.availableSeats}</p>

      <button onclick="deleteRoute('${route._id}')">Delete</button>

      <h4>Reservations:</h4>
      ${
        route.reservations.length === 0
          ? "<p>No reservations</p>"
          : route.reservations
              .map(
                (r) => `
            <div style="margin-left:20px">
              <p>${r.user.firstName} ${r.user.lastName} (${r.user.email})</p>
              <p>Passengers: ${r.passengers}</p>
            </div>
          `,
              )
              .join("")
      }

      <hr/>
    `;

    container.appendChild(div);
  });
}

async function deleteRoute(id) {
  if (!confirm("Delete this route?")) return;

  const res = await fetch(`/api/routes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    alert("Deleted");
    loadRoutes();
  } else {
    alert(data.error || "Error");
  }
}

loadRoutes();

function showTab(tab) {
  document.getElementById("addTab").classList.add("hidden");
  document.getElementById("statsTab").classList.add("hidden");

  if (tab === "add") {
    document.getElementById("addTab").classList.remove("hidden");
  } else {
    document.getElementById("statsTab").classList.remove("hidden");
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}