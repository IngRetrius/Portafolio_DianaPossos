/**
 * ACTIVITIES-INIT.JS
 * Inicialización del sistema de actividades
 *
 * @module activities-init
 */

/**
 * Inicializar sistema de actividades
 */
function init() {
    // Escuchar eventos de completación para actualizar progreso
    document.addEventListener('demo:activityComplete', (e) => {
        // Importar dinámicamente el módulo de progreso
        import('./demo-progress.js').then(module => {
            module.markActivityCompleted(e.detail.activityId);
        });
    });

    console.log('Activity system initialized');
}

// Inicializar al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { init };
