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

// ----------------------Smooth-SlideUp-Scroll-Effect-------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Check if the element is visible on the screen
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      //Stop observing as I only want the animation to play ONCE
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.15 // Triggers when 15% of the element is visible
});

// Grab all hidden elements and attach the observer
const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach((el) => observer.observe(el));


