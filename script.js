// Custom cursor functionality
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');

// Check if it's a touch device
const isTouchDevice = () => {
    return ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
};

// Only enable custom cursor on non-touch devices
if (!isTouchDevice()) {
    // Update cursor position on mouse move
    document.addEventListener('mousemove', e => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Add slight delay to circle for smooth effect
        setTimeout(() => {
            cursorCircle.style.left = e.clientX + 'px';
            cursorCircle.style.top = e.clientY + 'px';
        }, 50);
    });

    // Add hover effect to clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .benefit-card, .faq-question, .hero-buttons a');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorCircle.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorCircle.classList.remove('cursor-hover');
        });
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.display = 'none';
        cursorCircle.style.display = 'none';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.display = 'block';
        cursorCircle.style.display = 'block';
    });
}

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuButton.addEventListener('click', function() {
    navLinks.classList.toggle('show');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('show');
        document.body.classList.remove('menu-open');
    });
});

// Handle resize to fix navigation issues
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        document.body.classList.remove('menu-open');
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            if (faqItem !== item) {
                faqItem.classList.remove('active');
            }
        });
        item.classList.toggle('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        if (href === '#') {
            // Scroll to top for Home link
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Scroll to specific section
            const target = document.querySelector(href);
            if (target) {
                // Adjust offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight - 20, // 20px extra padding
                    behavior: 'smooth'
                });
            }
        }
    });
});
