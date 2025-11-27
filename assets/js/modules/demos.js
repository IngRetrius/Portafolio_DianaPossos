/**
 * DEMOS.JS
 * Controlador principal para la página de demos interactivas
 * Maneja navegación entre tabs y coordinación de módulos
 */

import { DEMOS_CONFIG, getTotalActivities } from '../data/demos-data.js';

/**
 * Estado global de la aplicación
 */
const state = {
    currentTab: 'modulo-0',
    initialized: false
};

/**
 * Inicializar la aplicación de demos
 */
function init() {
    if (state.initialized) return;

    // Configurar navegación del header
    initHeaderNavigation();

    // Configurar navegación de tabs (mantener compatibilidad)
    initTabNavigation();

    // Configurar navegación por hash URL
    initHashNavigation();

    // Configurar navegación por teclado
    initKeyboardNavigation();

    // Cargar tab desde URL o mostrar el primero
    loadTabFromHash();

    state.initialized = true;
    console.log('Demos initialized successfully');
}

/**
 * Inicializar navegación del header
 */
function initHeaderNavigation() {
    // Navegación principal (módulos en header)
    const navLinks = document.querySelectorAll('.nav__link[data-module]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleId = e.currentTarget.dataset.module;

            // switchTab se encarga de activar visualmente el link
            switchTab(moduleId);
        });
    });

    // Hamburger menu (móvil)
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }
}

/**
 * Inicializar navegación de tabs
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.demo-tabs__btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tabId = e.currentTarget.dataset.tab;
            switchTab(tabId);
        });
    });
}

/**
 * Inicializar navegación por hash URL
 */
function initHashNavigation() {
    window.addEventListener('hashchange', () => {
        loadTabFromHash();
    });
}

/**
 * Inicializar navegación por teclado
 */
function initKeyboardNavigation() {
    const tabButtons = document.querySelectorAll('.demo-tabs__btn');

    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            let newIndex = index;

            switch (e.key) {
                case 'ArrowLeft':
                    newIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    newIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                    e.preventDefault();
                    break;
                case 'Home':
                    newIndex = 0;
                    e.preventDefault();
                    break;
                case 'End':
                    newIndex = tabButtons.length - 1;
                    e.preventDefault();
                    break;
                default:
                    return;
            }

            tabButtons[newIndex].focus();
            tabButtons[newIndex].click();
        });
    });
}

/**
 * Cargar tab desde hash URL
 */
function loadTabFromHash() {
    const hash = window.location.hash.slice(1); // Remover #

    if (hash && hash.startsWith('modulo-')) {
        switchTab(hash);
    } else {
        // Cargar módulo 0 por defecto
        switchTab('modulo-0');
    }
}

/**
 * Cambiar a un tab específico
 * @param {string} tabId - ID del tab a activar
 */
function switchTab(tabId) {
    // Validar que el panel existe
    const tabPanel = document.getElementById(`panel-${tabId}`);

    if (!tabPanel) {
        console.error(`Tab panel ${tabId} no encontrado`);
        return;
    }

    // Desactivar todos los panels
    const allTabPanels = document.querySelectorAll('.demo-panel');
    allTabPanels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Activar el panel seleccionado
    tabPanel.classList.add('active');

    // Actualizar botones de tabs antiguos (si existen)
    const allTabButtons = document.querySelectorAll('.demo-tabs__btn');
    allTabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (tabButton) {
        tabButton.classList.add('active');
        tabButton.setAttribute('aria-selected', 'true');
    }

    // Actualizar links del header
    const allNavLinks = document.querySelectorAll('.nav__link[data-module]');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
    });

    const navLink = document.querySelector(`.nav__link[data-module="${tabId}"]`);
    if (navLink) {
        navLink.classList.add('active');
    }

    // Actualizar hash URL
    if (window.location.hash !== `#${tabId}`) {
        window.history.pushState(null, '', `#${tabId}`);
    }

    // Actualizar estado
    state.currentTab = tabId;

    // Scroll al inicio del contenido con un pequeño offset para el header fijo
    window.scrollTo({
        top: tabPanel.offsetTop - 120,
        behavior: 'smooth'
    });

    // Disparar evento personalizado
    document.dispatchEvent(new CustomEvent('demo:tabChanged', {
        detail: { tabId, moduleConfig: getModuleConfig(tabId) }
    }));
}

/**
 * Obtener configuración del módulo actual
 * @param {string} moduleId - ID del módulo
 * @returns {Object|null} Configuración del módulo
 */
function getModuleConfig(moduleId) {
    return DEMOS_CONFIG.modules.find(module => module.id === moduleId) || null;
}

/**
 * Obtener ID del tab actual
 * @returns {string} ID del tab actual
 */
export function getCurrentTab() {
    return state.currentTab;
}

/**
 * API pública para cambiar tabs programáticamente
 * @param {string} tabId - ID del tab
 */
export function navigateToTab(tabId) {
    switchTab(tabId);
}

/**
 * Iniciar cuando el DOM esté listo
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exportar función de inicialización para uso manual
export { init };
