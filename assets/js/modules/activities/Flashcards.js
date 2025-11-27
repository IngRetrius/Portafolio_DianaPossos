/**
 * FLASHCARDS.JS
 * Tarjetas interactivas con navegación y flip
 *
 * @module activities/Flashcards
 */

import { ActivityBase } from './ActivityBase.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Flashcards - Tarjetas interactivas con navegación
 *
 * @class Flashcards
 * @extends ActivityBase
 */
export class Flashcards extends ActivityBase {
    constructor(config, containerId) {
        super(config, containerId);
        this.currentIndex = 0;
        this.isFlipped = false;
        this.viewedCards = new Set();
        this.cards = config.settings?.shuffleOrder ?
            shuffle(config.cards) : config.cards;
    }

    getHTML() {
        return `
            <div class="flashcards">
                <div class="flashcards__header">
                    <span class="flashcards__counter">
                        <strong>${this.currentIndex + 1}</strong> / ${this.cards.length}
                    </span>
                    <span class="flashcards__progress">
                        Vistas: <strong>${this.viewedCards.size}</strong>/${this.cards.length}
                    </span>
                </div>

                <div class="flashcards__container">
                    <div class="flashcard ${this.isFlipped ? 'is-flipped' : ''}"
                         tabindex="0"
                         role="button"
                         aria-label="Tarjeta: click para voltear">
                        <div class="flashcard__inner">
                            <div class="flashcard__face flashcard__face--front">
                                ${this.renderFront()}
                            </div>
                            <div class="flashcard__face flashcard__face--back">
                                ${this.renderBack()}
                            </div>
                        </div>
                    </div>
                    <button class="flashcard__flip-hint">Click para voltear</button>
                </div>

                <div class="flashcards__navigation">
                    <button class="btn btn--secondary flashcards__btn"
                            data-action="prev"
                            ${this.currentIndex === 0 ? 'disabled' : ''}>
                        ← Anterior
                    </button>
                    <button class="btn btn--secondary flashcards__btn"
                            data-action="next"
                            ${this.currentIndex === this.cards.length - 1 ? 'disabled' : ''}>
                        Siguiente →
                    </button>
                </div>
            </div>
        `;
    }

    renderFront() {
        const card = this.cards[this.currentIndex];
        return `<img src="${getImageOrPlaceholder(card.front)}" alt="${card.alt || 'Imagen frontal'}" loading="lazy">`;
    }

    renderBack() {
        const card = this.cards[this.currentIndex];
        return `<div class="flashcard__text">${card.back}</div>`;
    }

    attachEventListeners() {
        const flashcard = this.container.querySelector('.flashcard');
        const prevBtn = this.container.querySelector('[data-action="prev"]');
        const nextBtn = this.container.querySelector('[data-action="next"]');

        // Flip al hacer click
        flashcard.addEventListener('click', () => this.toggleFlip());

        // Flip con teclado (Enter/Space)
        flashcard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleFlip();
            }
        });

        // Navegación
        prevBtn.addEventListener('click', () => this.navigate(-1));
        nextBtn.addEventListener('click', () => this.navigate(1));

        // Navegación con teclado (flechas)
        document.addEventListener('keydown', this.handleKeyboardNav.bind(this));
    }

    toggleFlip() {
        this.isFlipped = !this.isFlipped;
        const flashcard = this.container.querySelector('.flashcard');
        flashcard.classList.toggle('is-flipped');

        // Marcar como vista
        if (!this.viewedCards.has(this.currentIndex)) {
            this.viewedCards.add(this.currentIndex);
            this.updateProgress();

            // Verificar si vio todas
            if (this.viewedCards.size === this.cards.length) {
                setTimeout(() => this.complete(), 800);
            }
        }
    }

    navigate(direction) {
        const newIndex = this.currentIndex + direction;

        if (newIndex < 0 || newIndex >= this.cards.length) return;

        this.currentIndex = newIndex;
        this.isFlipped = false;
        this.render();
    }

    handleKeyboardNav(e) {
        if (!this.isActive) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.navigate(-1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.navigate(1);
                break;
        }
    }

    updateProgress() {
        const progressElement = this.container.querySelector('.flashcards__progress strong');
        if (progressElement) {
            progressElement.textContent = this.viewedCards.size;
        }
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyboardNav);
        super.destroy();
    }
}
