// ===== 登录（客人和员工共用） =====
document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.toLowerCase();
  const password = document.getElementById("login-password").value;

  // 先看是不是员工
  if (email === STAFF.email && password === STAFF.password) {
    setCurrentUser(STAFF);
    window.location.href = "admin/index.html";
    return;
  }

  // 再看是不是注册过的客人
  const user = loadUsers().find(u => u.email === email && u.password === password);
  if (user) {
    setCurrentUser(user);
    // 如果是从订车页被叫来登录的，登录后回到订车页
    const next = new URLSearchParams(window.location.search).get("next");
    window.location.href = next ? next : "orders.html";
  } else {
    document.getElementById("login-error").textContent = "Wrong email or password.";
  }
});
