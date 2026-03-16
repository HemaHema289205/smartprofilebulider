// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Step Cards Interactive (Process Section)
const stepCards = document.querySelectorAll('.step-card');
stepCards.forEach(card => {
    card.addEventListener('click', () => {
        stepCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

// Mobile Menu Toggle (Simplified for demo)
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        alert('Mobile menu functionality would go here.');
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// Authentication Modal Logic
function showLogin() {
    const modal = document.getElementById('login-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLogin() {
    const modal = document.getElementById('login-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function simulateGoogleLogin() {
    const btn = document.querySelector('.google-btn');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to Google...';

    setTimeout(() => {
        alert('Successfully connected with Google!\n\nYou are now logged in as a SmartProfileBuilder user.');
        closeLogin();
        // Reset button
        btn.disabled = false;
        btn.innerHTML = originalText;

        // Update Navbar UI (Simulated)
        const navCta = document.querySelector('.nav-cta');
        navCta.innerHTML = `
            <div class="user-profile-nav" onclick="toggleUserDropdown()" style="display: flex; align-items: center; gap: 12px; font-weight: 600; cursor: pointer; position: relative;">
                <img src="https://i.pravatar.cc/32?u=google" style="border-radius: 50%; width: 32px; border: 2px solid #6366f1;">
                <span>My Profile <i class="fas fa-chevron-down" style="font-size: 0.8rem; margin-left: 4px;"></i></span>
                
                <div id="user-dropdown" class="user-dropdown">
                    <div class="dropdown-item logout-item" onclick="logout(event)">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </div>
                </div>
            </div>
        `;
    }, 2000);
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

function logout(event) {
    event.stopPropagation(); // Prevent trigger toggleUserDropdown
    if (confirm('Are you sure you want to logout?')) {
        const navCta = document.querySelector('.nav-cta');
        navCta.innerHTML = `
            <button onclick="showLogin()" class="btn btn-outline">Login</button>
            <a href="choose.html" class="btn btn-primary">Get started</a>
        `;
        alert('You have been logged out successfully!');
    }
}

// Close dropdown when clicking outside
window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    const profileNav = document.querySelector('.user-profile-nav');
    if (dropdown && dropdown.classList.contains('active') && !profileNav.contains(e.target)) {
        dropdown.classList.remove('active');
    }

    const modal = document.getElementById('login-modal');
    if (e.target === modal) {
        closeLogin();
    }
});
