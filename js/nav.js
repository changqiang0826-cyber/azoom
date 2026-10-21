const authArea = document.getElementById("auth-area");
const user = getCurrentUser();

if (user) {
  authArea.innerHTML = `<span class="hello">Hi, ${user.name}</span> <a href="#" onclick="logout('index.html')">Logout</a>`;
}
