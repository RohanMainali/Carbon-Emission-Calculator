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

// Update profile information
if (user) {
    // Update profile name
    const profileNameElement = document.getElementById('profileName');
    if (profileNameElement) {
        profileNameElement.textContent = user.fullName;
    }
    
    // Update user details
    const detailNameElement = document.getElementById('detailName');
    const detailEmailElement = document.getElementById('detailEmail');
    
    if (detailNameElement) {
        detailNameElement.textContent = user.fullName;
    }
    
    if (detailEmailElement) {
        detailEmailElement.textContent = user.email;
    }
    
    // Update dropdown user name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.fullName;
    }
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

// Modal Functionality
const editProfileBtn = document.getElementById('editProfileBtn');
const editProfileModal = document.getElementById('editProfileModal');
const editProfileForm = document.getElementById('editProfileForm');

const addVehicleBtn = document.getElementById('addVehicleBtn');
const addVehicleModal = document.getElementById('addVehicleModal');
const addVehicleForm = document.getElementById('addVehicleForm');

const earnBadgeBtn = document.getElementById('earnBadgeBtn');
const badgeInfoModal = document.getElementById('badgeInfoModal');

const downloadReportBtn = document.getElementById('downloadReportBtn');
const reportModal = document.getElementById('reportModal');

const closeBtns = document.querySelectorAll('.close');
const modalCancelBtns = document.querySelectorAll('.modal-cancel');

// Open modals
if (editProfileBtn && editProfileModal) {
    editProfileBtn.addEventListener('click', function() {
        editProfileModal.style.display = 'block';
    });
}

if (addVehicleBtn && addVehicleModal) {
    addVehicleBtn.addEventListener('click', function() {
        addVehicleModal.style.display = 'block';
    });
}

if (earnBadgeBtn && badgeInfoModal) {
    earnBadgeBtn.addEventListener('click', function() {
        badgeInfoModal.style.display = 'block';
    });
}

if (downloadReportBtn && reportModal) {
    downloadReportBtn.addEventListener('click', function() {
        reportModal.style.display = 'block';
    });
}

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

// Handle form submissions
if (editProfileForm) {
    editProfileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;
        const location = document.getElementById('editLocation').value;
        
        // Update user data in session storage
        const updatedUser = {
            ...user,
            fullName: name,
            email: email,
            location: location
        };
        
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Close modal
        editProfileModal.style.display = 'none';
        
        // Show notification
        showNotification('Profile updated successfully!');
        
        // Reload page to reflect changes
        setTimeout(function() {
            location.reload();
        }, 1500);
    });
}

if (addVehicleForm) {
    addVehicleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const make = document.getElementById('vehicleMake').value;
        const model = document.getElementById('vehicleModel').value;
        const year = document.getElementById('vehicleYear').value;
        const type = document.getElementById('vehicleType').value;
        
        // Create vehicle object
        const vehicle = {
            make,
            model,
            year,
            type,
            id: Date.now()  // Use timestamp as ID
        };
        
        // Get existing vehicles or create empty array
        let vehicles = JSON.parse(sessionStorage.getItem('vehicles')) || [];
        
        // Add new vehicle
        vehicles.push(vehicle);
        
        // Save to session storage
        sessionStorage.setItem('vehicles', JSON.stringify(vehicles));
        
        // Close modal
        addVehicleModal.style.display = 'none';
        
        // Show notification
        showNotification('Vehicle added successfully!');
        
        // Reload page to reflect changes
        setTimeout(function() {
            location.reload();
        }, 1500);
    });
}

// Handle vehicle actions (edit, delete)
const vehicleEditBtns = document.querySelectorAll('.vehicle-edit-btn');
const vehicleDeleteBtns = document.querySelectorAll('.vehicle-delete-btn');

vehicleEditBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, we would open an edit modal with the vehicle data
        // For this demo, we'll just show a notification
        showNotification('Edit vehicle functionality would open here');
    });
});

vehicleDeleteBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real app, we would delete the vehicle from storage
        // For this demo, we'll just show a notification
        showNotification('Delete vehicle functionality would open here');
    });
});

// Generate report functionality
const generateReportBtn = document.getElementById('generateReportBtn');
if (generateReportBtn) {
    generateReportBtn.addEventListener('click', function() {
        // Close modal
        reportModal.style.display = 'none';
        
        // Show notification
        showNotification('Report generated and downloaded successfully!');
    });
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