const token = localStorage.getItem("token");

const stopsContainer = document.getElementById("stopsContainer");

document.getElementById("addStop").addEventListener("click", () => {
  const div = document.createElement("div");

  div.classList.add("stop");

  div.innerHTML = `
  <input type="text" name="city" placeholder="City" required>
  <input type="text" name="land" placeholder="Country" required>
  `;

  stopsContainer.appendChild(div);
});

document.getElementById("routeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityInputs = document.querySelectorAll('input[name="city"]');
  const landInputs = document.querySelectorAll('input[name="land"]');

  const stops = [];

  cityInputs.forEach((cityInput, index) => {
    stops.push({
      city: cityInput.value,
      land: landInputs[index].value,
      order: index + 1,
    });
  });

  const data = {
    stops,
    pricePerSegment: document.getElementById("pricePerSegment").value,
    maxPassengers: document.getElementById("maxPassengers").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
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

    stopsContainer.innerHTML = `
      <div class="stop">
        <input type="text" name="city" placeholder="City" required>
        <input type="text" name="land" placeholder="Country" required>
      </div>
    `;
  } else {
    alert(result.error || "Error creating route");
  }
});
