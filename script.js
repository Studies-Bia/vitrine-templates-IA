// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navLinks = document.getElementById("navLinks");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    });
  });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Fade in animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const category = document.getElementById("category").value;
    const message = document.getElementById("message").value;
    
    // Criar mensagem para WhatsApp
    const whatsappMessage = `Olá! Meu nome é ${name}.\n\nEmail: ${email}\nCategoria de Interesse: ${category}\n\nMensagem: ${message}`;
    const whatsappUrl = `https://wa.me/5547999284292?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpar formulário
    contactForm.reset();
  });
}

// Header background on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 25, 47, 1)";
  } else {
    header.style.background = "rgba(10, 25, 47, 0.98)";
  }
});

// Template Filtering System
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const templateCards = document.querySelectorAll(".template-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter templates
      templateCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (category === "todos" || cardCategory === category) {
          card.classList.remove("hidden");
          // Re-trigger fade-in animation
          card.classList.remove("visible");
          setTimeout(() => {
            if (isElementInViewport(card)) {
              card.classList.add("visible");
            }
          }, 100);
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Initialize - show all templates
  templateCards.forEach((card) => {
    card.classList.remove("hidden");
  });
});

// Add select styling for the form
const selectElement = document.getElementById("category");
if (selectElement) {
  selectElement.style.width = "100%";
  selectElement.style.padding = "clamp(0.8rem, 2vw, 1rem)";
  selectElement.style.border = "2px solid #e6f1ff";
  selectElement.style.borderRadius = "8px";
  selectElement.style.background = "#ffffff";
  selectElement.style.color = "#333333";
  selectElement.style.fontSize = "clamp(0.9rem, 2.5vw, 1rem)";
  selectElement.style.fontFamily = "'Roboto', sans-serif";
  selectElement.style.cursor = "pointer";
  selectElement.style.transition = "all 0.3s ease";

  selectElement.addEventListener("focus", function () {
    this.style.borderColor = "#64ffda";
    this.style.boxShadow = "0 0 0 3px rgba(100, 255, 218, 0.1)";
    this.style.outline = "none";
  });

  selectElement.addEventListener("blur", function () {
    this.style.borderColor = "#e6f1ff";
    this.style.boxShadow = "none";
  });
}
