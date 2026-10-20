// ===== 订车页 =====

// ---- 第 0 步：没登录不能订车，先送去登录页，登录完再回来 ----
const currentUser = getCurrentUser();
if (!currentUser) {
  window.location.href = "login.html?next=" + encodeURIComponent("booking.html" + window.location.search);
}
const carSelect = document.getElementById("car");
const startInput = document.getElementById("start-date");
const endInput = document.getElementById("end-date");
const totalText = document.getElementById("total");

// ---- 第 1 步：把 7 辆车填进下拉框 ----
let options = '<option value="">-- Choose a car --</option>';
for (let i = 0; i < cars.length; i++) {
  options += `<option value="${cars[i].id}">${cars[i].name} (S$${cars[i].daily}/day)</option>`;
}
carSelect.innerHTML = options;

// 姓名和邮箱用账号里的，省得客人再填一遍
if (currentUser) {
  document.getElementById("full-name").value = currentUser.name;
  document.getElementById("email").value = currentUser.email;
}

// ---- 第 2 步：如果是从车辆页点「Book This Car」过来的，自动选中那辆车 ----
// 地址长这样：booking.html?car=3
const params = new URLSearchParams(window.location.search);
const carFromUrl = params.get("car");
if (carFromUrl) {
  carSelect.value = carFromUrl;
}

// ---- 第 3 步：算总价 ----
// 规则：先按整月算，剩下的按整周算，再剩下的按天算
function calculateTotal() {
  const car = cars.find(c => c.id == carSelect.value);
  const start = new Date(startInput.value);
  const end = new Date(endInput.value);

  // 车没选、日期没填全、或者还车日期不晚于取车日期：不算
  if (!car || !startInput.value || !endInput.value || end <= start) {
    totalText.textContent = "S$0";
    return 0;
  }

  const days = (end - start) / (1000 * 60 * 60 * 24);   // 两个日期相差的毫秒数换成天数

  const months = Math.floor(days / 30);
  const weeks = Math.floor((days % 30) / 7);
  const restDays = days % 30 % 7;

  const total = months * monthlyPrice(car) + weeks * weeklyPrice(car) + restDays * car.daily;

  totalText.textContent = `S$${total} (${days} days)`;
  return total;
}

// 车、取车日期、还车日期任何一个变了，就重新算一次
carSelect.addEventListener("change", calculateTotal);
startInput.addEventListener("change", calculateTotal);
endInput.addEventListener("change", calculateTotal);

// ---- 第 4 步：点「Confirm Booking」 ----
const form = document.getElementById("booking-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();   // 阻止表单默认的「刷新页面」，改由我们自己处理

  const cardNumber = document.getElementById("card-number").value.replaceAll(" ", "");
  const cvv = document.getElementById("card-cvv").value;
  const expiry = document.getElementById("card-expiry").value;

  // 检查：不通过就弹提示，然后 return 停在这里，不往下存
  if (new Date(endInput.value) <= new Date(startInput.value)) {
    alert("Return date must be after pick-up date.");
    return;
  }
  if (!/^\d{16}$/.test(cardNumber)) {
    alert("Card number must be 16 digits.");
    return;
  }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) {
    alert("Expiry must look like 08/28.");
    return;
  }
  if (!/^\d{3}$/.test(cvv)) {
    alert("CVV must be 3 digits.");
    return;
  }

  const car = cars.find(c => c.id == carSelect.value);

  // 一张订单 = 一个对象
  const booking = {
    id: Date.now(),                                   // 用当前时间当订单号，不会重复
    userEmail: currentUser.email,                     // 记下是谁订的
    carId: car.id,
    carName: car.name,
    pickupStore: document.getElementById("pickup-store").value,
    returnPoint: document.getElementById("return-point").value,
    startDate: startInput.value,
    endDate: endInput.value,
    fullName: document.getElementById("full-name").value,
    email: document.getElementById("email").value,
    licenceCountry: document.getElementById("licence-country").value,
    cardLast4: cardNumber.slice(-4),                  // 只存卡号后四位
    rentalCost: calculateTotal(),
    damageCost: 0,
    status: "Booked"                                  // Booked → Picked Up → Returned → Inspected → Paid
  };

  const bookings = loadBookings();
  bookings.push(booking);
  saveBookings(bookings);

  window.location.href = "orders.html";               // 跳到「我的订单」
});
