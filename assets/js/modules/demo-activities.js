/**
 * DEMO-ACTIVITIES.JS
 * Componentes reutilizables para actividades interactivas
 *
 * @module demo-activities
 * @requires utils/image-placeholders
 * @requires utils/helpers
 */

import { getImageOrPlaceholder } from '../utils/image-placeholders.js';
import { shuffle, generateId, wait, compareStrings, normalizeString } from '../utils/helpers.js';

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

/**
 * MEMORY GAME
 * Juego de memoria con emparejamiento de tarjetas
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

/**
 * FLASHCARDS
 * Tarjetas interactivas con navegación
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

/**
 * REVEAL BOXES
 * Actividad de revelación de elementos ocultos
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

/**
 * AUDIO ACTIVITY BASE
 * Clase base para actividades que utilizan audio
 *
 * @class AudioActivity
 * @extends ActivityBase
 */
export class AudioActivity extends ActivityBase {
    /**
     * Constructor de AudioActivity
     * @param {Object} config - Configuración de la actividad
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.audioPlayers = new Map();
        this.currentAudio = null;
    }

    /**
     * Crear reproductor de audio
     * @param {string} audioId - ID único para el audio
     * @param {string} src - URL del archivo de audio
     * @returns {HTMLAudioElement} Elemento de audio
     */
    createAudioPlayer(audioId, src) {
        const audio = new Audio(src);
        audio.preload = 'metadata';
        this.audioPlayers.set(audioId, audio);
        return audio;
    }

    /**
     * Reproducir audio
     * @param {string} audioId - ID del audio a reproducir
     * @returns {Promise} Promise de reproducción
     */
    async playAudio(audioId) {
        // Detener audio actual si existe
        if (this.currentAudio) {
            this.stopAudio(this.currentAudio);
        }

        const audio = this.audioPlayers.get(audioId);
        if (!audio) {
            console.error(`Audio ${audioId} not found`);
            return;
        }

        try {
            await audio.play();
            this.currentAudio = audioId;
            return audio;
        } catch (error) {
            console.error('Audio playback failed:', error);
            // Mostrar mensaje al usuario que requiere interacción
            this.showFeedback(false, 'Haz click primero para habilitar el audio');
        }
    }

    /**
     * Pausar audio
     * @param {string} audioId - ID del audio
     */
    pauseAudio(audioId) {
        const audio = this.audioPlayers.get(audioId);
        if (audio) {
            audio.pause();
        }
    }

    /**
     * Detener audio
     * @param {string} audioId - ID del audio
     */
    stopAudio(audioId) {
        const audio = this.audioPlayers.get(audioId);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        if (this.currentAudio === audioId) {
            this.currentAudio = null;
        }
    }

    /**
     * Renderizar controles de audio
     * @param {string} audioId - ID del audio
     * @param {string} label - Etiqueta del botón
     * @returns {string} HTML de controles
     */
    renderAudioControls(audioId, label = 'Reproducir') {
        return `
            <div class="audio-controls" data-audio-id="${audioId}">
                <button class="btn btn--secondary audio-controls__btn"
                        data-action="play"
                        aria-label="${label}">
                    <span class="audio-controls__icon">▶</span>
                    <span class="audio-controls__label">${label}</span>
                </button>
            </div>
        `;
    }

    /**
     * Adjuntar eventos de audio
     */
    attachAudioEvents() {
        const controls = this.container.querySelectorAll('.audio-controls');

        controls.forEach(control => {
            const audioId = control.dataset.audioId;
            const playBtn = control.querySelector('[data-action="play"]');

            playBtn.addEventListener('click', async () => {
                const audio = this.audioPlayers.get(audioId);
                if (!audio) return;

                if (audio.paused) {
                    await this.playAudio(audioId);
                    playBtn.querySelector('.audio-controls__icon').textContent = '⏸';
                } else {
                    this.pauseAudio(audioId);
                    playBtn.querySelector('.audio-controls__icon').textContent = '▶';
                }
            });

            // Listener cuando termine el audio
            const audio = this.audioPlayers.get(audioId);
            if (audio) {
                audio.addEventListener('ended', () => {
                    playBtn.querySelector('.audio-controls__icon').textContent = '▶';
                    this.currentAudio = null;
                });
            }
        });
    }

    /**
     * Limpiar recursos de audio al destruir
     */
    destroy() {
        // Detener y limpiar todos los audios
        this.audioPlayers.forEach((audio, id) => {
            audio.pause();
            audio.src = '';
        });
        this.audioPlayers.clear();
        this.currentAudio = null;
        super.destroy();
    }
}

/**
 * DRAG DROP ACTIVITY BASE
 * Clase base para actividades con drag & drop
 *
 * @class DragDropActivity
 * @extends ActivityBase
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

/**
 * FILL IN THE BLANK
 * Actividad de completar oraciones con audio
 *
 * @class FillInBlank
 * @extends AudioActivity
 */
export class FillInBlank extends AudioActivity {
    /**
     * Constructor de FillInBlank
     * @param {Object} config - Configuración
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.questions = config.questions || [];
        this.currentQuestion = 0;
        this.correctAnswers = 0;
    }

    getHTML() {
        return `
            <div class="fill-blank">
                <div class="fill-blank__header">
                    <span class="fill-blank__progress">
                        Pregunta <strong>${this.currentQuestion + 1}</strong>/${this.questions.length}
                    </span>
                    <span class="fill-blank__score">
                        Correctas: <strong>${this.correctAnswers}</strong>
                    </span>
                </div>
                ${this.renderQuestion()}
            </div>
        `;
    }

    renderQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            return this.renderComplete();
        }

        const question = this.questions[this.currentQuestion];
        const audioId = `audio-${this.currentQuestion}`;

        // Crear audio player
        this.createAudioPlayer(audioId, question.audio);

        return `
            <div class="fill-blank__question">
                ${this.renderAudioControls(audioId, 'Escuchar oración')}
                <p class="fill-blank__sentence">${question.sentence}</p>
                <div class="fill-blank__input-group">
                    <input type="text"
                           class="fill-blank__input"
                           placeholder="Escribe la palabra faltante"
                           autocomplete="off"
                           data-question="${this.currentQuestion}">
                    <button class="btn btn--primary fill-blank__check"
                            data-action="check">
                        Verificar
                    </button>
                </div>
                <div class="fill-blank__feedback"></div>
            </div>
        `;
    }

    renderComplete() {
        const percentage = Math.round((this.correctAnswers / this.questions.length) * 100);
        return `
            <div class="fill-blank__complete">
                <h3>Actividad Completada</h3>
                <p class="fill-blank__final-score">
                    Puntuación: <strong>${this.correctAnswers}/${this.questions.length}</strong> (${percentage}%)
                </p>
                <button class="btn btn--primary" data-action="restart">
                    Reiniciar
                </button>
            </div>
        `;
    }

    attachEventListeners() {
        this.attachAudioEvents();

        const checkBtn = this.container.querySelector('[data-action="check"]');
        const input = this.container.querySelector('.fill-blank__input');
        const restartBtn = this.container.querySelector('[data-action="restart"]');

        if (checkBtn && input) {
            checkBtn.addEventListener('click', () => this.checkAnswer());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer();
                }
            });
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.reset());
        }
    }

    checkAnswer() {
        const input = this.container.querySelector('.fill-blank__input');
        const feedbackDiv = this.container.querySelector('.fill-blank__feedback');
        const question = this.questions[this.currentQuestion];

        if (!input || !input.value.trim()) {
            feedbackDiv.innerHTML = '<p class="feedback feedback--error">Por favor escribe una respuesta</p>';
            return;
        }

        const userAnswer = input.value.trim();
        const caseSensitive = this.config.settings?.caseSensitive || false;

        // Verificar contra respuesta principal y alternativas
        const allAnswers = [question.answer, ...(question.alternatives || [])];
        const isCorrect = allAnswers.some(answer =>
            compareStrings(userAnswer, answer, caseSensitive)
        );

        if (isCorrect) {
            this.correctAnswers++;
            feedbackDiv.innerHTML = '<p class="feedback feedback--success">Correcto ✓</p>';

            setTimeout(() => {
                this.currentQuestion++;
                if (this.currentQuestion >= this.questions.length) {
                    this.complete();
                } else {
                    this.render();
                }
            }, 1500);
        } else {
            if (this.config.settings?.allowRetries !== false) {
                feedbackDiv.innerHTML = `<p class="feedback feedback--error">Incorrecto. Intenta de nuevo</p>`;
                input.value = '';
                input.focus();
            } else {
                feedbackDiv.innerHTML = `<p class="feedback feedback--error">Incorrecto. La respuesta era: ${question.answer}</p>`;
                setTimeout(() => {
                    this.currentQuestion++;
                    this.render();
                }, 2000);
            }
        }
    }

    reset() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.isCompleted = false;
        this.render();
    }
}

/**
 * SOUND MATCH
 * Actividad de emparejar sonidos con imágenes
 *
 * @class SoundMatch
 * @extends AudioActivity
 */
export class SoundMatch extends AudioActivity {
    /**
     * Constructor de SoundMatch
     * @param {Object} config - Configuración
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.pairs = config.data || [];
        this.matches = new Map();
        this.currentAudioPlaying = null;

        // Crear todos los audio players
        this.pairs.forEach((pair, index) => {
            this.createAudioPlayer(`sound-${index}`, pair.sound);
        });
    }

    getHTML() {
        return `
            <div class="sound-match">
                <div class="sound-match__header">
                    <span class="sound-match__progress">
                        Emparejados: <strong>${this.matches.size}</strong>/${this.pairs.length}
                    </span>
                    <button class="btn btn--small" data-action="reset">
                        Reiniciar ↻
                    </button>
                </div>
                <div class="sound-match__container">
                    <div class="sound-match__sounds">
                        <h4>Sonidos</h4>
                        ${this.pairs.map((pair, index) => this.renderSoundButton(pair, index)).join('')}
                    </div>
                    <div class="sound-match__images">
                        <h4>Imágenes</h4>
                        ${shuffle([...this.pairs]).map((pair, index) => this.renderImageCard(pair, index)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSoundButton(pair, index) {
        const audioId = `sound-${index}`;
        const isMatched = this.matches.has(pair.id);

        return `
            <button class="sound-match__sound-btn ${isMatched ? 'is-matched' : ''}"
                    data-sound-id="${pair.id}"
                    data-audio-id="${audioId}"
                    ${isMatched ? 'disabled' : ''}>
                <span class="sound-match__icon">🔊</span>
                <span class="sound-match__name">${pair.name}</span>
            </button>
        `;
    }

    renderImageCard(pair, index) {
        const isMatched = this.matches.has(pair.id);

        return `
            <div class="sound-match__image-card ${isMatched ? 'is-matched' : ''}"
                 data-image-id="${pair.id}">
                <img src="${getImageOrPlaceholder(pair.image)}"
                     alt="${pair.name}"
                     loading="lazy">
                <span class="sound-match__label">${pair.name}</span>
            </div>
        `;
    }

    attachEventListeners() {
        const soundButtons = this.container.querySelectorAll('.sound-match__sound-btn');
        const imageCards = this.container.querySelectorAll('.sound-match__image-card');
        const resetBtn = this.container.querySelector('[data-action="reset"]');

        soundButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const audioId = btn.dataset.audioId;
                const soundId = btn.dataset.soundId;

                this.playAudio(audioId);
                this.currentAudioPlaying = soundId;

                // Resaltar botón activo
                soundButtons.forEach(b => b.classList.remove('is-playing'));
                btn.classList.add('is-playing');
            });
        });

        imageCards.forEach(card => {
            card.addEventListener('click', () => {
                if (card.classList.contains('is-matched')) return;
                if (!this.currentAudioPlaying) {
                    this.showFeedback(false, 'Primero reproduce un sonido');
                    return;
                }

                const imageId = card.dataset.imageId;
                this.checkMatch(imageId);
            });
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    }

    checkMatch(imageId) {
        if (this.currentAudioPlaying === imageId) {
            this.matches.set(imageId, true);
            this.updateMatchedElements(imageId);

            if (this.matches.size === this.pairs.length) {
                setTimeout(() => this.complete(), 500);
            }

            this.currentAudioPlaying = null;
        } else {
            this.showFeedback(false, 'No coincide. Intenta de nuevo');
        }
    }

    updateMatchedElements(pairId) {
        const soundBtn = this.container.querySelector(`[data-sound-id="${pairId}"]`);
        const imageCard = this.container.querySelector(`[data-image-id="${pairId}"]`);

        if (soundBtn) {
            soundBtn.classList.add('is-matched');
            soundBtn.classList.remove('is-playing');
            soundBtn.disabled = true;
        }

        if (imageCard) {
            imageCard.classList.add('is-matched');
        }

        // Actualizar contador
        const progress = this.container.querySelector('.sound-match__progress strong');
        if (progress) {
            progress.textContent = this.matches.size;
        }
    }

    reset() {
        this.matches.clear();
        this.currentAudioPlaying = null;
        this.isCompleted = false;
        this.render();
    }
}

/**
 * Estilos para actividades
 */
function injectActivityStyles() {
    if (document.getElementById('demo-activities-styles')) return;

    const style = document.createElement('style');
    style.id = 'demo-activities-styles';
    style.textContent = `
        /* ========== MEMORY GAME ========== */
        .memory-game__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
            flex-wrap: wrap;
            gap: var(--spacing-sm);
        }

        .memory-game__info {
            display: flex;
            gap: var(--spacing-md);
        }

        .memory-game__stat {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
        }

        .memory-game__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: var(--spacing-md);
            max-width: 800px;
            margin: 0 auto;
        }

        .memory-game__grid[data-pairs="6"] {
            grid-template-columns: repeat(4, 1fr);
        }

        .memory-game__grid[data-pairs="8"] {
            grid-template-columns: repeat(4, 1fr);
        }

        .memory-card {
            aspect-ratio: 3/4;
            perspective: 1000px;
            cursor: pointer;
            border-radius: var(--border-radius);
        }

        .memory-card__inner {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .memory-card.is-flipped .memory-card__inner {
            transform: rotateY(180deg);
        }

        .memory-card__front,
        .memory-card__back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: var(--spacing-xs);
            padding: var(--spacing-sm);
        }

        .memory-card__front {
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            box-shadow: var(--shadow-md);
        }

        .memory-card__front::after {
            content: '?';
            font-size: 3rem;
            font-weight: 700;
            color: white;
        }

        .memory-card__back {
            background: white;
            border: 2px solid var(--color-border);
            box-shadow: var(--shadow-md);
            transform: rotateY(180deg);
        }

        .memory-card__back img {
            max-width: 100%;
            max-height: 70%;
            object-fit: contain;
            border-radius: var(--border-radius-sm);
        }

        .memory-card__label {
            font-size: var(--font-size-sm);
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: center;
        }

        .memory-card.is-matched .memory-card__inner {
            transform: rotateY(180deg);
            opacity: 0.6;
        }

        .memory-card:hover:not(.is-matched) {
            transform: translateY(-4px);
        }

        .memory-card:focus-visible {
            outline: 3px solid var(--color-accent);
            outline-offset: 2px;
        }

        /* ========== FLASHCARDS ========== */
        .flashcards {
            max-width: 600px;
            margin: 0 auto;
        }

        .flashcards__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
            padding: var(--spacing-sm) var(--spacing-md);
            background-color: var(--color-background-alt);
            border-radius: var(--border-radius);
        }

        .flashcards__counter,
        .flashcards__progress {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
        }

        .flashcards__container {
            position: relative;
            margin-bottom: var(--spacing-lg);
        }

        .flashcard {
            width: 100%;
            aspect-ratio: 4/3;
            perspective: 1000px;
            cursor: pointer;
        }

        .flashcard__inner {
            position: relative;
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .flashcard.is-flipped .flashcard__inner {
            transform: rotateY(180deg);
        }

        .flashcard__face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: var(--border-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-lg);
            box-shadow: var(--shadow-lg);
        }

        .flashcard__face--front {
            background: white;
            border: 2px solid var(--color-border);
        }

        .flashcard__face--front img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: var(--border-radius-sm);
        }

        .flashcard__face--back {
            background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
            transform: rotateY(180deg);
        }

        .flashcard__text {
            font-size: var(--font-size-2xl);
            font-weight: 700;
            color: white;
            text-align: center;
        }

        .flashcard__flip-hint {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            background: none;
            border: none;
            cursor: pointer;
        }

        .flashcards__navigation {
            display: flex;
            gap: var(--spacing-md);
            justify-content: center;
        }

        .flashcards__btn {
            min-width: 120px;
        }

        /* ========== REVEAL BOXES ========== */
        .reveal-boxes__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }

        .reveal-boxes__progress {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
        }

        .reveal-boxes__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: var(--spacing-md);
            max-width: 900px;
            margin: 0 auto;
        }

        .reveal-boxes__grid[data-count="8"] {
            grid-template-columns: repeat(4, 1fr);
        }

        .reveal-box {
            position: relative;
            aspect-ratio: 4/3;
            border-radius: var(--border-radius);
            overflow: hidden;
            cursor: pointer;
            transition: transform var(--transition-base);
        }

        .reveal-box:hover:not(.is-revealed) {
            transform: translateY(-4px);
        }

        .reveal-box:focus-visible {
            outline: 3px solid var(--color-accent);
            outline-offset: 2px;
        }

        .reveal-box__content {
            width: 100%;
            height: 100%;
            background: white;
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--spacing-sm);
            box-shadow: var(--shadow-md);
        }

        .reveal-box__content img {
            max-width: 100%;
            max-height: 70%;
            object-fit: contain;
            border-radius: var(--border-radius-sm);
        }

        .reveal-box__label {
            margin-top: var(--spacing-xs);
            font-size: var(--font-size-sm);
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: center;
        }

        .reveal-box__overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity var(--transition-base), transform var(--transition-base);
        }

        .reveal-box__hint {
            font-size: 3rem;
            font-weight: 700;
            color: white;
        }

        .reveal-box.is-revealed .reveal-box__overlay {
            opacity: 0;
            transform: scale(0.8);
            pointer-events: none;
        }

        /* ========== AUDIO CONTROLS ========== */
        .audio-controls {
            display: inline-flex;
            margin: var(--spacing-sm) 0;
        }

        .audio-controls__btn {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
        }

        .audio-controls__icon {
            font-size: var(--font-size-lg);
        }

        /* ========== DRAG & DROP ========== */
        [draggable="true"] {
            cursor: move;
            user-select: none;
            -webkit-user-select: none;
        }

        [draggable="true"].is-dragging {
            opacity: 0.5;
            cursor: grabbing;
        }

        .drag-item {
            transition: transform var(--transition-base), opacity var(--transition-base);
        }

        .drag-item:hover {
            transform: translateY(-2px);
        }

        .drop-zone {
            transition: background-color var(--transition-base), border-color var(--transition-base);
        }

        .drop-zone.is-over {
            background-color: var(--color-primary-light);
            border-color: var(--color-primary);
        }

        /* ========== FILL IN THE BLANK ========== */
        .fill-blank__header {
            display: flex;
            justify-content: space-between;
            margin-bottom: var(--spacing-lg);
            padding: var(--spacing-sm) var(--spacing-md);
            background-color: var(--color-background-alt);
            border-radius: var(--border-radius);
        }

        .fill-blank__progress, .fill-blank__score {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
        }

        .fill-blank__question {
            max-width: 600px;
            margin: 0 auto;
        }

        .fill-blank__sentence {
            font-size: var(--font-size-lg);
            margin: var(--spacing-lg) 0;
            text-align: center;
            line-height: 1.6;
        }

        .fill-blank__input-group {
            display: flex;
            gap: var(--spacing-sm);
            margin: var(--spacing-lg) 0;
        }

        .fill-blank__input {
            flex: 1;
            padding: var(--spacing-sm) var(--spacing-md);
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius);
            font-size: var(--font-size-base);
        }

        .fill-blank__input:focus {
            outline: none;
            border-color: var(--color-primary);
        }

        .fill-blank__feedback {
            margin-top: var(--spacing-md);
            text-align: center;
        }

        .feedback {
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius);
            font-weight: 600;
        }

        .feedback--success {
            background-color: var(--color-success);
            color: white;
        }

        .feedback--error {
            background-color: var(--color-error);
            color: white;
        }

        .fill-blank__complete {
            text-align: center;
            padding: var(--spacing-xl);
        }

        .fill-blank__final-score {
            font-size: var(--font-size-xl);
            margin: var(--spacing-md) 0;
        }

        /* ========== SOUND MATCH ========== */
        .sound-match__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }

        .sound-match__progress {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
        }

        .sound-match__container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
        }

        .sound-match__sounds h4, .sound-match__images h4 {
            margin-bottom: var(--spacing-md);
            color: var(--color-primary);
        }

        .sound-match__sounds {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        }

        .sound-match__sound-btn {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-sm) var(--spacing-md);
            background: white;
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: all var(--transition-base);
        }

        .sound-match__sound-btn:hover:not(:disabled) {
            border-color: var(--color-primary);
            transform: translateX(4px);
        }

        .sound-match__sound-btn.is-playing {
            background-color: var(--color-primary-light);
            border-color: var(--color-primary);
        }

        .sound-match__sound-btn.is-matched {
            background-color: var(--color-success);
            color: white;
            border-color: var(--color-success);
            opacity: 0.7;
        }

        .sound-match__icon {
            font-size: var(--font-size-xl);
        }

        .sound-match__images {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: var(--spacing-md);
        }

        .sound-match__image-card {
            background: white;
            border: 2px solid var(--color-border);
            border-radius: var(--border-radius);
            padding: var(--spacing-sm);
            cursor: pointer;
            transition: all var(--transition-base);
        }

        .sound-match__image-card:hover:not(.is-matched) {
            border-color: var(--color-primary);
            transform: translateY(-4px);
        }

        .sound-match__image-card.is-matched {
            border-color: var(--color-success);
            background-color: rgba(76, 175, 80, 0.1);
            opacity: 0.7;
        }

        .sound-match__image-card img {
            width: 100%;
            aspect-ratio: 1;
            object-fit: contain;
            border-radius: var(--border-radius-sm);
        }

        .sound-match__label {
            display: block;
            text-align: center;
            margin-top: var(--spacing-xs);
            font-size: var(--font-size-sm);
            font-weight: 600;
        }

        /* ========== FEEDBACK ========== */
        .activity-feedback {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: var(--spacing-xl);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-2xl);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--spacing-md);
            min-width: 300px;
            animation: feedbackSlideIn 0.3s ease;
        }

        .activity-feedback--fade-out {
            animation: feedbackSlideOut 0.3s ease forwards;
        }

        .activity-feedback__icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 700;
            color: white;
        }

        .activity-feedback--success .activity-feedback__icon {
            background-color: var(--color-success);
        }

        .activity-feedback--error .activity-feedback__icon {
            background-color: var(--color-error);
        }

        .activity-feedback__message {
            font-size: var(--font-size-lg);
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: center;
        }

        @keyframes feedbackSlideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }

        @keyframes feedbackSlideOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
            .memory-game__grid {
                grid-template-columns: repeat(3, 1fr);
                gap: var(--spacing-sm);
            }

            .memory-game__grid[data-pairs="6"],
            .memory-game__grid[data-pairs="8"] {
                grid-template-columns: repeat(3, 1fr);
            }

            .flashcard__text {
                font-size: var(--font-size-xl);
            }

            .flashcards__btn {
                min-width: 100px;
                font-size: var(--font-size-sm);
            }
        }

        @media (max-width: 480px) {
            .memory-game__grid {
                gap: var(--spacing-xs);
            }

            .memory-card__label {
                font-size: var(--font-size-xs);
            }

            .flashcard__text {
                font-size: var(--font-size-lg);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Inicializar sistema de actividades
 */
function init() {
    injectActivityStyles();

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
