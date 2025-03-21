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
    
    // Generate personalized recommendations
    generateRecommendations();
    
    // Download report functionality
    const downloadReportBtn = document.getElementById('downloadReportBtn');
    
    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', function() {
            document.getElementById('reportModal').style.display = 'block';
        });
    }

    // Generate report
    const generateReportBtn = document.getElementById('generateReportBtn');
    
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', function() {
            // Get report type and format
            const reportType = document.getElementById('reportType').value;
            const reportFormat = document.getElementById('reportFormat').value;
            
            // Close modal
            document.getElementById('reportModal').style.display = 'none';
            
            // Show notification
            showNotification(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report downloaded in ${reportFormat.toUpperCase()} format`);
        });
    }

    // Modal close buttons
    const closeBtns = document.querySelectorAll('.close');
    const modalCancelBtns = document.querySelectorAll('.modal-cancel');
    
    // Close modals
    closeBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    modalCancelBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Make recommendation items interactive
    const recommendationItems = document.querySelectorAll('.recommendation-item');
    
    recommendationItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // Add visual feedback
            this.style.backgroundColor = 'rgba(46, 139, 87, 0.1)';
            
            // Reset after a short delay
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
            
            // Show notification for the clicked recommendation
            const recommendationText = this.querySelector('.recommendation-text').textContent;
            showNotification(`Tip added to your personalized list: ${recommendationText.substring(0, 40)}...`);
        });
    });
    
    // Function to generate personalized recommendations
    function generateRecommendations() {
        // Get trips data
        const trips = JSON.parse(sessionStorage.getItem('trips')) || [];
        
        // Get vehicles data
        const vehicles = JSON.parse(sessionStorage.getItem('vehicles')) || [];
        
        // Example recommendations based on user data
        const recommendations = [
            "Consider carpooling for your daily commute to reduce emissions by up to 50%.",
            "Maintain proper tire pressure to improve fuel efficiency by 3%.",
            "Avoid rapid acceleration and braking to save fuel and reduce emissions.",
            "Consider switching to an electric vehicle for your next purchase.",
            "Use public transportation for trips to the city center.",
            "Plan your routes to avoid traffic congestion and reduce idle time.",
            "Consider biking or walking for short trips under 2 miles."
        ];
        
        // Update recommendation items
        const recommendationItems = document.querySelectorAll('.item-content');
        recommendationItems.forEach((item, index) => {
            if (index < recommendations.length) {
                item.textContent = recommendations[index];
            }
        });
        
        // Update recommendation title and subtitle
        const titleElement = document.querySelector('.recommendations-header h2');
        const subtitleElement = document.querySelector('.recommendations-header p');
        
        if (titleElement) {
            titleElement.textContent = "Your Personalized Recommendations";
        }
        
        if (subtitleElement) {
            subtitleElement.textContent = "Based on your travel patterns and vehicle usage";
        }
    }
});

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notificationMessage');
    
    if (notification && notificationMessage) {
        notificationMessage.textContent = message;
        notification.classList.add('active');
        
        // Hide notification after 3 seconds
        setTimeout(function() {
            notification.classList.remove('active');
        }, 3000);
    }
}