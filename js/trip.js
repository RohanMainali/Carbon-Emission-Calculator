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

  // Handle form inputs to update emission calculation in real-time
  const vehicleSelect = document.getElementById("vehicle");
  const distanceInput = document.getElementById("distance");
  const tripTypeSelect = document.getElementById("tripType");
  const trafficConditionsSelect = document.getElementById("trafficConditions");

  // Add event listeners to form inputs
  if (
    vehicleSelect &&
    distanceInput &&
    tripTypeSelect &&
    trafficConditionsSelect
  ) {
    vehicleSelect.addEventListener("change", updateEmissionCalculation);
    distanceInput.addEventListener("input", updateEmissionCalculation);
    tripTypeSelect.addEventListener("change", updateEmissionCalculation);
    trafficConditionsSelect.addEventListener(
      "change",
      updateEmissionCalculation
    );
  }

  // Handle save trip button
  const saveTripBtn = document.getElementById("saveTrip");
  if (saveTripBtn) {
    saveTripBtn.addEventListener("click", () => {
      // Get form data
      const vehicle = vehicleSelect.value;
      const distance = distanceInput.value;
      const tripType = tripTypeSelect.value;
      const trafficConditions = trafficConditionsSelect.value;

      // Validate form data
      if (!vehicle || !distance || !tripType || !trafficConditions) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      // Create trip object
      const trip = {
        vehicle,
        distance,
        tripType,
        trafficConditions,
        date: new Date().toISOString(),
        emission: calculateEmission(vehicle, distance, trafficConditions),
      };

      // Get existing trips or create empty array
      const trips = JSON.parse(sessionStorage.getItem("trips")) || [];

      // Add new trip
      trips.push(trip);

      // Save to session storage
      sessionStorage.setItem("trips", JSON.stringify(trips));

      // Show success message
      showNotification(
        `Trip logged successfully! Your carbon emission for this trip is ${trip.emission.toFixed(
          2
        )} kg CO2.`
      );

      // Redirect to dashboard after a delay
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 2000);
    });
  }

  // Handle back to dashboard button
  const backToDashboardBtn = document.getElementById("backToDashboard");
  if (backToDashboardBtn) {
    backToDashboardBtn.addEventListener("click", () => {
      window.location.href = "dashboard.html";
    });
  }

  // Initial emission calculation
  updateEmissionCalculation();
});

// Update emission calculation based on form inputs
function updateEmissionCalculation() {
  const vehicle = document.getElementById("vehicle").value;
  const distance = document.getElementById("distance").value;
  const trafficConditions = document.getElementById("trafficConditions").value;

  // Calculate emission
  const emission = calculateEmission(vehicle, distance, trafficConditions);

  // Update emission value display
  const emissionValueElement = document.querySelector(".emission-value");
  if (emissionValueElement) {
    emissionValueElement.innerHTML =
      emission.toFixed(2) + " <span>kg CO2</span>";
  }

  // Update progress bars based on emission value
  updateComparisonBars(emission);
}

// Update comparison progress bars
function updateComparisonBars(emission) {
  const averageEmission = 15.0; // Average emission in kg CO2
  const ecoTarget = 5.0; // Eco-friendly target in kg CO2

  // Calculate percentages
  const emissionPercent = (emission / averageEmission) * 100;
  const ecoPercent = (ecoTarget / averageEmission) * 100;

  // Update progress bars
  const progressBars = document.querySelectorAll(".progress");
  if (progressBars.length >= 3) {
    progressBars[0].style.width = `${emissionPercent}%`;
    progressBars[2].style.width = `${ecoPercent}%`;
  }

  // Update comparison values
  const comparisonValues = document.querySelectorAll(".comparison-value");
  if (comparisonValues.length >= 3) {
    comparisonValues[0].textContent = `${emission.toFixed(2)} kg`;
  }
}

// Calculate carbon emission based on vehicle, distance, and traffic conditions
function calculateEmission(vehicle, distance, trafficConditions) {
  // Base emission factors (kg CO2 per km)
  const emissionFactors = {
    tesla: 0.05, // Tesla Model 3 (Electric)
    toyota: 0.12, // Toyota Prius (Hybrid)
    honda: 0.15, // Honda Civic (Gasoline)
    default: 0.15, // Default if not found
  };

  // Traffic condition multipliers
  const trafficMultipliers = {
    light: 1,
    moderate: 1.2,
    heavy: 1.5,
    congested: 1.8,
    default: 1, // Default if not found
  };

  // Get base emission factor for the vehicle
  const baseFactor = emissionFactors[vehicle] || emissionFactors.default;

  // Get traffic multiplier
  const trafficMultiplier =
    trafficMultipliers[trafficConditions] || trafficMultipliers.default;

  // Calculate emission
  return baseFactor * distance * trafficMultiplier;
}

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
