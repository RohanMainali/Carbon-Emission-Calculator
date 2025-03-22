// Update the dashboard.js file to include the community challenge link in the sidebar
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

  // Update user name in dropdown and welcome message
  const userNameElement = document.getElementById("userName");
  const welcomeUserNameElement = document.getElementById("welcomeUserName");

  if (userNameElement && user) {
    userNameElement.textContent = user.fullName;
  }

  if (welcomeUserNameElement && user) {
    welcomeUserNameElement.textContent =
      user.firstName || user.fullName.split(" ")[0];
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

  // Initialize charts with a slight delay to ensure DOM is fully loaded
  setTimeout(() => {
    initializeEmissionsChart();
    initializeVehicleEmissionsChart();
    initializeEmissionSourcesChart();
  }, 100);

  // Handle time range filter change
  const timeRangeFilter = document.getElementById("timeRangeFilter");
  if (timeRangeFilter) {
    timeRangeFilter.addEventListener("change", () => {
      // Show loading animation
      document.getElementById("emissionsChartLoading").style.display = "flex";

      // Update chart after a delay to simulate loading
      setTimeout(() => {
        updateEmissionsChart(timeRangeFilter.value);
        document.getElementById("emissionsChartLoading").style.display = "none";

        // Show notification
        showNotification(
          `Chart updated to show data for the last ${
            timeRangeFilter.options[timeRangeFilter.selectedIndex].text
          }`
        );
      }, 1000);
    });
  }

  // Handle chart refresh buttons
  const refreshVehicleChart = document.getElementById("refreshVehicleChart");
  const refreshSourcesChart = document.getElementById("refreshSourcesChart");

  if (refreshVehicleChart) {
    refreshVehicleChart.addEventListener("click", () => {
      // Show loading animation
      document.getElementById("vehicleEmissionsChartLoading").style.display =
        "flex";

      // Refresh chart after a delay to simulate loading
      setTimeout(() => {
        initializeVehicleEmissionsChart();
        showNotification("Vehicle emissions chart refreshed");
      }, 1000);
    });
  }

  if (refreshSourcesChart) {
    refreshSourcesChart.addEventListener("click", () => {
      // Show loading animation
      document.getElementById("emissionSourcesChartLoading").style.display =
        "flex";

      // Refresh chart after a delay to simulate loading
      setTimeout(() => {
        initializeEmissionSourcesChart();
        showNotification("Emission sources chart refreshed");
      }, 1000);
    });
  }
});

// Initialize emissions line chart
function initializeEmissionsChart() {
  const emissionsCtx = document.getElementById("emissionsChart");
  const emissionsChartLoading = document.getElementById(
    "emissionsChartLoading"
  );

  if (emissionsCtx && emissionsChartLoading) {
    // Hide loading animation
    emissionsChartLoading.style.display = "none";

    // Create chart using Chart.js
    const emissionsChart = new Chart(emissionsCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Carbon Emissions (kg CO2)",
            data: [12, 19, 8, 15, 25, 12, 18],
            borderColor: "#2e8b57",
            backgroundColor: "rgba(46, 139, 87, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "kg CO2",
            },
          },
          x: {
            title: {
              display: true,
              text: "Day",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#2e8b57",
            borderWidth: 1,
            displayColors: false,
          },
        },
      },
    });
  }
}

// Initialize vehicle emissions bar chart
function initializeVehicleEmissionsChart() {
  const vehicleEmissionsCtx = document.getElementById("vehicleEmissionsChart");
  const vehicleEmissionsChartLoading = document.getElementById(
    "vehicleEmissionsChartLoading"
  );

  if (vehicleEmissionsCtx && vehicleEmissionsChartLoading) {
    // Hide loading animation
    vehicleEmissionsChartLoading.style.display = "none";

    // Create chart using Chart.js
    const vehicleEmissionsChart = new Chart(vehicleEmissionsCtx, {
      type: "bar",
      data: {
        labels: ["Toyota Prius", "Honda Civic", "Ford F-150", "Tesla Model 3"],
        datasets: [
          {
            label: "Carbon Emissions (kg CO2/km)",
            data: [0.12, 0.15, 0.28, 0.05],
            backgroundColor: [
              "rgba(46, 139, 87, 0.7)",
              "rgba(46, 139, 87, 0.5)",
              "rgba(46, 139, 87, 0.3)",
              "rgba(46, 139, 87, 0.9)",
            ],
            borderColor: [
              "rgba(46, 139, 87, 1)",
              "rgba(46, 139, 87, 1)",
              "rgba(46, 139, 87, 1)",
              "rgba(46, 139, 87, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "kg CO2/km",
            },
          },
          x: {
            title: {
              display: true,
              text: "Vehicle",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#2e8b57",
            borderWidth: 1,
            displayColors: false,
          },
        },
      },
    });
  }
}

// Initialize emission sources pie chart
function initializeEmissionSourcesChart() {
  const emissionSourcesCtx = document.getElementById("emissionSourcesChart");
  const emissionSourcesChartLoading = document.getElementById(
    "emissionSourcesChartLoading"
  );

  if (emissionSourcesCtx && emissionSourcesChartLoading) {
    // Hide loading animation
    emissionSourcesChartLoading.style.display = "none";

    // Create chart using Chart.js
    const emissionSourcesChart = new Chart(emissionSourcesCtx, {
      type: "pie",
      data: {
        labels: ["Transportation", "Home Energy", "Food", "Shopping"],
        datasets: [
          {
            data: [45, 25, 20, 10],
            backgroundColor: [
              "rgba(46, 139, 87, 0.8)",
              "rgba(46, 139, 87, 0.6)",
              "rgba(46, 139, 87, 0.4)",
              "rgba(46, 139, 87, 0.2)",
            ],
            borderColor: [
              "rgba(46, 139, 87, 1)",
              "rgba(46, 139, 87, 1)",
              "rgba(46, 139, 87, 1)",
              "rgba(46, 139, 87, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            backgroundColor: "#333",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#2e8b57",
            borderWidth: 1,
            displayColors: false,
          },
        },
      },
    });
  }
}

// Update emissions chart based on time range
function updateEmissionsChart(days) {
  // Generate random data based on selected time range
  const labels = [];
  const data = [];

  // Generate labels based on days
  if (days == 7) {
    labels.push("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
  } else if (days == 30) {
    for (let i = 1; i <= 30; i++) {
      labels.push(`Day ${i}`);
    }
  } else if (days == 90) {
    for (let i = 1; i <= 12; i++) {
      labels.push(`Week ${i}`);
    }
  } else if (days == 365) {
    labels.push(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    );
  }

  // Generate random data
  for (let i = 0; i < labels.length; i++) {
    data.push(Math.floor(Math.random() * 20) + 5);
  }

  // Get the chart instance and update it
  const chartElement = document.getElementById("emissionsChart");
  const chartInstance = Chart.getChart(chartElement);

  if (chartInstance) {
    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = data;
    chartInstance.update();
  } else {
    console.error("Could not find chart instance");
  }
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
