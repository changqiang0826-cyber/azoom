// ===== 全站共用的车辆数据 =====
// 车辆页和订车页都读这一份，改价格只改这里
const cars = [
  { id: 1, name: "BYD Dolphin",   tier: "Economy", type: "Hatchback", seats: 5, range: 427, daily: 120, image: "images/dolphin.jpg" },
  { id: 2, name: "BYD Atto 3",    tier: "Economy", type: "SUV",   seats: 5, range: 480, daily: 140, image: "images/atto3.jpg" },
  { id: 3, name: "Tesla Model 3", tier: "Comfort", type: "Sedan", seats: 5, range: 513, daily: 180, image: "images/model3.jpg" },
  { id: 4, name: "Tesla Model Y", tier: "Comfort", type: "SUV",   seats: 5, range: 533, daily: 200, image: "images/modely.jpg" },
  { id: 5, name: "BMW i5",        tier: "Luxury",  type: "Sedan", seats: 5, range: 582, daily: 320, image: "images/i5.jpg" },
  { id: 6, name: "BMW iX",        tier: "Luxury",  type: "SUV",   seats: 5, range: 630, daily: 380, image: "images/ix.jpg" },
  { id: 7, name: "Kia EV9",       tier: "Premium", type: "7-Seater", seats: 7, range: 505, daily: 300, image: "images/ev9.jpg" }
];

// 周租 = 日租 × 6，月租 = 日租 × 20
function weeklyPrice(car) {
  return car.daily * 6;
}

function monthlyPrice(car) {
  return car.daily * 20;
}

// ===== 订单的存取（localStorage 只能存文字，所以要用 JSON 转换）=====
function loadBookings() {
  const saved = localStorage.getItem("azoomBookings");
  if (saved) {
    return JSON.parse(saved);     // 文字 → 数组
  }
  return [];                      // 还没有订单，就给一个空数组
}

function saveBookings(bookings) {
  localStorage.setItem("azoomBookings", JSON.stringify(bookings));   // 数组 → 文字
}

// ===== 用户账号 =====
// 员工账号写死在这里（演示用）；客人账号注册后存进 localStorage
const STAFF = { name: "AZoom Staff", email: "staff@azoom.sg", password: "staff123", role: "staff" };

function loadUsers() {
  const saved = localStorage.getItem("azoomUsers");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

function saveUsers(users) {
  localStorage.setItem("azoomUsers", JSON.stringify(users));
}

// 当前登录的人：没登录就是 null
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

function logout() {
  localStorage.removeItem("azoomCurrentUser");
  window.location.href = "index.html";
}
