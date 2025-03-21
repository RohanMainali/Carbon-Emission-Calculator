document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            const passwordField = this.previousElementSibling;
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });
    
    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validate form data
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Create user object
            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                fullName: firstName + ' ' + lastName,
                joinDate: new Date().toISOString()
            };
            
            // Save user data to session storage
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real app, we would validate against a database
            // For this demo, we'll just check if the email exists in session storage
            const storedUser = JSON.parse(sessionStorage.getItem('user'));
            
            if (storedUser && storedUser.email === email) {
                // Set login status
                sessionStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Create a demo user for testing
                const demoUser = {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: email,
                    fullName: 'John Doe',
                    joinDate: new Date().toISOString()
                };
                
                // Save demo user data to session storage
                sessionStorage.setItem('user', JSON.stringify(demoUser));
                sessionStorage.setItem('isLoggedIn', 'true');
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
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
});