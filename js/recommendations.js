document.addEventListener("DOMContentLoaded", () => {
  // Handle sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.querySelector(".sidebar");
  const dashboardMain = document.querySelector(".dashboard-main");

  if (sidebarToggle && sidebar && dashboardMain) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("expanded");
      dashboardMain.classList.toggle("expanded");
    });
  }

  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    // Redirect to login if not logged in
    window.location.href = "login.html";
    return;
  }

  // Get user data
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Update user name in dropdown
  const userNameElement = document.getElementById("userName");
  if (userNameElement && user) {
    userNameElement.textContent = user.fullName || "John Doe";
  }

  // Toggle profile dropdown
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

  // Handle logout
  const logoutBtn = document.getElementById("logoutBtn");
  const sidebarLogoutBtn = document.getElementById("sidebarLogoutBtn");

  function handleLogout() {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
    return;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener("click", handleLogout);
  }

  // Generate personalized recommendations
  generateRecommendations();

  // Make recommendation items interactive
  const recommendationItems = document.querySelectorAll(".recommendation-item");
  recommendationItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Add visual feedback
      this.style.backgroundColor = "rgba(46, 139, 87, 0.1)";

      // Reset after a short delay
      setTimeout(() => {
        this.style.backgroundColor = "";
      }, 300);

      // Show notification for the clicked recommendation
      const recommendationTitle = this.querySelector("h4").textContent;
      showNotification(`Added to favorites: ${recommendationTitle}`);
    });
  });

  // Download report functionality
  const downloadReportBtn = document.getElementById("downloadReportBtn");
  if (downloadReportBtn) {
    downloadReportBtn.addEventListener("click", () => {
      document.getElementById("reportModal").style.display = "block";
    });
  }

  // Generate report
  const generateReportBtn = document.getElementById("generateReportBtn");
  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", () => {
      // Get report type and format
      const reportType = document.getElementById("reportType").value;
      const reportFormat = document.getElementById("reportFormat").value;

      // Close modal
      document.getElementById("reportModal").style.display = "none";

      // Show notification
      showNotification(
        `${
          reportType.charAt(0).toUpperCase() + reportType.slice(1)
        } report downloaded in ${reportFormat.toUpperCase()} format`
      );
    });
  }

  // Share recommendations
  const shareRecommendationsBtn = document.getElementById(
    "shareRecommendationsBtn"
  );
  if (shareRecommendationsBtn) {
    shareRecommendationsBtn.addEventListener("click", () => {
      document.getElementById("shareModal").style.display = "block";
    });
  }

  // Copy link functionality
  const copyLinkBtn = document.getElementById("copyLinkBtn");
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      const linkInput = copyLinkBtn.previousElementSibling;
      linkInput.select();
      document.execCommand("copy");

      // Show notification
      showNotification("Link copied to clipboard!");
    });
  }

  // Modal close buttons
  const closeBtns = document.querySelectorAll(".close");
  const modalCancelBtns = document.querySelectorAll(".modal-cancel");

  // Close modals
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  modalCancelBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
});

// Function to generate personalized recommendations
function generateRecommendations() {
  // Get trips data
  const trips = JSON.parse(sessionStorage.getItem("trips")) || [];

  // Get vehicles data
  const vehicles = JSON.parse(sessionStorage.getItem("vehicles")) || [];

  // Example recommendations based on user data
  const recommendations = [
    "Consider carpooling for your daily commute to reduce emissions by up to 50%.",
    "Maintain proper tire pressure to improve fuel efficiency by 3%.",
    "Avoid rapid acceleration and braking to save fuel and reduce emissions.",
    "Consider switching to an electric vehicle for your next purchase.",
    "Use public transportation for trips to the city center.",
    "Plan your routes to avoid traffic congestion and reduce idle time.",
    "Consider biking or walking for short trips under 2 miles.",
  ];

  // Update recommendation items if needed
  // This is a placeholder for dynamic recommendation generation
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");

  if (notification && notificationMessage) {
    notificationMessage.textContent = message;
    notification.classList.add("active");

    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("active");
    }, 3000);
  }
}
