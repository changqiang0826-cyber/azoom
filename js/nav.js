function updateNav() {
  const authArea = document.getElementById("auth-area");
  const user = getCurrentUser();

  if (user) {
    authArea.innerHTML = `<span class="hello">Hi, ${safe(user.name)}</span> <a href="index.html" onclick="logout()">Logout</a>`;
  }
}

updateNav();
