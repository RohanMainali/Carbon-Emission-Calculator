document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    // Redirect to login if not logged in
    window.location.href = "login.html";
    return;
  }

  // Get user data
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Update profile information
  if (user) {
    // Update profile name
    const profileNameElements = document.querySelectorAll(".profile-name");
    profileNameElements.forEach((element) => {
      if (element) {
        element.textContent = user.fullName || "John Doe";
      }
    });

    // Update user details
    const userNameElements = document.querySelectorAll("#userName");
    userNameElements.forEach((element) => {
      if (element) {
        element.textContent = user.fullName || "John Doe";
      }
    });

    // Update profile details
    const profileDetails = document.querySelectorAll(".profile-detail");
    if (profileDetails.length > 0) {
      // Find the name span and update it
      const nameSpan = profileDetails[0].querySelector("span");
      if (nameSpan) {
        nameSpan.textContent = user.fullName || "John Doe";
      }

      // Find the email span and update it
      const emailSpan = profileDetails[1].querySelector("span");
      if (emailSpan) {
        emailSpan.textContent = user.email || "rohanmainali@gmail.com";
      }
    }
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

  // Modal Functionality
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editProfileModal = document.getElementById("editProfileModal");
  const editProfileForm = document.getElementById("editProfileForm");

  const addVehicleBtn = document.getElementById("addVehicleBtn");
  const addVehicleModal = document.getElementById("addVehicleModal");
  const addVehicleForm = document.getElementById("addVehicleForm");

  const earnBadgeBtn = document.getElementById("earnBadgeBtn");
  const badgeInfoModal = document.getElementById("badgeInfoModal");

  const downloadReportBtn = document.getElementById("downloadReportBtn");
  const reportModal = document.getElementById("reportModal");

  const closeBtns = document.querySelectorAll(".close");
  const modalCancelBtns = document.querySelectorAll(".modal-cancel");

  // Open modals
  if (editProfileBtn && editProfileModal) {
    editProfileBtn.addEventListener("click", () => {
      editProfileModal.style.display = "block";
    });
  }

  if (addVehicleBtn && addVehicleModal) {
    addVehicleBtn.addEventListener("click", () => {
      addVehicleModal.style.display = "block";
    });
  }

  if (earnBadgeBtn && badgeInfoModal) {
    earnBadgeBtn.addEventListener("click", () => {
      badgeInfoModal.style.display = "block";
    });
  }

  if (downloadReportBtn && reportModal) {
    downloadReportBtn.addEventListener("click", () => {
      reportModal.style.display = "block";
    });
  }

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

  // Handle form submissions
  if (editProfileForm) {
    editProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("editName").value;
      const email = document.getElementById("editEmail").value;
      const location = document.getElementById("editLocation").value;

      // Update user data in session storage
      const updatedUser = {
        ...user,
        fullName: name,
        email: email,
        location: location,
      };

      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // Close modal
      editProfileModal.style.display = "none";

      // Show notification
      showNotification("Profile updated successfully!");

      // Reload page to reflect changes
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }

  if (addVehicleForm) {
    addVehicleForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const make = document.getElementById("vehicleMake").value;
      const model = document.getElementById("vehicleModel").value;
      const year = document.getElementById("vehicleYear").value;
      const type = document.getElementById("vehicleType").value;

      // Create vehicle object
      const vehicle = {
        make,
        model,
        year,
        type,
        id: Date.now(), // Use timestamp as ID
      };

      // Get existing vehicles or create empty array
      const vehicles = JSON.parse(sessionStorage.getItem("vehicles")) || [];

      // Add new vehicle
      vehicles.push(vehicle);

      // Save to session storage
      sessionStorage.setItem("vehicles", JSON.stringify(vehicles));

      // Close modal
      addVehicleModal.style.display = "none";

      // Show notification
      showNotification("Vehicle added successfully!");

      // Reload page to reflect changes
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }

  // Generate report functionality
  const generateReportBtn = document.getElementById("generateReportBtn");
  if (generateReportBtn) {
    generateReportBtn.addEventListener("click", () => {
      // Close modal
      reportModal.style.display = "none";

      // Show notification
      showNotification("Report generated and downloaded successfully!");
    });
  }
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
