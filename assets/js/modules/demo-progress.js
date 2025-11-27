/**
 * DEMO-PROGRESS.JS
 * Sistema de seguimiento de progreso usando localStorage
 */

import { getTotalActivities } from '../data/demos-data.js';

/**
 * Clave para localStorage
 */
const STORAGE_KEY = 'wordwall-demos-progress';

/**
 * Estructura de datos de progreso
 */
const defaultProgress = {
    completed: [],        // Array de IDs de actividades completadas
    timestamps: {},       // Objeto con timestamps de completación
    badges: [],          // Array de badges desbloqueados
    lastVisit: null      // Timestamp de última visita
};

/**
 * Estado del progreso
 */
let progressState = null;

/**
 * Inicializar sistema de progreso
 */
function init() {
    loadProgress();
    updateProgressDisplay();
    setupEventListeners();
    updateLastVisit();
    console.log('Progress tracker initialized');
}

/**
 * Cargar progreso desde localStorage
 */
function loadProgress() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            progressState = JSON.parse(stored);
            // Asegurar que tiene todas las propiedades
            progressState = { ...defaultProgress, ...progressState };
        } else {
            progressState = { ...defaultProgress };
        }
    } catch (error) {
        console.error('Error loading progress:', error);
        progressState = { ...defaultProgress };
    }
}

/**
 * Guardar progreso en localStorage
 */
function saveProgress() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

/**
 * Actualizar timestamp de última visita
 */
function updateLastVisit() {
    if (progressState) {
        progressState.lastVisit = Date.now();
        saveProgress();
    }
}

/**
 * Marcar actividad como completada
 * @param {string} activityId - ID de la actividad
 */
export function markActivityCompleted(activityId) {
    if (!progressState.completed.includes(activityId)) {
        progressState.completed.push(activityId);
        progressState.timestamps[activityId] = Date.now();

        // Verificar badges
        checkAndUnlockBadges();

        saveProgress();
        updateProgressDisplay();

        // Disparar evento
        document.dispatchEvent(new CustomEvent('demo:activityCompleted', {
            detail: {
                activityId,
                totalCompleted: progressState.completed.length,
                percentage: getProgressPercentage()
            }
        }));

        // Mostrar celebración si completó todo
        if (progressState.completed.length === getTotalActivities()) {
            showCompletionCelebration();
        }
    }
}

/**
 * Verificar si una actividad está completada
 * @param {string} activityId - ID de la actividad
 * @returns {boolean}
 */
export function isActivityCompleted(activityId) {
    return progressState?.completed.includes(activityId) || false;
}

/**
 * Obtener porcentaje de progreso
 * @returns {number} Porcentaje (0-100)
 */
export function getProgressPercentage() {
    const total = getTotalActivities();
    const completed = progressState?.completed.length || 0;
    return Math.round((completed / total) * 100);
}

/**
 * Obtener número de actividades completadas
 * @returns {number}
 */
export function getCompletedCount() {
    return progressState?.completed.length || 0;
}

/**
 * Actualizar visualización del progreso en el header
 */
function updateProgressDisplay() {
    const progressCount = document.getElementById('progressCount');
    const progressBar = document.getElementById('progressBar');

    if (progressCount && progressBar) {
        const completed = getCompletedCount();
        const total = getTotalActivities();
        const percentage = getProgressPercentage();

        progressCount.textContent = `${completed}/${total}`;
        progressBar.style.width = `${percentage}%`;
    }

    // Actualizar estados de actividades en tarjetas
    updateActivityCardStates();
}

/**
 * Actualizar estados visuales de las tarjetas de actividades
 */
function updateActivityCardStates() {
    document.querySelectorAll('.demo-activity-card').forEach(card => {
        const activityId = card.dataset.activity;
        const statusElement = card.querySelector('.demo-activity-card__status');

        if (isActivityCompleted(activityId)) {
            statusElement.textContent = 'Completada ✓';
            statusElement.dataset.status = 'completed';
        } else {
            statusElement.textContent = 'Pendiente';
            statusElement.dataset.status = 'pending';
        }
    });
}

/**
 * Verificar y desbloquear badges
 */
function checkAndUnlockBadges() {
    const completed = progressState.completed.length;
    const badges = [
        { id: 'badge-3', threshold: 3, name: 'Primeros Pasos' },
        { id: 'badge-6', threshold: 6, name: 'Medio Camino' },
        { id: 'badge-9', threshold: 9, name: 'Casi Listo' },
        { id: 'badge-12', threshold: 12, name: 'Maestro de la Memoria' }
    ];

    badges.forEach(badge => {
        if (completed >= badge.threshold && !progressState.badges.includes(badge.id)) {
            progressState.badges.push(badge.id);
            showBadgeNotification(badge.name);
        }
    });
}

/**
 * Mostrar notificación de badge desbloqueado
 * @param {string} badgeName - Nombre del badge
 */
function showBadgeNotification(badgeName) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div class="badge-notification__content">
            <strong>Badge Desbloqueado</strong>
            <p>${badgeName}</p>
        </div>
    `;

    document.body.appendChild(notification);

    // Agregar estilos si no existen
    if (!document.getElementById('badge-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'badge-notification-styles';
        style.textContent = `
            .badge-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, var(--color-success) 0%, var(--color-accent) 100%);
                color: white;
                padding: var(--spacing-md);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                animation: slideInRight 0.4s ease, slideOutRight 0.4s ease 2.6s forwards;
            }
            .badge-notification__content strong {
                display: block;
                font-size: var(--font-size-lg);
                margin-bottom: var(--spacing-xs);
            }
            .badge-notification__content p {
                margin: 0;
                font-size: var(--font-size-base);
            }
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Eliminar después de la animación
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Mostrar celebración de completación
 */
function showCompletionCelebration() {
    const modal = document.createElement('div');
    modal.className = 'completion-modal';
    modal.innerHTML = `
        <div class="completion-modal__backdrop"></div>
        <div class="completion-modal__content">
            <h2>Felicitaciones</h2>
            <p>Has completado todas las actividades del Proyecto Wordwall</p>
            <p>Puedes generar tu certificado en el Módulo 5</p>
            <button class="btn btn--primary" onclick="this.closest('.completion-modal').remove()">
                Continuar
            </button>
        </div>
    `;

    // Agregar estilos
    if (!document.getElementById('completion-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'completion-modal-styles';
        style.textContent = `
            .completion-modal {
                position: fixed;
                inset: 0;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .completion-modal__backdrop {
                position: absolute;
                inset: 0;
                background-color: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(4px);
            }
            .completion-modal__content {
                position: relative;
                background: white;
                padding: var(--spacing-xl);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-xl);
                max-width: 500px;
                text-align: center;
                animation: scaleIn 0.4s ease;
            }
            .completion-modal__content h2 {
                color: var(--color-success);
                font-size: var(--font-size-2xl);
                margin: 0 0 var(--spacing-md) 0;
            }
            .completion-modal__content p {
                font-size: var(--font-size-lg);
                margin: var(--spacing-sm) 0;
            }
            .completion-modal__content button {
                margin-top: var(--spacing-lg);
            }
            @keyframes scaleIn {
                from { transform: scale(0.7); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(modal);
}

/**
 * Reiniciar todo el progreso
 */
export function resetProgress() {
    if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
        progressState = { ...defaultProgress };
        saveProgress();
        updateProgressDisplay();

        // Disparar evento
        document.dispatchEvent(new CustomEvent('demo:progressReset'));

        alert('Progreso reiniciado correctamente');
    }
}

/**
 * Configurar event listeners
 */
function setupEventListeners() {
    // Escuchar eventos de cambio de tab para actualizar visualización
    document.addEventListener('demo:tabChanged', () => {
        updateActivityCardStates();
    });
}

/**
 * Obtener información completa del progreso
 * @returns {Object} Estado del progreso
 */
export function getProgressInfo() {
    return {
        completed: progressState?.completed || [],
        totalActivities: getTotalActivities(),
        percentage: getProgressPercentage(),
        badges: progressState?.badges || [],
        lastVisit: progressState?.lastVisit
    };
}

/**
 * Iniciar cuando el DOM esté listo
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exportar función de inicialización
export { init };
