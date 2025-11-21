/**
 * JavaScript para la página dedicada de Infografía
 * Navegación simplificada con scroll nativo y smooth scrolling
 */

// Variables globales
let currentSection = 0;

// Definición de las 5 secciones (incluyendo Previsualización)
const sections = [
    {
        id: 'seccion-0',
        title: 'Previsualización',
        top: 0,      // Vista completa desde arriba
        height: 100, // Toda la imagen
        isPreview: true
    },
    {
        id: 'seccion-1',
        title: 'Contexto y Análisis',
        top: 8,
        height: 22
    },
    {
        id: 'seccion-2',
        title: 'Diseño y Estructura',
        top: 32,
        height: 22
    },
    {
        id: 'seccion-3',
        title: 'Evaluación y Análisis',
        top: 56,
        height: 22
    },
    {
        id: 'seccion-4',
        title: 'Implementación y Resultados',
        top: 80,
        height: 18
    }
];

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Navegación con teclado
    document.addEventListener('keydown', handleKeyboard);

    // Inicializar el display de zoom al 50%
    updateZoomDisplay(50);

    // Esperar a que la imagen cargue
    const image = document.getElementById('infografiaImage');
    if (image.complete) {
        console.log('Sistema de navegación inicializado - Zoom inicial: 50%');
    } else {
        image.addEventListener('load', function() {
            console.log('Sistema de navegación inicializado - Zoom inicial: 50%');
        });
    }
});

/**
 * Navega a una sección específica
 */
function navigateToSection(target) {
    let newSection;

    // Determinar el índice de la sección
    if (typeof target === 'number') {
        newSection = target;
    } else if (target === 'next') {
        newSection = currentSection + 1;
        // Si llegamos al final (después de la última sección), volver a previsualización
        if (newSection >= sections.length) {
            newSection = 0; // Volver a Previsualización
        }
    } else if (target === 'prev') {
        newSection = Math.max(currentSection - 1, 0);
    } else {
        return;
    }

    currentSection = newSection;
    const section = sections[currentSection];

    console.log('Navegando a:', section.title, '(índice:', currentSection, ')');

    // Actualizar UI
    updateNavigationUI();

    // Scroll a la sección
    scrollToSection(section);
}

/**
 * Hace scroll suave a una sección específica
 */
function scrollToSection(section) {
    const image = document.getElementById('infografiaImage');
    const viewport = document.querySelector('.main-viewport');

    if (!image || !viewport) return;

    // Si es la sección de previsualización, zoom al 50% y scroll al inicio
    if (section.isPreview) {
        image.style.width = '50%';
        updateZoomDisplay(50);
        console.log('Modo Previsualización: Zoom 50%');

        setTimeout(() => {
            viewport.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);
        return;
    }

    // Para otras secciones: zoom al 100%
    image.style.width = '100%';
    updateZoomDisplay(100);

    console.log('Zoom aplicado: 100%');

    // Esperar a que se aplique el cambio de ancho
    setTimeout(() => {
        // Obtener dimensiones renderizadas de la imagen
        const imageRect = image.getBoundingClientRect();
        const imageHeight = imageRect.height;

        console.log('Dimensiones renderizadas de imagen:', imageRect.width, 'x', imageHeight);

        // Calcular el centro de la sección en píxeles (sobre la imagen renderizada)
        const sectionCenterPercent = section.top + (section.height / 2);
        const sectionCenterY = (sectionCenterPercent / 100) * imageHeight;

        console.log('Sección:', section.title);
        console.log('Centro Y en imagen (%):', sectionCenterPercent);
        console.log('Centro Y en píxeles:', sectionCenterY);

        // Calcular la posición de scroll
        // Queremos centrar la sección en el viewport
        const viewportHeight = viewport.offsetHeight;
        const scrollTop = sectionCenterY - (viewportHeight / 2);

        console.log('Scroll a posición:', scrollTop);

        // Hacer scroll suave
        viewport.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }, 100);
}

/**
 * Actualiza la UI de navegación
 */
function updateNavigationUI() {
    const section = sections[currentSection];

    // Actualizar botones
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');

    btnPrev.disabled = currentSection === 0;
    // El botón "Siguiente" nunca se deshabilita porque vuelve a Previsualización
    btnNext.disabled = false;

    // Actualizar indicador en header
    const sectionIndicator = document.getElementById('sectionIndicator');
    sectionIndicator.textContent = section.title;

    // Actualizar barra de progreso
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progress = ((currentSection + 1) / sections.length) * 100;

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentSection + 1} de ${sections.length}`;

    // Actualizar navegación lateral
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, index) => {
        if (index === currentSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Controles de zoom (ajustan el ancho de la imagen)
 */
function zoomIn() {
    const image = document.getElementById('infografiaImage');
    // Obtener el ancho actual (puede ser del CSS inline o del estilo inicial)
    const computedStyle = window.getComputedStyle(image);
    const currentWidthPx = parseFloat(computedStyle.width);
    const parentWidthPx = image.parentElement.offsetWidth;
    const currentWidthPercent = Math.round((currentWidthPx / parentWidthPx) * 100);

    const newWidth = Math.min(currentWidthPercent + 10, 200);
    image.style.width = newWidth + '%';
    updateZoomDisplay(newWidth);

    console.log('Zoom In:', currentWidthPercent, '% ->', newWidth, '%');
}

function zoomOut() {
    const image = document.getElementById('infografiaImage');
    // Obtener el ancho actual
    const computedStyle = window.getComputedStyle(image);
    const currentWidthPx = parseFloat(computedStyle.width);
    const parentWidthPx = image.parentElement.offsetWidth;
    const currentWidthPercent = Math.round((currentWidthPx / parentWidthPx) * 100);

    const newWidth = Math.max(currentWidthPercent - 10, 50);
    image.style.width = newWidth + '%';
    updateZoomDisplay(newWidth);

    console.log('Zoom Out:', currentWidthPercent, '% ->', newWidth, '%');
}

function updateZoomDisplay(width) {
    const zoomLevel = document.getElementById('zoomLevel');
    if (zoomLevel) {
        zoomLevel.textContent = `${width}%`;
    }
}

/**
 * Manejo de teclado
 */
function handleKeyboard(e) {
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            navigateToSection('next');
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            navigateToSection('prev');
            break;
        case 'Home':
            e.preventDefault();
            navigateToSection(0);
            break;
        case 'End':
            e.preventDefault();
            navigateToSection(sections.length - 1);
            break;
        case '+':
        case '=':
            e.preventDefault();
            zoomIn();
            break;
        case '-':
            e.preventDefault();
            zoomOut();
            break;
    }
}
