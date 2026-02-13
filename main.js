// ===== NX►SYS - Professional JavaScript =====

'use strict';

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });

// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        if (navCta) {
            navCta.classList.toggle('active');
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
                if (navCta) navCta.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// ===== COUNTER ANIMATION =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            if (target && !isNaN(target)) {
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all counter elements
document.querySelectorAll('[data-count]').forEach(counter => {
    counterObserver.observe(counter);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FADE IN ANIMATION ON SCROLL =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to specific elements
const fadeElements = [
    '.service-card',
    '.visual-card',
    '.feature-item',
    '.metric-card',
    '.trust-stat'
];

fadeElements.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});

// ===== ACTIVE NAVIGATION LINK =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksElements = document.querySelectorAll('.nav-links a');
    
    navLinksElements.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ===== METRIC BAR ANIMATION =====
const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.metric-fill');
            if (fill) {
                const targetWidth = fill.style.width;
                fill.style.width = '0';
                
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
            }
            metricObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.5 
});

document.querySelectorAll('.metric-card').forEach(card => {
    metricObserver.observe(card);
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== HANDLE EXTERNAL LINKS =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===== CONSOLE BRANDING =====
if (console && console.log) {
    console.log(
        '%cNX►SYS Corporation',
        'font-size: 24px; font-weight: bold; color: #1A365D; font-family: "Playfair Display", serif;'
    );
    console.log(
        '%cProfessional Business Process Outsourcing',
        'font-size: 14px; color: #718096; margin-top: 8px;'
    );
    console.log(
        '%c' + window.location.hostname,
        'font-size: 12px; color: #C53030; margin-top: 4px;'
    );
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy functions if needed
const debouncedScroll = debounce(() => {
    // Additional scroll logic here if needed
}, 100);

window.addEventListener('scroll', debouncedScroll, { passive: true });