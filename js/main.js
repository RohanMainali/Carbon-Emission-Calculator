document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const authButtonContainer = document.getElementById('auth-button-container');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Update auth button based on login status
    if (isLoggedIn && authButtonContainer) {
        // Get user data
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        // Replace Join Us button with user menu if logged in
        authButtonContainer.innerHTML = `
            <div class="user-menu">
                <a href="#" class="notification-icon"><i class="far fa-envelope"></i></a>
                <div class="profile-dropdown">
                    <div class="profile-pic" id="profileDropdownBtn">
                        <img src="https://i.ibb.co/Lk4Lv9B/solar-panels.jpg" alt="Profile Picture">
                    </div>
                    <div class="dropdown-menu" id="profileDropdown">
                        <p class="dropdown-header">Logged in as <span>${user ? user.fullName : 'User'}</span></p>
                        <ul>
                            <li><a href="dashboard.html">Dashboard</a></li>
                            <li><a href="profile.html">Profile</a></li>
                            <li><a href="vehicle-registration.html">Vehicle Registration</a></li>
                            <li><a href="log-trip.html">Log a trip</a></li>
                            <li><a href="recommendations.html">Recommendations</a></li>
                            <li><a href="community-challenge.html">Community Challenge</a></li>
                            <li><a href="#" id="logoutBtn">Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener for profile dropdown
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
        
        // Add event listener for logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.removeItem('isLoggedIn');
                window.location.reload();
            });
        }
    }
    
    // Add event listener for calculate button
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isLoggedIn) {
                // If logged in, redirect to log trip page
                window.location.href = 'log-trip.html';
            } else {
                // If not logged in, redirect to signup page
                // First show a prompt
                const promptMsg = confirm('You need to create an account to calculate your carbon footprint. Would you like to sign up now?');
                if (promptMsg) {
                    window.location.href = 'signup.html';
                }
            }
        });
    }
    
    // Handle mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formSuccess = document.getElementById('formSuccess');
            if (formSuccess) {
                formSuccess.style.display = 'block';
            }
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Update navigation based on login status
function updateNavigation(isLoggedIn) {
    const joinBtn = document.querySelector('.join-btn');
    const userMenu = document.querySelector('.user-menu');
    
    if (isLoggedIn === 'true') {
        // Show user menu if logged in
        if (joinBtn) joinBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'flex';
        
        // Get user data
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        // Update user name in dropdown if it exists
        const userNameElement = document.getElementById('userName');
        if (userNameElement && user) {
            userNameElement.textContent = user.fullName;
        }
        
        // Toggle profile dropdown if it exists
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
        
        // Handle logout if button exists
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                sessionStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            });
        }
    } else {
        // Show join button if not logged in
        if (joinBtn) joinBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}