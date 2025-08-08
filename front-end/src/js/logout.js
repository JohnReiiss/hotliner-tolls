document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.getElementById("logout-link");

  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
