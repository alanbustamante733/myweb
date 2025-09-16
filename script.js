// Matrix rain effect with mobile optimization
function createMatrixRain() {
    const matrixBg = document.getElementById('matrix-bg');
    if (!matrixBg) return;
    
    // Reduce matrix effect on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const isLowPerformance = window.navigator.hardwareConcurrency <= 4;
    
    // Skip matrix effect on low-performance devices or if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωअआइईउऊऋएऐओऔकखगघचछजझटठडढतथदधनपफबभमयरलवशषसहक्षत्रज्ञ०१२३४५६७८९אבגדהוזחטיכלמנסעפצקרשתךםןףץᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Optimized for performance while keeping Matrix effect
    const columnCount = isMobile ? (isLowPerformance ? 12 : 20) : 35;
    const characterCount = isMobile ? 8 : 15;
    
    // Create columns
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        // Add random characters
        let columnText = '';
        for (let j = 0; j < characterCount; j++) {
            columnText += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = columnText;
        
        matrixBg.appendChild(column);
        
        // Remove columns after animation completes to prevent accumulation
        const animationDuration = parseFloat(column.style.animationDuration) * 1000;
        const timeout = animationDuration + 1000; // Add 1 second buffer
        setTimeout(() => {
            if (column.parentNode) {
                column.remove();
            }
        }, timeout);
    }
}

// Performance optimization utilities
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Initialize matrix effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    
    // Start matrix effect with mobile optimization
    createMatrixRain();
    
    // Reduce interval on mobile for better performance
    const matrixInterval = isMobile ? 5000 : 3000;
    setInterval(createMatrixRain, matrixInterval);
    
    // Initialize EmailJS with public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init("TX3JCf1qsPGeQOcm8"); // Tu clave pública real de EmailJS
    }
    
    // Contact form handler with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                console.warn('EmailJS not loaded, showing fallback message');
                setTimeout(() => {
                    alert('📧 Thank you for your message! Please contact me directly at alanbustamante733@gmail.com');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const templateParams = {
                name: formData.get('name'),
                time: new Date().toLocaleString(),
                message: `
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Company: ${formData.get('company') || 'Not specified'}
Project Type: ${formData.get('projectType') || 'General Inquiry'}
Budget: ${formData.get('budget') || 'Not specified'}
Timeline: ${formData.get('timeline') || 'Not specified'}

Message:
${formData.get('message')}
                `.trim()
            };
            
            // Send email using EmailJS
            emailjs.send('service_v2q6fxg', 'template_xvjmu3a', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('✅ Message sent successfully! I\'ll get back to you within 24 hours.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // More specific error handling
                    let errorMessage = '❌ Sorry, there was an error sending your message.';
                    
                    if (error.status === 400) {
                        errorMessage += ' EmailJS configuration error.';
                    } else if (error.status === 401) {
                        errorMessage += ' Authentication failed.';
                    } else if (error.status === 403) {
                        errorMessage += ' Service access denied.';
                    }
                    
                    errorMessage += '\n\nPlease contact me directly at alanbustamante733@gmail.com';
                    alert(errorMessage);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Add some interactive effects (optimized for mobile)
    if (!isMobile) {
        // Only add mousemove effects on non-mobile devices
        document.addEventListener('mousemove', throttle(function(e) {
            const cursor = document.querySelector('.cursor');
            if (cursor && Math.random() > 0.98) {
                cursor.style.opacity = Math.random();
            }
        }, 100));
    }
    
    // Optimize scroll performance
    let ticking = false;
    function updateOnScroll() {
        // Add scroll-based optimizations here if needed
        ticking = false;
    }
    
    document.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });
    
    // Handle resize events efficiently
    window.addEventListener('resize', debounce(function() {
        // Recalculate mobile state on resize
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            // Mobile state changed, could trigger re-initialization if needed
            location.reload(); // Simple approach for demo
        }
    }, 250));
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        // Toggle menu function
        function toggleMenu() {
            const isActive = navToggle.classList.contains('active');
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        // Open menu function
        function openMenu() {
            navToggle.classList.add('active');
            navMenu.classList.add('active');
        }
        
        // Close menu function
        function closeMenu() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Main toggle button click
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on a link (only for same-page navigation)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                // Only close menu for same-page anchors or if staying on same page
                if (href.startsWith('#') || href === 'home.html') {
                    closeMenu();
                }
                // For other pages, let the navigation happen normally
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Set active navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'home.html')) {
            link.classList.add('active');
        }
    });
});
