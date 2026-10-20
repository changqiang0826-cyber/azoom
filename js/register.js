// ===== 注册 =====
document.getElementById("register-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value.toLowerCase();
  const password = document.getElementById("reg-password").value;
  const errorText = document.getElementById("reg-error");

  const users = loadUsers();

  // 同一个邮箱不能注册两次
  if (users.find(u => u.email === email) || email === STAFF.email) {
    errorText.textContent = "This email is already registered.";
    return;
  }

  const newUser = { name: name, email: email, password: password, role: "customer" };
  users.push(newUser);
  saveUsers(users);

  setCurrentUser(newUser);            // 注册完直接算登录
  window.location.href = "cars.html";
});
