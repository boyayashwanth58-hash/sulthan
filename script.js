/* ==========================================
   MODERN RESPONSIVE LOGIN PAGE - SCRIPT
   ========================================== */

// ==========================================
// INITIALIZATION ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Login Page Initialized');
    
    // Initialize all systems
    initParticles();
    initFormValidation();
    initPasswordToggle();
    initAnimations();
    initPullingAnimation();
});

// ==========================================
// PASSWORD CONSTANT & CONFIGURATION
// ==========================================
const AUTH_CONFIG = {
    CORRECT_PASSWORD: 'plagia123',
    USERNAME_MIN_LENGTH: 3,
    ANIMATION_DURATION: 2000,
    LOADING_SIMULATE_TIME: 1500
};

// ==========================================
// PARTICLE SYSTEM - Creates floating particles
// ==========================================
function initParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = window.innerWidth > 768 ? 30 : 15;

    // Clear existing particles
    container.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const dot = document.createElement('div');
        dot.className = 'particle-dot';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = x + '%';
        particle.style.top = y + '%';

        // Random animation duration
        const duration = Math.random() * 6 + 4;
        dot.style.animationDuration = duration + 's';

        // Random delay
        const delay = Math.random() * 2;
        dot.style.animationDelay = delay + 's';

        particle.appendChild(dot);
        container.appendChild(particle);
    }

    console.log('✨ Particles initialized:', particleCount);
}

// Recreate particles on window resize
window.addEventListener('resize', debounce(function() {
    if (window.innerWidth > 768) {
        initParticles();
    }
}, 500));

// ==========================================
// FORM VALIDATION & LOGIN LOGIC
// ==========================================
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        clearErrors();

        // Validate inputs
        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // Validate username
        if (username.length < AUTH_CONFIG.USERNAME_MIN_LENGTH) {
            showError('usernameError', 'Username must be at least 3 characters');
            shake(usernameInput);
            return;
        }

        // Validate password
        if (!password) {
            showError('passwordError', 'Password is required');
            shake(passwordInput);
            return;
        }

        // Check password
        if (password !== AUTH_CONFIG.CORRECT_PASSWORD) {
            showError('passwordError', '❌ Wrong password - Try again');
            passwordInput.value = '';
            passwordInput.classList.add('error-state');
            shake(passwordInput);
            playErrorSound();
            console.log('❌ Wrong password entered');
            return;
        }

        // All validation passed - proceed to login
        performLogin();
    });

    // Real-time validation
    usernameInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            clearError('usernameError');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearError('passwordError');
            this.classList.remove('error-state');
        }
    });
}

/**
 * Perform login animation and redirect
 */
function performLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    console.log('✅ Login successful!');

    // Save login state
    saveLoginState();

    // Start loading animation
    loginBtn.classList.add('loading');
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    document.body.classList.add('loading');

    // Play success animation
    playSuccessAnimation();

    // Simulate login process and redirect
    setTimeout(() => {
        // Redirect to main application
        window.location.href = 'index.html';
    }, AUTH_CONFIG.LOADING_SIMULATE_TIME);
}

// ==========================================
// PASSWORD TOGGLE (Show/Hide)
// ==========================================
function initPasswordToggle() {
    const toggleButton = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();

        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        this.textContent = isPassword ? '🙈' : '👁️';

        // Add animation
        this.style.transform = 'scale(1.3) rotate(10deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 150);

        console.log('🔐 Password visibility toggled');
    });
}

// ==========================================
// PULLING ANIMATION - Boy pulls card in
// ==========================================
function initPullingAnimation() {
    // This animation is created using GSAP via CSS animations
    // The card entrance animation happens on page load via CSS keyframes
    
    // Add interactive effect on mouse move (optional enhancement)
    const loginCard = document.getElementById('loginCard');
    
    document.addEventListener('mousemove', function(e) {
        if (window.innerWidth > 768) {
            const rect = loginCard.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - centerY) * 0.02;
            const angleY = (e.clientX - centerX) * -0.02;
            
            loginCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        }
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', function() {
        loginCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    console.log('🎬 Pulling animation initialized');
}

// ==========================================
// ANIMATIONS INITIALIZATION
// ==========================================
function initAnimations() {
    console.log('🎨 Animations initialized');
    
    // Add entrance stagger to form elements
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        group.style.animationDelay = `${0.4 + index * 0.1}s`;
    });
}

// ==========================================
// ERROR HANDLING & DISPLAY
// ==========================================
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
}

// ==========================================
// SHAKE ANIMATION (for errors)
// ==========================================
function shake(element) {
    const originalX = 0;
    const shakeAmount = 10;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            element.style.transform = `translateX(${i % 2 === 0 ? shakeAmount : -shakeAmount}px)`;
        }, i * 50);
    }
    
    setTimeout(() => {
        element.style.transform = 'translateX(0)';
    }, 300);
}

// ==========================================
// SUCCESS ANIMATION
// ==========================================
function playSuccessAnimation() {
    const loginCard = document.getElementById('loginCard');
    
    // Add a success glow effect
    loginCard.style.boxShadow = `
        var(--glass-shadow),
        0 0 60px rgba(16, 185, 129, 0.5),
        0 0 100px rgba(16, 185, 129, 0.3)
    `;
    
    // Pulse animation
    loginCard.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(1.05)', opacity: 1 },
        { transform: 'scale(1)', opacity: 0.5 }
    ], {
        duration: 300,
        iterations: 2,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });

    console.log('🎉 Success animation played');
}

// ==========================================
// SOUND EFFECTS (Optional)
// ==========================================
function playErrorSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 400;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio not available');
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function - prevents function from being called too often
 * @param {Function} func - The function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if user is already logged in
 */
function checkExistingLogin() {
    if (localStorage.getItem('plagiaguard_logged_in')) {
        console.log('Already logged in, redirecting...');
        window.location.href = 'index.html';
    }
}

/**
 * Save login state
 */
function saveLoginState() {
    const username = document.getElementById('username').value.trim();
    localStorage.setItem('plagiaguard_logged_in', 'true');
    localStorage.setItem('plagiaguard_username', username);
    const timestamp = new Date().toISOString();
    localStorage.setItem('login_timestamp', timestamp);
}

// ==========================================
// EVENT LISTENERS
// ==========================================

// Check keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const loginForm = document.getElementById('loginForm');
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Handle visibility change (pause animations when tab is not active)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('⏸️ Page hidden - animations paused');
        document.body.style.opacity = '0.5';
    } else {
        console.log('▶️ Page visible - animations resumed');
        document.body.style.opacity = '1';
    }
});

// ==========================================
// CONSOLE MESSAGES
// ==========================================
console.log('%c🎯 PlagiaGuard Login System', 'font-size: 16px; font-weight: bold; color: #6366f1;');
console.log('%cPassword: %cplagia123', 'color: #888;', 'color: #10b981; font-weight: bold;');
console.log('%cFor demo purposes only', 'color: #f59e0b; font-style: italic;');