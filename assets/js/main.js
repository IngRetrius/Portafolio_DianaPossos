// ==========================================
// ARCHIVO PRINCIPAL - MAIN.JS ACTUALIZADO
// ==========================================

console.log('%c¡Portafolio de Diana Rocío Possos Beltrán!', 'color: #2E5BFF; font-size: 20px; font-weight: bold;');
console.log('%cMaestría en Recursos Digitales Aplicados a la Educación', 'color: #5A6C7D; font-size: 14px;');
console.log('%cEstructura Híbrida: Profesional + Productos Académicos', 'color: #8C30F5; font-size: 12px;');

function init() {
    console.log('🚀 Inicializando portafolio híbrido...');
    
    try {
        // 1. Pantalla de carga
        if (typeof createLoadingScreen === 'function') {
            createLoadingScreen();
            console.log('✓ Loading screen creado');
        }
        
        // 2. Navegación (CRÍTICO - con dropdown)
        if (typeof initNavigation === 'function') {
            initNavigation();
            console.log('✓ Navegación con dropdown inicializada');
        } else {
            console.error('❌ initNavigation no está definida');
        }
        
        // 3. Scroll Animations
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
            console.log('✓ Animaciones de scroll inicializadas');
        } else {
            console.error('❌ initScrollAnimations no está definida');
        }
        
        // 4. Modal System
        if (typeof initModal === 'function') {
            initModal();
            console.log('✓ Sistema de modales inicializado');
        } else {
            console.error('❌ initModal no está definida');
        }
        
        // 5. Tabs (NUEVO)
        if (typeof initTabs === 'function') {
            initTabs();
            console.log('✓ Sistema de tabs inicializado');
        } else {
            console.error('❌ initTabs no está definida');
        }
        
        // 6. Animaciones generales
        if (typeof initAnimations === 'function') {
            initAnimations();
            console.log('✓ Animaciones generales inicializadas');
        } else {
            console.error('❌ initAnimations no está definida');
        }
        
        // 7. Card hover effects
        if (typeof enhanceCardHover === 'function') {
            enhanceCardHover();
            console.log('✓ Efectos de hover mejorados');
        } else {
            console.warn('⚠️ enhanceCardHover no está definida');
        }
        
        // 8. Carousel
        if (typeof initCarousel === 'function') {
            initCarousel();
            console.log('✓ Carousel inicializado');
        } else {
            console.error('❌ initCarousel no está definida');
        }

        // 9. eBook Module
        if (typeof initEbook === 'function') {
            initEbook();
            console.log('✓ Módulo eBook inicializado');
        } else {
            console.error('❌ initEbook no está definida');
        }

        console.log('');
        console.log('✅ Portafolio híbrido inicializado correctamente');
        console.log('📦 Módulos cargados: Navigation, Scroll, Modal, Tabs, Animations, Carousel, eBook');
        
    } catch (error) {
        console.error('❌ Error crítico al inicializar:', error);
    }
}

// ====================================
// FUNCIONES ADICIONALES DE UTILIDAD
// ====================================

// Detección de sección visible (útil para analytics)
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.id;
        }
    });
    
    return currentSection;
}

// Log de navegación (opcional - para debugging)
let lastSection = '';
setInterval(() => {
    const current = getCurrentSection();
    if (current && current !== lastSection) {
        console.log(`📍 Sección actual: ${current}`);
        lastSection = current;
    }
}, 2000);

// ====================================
// EJECUCIÓN
// ====================================

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOM ya está listo
    init();
}

// Mensaje de bienvenida en consola
setTimeout(() => {
    console.log('');
    console.log('%c💡 Tip para desarrolladores:', 'color: #2E5BFF; font-weight: bold;');
    console.log('%cEste portafolio usa una arquitectura modular con separación de responsabilidades.', 'color: #5A6C7D;');
    console.log('%cCada módulo está en assets/js/modules/', 'color: #5A6C7D;');
    console.log('');
}, 3000);