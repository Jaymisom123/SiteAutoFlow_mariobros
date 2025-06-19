// AutoFlow Landing Page - Recursos Interativos
document.addEventListener('DOMContentLoaded', function() {
    
    // Header responsivo profissional
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll do body quando menu estiver aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao clicar em link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect apenas no desktop
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (window.innerWidth > 768) {
            if (currentScrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
            
            // Ocultar/mostrar header no scroll (apenas desktop)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            // Mobile: cabeçalho sempre visível
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.transform = 'translateY(0)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    // Throttled scroll listener para performance
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Rolagem suave para links de navegação
    const navLinksWithHref = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinksWithHref.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Apenas rolagem suave no desktop
                if (window.innerWidth > 768) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    window.scrollTo(0, targetPosition);
                }
            }
        });
    });
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar (desabilitado no mobile para prevenir auto-scroll)
    if (window.innerWidth > 768) {
        const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .showcase-text, .showcase-image');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            observer.observe(el);
        });
    } else {
        // No mobile, mostrar elementos imediatamente sem animação
        const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .showcase-text, .showcase-image');
        animateElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // Adicionar CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* CSS para animações suaves */
        @media (min-width: 769px) {
            .nav-menu,
            .nav-actions {
                display: flex !important;
            }
            
            .hamburger {
                display: none !important;
            }
            
            .mobile-sidebar,
            .sidebar-overlay {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Efeito parallax removido para prevenir problemas de scroll
    
    // Animação de contador de estatísticas (desabilitado no mobile para prevenir problemas)
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
    
    // Otimizações responsivas
    function handleResponsiveOptimizations() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
        
        // Otimizações para mobile
        if (isMobile) {
            // Desabilitar parallax e animações pesadas
            const video = document.querySelector('.hero-video video');
            if (video) {
                video.style.transform = 'none';
            }
            
            // Otimizar imagens lazy loading
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (!img.loading) {
                    img.loading = 'lazy';
                }
            });
        }
        
        // Ajustes para tablet
        if (isTablet) {
            const features = document.querySelector('.features-grid');
            if (features) {
                features.style.gap = '2rem';
            }
        }
    }
    
    // Otimização de toque
    function optimizeForTouch() {
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Melhorar interações touch
            const buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.addEventListener('touchstart', function() {
                    this.classList.add('touch-active');
                }, { passive: true });
                
                btn.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.classList.remove('touch-active');
                    }, 150);
                }, { passive: true });
            });
        }
    }
    
    // Correção de altura do viewport para mobile
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Chamar funções de otimização
    handleResponsiveOptimizations();
    optimizeForTouch();
    setVH();
    
    // Atualizar no redimensionamento com debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResponsiveOptimizations();
            setVH();
        }, 250);
    });
    
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
    
    // Efeitos de hover dos botões
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
        
        // Efeito ripple
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
    
    // Adicionar CSS de animação ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Botão WhatsApp - simplificado (sem animações para prevenir problemas de scroll)
    
    // Slider de depoimentos (simples)
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.opacity = '1';
                testimonial.style.transform = 'translateX(0)';
            } else {
                testimonial.style.opacity = '0.5';
                testimonial.style.transform = 'translateX(20px)';
            }
        });
    }
    
    // Rotação automática de depoimentos
    if (testimonials.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Reproduzir/pausar vídeo na visibilidade
    const video = document.querySelector('.hero-video video');
    if (video) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.3 });
        
        videoObserver.observe(video);
    }
    
    // Revelação suave para seções (desabilitado no mobile para prevenir auto-scroll)
    if (window.innerWidth > 768) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const sections = document.querySelectorAll('.features, .showcase, .testimonials, .cta');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.8s ease';
            sectionObserver.observe(section);
        });
    } else {
        // No mobile, apenas mostrar todas as seções sem animação
        const sections = document.querySelectorAll('.features, .showcase, .testimonials, .cta');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
    }
    
    // Adicionar animação de carregamento
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <img src="assets/images/logo.png" alt="AutoFlow" style="width: 60px; height: 60px;">
            </div>
            <div class="loader-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
            <div class="loader-text">Carregando AutoFlow...</div>
        </div>
    `;
    
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .loader-content {
            text-align: center;
            animation: fadeInUp 0.8s ease;
        }
        
        .loader-logo {
            margin-bottom: 1rem;
            animation: float 2s ease-in-out infinite;
        }
        
        .loader-spinner {
            position: relative;
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem;
        }
        
        .spinner-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
            border-top: 3px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .spinner-ring:nth-child(2) {
            animation-delay: 0.1s;
            border-top-color: #E63946;
        }
        
        .spinner-ring:nth-child(3) {
            animation-delay: 0.2s;
            border-top-color: #1E56A0;
        }
        
        .loader-text {
            color: #ffffff;
            font-size: 1rem;
            font-weight: 500;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.appendChild(loader);
    
    // Ocultar loader após carregamento da página
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.remove();
                loaderStyle.remove();
            }, 500);
        }, 500);
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