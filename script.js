// Matrix rain effect
function createMatrixRain() {
    const matrixBg = document.getElementById('matrix-bg');
    if (!matrixBg) return;
    
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Create columns
    for (let i = 0; i < 50; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = (Math.random() * 3 + 2) + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        // Add random characters
        let columnText = '';
        for (let j = 0; j < 20; j++) {
            columnText += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = columnText;
        
        matrixBg.appendChild(column);
        
        // Remove and recreate columns periodically
        setTimeout(() => {
            if (column.parentNode) {
                column.remove();
            }
        }, 8000);
    }
}

// Initialize matrix effect when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start matrix effect
    createMatrixRain();
    setInterval(createMatrixRain, 3000);
    
    // Initialize EmailJS
    emailjs.init('TX3JCf1qsPGeQOcm8');
    
    // Contact form handler with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
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
                    alert('❌ Sorry, there was an error sending your message. Please try again or contact me directly at alanbustamante733@gmail.com');
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Add some interactive effects
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.cursor');
        if (cursor && Math.random() > 0.98) {
            cursor.style.opacity = Math.random();
        }
    });
    
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
