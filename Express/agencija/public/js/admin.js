const token = localStorage.getItem("token");

function showSection(section) {
  document.querySelectorAll(".section").forEach((sec) => {
    sec.style.display = "none";
  });

  document.getElementById(section).style.display = "block";
}

const stopsContainer = document.getElementById("stopsContainer");

document.getElementById("addStop").addEventListener("click", () => {
  const div = document.createElement("div");

  div.classList.add("stop");

  div.innerHTML = `
    <input type="text" class="stopCity" placeholder="City">
  `;

  stopsContainer.appendChild(div);
});

document.getElementById("routeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const stops = [];

  stops.push({
    city: document.getElementById("fromCity").value,
    order: 1,
  });

  const stopCities = document.querySelectorAll(".stopCity");
 
  stopCities.forEach((cityInput, index) => {
    stops.push({
      city: cityInput.value,
      order: stops.length + 1,
    });
  });

  stops.push({
    city: document.getElementById("toCity").value,
    order: stops.length + 1,
  });

  const data = {
    stops,

    pricePerSegment: document.getElementById("pricePerSegment").value,

    maxPassengers: document.getElementById("maxPassengers").value,
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
    alert("Route created");

    document.getElementById("routeForm").reset();

    stopsContainer.innerHTML = "";
  } else {
    alert(result.error || "Error");
  }
});
