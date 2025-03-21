document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }
    
    // Get user data
    const user = JSON.parse(sessionStorage.getItem('user'));
    
    // Update user name in dropdown
    const userNameElement = document.getElementById('userName');
    if (userNameElement && user) {
        userNameElement.textContent = user.fullName;
    }
    
    // Toggle profile dropdown
    const profileDropdownBtn = document.getElementById('profileDropdownBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', function() {
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdownBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }
    
    // Handle form inputs to update emission calculation in real-time
    const vehicleSelect = document.getElementById('vehicle');
    const distanceInput = document.getElementById('distance');
    const tripTypeSelect = document.getElementById('tripType');
    const trafficConditionsSelect = document.getElementById('trafficConditions');
    
    // Add event listeners to form inputs
    if (vehicleSelect && distanceInput && tripTypeSelect && trafficConditionsSelect) {
        vehicleSelect.addEventListener('change', updateEmissionCalculation);
        distanceInput.addEventListener('input', updateEmissionCalculation);
        tripTypeSelect.addEventListener('change', updateEmissionCalculation);
        trafficConditionsSelect.addEventListener('change', updateEmissionCalculation);
    }
    
    // Handle save trip button
    const saveTripBtn = document.getElementById('saveTrip');
    if (saveTripBtn) {
        saveTripBtn.addEventListener('click', function() {
            // Get form data
            const vehicle = vehicleSelect.value;
            const distance = distanceInput.value;
            const tripType = tripTypeSelect.value;
            const trafficConditions = trafficConditionsSelect.value;
            
            // Create trip object
            const trip = {
                vehicle,
                distance,
                tripType,
                trafficConditions,
                date: new Date().toISOString(),
                emission: calculateEmission(vehicle, distance, trafficConditions)
            };
            
            // Get existing trips or create empty array
            let trips = JSON.parse(sessionStorage.getItem('trips')) || [];
            
            // Add new trip
            trips.push(trip);
            
            // Save to session storage
            sessionStorage.setItem('trips', JSON.stringify(trips));
            
            // Show success message
            alert('Trip logged successfully! Your carbon emission for this trip is ' + trip.emission.toFixed(2) + ' kg CO2.');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Handle back to dashboard button
    const backToDashboardBtn = document.getElementById('backToDashboard');
    if (backToDashboardBtn) {
        backToDashboardBtn.addEventListener('click', function() {
            window.location.href = 'dashboard.html';
        });
    }
    
    // Initial emission calculation
    updateEmissionCalculation();
});

// Update emission calculation based on form inputs
function updateEmissionCalculation() {
    const vehicle = document.getElementById('vehicle').value;
    const distance = document.getElementById('distance').value;
    const trafficConditions = document.getElementById('trafficConditions').value;
    
    // Calculate emission
    const emission = calculateEmission(vehicle, distance, trafficConditions);
    
    // Update emission value display
    const emissionValueElement = document.querySelector('.emission-value');
    if (emissionValueElement) {
        emissionValueElement.innerHTML = emission.toFixed(2) + ' <span>kg CO2</span>';
    }
}

// Calculate carbon emission based on vehicle, distance, and traffic conditions
function calculateEmission(vehicle, distance, trafficConditions) {
    // Base emission factors (kg CO2 per km)
    const emissionFactors = {
        tesla: 0.05, // Tesla Model 3 (Electric)
        toyota: 0.12, // Toyota Prius (Hybrid)
        honda: 0.15, // Honda Civic (Gasoline)
        default: 0.15 // Default if not found
    };
    
    // Traffic condition multipliers
    const trafficMultipliers = {
        light: 1,
        moderate: 1.2,
        heavy: 1.5,
        congested: 1.8,
        default: 1 // Default if not found
    };
    
    // Get base emission factor for the vehicle
    const baseFactor = emissionFactors[vehicle] || emissionFactors.default;
    
    // Get traffic multiplier
    const trafficMultiplier = trafficMultipliers[trafficConditions] || trafficMultipliers.default;
    
    // Calculate emission
    return baseFactor * distance * trafficMultiplier;
}