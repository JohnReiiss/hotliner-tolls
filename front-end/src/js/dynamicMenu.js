document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menuDropdown = document.getElementById("menu-dropdown");
  const listIcon = document.querySelector(".bi-list");
  const xIcon = document.querySelector(".bi-x-lg");

  xIcon.style.display = "none";

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    this.classList.toggle("active");
    menuDropdown.classList.toggle("active");

    if (this.classList.contains("active")) {
      listIcon.style.display = "none";
      xIcon.style.display = "block";
    } else {
      listIcon.style.display = "block";
      xIcon.style.display = "none";
    }
  });

  document.addEventListener("click", function (e) {
    if (!menuDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove("active");
      menuDropdown.classList.remove("active");
      listIcon.style.display = "block";
      xIcon.style.display = "none";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuDropdown.classList.contains("active")) {
      menuToggle.classList.remove("active");
      menuDropdown.classList.remove("active");
      listIcon.style.display = "block";
      xIcon.style.display = "none";
    }
  });
});

// MENU COLLAPSE NO DROPDOWN
const perfilLink = document.getElementById("user-perfil");
const perfilCollapse = document.getElementById("perfil-collapse");
const collapseIcon = document.getElementById("collapse-icon");

let isExpanded = false;

perfilLink.addEventListener("click", (e) => {
  e.preventDefault();
  isExpanded = !isExpanded;

  if (isExpanded) {
    perfilCollapse.classList.add("active");
    perfilCollapse.style.maxHeight = perfilCollapse.scrollHeight + "px";
    collapseIcon.classList.remove("bi-caret-down-fill");
    collapseIcon.classList.add("bi-caret-up-fill");
  } else {
    perfilCollapse.classList.remove("active");
    perfilCollapse.style.maxHeight = "0px";
    collapseIcon.classList.remove("bi-caret-up-fill");
    collapseIcon.classList.add("bi-caret-down-fill");

    const paragraphs = perfilCollapse.querySelectorAll("p");
    paragraphs.forEach((p) => {
      p.style.animation = "none";
      p.offsetHeight;
      p.style.animation = null;
    });
  }
});
