/**
 * REVEALBOXES.JS
 * Actividad de revelación de elementos ocultos
 *
 * @module activities/RevealBoxes
 */

import { ActivityBase } from './ActivityBase.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Reveal Boxes - Actividad de revelación de elementos
 *
 * @class RevealBoxes
 * @extends ActivityBase
 */
export class RevealBoxes extends ActivityBase {
    /**
     * Constructor de RevealBoxes
     * @param {Object} config - Configuración de la actividad
     * @param {number} config.boxes - Número de cuadros
     * @param {Array} config.data - Datos de los elementos a revelar
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.revealedBoxes = new Set();
        this.boxes = config.settings?.shuffleOrder ?
            shuffle(config.data) : config.data;
    }

    getHTML() {
        return `
            <div class="reveal-boxes">
                <div class="reveal-boxes__header">
                    <span class="reveal-boxes__progress">
                        Revelados: <strong>${this.revealedBoxes.size}</strong>/${this.boxes.length}
                    </span>
                    <button class="btn btn--small reveal-boxes__reset" data-action="reset">
                        Reiniciar ↻
                    </button>
                </div>
                <div class="reveal-boxes__grid" data-count="${this.boxes.length}">
                    ${this.boxes.map((box, index) => this.renderBox(box, index)).join('')}
                </div>
            </div>
        `;
    }

    renderBox(box, index) {
        const isRevealed = this.revealedBoxes.has(index);
        return `
            <div class="reveal-box ${isRevealed ? 'is-revealed' : ''}"
                 data-box-index="${index}"
                 tabindex="0"
                 role="button"
                 aria-label="Cuadro ${index + 1}: ${isRevealed ? box.name : 'sin revelar'}">
                <div class="reveal-box__content">
                    <img src="${getImageOrPlaceholder(box.image)}"
                         alt="${box.name}"
                         loading="lazy">
                    <span class="reveal-box__label">${box.name}</span>
                </div>
                <div class="reveal-box__overlay">
                    <span class="reveal-box__hint">?</span>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const grid = this.container.querySelector('.reveal-boxes__grid');
        const resetBtn = this.container.querySelector('[data-action="reset"]');

        // Click en cuadros
        grid.addEventListener('click', (e) => {
            const box = e.target.closest('.reveal-box');
            if (box) this.handleBoxClick(box);
        });

        // Teclado en cuadros
        grid.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const box = e.target.closest('.reveal-box');
                if (box) {
                    e.preventDefault();
                    this.handleBoxClick(box);
                }
            }
        });

        // Reset
        resetBtn.addEventListener('click', () => this.reset());
    }

    handleBoxClick(boxElement) {
        if (boxElement.classList.contains('is-revealed')) return;

        const index = parseInt(boxElement.dataset.boxIndex);
        this.revealBox(boxElement, index);
    }

    revealBox(boxElement, index) {
        boxElement.classList.add('is-revealed');
        this.revealedBoxes.add(index);
        this.updateProgress();

        // Verificar si reveló todos
        if (this.revealedBoxes.size === this.boxes.length) {
            setTimeout(() => this.complete(), 500);
        }
    }

    updateProgress() {
        const progressElement = this.container.querySelector('.reveal-boxes__progress strong');
        if (progressElement) {
            progressElement.textContent = this.revealedBoxes.size;
        }
    }

    reset() {
        this.revealedBoxes.clear();
        this.isCompleted = false;
        this.render();
    }
}
