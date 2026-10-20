// ===== 车辆页：把 cars 数组变成一张张卡片 =====
const carGrid = document.getElementById("car-grid");

let html = "";

for (let i = 0; i < cars.length; i++) {
  const car = cars[i];
  html += `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}">
      <div class="car-info">
        <span class="tier">${car.tier} · ${car.type}</span>
        <h3>${car.name}</h3>
        <p>${car.seats} seats · ${car.range} km range</p>
        <p class="price">S$${car.daily} <small>/ day</small></p>
        <p class="sub-price">S$${weeklyPrice(car)} / week · S$${monthlyPrice(car)} / month</p>
        <a class="btn" href="booking.html?car=${car.id}">Book This Car</a>
      </div>
    </div>
  `;
}

carGrid.innerHTML = html;
