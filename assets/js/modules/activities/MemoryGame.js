/**
 * MEMORYGAME.JS
 * Juego de memoria con emparejamiento de tarjetas
 *
 * @module activities/MemoryGame
 */

import { ActivityBase } from './ActivityBase.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Memory Game - Juego de emparejamiento de tarjetas
 *
 * @class MemoryGame
 * @extends ActivityBase
 */
export class MemoryGame extends ActivityBase {
    constructor(config, containerId) {
        super(config, containerId);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isProcessing = false;
        this.attempts = 0;
    }

    getHTML() {
        // Generar tarjetas (duplicar cada par)
        this.cards = this.generateCards();

        return `
            <div class="memory-game">
                <div class="memory-game__header">
                    <div class="memory-game__info">
                        <span class="memory-game__stat">Pares: <strong>${this.matchedPairs}/${this.config.pairs}</strong></span>
                        <span class="memory-game__stat">Intentos: <strong id="attempts-${this.config.id}">0</strong></span>
                    </div>
                    <button class="btn btn--small memory-game__reset" data-action="reset">
                        Reiniciar ↻
                    </button>
                </div>
                <div class="memory-game__grid" data-pairs="${this.config.pairs}">
                    ${this.cards.map(card => this.renderCard(card)).join('')}
                </div>
            </div>
        `;
    }

    generateCards() {
        const pairs = this.config.data.map((item, index) => ({
            pairId: item.id,
            name: item.name,
            image: getImageOrPlaceholder(item.image),
            cardId: `${item.id}-a`
        }));

        const duplicates = this.config.data.map((item, index) => ({
            pairId: item.id,
            name: item.name,
            image: getImageOrPlaceholder(item.image),
            cardId: `${item.id}-b`
        }));

        return shuffle([...pairs, ...duplicates]);
    }

    renderCard(card) {
        return `
            <div class="memory-card"
                 data-card-id="${card.cardId}"
                 data-pair-id="${card.pairId}"
                 tabindex="0"
                 role="button"
                 aria-label="Tarjeta ${card.name}">
                <div class="memory-card__inner">
                    <div class="memory-card__front"></div>
                    <div class="memory-card__back">
                        <img src="${card.image}" alt="${card.name}" loading="lazy">
                        <span class="memory-card__label">${card.name}</span>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const grid = this.container.querySelector('.memory-game__grid');
        const resetBtn = this.container.querySelector('[data-action="reset"]');

        // Click en tarjetas
        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.memory-card');
            if (card) this.handleCardClick(card);
        });

        // Teclado en tarjetas
        grid.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const card = e.target.closest('.memory-card');
                if (card) {
                    e.preventDefault();
                    this.handleCardClick(card);
                }
            }
        });

        // Reset
        resetBtn.addEventListener('click', () => this.reset());
    }

    handleCardClick(cardElement) {
        // Validaciones
        if (this.isProcessing) return;
        if (cardElement.classList.contains('is-flipped')) return;
        if (cardElement.classList.contains('is-matched')) return;
        if (this.flippedCards.length >= 2) return;

        // Voltear tarjeta
        this.flipCard(cardElement);
        this.flippedCards.push(cardElement);

        // Si hay 2 tarjetas volteadas, verificar match
        if (this.flippedCards.length === 2) {
            this.isProcessing = true;
            this.attempts++;
            this.updateAttempts();
            this.checkMatch();
        }
    }

    flipCard(cardElement) {
        cardElement.classList.add('is-flipped');
    }

    unflipCard(cardElement) {
        cardElement.classList.remove('is-flipped');
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const pair1 = card1.dataset.pairId;
        const pair2 = card2.dataset.pairId;

        if (pair1 === pair2) {
            this.handleMatch();
        } else {
            this.handleMismatch();
        }
    }

    handleMatch() {
        const [card1, card2] = this.flippedCards;

        setTimeout(() => {
            card1.classList.add('is-matched');
            card2.classList.add('is-matched');

            this.matchedPairs++;
            this.updateStats();

            this.flippedCards = [];
            this.isProcessing = false;

            // Verificar si completó el juego
            if (this.matchedPairs === this.config.pairs) {
                setTimeout(() => {
                    this.complete();
                }, 500);
            }
        }, 600);
    }

    handleMismatch() {
        const [card1, card2] = this.flippedCards;

        setTimeout(() => {
            this.unflipCard(card1);
            this.unflipCard(card2);

            this.flippedCards = [];
            this.isProcessing = false;
        }, 1200);
    }

    updateStats() {
        const statElement = this.container.querySelector('.memory-game__stat strong');
        if (statElement) {
            statElement.textContent = `${this.matchedPairs}/${this.config.pairs}`;
        }
    }

    updateAttempts() {
        const attemptsElement = this.container.querySelector(`#attempts-${this.config.id}`);
        if (attemptsElement) {
            attemptsElement.textContent = this.attempts;
        }
    }

    reset() {
        this.matchedPairs = 0;
        this.attempts = 0;
        this.flippedCards = [];
        this.isProcessing = false;
        this.isCompleted = false;
        this.render();
    }
}
