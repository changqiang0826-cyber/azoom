const cars = [
  { id: 1, name: "BYD Dolphin", tier: "Economy", type: "Hatchback", seats: 5, range: 427, daily: 120, image: "images/dolphin.jpg" },
  { id: 2, name: "BYD Atto 3", tier: "Economy", type: "SUV", seats: 5, range: 480, daily: 140, image: "images/atto3.jpg" },
  { id: 3, name: "Tesla Model 3", tier: "Comfort", type: "Sedan", seats: 5, range: 513, daily: 180, image: "images/model3.jpg" },
  { id: 4, name: "Tesla Model Y", tier: "Comfort", type: "SUV", seats: 5, range: 533, daily: 200, image: "images/modely.jpg" },
  { id: 5, name: "BMW i5", tier: "Luxury", type: "Sedan", seats: 5, range: 582, daily: 320, image: "images/i5.jpg" },
  { id: 6, name: "BMW iX", tier: "Luxury", type: "SUV", seats: 5, range: 630, daily: 380, image: "images/ix.jpg" },
  { id: 7, name: "Kia EV9", tier: "Premium", type: "7-Seater", seats: 7, range: 505, daily: 300, image: "images/ev9.jpg" }
];

const STAFF = { name: "AZoom Staff", email: "staff@azoom.sg", password: "staff123", role: "staff" };

function weeklyPrice(car) {
  return car.daily * 6;
}

function monthlyPrice(car) {
  return car.daily * 20;
}

function carCardHTML(car) {
  return `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}">
      <div class="car-info">
        <span class="tier">${car.tier} · ${car.type}</span>
        <h3>${car.name}</h3>
        <p>${car.seats} seats · ${car.range} km range</p>
        <p class="price">S$${car.daily} / day</p>
        <p class="sub-price">S$${weeklyPrice(car)} / week · S$${monthlyPrice(car)} / month</p>
        <a class="btn" href="booking.html" onclick="selectCar(${car.id})">Book This Car</a>
      </div>
    </div>
  `;
}

function selectCar(carId) {
  localStorage.setItem("azoomSelectedCar", carId);
}

function loadData(key) {
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCurrentUser() {
  const saved = localStorage.getItem("azoomCurrentUser");
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
}

function setCurrentUser(user) {
  localStorage.setItem("azoomCurrentUser", JSON.stringify(user));
}

function logout(homePage) {
  localStorage.setItem("azoomCurrentUser", "");
  window.location.href = homePage;
}
