// ===== 导航栏最右边：没登录显示 Login，登录了显示名字和 Logout =====
const authLink = document.getElementById("auth-link");
const user = getCurrentUser();

if (user) {
  authLink.outerHTML = `<span class="hello">Hi, ${user.name}</span><a href="#" onclick="logout()">Logout</a>`;
}
