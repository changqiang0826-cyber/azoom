document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.toLowerCase();
  const password = document.getElementById("login-password").value;

  if (email === STAFF.email && password === STAFF.password) {
    setCurrentUser(STAFF);
    window.location.href = "admin/index.html";
    return;
  }

  const user = loadData("azoomUsers").find(u => u.email === email && u.password === password);
  if (!user) {
    document.getElementById("login-error").textContent = "Wrong email or password.";
    return;
  }

  setCurrentUser(user);
  if (localStorage.getItem("azoomSelectedCar")) {
    window.location.href = "booking.html";
  } else {
    window.location.href = "orders.html";
  }
});
