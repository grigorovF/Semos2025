const token = localStorage.getItem("token");
const stopsContainer = document.getElementById("stopsContainer");

// Додавање нова станица
document.getElementById("addStopBtn").addEventListener("click", () => {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" name="city[]" placeholder="City" required />`;
  stopsContainer.appendChild(div);
});

// Submit на нова рута
document.getElementById("routeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    city: [...form.querySelectorAll('input[name="city[]"]')].map(
      (i) => i.value,
    ),
    pricePerSegment: form.pricePerSegment.value,
    maxPassengers: form.maxPassengers.value,
    startDate: form.startDate.value,
    endDate: form.endDate.value,
  };

  const res = await fetch("/api/routes/add-route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (res.ok) {
    alert("Route added!");
    form.reset();
    stopsContainer.innerHTML = "";
  } else {
    alert(result.error || "Error adding route");
  }
});

// Прикажување на секцијата
function showSection(section) {
  document.getElementById("routesListSection").classList.add("hidden");
  document.getElementById("addRouteSection").classList.add("hidden");

  if (section === "routesList") {
    document.getElementById("routesListSection").classList.remove("hidden");
    loadRoutes(); // load routes when showing
  } else if (section === "addRoute") {
    document.getElementById("addRouteSection").classList.remove("hidden");
  }
}

async function loadRoutes() {
  const routesContainer = document.getElementById("routesContainer");
  routesContainer.innerHTML = "<p>Loading...</p>";

  const res = await fetch("/api/routes/all", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    routesContainer.innerHTML = `<p>Error: ${data.message || "Could not load routes"}</p>`;
    return;
  }

  if (data.routes.length === 0) {
    routesContainer.innerHTML = "<p>No routes created yet.</p>";
    return;
  }

  routesContainer.innerHTML = "";

  data.routes.forEach((route) => {
    const stops = route.stops
      .sort((a, b) => a.order - b.order)
      .map((s) => s.city.name)
      .join(" → ");

    const card = document.createElement("div");
    card.className = "route-card";
    card.innerHTML = `
      <h3>Route ID: ${route._id}</h3>
      <p><strong>Stops:</strong> ${stops}</p>
      <p><strong>Price per segment:</strong> ${route.pricePerSegment}</p>
      <p><strong>Max passengers:</strong> ${route.maxPassengers}</p>
      <p><strong>Start Date:</strong> ${new Date(route.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> ${new Date(route.endDate).toLocaleDateString()}</p>
      <button class="delete-route-btn" data-id="${route._id}">Delete</button>
    `;

    routesContainer.appendChild(card);
  });

  // Додавање на delete функција
  document.querySelectorAll(".delete-route-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const routeId = btn.dataset.id;
      if (!confirm("Are you sure you want to delete this route?")) return;

      const res = await fetch(`/api/routes/${routeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Route deleted!");
        loadRoutes();
      } else {
        const data = await res.json();
        alert(data.message || "Error deleting route");
      }
    });
  });
}
