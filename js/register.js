document.getElementById("register-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.toLowerCase();
  const password = document.getElementById("reg-password").value;
  const errorText = document.getElementById("reg-error");
  const users = loadData("azoomUsers");

  if (password.length < 6) {
    errorText.textContent = "Password must be at least 6 characters.";
    return;
  }
  if (users.find(u => u.email === email) || email === STAFF.email) {
    errorText.textContent = "This email is already registered.";
    return;
  }

  const newUser = { name: name, email: email, password: password, role: "customer" };
  users.push(newUser);
  saveData("azoomUsers", users);
  setCurrentUser(newUser);

  if (localStorage.getItem("azoomSelectedCar")) {
    window.location.href = "booking.html";
  } else {
    window.location.href = "cars.html";
  }
});
