const token = localStorage.getItem("token");

async function loadLands() {
  const res = await fetch("/api/lands");
  const lands = await res.json();

  const fromLand = document.getElementById("fromLandSelect");
  const toLand = document.getElementById("toLandSelect");

  fromLand.innerHTML = '<option value="">Select Land</option>';
  toLand.innerHTML = '<option value="">Select Land</option>';

  lands.forEach((land) => {
    fromLand.innerHTML += `<option value="${land._id}">${land.landName}</option>`;
    toLand.innerHTML += `<option value="${land._id}">${land.landName}</option>`;
  });
}

async function loadCities(landId, citySelectId) {
  if (!landId) return;

  const res = await fetch(`/api/cities?land=${landId}`);
  const cities = await res.json();

  const citySelect = document.getElementById(citySelectId);

  citySelect.innerHTML = '<option value="">Select City</option>';

  cities.forEach((city) => {
    citySelect.innerHTML += `<option value="${city._id}">${city.ime}</option>`;
  });
}

document.getElementById("fromLandSelect").addEventListener("change", (e) => {
  loadCities(e.target.value, "fromCitySelect");
});

document.getElementById("toLandSelect").addEventListener("change", (e) => {
  loadCities(e.target.value, "toCitySelect");
});

document
  .getElementById("reservationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const tripData = {
      from: document.getElementById("fromCitySelect").value,
      to: document.getElementById("toCitySelect").value,
      passengers: document.getElementById("passengers").value,
    };

    const res = await fetch("/api/reservations/reserve", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(tripData),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Reservation successful");
    } else {
      alert(result.error || "Reservation failed");
    }
  });

loadLands();
