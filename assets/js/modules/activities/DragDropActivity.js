/**
 * DRAGDROPACTIVITY.JS
 * Clase base abstracta para actividades con drag & drop
 *
 * @module activities/DragDropActivity
 */

import { ActivityBase } from './ActivityBase.js';

/**
 * Drag & Drop Activity - Clase base para actividades con arrastre
 *
 * @class DragDropActivity
 * @extends ActivityBase
 * @abstract
 */
export class DragDropActivity extends ActivityBase {
    /**
     * Constructor de DragDropActivity
     * @param {Object} config - Configuración
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.draggedElement = null;
        this.touchElement = null;
        this.touchStartY = 0;
        this.isMobile = this.checkMobile();
    }

    /**
     * Detectar si es móvil
     * @returns {boolean}
     */
    checkMobile() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Inicializar drag & drop para desktop
     * @param {HTMLElement} container - Contenedor con elementos draggables
     */
    initDesktopDrag(container) {
        // Usar delegación de eventos para que funcione con elementos dinámicos
        container.addEventListener('dragstart', (e) => {
            const draggable = e.target.closest('[draggable="true"]');
            if (!draggable) return;

            this.draggedElement = draggable;
            draggable.classList.add('is-dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', draggable.innerHTML);
        });

        container.addEventListener('dragend', (e) => {
            const draggable = e.target.closest('[draggable="true"]');
            if (draggable) {
                draggable.classList.remove('is-dragging');
            }
            this.draggedElement = null;
        });

        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.draggedElement) {
                this.handleDrop(e.target, this.draggedElement);
            }
        });
    }

    /**
     * Inicializar drag & drop para móvil (touch)
     * @param {HTMLElement} container - Contenedor con elementos draggables
     */
    initTouchDrag(container) {
        container.addEventListener('touchstart', (e) => {
            const draggable = e.target.closest('[draggable="true"]');
            if (!draggable) return;

            this.touchElement = draggable;
            this.touchStartY = e.touches[0].clientY;
            draggable.classList.add('is-dragging');
        }, { passive: true });

        container.addEventListener('touchmove', (e) => {
            if (!this.touchElement) return;

            const touch = e.touches[0];
            const deltaY = touch.clientY - this.touchStartY;

            // Visual feedback
            this.touchElement.style.transform = `translateY(${deltaY}px)`;
            this.touchElement.style.opacity = '0.7';
        }, { passive: false });

        container.addEventListener('touchend', (e) => {
            if (!this.touchElement) return;

            const touch = e.changedTouches[0];
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

            this.handleDrop(dropTarget, this.touchElement);

            // Reset visual
            this.touchElement.style.transform = '';
            this.touchElement.style.opacity = '';
            this.touchElement.classList.remove('is-dragging');
            this.touchElement = null;
        });
    }

    /**
     * Manejar drop (debe ser sobreescrito por clases hijas)
     * @param {HTMLElement} dropTarget - Elemento donde se soltó
     * @param {HTMLElement} draggedElement - Elemento arrastrado
     */
    handleDrop(dropTarget, draggedElement) {
        console.warn('handleDrop should be overridden in child class');
    }

    /**
     * Inicializar sistema drag & drop completo
     * @param {HTMLElement} container - Contenedor
     */
    initDragDrop(container) {
        this.initDesktopDrag(container);
        if (this.isMobile) {
            this.initTouchDrag(container);
        }
    }
}
