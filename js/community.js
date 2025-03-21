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
    const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');

    function handleLogout() {
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    if (sidebarLogoutBtn) {
        sidebarLogoutBtn.addEventListener('click', handleLogout);
    }

    // Get challenges from session storage or create default ones
    let challenges = JSON.parse(sessionStorage.getItem('challenges'));
    
    if (!challenges) {
        // Create default challenges
        challenges = [
            {
                id: 1,
                title: 'Challenge 1',
                description: 'Reduce your carbon footprint by 10% this month by using public transportation or carpooling at least twice a week.',
                progress: 25,
                target: 100,
                completed: false
            },
            {
                id: 2,
                title: 'Challenge 2',
                description: 'Complete at least 5 eco-friendly trips this month by walking, cycling, or using electric vehicles.',
                progress: 40,
                target: 100,
                completed: false
            },
            {
                id: 3,
                title: 'Challenge 3',
                description: 'Join our community tree planting event this weekend to offset your carbon emissions.',
                progress: 0,
                target: 100,
                completed: false
            }
        ];
        
        // Save to session storage
        sessionStorage.setItem('challenges', JSON.stringify(challenges));
    }

    // Add event listener for join event button
    const joinEventBtn = document.querySelector('.challenge-card button');
    if (joinEventBtn) {
        joinEventBtn.addEventListener('click', function() {
            alert('You have successfully joined the community tree planting event. Details will be sent to your email.');
            
            // Update challenge progress
            challenges[2].progress = 50;
            
            // Update progress bar
            const progressBar = document.querySelectorAll('.progress')[2];
            progressBar.style.width = '50%';
            
            // Save updated challenges to session storage
            sessionStorage.setItem('challenges', JSON.stringify(challenges));
        });
    }
    
    // Update challenge progress based on user activity
    function updateChallengeProgress() {
        // Get user activity data
        const trips = JSON.parse(sessionStorage.getItem('trips')) || [];
        const vehicles = JSON.parse(sessionStorage.getItem('vehicles')) || [];
        
        // Challenge 1: Reduce carbon footprint by 10%
        // Calculate progress based on trips logged with public transport or carpool
        const ecoFriendlyTrips = trips.filter(trip => 
            trip.tripType === 'public' || trip.tripType === 'carpool'
        ).length;
        
        // Challenge 2: Log at least 5 eco-friendly trips
        // Calculate progress based on total trips logged
        const totalTrips = trips.length;
        const challenge2Progress = Math.min(totalTrips / 5 * 100, 100);
        
        // Challenge 3: Invite 3 friends
        // For demo purposes, we'll set a random progress
        const invitedFriends = Math.floor(Math.random() * 4); // 0-3 friends
        const challenge3Progress = (invitedFriends / 3) * 100;
        
        // Challenge 4: Complete vehicle profile
        // Calculate progress based on vehicles with complete information
        const completeVehicles = vehicles.filter(vehicle => 
            vehicle.vehicleType && vehicle.fuelType && vehicle.mileage && vehicle.vehicleModel
        ).length;
        
        // Update progress bars
        const progressBars = document.querySelectorAll('.progress');
        if (progressBars.length >= 3) {
            // We already set the widths in the HTML, but in a real app, 
            // we would update them dynamically based on the calculations above
            
            // For demonstration, we'll add a click event to simulate progress changes
            document.querySelectorAll('.challenge-card').forEach(card => {
                card.addEventListener('click', function() {
                    const progressBar = this.querySelector('.progress');
                    if (progressBar) {
                        const currentWidth = parseInt(progressBar.style.width);
                        const newWidth = Math.min(currentWidth + 10, 100);
                        progressBar.style.width = newWidth + '%';
                        
                        // Add completed badge if 100%
                        if (newWidth === 100 && !this.querySelector('.challenge-completed')) {
                            const statusDiv = this.querySelector('.challenge-status');
                            const completedDiv = document.createElement('div');
                            completedDiv.className = 'challenge-completed';
                            const badge = document.createElement('span');
                            badge.className = 'badge';
                            badge.textContent = 'Completed';
                            completedDiv.appendChild(badge);
                            statusDiv.appendChild(completedDiv);
                        }
                    }
                });
            });
        }
    }
});