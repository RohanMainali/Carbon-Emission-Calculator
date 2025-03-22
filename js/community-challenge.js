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

  // Create Challenge Modal
  const createChallengeBtn = document.getElementById("createChallengeBtn");
  const createChallengeModal = document.getElementById("createChallengeModal");
  const createChallengeForm = document.getElementById("createChallengeForm");

  if (createChallengeBtn && createChallengeModal) {
    createChallengeBtn.addEventListener("click", () => {
      createChallengeModal.style.display = "block";
    });
  }

  if (createChallengeForm) {
    createChallengeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const title = document.getElementById("challengeTitle").value;
      const description = document.getElementById("challengeDescription").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const category = document.getElementById("challengeCategory").value;
      const rewards = document.getElementById("challengeRewards").value;

      // Validate form data
      if (
        !title ||
        !description ||
        !startDate ||
        !endDate ||
        !category ||
        !rewards
      ) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Create challenge object
      const challenge = {
        title,
        description,
        startDate,
        endDate,
        category,
        rewards,
        participants: 1,
        createdBy: user ? user.fullName : "John Doe",
        createdAt: new Date().toISOString(),
      };

      // Get existing challenges or create empty array
      const challenges = JSON.parse(sessionStorage.getItem("challenges")) || [];

      // Add new challenge
      challenges.push(challenge);

      // Save to session storage
      sessionStorage.setItem("challenges", JSON.stringify(challenges));

      // Close modal
      createChallengeModal.style.display = "none";

      // Reset form
      createChallengeForm.reset();

      // Show success notification
      showNotification(
        "Challenge created successfully! It will be reviewed by our team."
      );

      // Reload page after a delay to show the new challenge
      setTimeout(() => {
        location.reload();
      }, 2000);
    });
  }

  // Leaderboard Modal
  const viewLeaderboardBtn = document.querySelector(".view-leaderboard-btn");
  const leaderboardModal = document.getElementById("leaderboardModal");

  if (viewLeaderboardBtn && leaderboardModal) {
    viewLeaderboardBtn.addEventListener("click", () => {
      leaderboardModal.style.display = "block";
    });
  }

  // Log Progress Button
  const logProgressBtn = document.querySelector(".log-progress-btn");
  if (logProgressBtn) {
    logProgressBtn.addEventListener("click", () => {
      // Show notification
      showNotification(
        "Progress logged successfully! You've completed another day of the challenge."
      );

      // Update progress (in a real app, this would update the database)
      setTimeout(() => {
        const progressElement = document.querySelector(
          ".progress-label span:last-child"
        );
        if (progressElement) {
          const currentProgress = progressElement.textContent.split("/");
          if (currentProgress.length === 2) {
            const current = Number.parseInt(currentProgress[0]);
            const total = Number.parseInt(currentProgress[1]);
            if (current < total) {
              progressElement.textContent = `${current + 1}/${total} days`;

              // Update progress bar
              const progressBar = document.querySelector(
                ".challenge-progress .progress"
              );
              if (progressBar) {
                const newWidth = ((current + 1) / total) * 100;
                progressBar.style.width = `${newWidth}%`;
              }
            }
          }
        }
      }, 1000);
    });
  }

  // Join Challenge Button
  const joinChallengeBtn = document.querySelector(".join-challenge-btn");
  if (joinChallengeBtn) {
    joinChallengeBtn.addEventListener("click", () => {
      showNotification(
        "You've successfully joined the challenge! Get ready to start in 5 days."
      );
    });
  }

  // Remind Me Button
  const remindMeBtn = document.querySelector(".remind-me-btn");
  if (remindMeBtn) {
    remindMeBtn.addEventListener("click", () => {
      showNotification("We'll remind you when the challenge starts!");
    });
  }

  // View Certificate Button
  const viewCertificateBtn = document.querySelector(".view-certificate-btn");
  if (viewCertificateBtn) {
    viewCertificateBtn.addEventListener("click", () => {
      showNotification("Certificate opened in a new tab");
      // In a real app, this would open a new tab with the certificate
    });
  }

  // Share Results Button
  const shareResultsBtn = document.querySelector(".share-results-btn");
  if (shareResultsBtn) {
    shareResultsBtn.addEventListener("click", () => {
      showNotification("Results shared to your social media accounts!");
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
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");

  if (notification && notificationMessage) {
    notificationMessage.textContent = message;

    // Add appropriate class based on notification type
    notification.className = "notification";
    if (type === "error") {
      notification.classList.add("error");
    }

    notification.classList.add("active");

    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("active");
    }, 3000);
  }
}
