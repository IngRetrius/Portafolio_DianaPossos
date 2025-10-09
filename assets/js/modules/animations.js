// ==========================================
// MÓDULO DE ANIMACIONES
// ==========================================

function initAnimations() {
    console.log('Iniciando animaciones...');
    typeWriter();
    initParallax();
    animateTags();
    console.log('✅ Animaciones inicializadas');
}

function typeWriter() {
    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--color-primary)';
    
    let i = 0;
    const speed = 50;

    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 500);
        }
    }

    setTimeout(type, 500);
}

function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

function animateTags() {
    const tags = document.querySelectorAll('.tag');
    
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.3s ease-out';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, index * 50);
    });
}

function enhanceCardHover() {
    const cards = document.querySelectorAll('.card, .methodology__card, .results__card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="spinner"></div>
            <p>Cargando portafolio...</p>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        }

        .page-loader.fade-out {
            opacity: 0;
            pointer-events: none;
        }

        .loader-content {
            text-align: center;
        }

        .loader-content p {
            margin-top: var(--spacing-lg);
            color: var(--color-text-secondary);
            font-size: var(--font-size-lg);
        }
    `;

    document.head.appendChild(style);
    document.body.prepend(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
}