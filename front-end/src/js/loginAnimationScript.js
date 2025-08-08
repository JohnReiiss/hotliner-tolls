const container = document.querySelector(".container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("container-active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("container-active");
});

console.log("Script carregado!");
registerBtn.addEventListener("click", () => console.log("Register clicked"));
loginBtn.addEventListener("click", () => console.log("Login clicked"));
