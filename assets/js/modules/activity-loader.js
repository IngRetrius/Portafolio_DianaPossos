/**
 * ACTIVITY-LOADER.JS
 * Carga automática de actividades en sus contenedores
 */

import { getActivityConfig } from '../data/demos-data.js';
import { MemoryGame } from './activities/MemoryGame.js';
import { Flashcards } from './activities/Flashcards.js';
import { RevealBoxes } from './activities/RevealBoxes.js';
import { FillInBlank } from './activities/FillInBlank.js';
import { SoundMatch } from './activities/SoundMatch.js';
import { DragOrder } from './activities/DragOrder.js';
import { Maze } from './activities/Maze.js';
import { Categorize } from './activities/Categorize.js';
import { MixedGame } from './activities/MixedGame.js';
import { Certificate } from './activities/Certificate.js';

/**
 * Map de constructores de actividades
 */
const ACTIVITY_CONSTRUCTORS = {
    memory: MemoryGame,
    flashcards: Flashcards,
    reveal: RevealBoxes,
    fill_blank: FillInBlank,
    sound_match: SoundMatch,
    drag_order: DragOrder,
    maze: Maze,
    categorize: Categorize,
    mixed: MixedGame,
    certificate: Certificate
};

/**
 * Instancias activas de actividades
 */
const activeActivities = new Map();

/**
 * Cargar e inicializar una actividad
 * @param {string} activityId - ID de la actividad
 */
function loadActivity(activityId) {
    // Verificar si ya está cargada
    if (activeActivities.has(activityId)) {
        return activeActivities.get(activityId);
    }

    // Obtener configuración
    const config = getActivityConfig(activityId);
    if (!config) {
        console.error(`Activity config not found: ${activityId}`);
        return null;
    }

    // Obtener constructor
    const ActivityClass = ACTIVITY_CONSTRUCTORS[config.type];
    if (!ActivityClass) {
        console.warn(`Activity type not implemented yet: ${config.type}`);
        return null;
    }

    // Crear instancia
    const containerId = `activity-${activityId}`;
    const activity = new ActivityClass(config, containerId);

    // Renderizar
    activity.render();

    // Guardar instancia
    activeActivities.set(activityId, activity);

    return activity;
}

/**
 * Destruir una actividad
 * @param {string} activityId - ID de la actividad
 */
function unloadActivity(activityId) {
    const activity = activeActivities.get(activityId);
    if (activity) {
        activity.destroy();
        activeActivities.delete(activityId);
    }
}

/**
 * Cargar todas las actividades de un módulo
 * @param {string} moduleId - ID del módulo (ej: 'modulo-0')
 */
function loadModuleActivities(moduleId) {
    // Obtener todas las tarjetas de actividades del módulo
    const panel = document.getElementById(`panel-${moduleId}`);
    if (!panel) return;

    const activityCards = panel.querySelectorAll('[data-activity]');
    activityCards.forEach(card => {
        const activityId = card.dataset.activity;
        loadActivity(activityId);
    });
}

/**
 * Destruir todas las actividades de un módulo
 * @param {string} moduleId - ID del módulo
 */
function unloadModuleActivities(moduleId) {
    const panel = document.getElementById(`panel-${moduleId}`);
    if (!panel) return;

    const activityCards = panel.querySelectorAll('[data-activity]');
    activityCards.forEach(card => {
        const activityId = card.dataset.activity;
        unloadActivity(activityId);
    });
}

/**
 * Inicializar sistema de carga de actividades
 */
function init() {
    // Cargar actividades del módulo inicial (modulo-0)
    loadModuleActivities('modulo-0');

    // Escuchar cambios de tab para cargar/descargar actividades
    document.addEventListener('demo:tabChanged', (e) => {
        const { tabId } = e.detail;

        // Cargar actividades del nuevo tab
        setTimeout(() => {
            loadModuleActivities(tabId);
        }, 100);
    });

    console.log('Activity loader initialized');
}

// Inicializar al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

export { init, loadActivity, unloadActivity, loadModuleActivities };
