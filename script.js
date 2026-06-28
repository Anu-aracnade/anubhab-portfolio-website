const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav_setting");
const navLinks = document.querySelectorAll(".nav-link");
const body = document.body;

// Toggles the visibility of the menu and the background scroll lock
function toggleMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.classList.toggle("no-scroll"); 
}

// Resets everything back to default when a link is clicked
function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  body.classList.remove("no-scroll");
}

// Event Listeners
hamburger.addEventListener("click", toggleMenu);

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});
