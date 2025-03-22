document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const authButtonContainer = document.getElementById("auth-button-container");

  // Update auth button based on login status
  if (isLoggedIn && authButtonContainer) {
    // Get user data
    const user = JSON.parse(sessionStorage.getItem("user"));

    // Replace Join Us button with user menu if logged in
    authButtonContainer.innerHTML = `
        <div class="user-menu">
          <a href="#" class="notification-icon"><i class="far fa-envelope"></i></a>
          <div class="profile-dropdown">
            <div class="profile-pic" id="profileDropdownBtn">
              <img src="https://i.ibb.co/Lk4Lv9B/solar-panels.jpg" alt="Profile Picture">
            </div>
            <div class="dropdown-menu" id="profileDropdown">
              <p class="dropdown-header">Logged in as <span>${
                user ? user.fullName : "User"
              }</span></p>
              <ul>
                <li><a href="dashboard.html">Dashboard</a></li>
                <li><a href="profile.html">Profile</a></li>
                <li><a href="vehicle-registration.html">Vehicle Registration</a></li>
                <li><a href="log-trip.html">Log a trip</a></li>
                <li><a href="recommendations.html">Recommendations</a></li>
                <li><a href="#" id="logoutBtn">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      `;

    // Add event listener for profile dropdown
    const profileDropdownBtn = document.getElementById("profileDropdownBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    if (profileDropdownBtn && profileDropdown) {
      profileDropdownBtn.addEventListener("click", () => {
        profileDropdown.classList.toggle("active");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !profileDropdownBtn.contains(e.target) &&
          !profileDropdown.contains(e.target)
        ) {
          profileDropdown.classList.remove("active");
        }
      });
    }

    // Add event listener for logout
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.removeItem("isLoggedIn");
        window.location.reload();
      });
    }
  }

  // Handle mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector("nav");

  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Handle contact form submission
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Simulate form submission with a delay
      setTimeout(() => {
        // Show success message
        if (formSuccess) {
          formSuccess.classList.add("active");
        }

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
          if (formSuccess) {
            formSuccess.classList.remove("active");
          }
        }, 5000);
      }, 1000);
    });
  }

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      if (question) {
        question.addEventListener("click", () => {
          // Close all other items
          faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains("active")) {
              otherItem.classList.remove("active");
            }
          });

          // Toggle current item
          item.classList.toggle("active");
        });
      }
    });
  }
});
