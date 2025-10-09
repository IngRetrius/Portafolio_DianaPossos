// ==========================================
// ARCHIVO PRINCIPAL - MAIN.JS
// ==========================================

console.log('%c¡Portafolio de Diana Rocío Possos Beltrán!', 'color: #2E5BFF; font-size: 20px; font-weight: bold;');
console.log('%cMaestría en Recursos Digitales Aplicados a la Educación', 'color: #5A6C7D; font-size: 14px;');

function init() {
    console.log('🚀 Inicializando portafolio...');
    
    try {
        // Pantalla de carga
        if (typeof createLoadingScreen === 'function') {
            createLoadingScreen();
        }
        
        // Inicializar módulos en orden
        if (typeof initNavigation === 'function') {
            initNavigation();
        } else {
            console.error('❌ initNavigation no está definida');
        }
        
        if (typeof initScrollAnimations === 'function') {
            initScrollAnimations();
        } else {
            console.error('❌ initScrollAnimations no está definida');
        }
        
        if (typeof initModal === 'function') {
            initModal();
        } else {
            console.error('❌ initModal no está definida');
        }
        
        if (typeof initAnimations === 'function') {
            initAnimations();
        } else {
            console.error('❌ initAnimations no está definida');
        }
        
        if (typeof enhanceCardHover === 'function') {
            enhanceCardHover();
        } else {
            console.error('❌ enhanceCardHover no está definida');
        }
        
        if (typeof initCarousel === 'function') {
            initCarousel();
        } else {
            console.error('❌ initCarousel no está definida');
        }
        
        console.log('✅ Portafolio inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error al inicializar:', error);
    }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}