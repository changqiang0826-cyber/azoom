document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.toLowerCase();
  const password = document.getElementById("login-password").value;
  const authBox = document.getElementById("auth-box");

  if (email === STAFF.email && password === STAFF.password) {
    setCurrentUser(STAFF);
    updateNav();
    authBox.innerHTML = `
      <p class="hint">Welcome back, AZoom Staff.</p>
      <a class="btn" href="admin/index.html">Go to Staff Page</a>
    `;
    return;
  }

  const user = loadData("azoomUsers").find(u => u.email === email && u.password === password);
  if (!user) {
    document.getElementById("login-error").textContent = "Wrong email or password.";
    return;
  }

  setCurrentUser(user);
  updateNav();

  let nextLink = `<a class="btn" href="orders.html">Go to My Orders</a>`;
  if (localStorage.getItem("azoomSelectedCar")) {
    nextLink = `<a class="btn" href="booking.html">Continue Booking</a>`;
  }
  authBox.innerHTML = `
    <p class="hint">Welcome back, ${safe(user.name)}.</p>
    ${nextLink}
  `;
});
