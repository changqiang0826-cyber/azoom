const staffUser = getCurrentUser();

const damageTypes = [
  { label: "No damage", cost: 0 },
  { label: "Minor scratch", cost: 150 },
  { label: "Dent or broken light", cost: 400 },
  { label: "Major damage", cost: 1200 }
];
const adminArea = document.getElementById("admin-area");

function renderAdmin() {
  const bookings = loadData("azoomBookings");
  const waiting = bookings.filter(b => b.status === "Returned");

  let damageOptions = "";
  for (let i = 0; i < damageTypes.length; i++) {
    damageOptions += `<option value="${i}">${damageTypes[i].label} (S$${damageTypes[i].cost})</option>`;
  }

  let cards = "";
  for (let i = 0; i < waiting.length; i++) {
    const b = waiting[i];
    cards += `
      <div class="order form">
        <div class="order-head">
          <h3>${b.carName}</h3>
          <span class="status">${b.returnPoint}</span>
        </div>
        <p>Customer: ${b.fullName} (${b.email}) · ${b.startDate} → ${b.endDate}</p>
        <label for="damage-${b.id}">Damage found</label>
        <select id="damage-${b.id}">${damageOptions}</select>
        <label for="note-${b.id}">Notes (optional)</label>
        <input type="text" id="note-${b.id}" placeholder="e.g. Rear bumper, left side">
        <button class="btn" onclick="submitInspection(${b.id})">Complete Inspection</button>
      </div>
    `;
  }
  if (cards === "") {
    cards = `<p class="hint">No cars are waiting for inspection.</p>`;
  }
  document.getElementById("inspect-list").innerHTML = cards;

  let rows = "";
  for (let i = bookings.length - 1; i >= 0; i--) {
    const b = bookings[i];
    rows += `
      <tr>
        <td>${b.fullName}</td>
        <td>${b.carName}</td>
        <td>${b.startDate} → ${b.endDate}</td>
        <td>${b.returnPoint}</td>
        <td>${b.rentalCost + b.damageCost}</td>
        <td>${b.status}</td>
      </tr>
    `;
  }
  document.getElementById("all-bookings").innerHTML = rows;
}

function submitInspection(bookingId) {
  const damage = damageTypes[document.getElementById(`damage-${bookingId}`).value];
  const note = document.getElementById(`note-${bookingId}`).value.trim();

  const bookings = loadData("azoomBookings");
  const b = bookings.find(x => x.id === bookingId);
  b.damageNote = damage.label;
  if (note !== "") {
    b.damageNote += `, ${note}`;
  }
  b.damageCost = damage.cost;
  b.status = "Inspected";
  saveData("azoomBookings", bookings);
  renderAdmin();
}

if (!staffUser || staffUser.role !== "staff") {
  adminArea.innerHTML = `<section class="section narrow"><p class="hint">This page is for AZoom staff only. Please <a href="../login.html">log in</a> with a staff account.</p></section>`;
} else {
  renderAdmin();
}
