const token = localStorage.getItem("token");
const stopsContainer = document.getElementById("stopsContainer");

document.getElementById("addStopBtn").addEventListener("click", () => {
  const div = document.createElement("div");

  div.innerHTML = `
  <input type="text" name="city[]" placeholder="City" required />
`;

  stopsContainer.appendChild(div);
});

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

    stopsContainer.innerHTML = `
      <div>
        <input type="text" name="city[]" placeholder="City" required />
      </div>
    `;
  } else {
    alert(result.error || "Error");
  }
});
