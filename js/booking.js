const currentUser = getCurrentUser();
const bookingBox = document.getElementById("booking-box");
const carSelect = document.getElementById("car");
const startInput = document.getElementById("start-date");
const endInput = document.getElementById("end-date");
const totalText = document.getElementById("total");

if (!currentUser) {
  bookingBox.innerHTML = `<p class="hint">Please <a href="login.html">log in</a> or <a href="register.html">create an account</a> before booking.</p>`;
} else {
  let options = `<option value="">-- Choose a car --</option>`;
  for (let i = 0; i < cars.length; i++) {
    options += `<option value="${cars[i].id}">${cars[i].name} (S$${cars[i].daily}/day)</option>`;
  }
  carSelect.innerHTML = options;

  const selectedCar = localStorage.getItem("azoomSelectedCar");
  if (selectedCar) {
    carSelect.value = selectedCar;
  }

  document.getElementById("full-name").value = currentUser.name;
  document.getElementById("email").value = currentUser.email;

  carSelect.addEventListener("change", calculateTotal);
  startInput.addEventListener("change", calculateTotal);
  endInput.addEventListener("change", calculateTotal);
  document.getElementById("booking-form").addEventListener("submit", submitBooking);
}

function calculateTotal() {
  const car = cars.find(c => c.id == carSelect.value);
  const start = new Date(startInput.value);
  const end = new Date(endInput.value);

  if (!car || !startInput.value || !endInput.value || end <= start) {
    totalText.textContent = "S$0";
    return 0;
  }

  const days = (end - start) / (1000 * 60 * 60 * 24);
  let daysLeft = days;
  let total = 0;

  while (daysLeft >= 30) {
    total += monthlyPrice(car);
    daysLeft -= 30;
  }
  while (daysLeft >= 7) {
    total += weeklyPrice(car);
    daysLeft -= 7;
  }
  total += daysLeft * car.daily;

  totalText.textContent = `S$${total} (${days} days)`;
  return total;
}

function submitBooking(event) {
  event.preventDefault();

  const cardNumber = document.getElementById("card-number").value.replaceAll(" ", "");
  const expiry = document.getElementById("card-expiry").value;
  const cvv = document.getElementById("card-cvv").value;

  if (new Date(endInput.value) <= new Date(startInput.value)) {
    alert("Return date must be after pick-up date.");
    return;
  }
  if (cardNumber.length !== 16) {
    alert("Card number must be 16 digits.");
    return;
  }
  if (expiry.length !== 5 || expiry[2] !== "/") {
    alert("Expiry must look like 08/28.");
    return;
  }
  if (cvv.length !== 3) {
    alert("CVV must be 3 digits.");
    return;
  }

  const car = cars.find(c => c.id == carSelect.value);

  const booking = {
    id: Date.now(),
    userEmail: currentUser.email,
    carName: car.name,
    pickupStore: document.getElementById("pickup-store").value,
    returnPoint: document.getElementById("return-point").value,
    startDate: startInput.value,
    endDate: endInput.value,
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    licenceCountry: document.getElementById("licence-country").value,
    cardLast4: cardNumber.slice(-4),
    rentalCost: calculateTotal(),
    damageCost: 0,
    damageNote: "",
    status: "Booked"
  };

  const bookings = loadData("azoomBookings");
  bookings.push(booking);
  saveData("azoomBookings", bookings);
  localStorage.setItem("azoomSelectedCar", "");

  bookingBox.innerHTML = `
    <div class="order">
      <h3>Booking Confirmed</h3>
      <p>${car.name}, ${booking.startDate} → ${booking.endDate}</p>
      <p>Pick up at <b>${booking.pickupStore}</b>. Total S$${booking.rentalCost}.</p>
      <a class="btn" href="orders.html">View My Orders</a>
    </div>
  `;
}
