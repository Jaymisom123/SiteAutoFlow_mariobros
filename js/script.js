// AutoFlow Landing Page - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Only apply header effects on desktop to prevent mobile scroll issues
        if (window.innerWidth > 768) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }
            
            // Hide/show header on scroll (desktop only)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            // Mobile: keep header static and visible
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 4px 32px rgba(0, 0, 0, 0.3)';
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateHeader);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    
    function closeMenu() {
        hamburger.classList.remove('active');
        
        // Start closing animation
        navMenu.classList.remove('show');
        navActions.classList.remove('show');
        document.body.classList.remove('menu-open');
        
        // Remove active class after animation completes
        setTimeout(() => {
            navMenu.classList.remove('active');
            navActions.classList.remove('active');
        }, 800);
        
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                // Opening menu
                navMenu.classList.add('active');
                navActions.classList.add('active');
                document.body.classList.add('menu-open');
                
                // Add show class after a small delay for smooth animation
                setTimeout(() => {
                    navMenu.classList.add('show');
                    navActions.classList.add('show');
                }, 10);
            } else {
                // Closing menu
                navMenu.classList.remove('show');
                navActions.classList.remove('show');
                document.body.classList.remove('menu-open');
                
                // Remove active class after animation completes
                setTimeout(() => {
                    navMenu.classList.remove('active');
                    navActions.classList.remove('active');
                }, 800);
            }
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a nav link
        const mobileNavLinks = document.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only close menu, prevent scroll behavior on mobile
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    closeMenu();
                } else {
                    closeMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && 
                !navMenu.contains(e.target) && 
                !navActions.contains(e.target) &&
                hamburger.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Elements to animate (disabled on mobile to prevent auto-scroll)
    if (window.innerWidth > 768) {
        const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .showcase-text, .showcase-image');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    } else {
        // On mobile, show elements immediately without animation
        const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .showcase-text, .showcase-image');
        animateElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-menu.active,
        .nav-actions.active {
            display: flex !important;
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 24px;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-color);
            z-index: 999;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-menu.active.show,
        .nav-actions.active.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-menu.active {
            gap: 16px;
        }
        
        .nav-actions.active {
            gap: 12px;
            margin-top: 16px;
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        @media (max-width: 768px) {
            body.menu-open .nav-menu.active,
            body.menu-open .nav-actions.active {
                position: fixed !important;
                z-index: 999 !important;
            }
        }
        
        @media (min-width: 769px) {
            .nav-menu.active,
            .nav-actions.active {
                position: static !important;
                flex-direction: row !important;
                background: none !important;
                backdrop-filter: none !important;
                border: none !important;
                padding: 0 !important;
                margin-top: 0 !important;
            }
            
            body.menu-open {
                overflow: auto;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect removed to prevent scroll issues
    
    // Statistics counter animation (disabled on mobile to prevent issues)
    if (window.innerWidth > 768) {
        const stats = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    function animateCounter(element) {
        const target = element.textContent;
        const isK = target.includes('K');
        const number = parseInt(target.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = number / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + (isK ? 'K+' : '+');
        }, 40);
    }
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-primary')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Ripple effect
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // WhatsApp button - simplified (no animations to prevent scroll issues)
    
    // Testimonials slider (simple)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.opacity = i === index ? '1' : '0.6';
            card.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
        });
    }
    
    // Auto-rotate testimonials
    if (testimonialCards.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 4000);
    }
    
    // Video play/pause on visibility
    const video = document.querySelector('.hero-video video');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.3 });
    
    if (video) {
        videoObserver.observe(video);
    }
    
    // Smooth reveal for sections (disabled on mobile to prevent auto-scroll)
    if (window.innerWidth > 768) {
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });
    } else {
        // On mobile, just show all sections without animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
    
    // Add loading animation
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="assets/images/logo.png" alt="AutoFlow" style="width: 64px; height: 64px; border-radius: 12px;">
            </div>
            <div class="loader-text">AutoFlow</div>
            <div class="loader-spinner"></div>
        </div>
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-logo {
            margin-bottom: 16px;
            animation: float 2s ease-in-out infinite;
        }
        
        .loader-text {
            font-size: 24px;
            font-weight: 700;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 24px;
        }
        
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top-color: var(--accent-green);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Hide loader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
    
    // Enhanced form interactions (if forms are added later)
    function enhanceFormInputs() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const wrapper = document.createElement('div');
            wrapper.className = 'input-wrapper';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            
            const label = document.createElement('label');
            label.textContent = input.placeholder;
            label.className = 'floating-label';
            wrapper.appendChild(label);
            
            input.addEventListener('focus', () => {
                wrapper.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    wrapper.classList.remove('focused');
                }
            });
            
            if (input.value) {
                wrapper.classList.add('focused');
            }
        });
    }
    
    // Scroll listeners only on desktop to prevent mobile issues
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', updateHeader);
    }
    
    // Mobile-specific: Prevent any unwanted auto-scroll behavior
    if (window.innerWidth <= 768) {
        let isUserScrolling = false;
        let scrollTimeout;
        
        // Detect user scrolling
        window.addEventListener('scroll', function() {
            isUserScrolling = true;
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isUserScrolling = false;
            }, 150);
        });
        
        // Override any programmatic scrollTo calls on mobile
        const originalScrollTo = window.scrollTo;
        window.scrollTo = function(...args) {
            if (!isUserScrolling) {
                // Only allow scroll if user initiated it
                return;
            }
            return originalScrollTo.apply(this, args);
        };
        
        // Prevent any smooth scrolling on mobile
        document.documentElement.style.scrollBehavior = 'auto';
    }

    // Console log for debugging
    console.log('🚀 AutoFlow Landing Page Loaded Successfully!');
    console.log('✨ All interactive features are now active');
});

// Utility functions for external use
window.AutoFlow = {
    // Scroll to section
    scrollTo: function(sectionId) {
        const element = document.querySelector(sectionId);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            window.scrollTo({
                top: element.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    },
    
    // Show notification (can be used for form submissions)
    notify: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const style = `
            position: fixed;
            top: 100px;
            right: 24px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'var(--accent-green)' : 'var(--accent-orange)'};
            color: white;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;
        
        notification.style.cssText = style;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
};