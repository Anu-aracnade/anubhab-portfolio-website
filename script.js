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

/* --------Gmail-Button-Copy-Effect--------- */
document.getElementById('GMAIL_BUTTON_ID').addEventListener('click', function(e) {
  // 1. Stop the browser from instantly opening the mail client
  e.preventDefault(); 
  
  const email = "anubhab01.aracnade@gmail.com";
  const copyIcon = document.getElementById('copyIcon');
  const checkIcon = document.getElementById('checkIcon');

  // 2. Copy the email address to the user's clipboard
  navigator.clipboard.writeText(email).then(() => {
    
    // 3. Swap the copy icon with the tick icon
    if (copyIcon && checkIcon) {
      copyIcon.style.setProperty('display', 'none', 'important');
      checkIcon.style.setProperty('display', 'inline-block', 'important');
    }

    // 4. Wait 800 milliseconds so the user sees the tick, then redirect
    setTimeout(() => {
      window.location.href = "mailto:" + email;
      
      // 5. Reset icons back to normal in case the user returns to webpage
      if (copyIcon && checkIcon) {
        copyIcon.style.removeProperty('display');
        checkIcon.style.setProperty('display', 'none', 'important');
      }
    }, 800);
  }).catch(err => {
    // Fallback if the user's browser blocks clipboard access
    console.error('Failed to copy text: ', err);
    window.location.href = "mailto:" + email;
  });
});

// ---------------Custom-Cursor-Effect----------------
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  // Use transform for much smoother performance than top/left
  cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
});

// ================================================================================
// -------------Contact-Form-Web3form-Client-Side-Submit-Confirmation-------------
// ================================================================================
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');
const submitBtn = document.getElementById('submit-btn');

// 1. TARGET THE INTERNAL PARAGRAPH ELEMENT TO PRESERVE BUTTON DIMENSIONS
const buttonTextEl = submitBtn.querySelector('.button_text');
const originalButtonText = buttonTextEl.innerText; // Stores "Submit"

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevents the traditional page reload behavior!
  
  // 2. Enter the loading state without breaking layout tags
  submitBtn.disabled = true;
  buttonTextEl.innerText = "Sending..."; 
  result.style.display = "none"; 
  
  // 3. Package the HTML form elements directly into an optimized JSON payload
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  // 4. Dispatch the transmission payload to the Web3Forms secure gateway
  fetch('https://web3forms.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                result.style.display = "block";
                result.style.color = "#10B981"; 
                result.innerHTML = "Thank you! Your message has been sent successfully.";
                form.reset(); 
            } else {
                result.style.display = "block";
                result.style.color = "#EF4444";
                result.innerHTML = res.message || "Something went wrong. Please try again.";
            }
        })
        .catch(error => {
            result.style.display = "block";
            result.style.color = "#EF4444";
            result.innerHTML = "Network error. Please check your connection and try again.";
        })
        .then(function() {
            // 5. RESTORE ORIGINAL BUTTON TEXT PERFECTLY
            submitBtn.disabled = false;
            buttonTextEl.innerText = originalButtonText; 
        });
});

