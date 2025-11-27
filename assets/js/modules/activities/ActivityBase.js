/**
 * ACTIVITYBASE.JS
 * Clase base para todas las actividades interactivas
 *
 * @module activities/ActivityBase
 */

/**
 * Clase base para todas las actividades
 * Proporciona funcionalidad común para renderizado, eventos y feedback
 *
 * @class ActivityBase
 * @property {Object} config - Configuración de la actividad
 * @property {string} containerId - ID del contenedor DOM
 * @property {HTMLElement} container - Elemento contenedor DOM
 * @property {boolean} isCompleted - Estado de completación
 * @property {boolean} isActive - Si la actividad está activa
 */
export class ActivityBase {
    /**
     * Constructor de ActivityBase
     * @param {Object} config - Configuración de la actividad desde demos-data.js
     * @param {string} config.id - ID único de la actividad
     * @param {string} config.type - Tipo de actividad (memory, flashcards, etc.)
     * @param {string} config.title - Título de la actividad
     * @param {string} containerId - ID del elemento DOM contenedor
     */
    constructor(config, containerId) {
        this.config = config;
        this.containerId = containerId;
        this.container = document.getElementById(containerId);
        this.isCompleted = false;
        this.isActive = false;
    }

    /**
     * Renderizar la actividad en el contenedor
     */
    render() {
        if (!this.container) {
            console.error(`Container ${this.containerId} not found`);
            return;
        }

        this.container.innerHTML = this.getHTML();
        this.attachEventListeners();
        this.isActive = true;
    }

    /**
     * Obtener HTML de la actividad (debe ser sobrescrito)
     */
    getHTML() {
        return '<div>Base activity</div>';
    }

    /**
     * Adjuntar event listeners (debe ser sobrescrito)
     */
    attachEventListeners() {
        // Override en clases hijas
    }

    /**
     * Completar la actividad
     */
    complete() {
        if (this.isCompleted) return;

        this.isCompleted = true;

        // Disparar evento de completación
        document.dispatchEvent(new CustomEvent('demo:activityComplete', {
            detail: {
                activityId: this.config.id,
                activityType: this.config.type
            }
        }));

        // Mostrar feedback
        this.showFeedback(true, 'Actividad Completada');
    }

    /**
     * Mostrar feedback visual
     */
    showFeedback(success, message) {
        const feedback = document.createElement('div');
        feedback.className = `activity-feedback ${success ? 'activity-feedback--success' : 'activity-feedback--error'}`;
        feedback.innerHTML = `
            <div class="activity-feedback__icon">${success ? '✓' : '✗'}</div>
            <div class="activity-feedback__message">${message}</div>
        `;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.classList.add('activity-feedback--fade-out');
            setTimeout(() => feedback.remove(), 300);
        }, 1500);
    }

    /**
     * Resetear la actividad
     */
    reset() {
        this.isCompleted = false;
        this.render();
    }

    /**
     * Cleanup al destruir
     */
    destroy() {
        this.isActive = false;
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
