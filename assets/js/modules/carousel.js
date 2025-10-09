// ==========================================
// MÓDULO DE CAROUSEL
// ==========================================

function initCarousel() {
    console.log('Iniciando carousel...');
    
    const track = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel__slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.carousel__indicator');
    
    if (!track) {
        console.error('No se encontró el track del carousel');
        return;
    }
    
    if (slides.length === 0) {
        console.error('No se encontraron slides');
        return;
    }
    
    console.log(`Carousel inicializado con ${slides.length} slides`);
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Función para actualizar el carousel
    function updateCarousel() {
        console.log(`Actualizando carousel al slide ${currentSlide}`);
        
        // Mover el track
        const offset = -currentSlide * 100;
        track.style.transform = `translateX(${offset}%)`;
        
        // Actualizar clases activas de slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Navegar al siguiente slide
    function nextSlide() {
        console.log('Siguiente slide');
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Navegar al slide anterior
    function prevSlide() {
        console.log('Slide anterior');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Event listeners para botones
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
        console.log('Botón anterior configurado');
    } else {
        console.error('No se encontró el botón anterior');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
        console.log('Botón siguiente configurado');
    } else {
        console.error('No se encontró el botón siguiente');
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log(`Clic en indicador ${index}`);
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Soporte para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Inicializar
    updateCarousel();
    console.log('✅ Carousel completamente inicializado');
}