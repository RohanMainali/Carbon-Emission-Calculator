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
    userNameElement.textContent = user.fullName;
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
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.addEventListener("click", handleLogout);
  }

  // Handle form submission
  const vehicleRegistrationForm = document.getElementById(
    "vehicleRegistrationForm"
  );

  if (vehicleRegistrationForm) {
    vehicleRegistrationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const vehicleType = document.getElementById("vehicleType").value;
      const fuelType = document.getElementById("fuelType").value;
      const mileage = document.getElementById("mileage").value;
      const mileageUnit = document.getElementById("mileageUnit").value;
      const drivingGear = document.getElementById("drivingGear").value;
      const vehicleModel = document.getElementById("vehicleModel").value;

      // Create vehicle object
      const vehicle = {
        vehicleType,
        fuelType,
        mileage,
        mileageUnit,
        drivingGear,
        vehicleModel,
        id: Date.now(), // Use timestamp as ID
      };

      // Get existing vehicles or create empty array
      const vehicles = JSON.parse(sessionStorage.getItem("vehicles")) || [];

      // Add new vehicle
      vehicles.push(vehicle);

      // Save to session storage
      sessionStorage.setItem("vehicles", JSON.stringify(vehicles));

      // Show success modal
      document.getElementById("successModal").style.display = "block";
    });
  }

  // Go back button handling
  const goBackBtn = document.getElementById("goBackBtn");

  if (goBackBtn) {
    goBackBtn.addEventListener("click", () => {
      // Show confirmation modal
      document.getElementById("confirmationModal").style.display = "block";
    });
  }

  // Confirm go back
  const confirmGoBackBtn = document.getElementById("confirmGoBackBtn");

  if (confirmGoBackBtn) {
    confirmGoBackBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // View dashboard after success
  const viewDashboardBtn = document.getElementById("viewDashboardBtn");

  if (viewDashboardBtn) {
    viewDashboardBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Register another vehicle
  const registerAnotherBtn = document.getElementById("registerAnotherBtn");

  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener("click", () => {
      // Close modal
      document.getElementById("successModal").style.display = "none";

      // Reset form
      vehicleRegistrationForm.reset();

      // Show notification
      showNotification("Ready to register another vehicle");
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
