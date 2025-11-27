/**
 * SOUNDMATCH.JS
 * Actividad de emparejar sonidos con imágenes
 *
 * @module activities/SoundMatch
 */

import { AudioActivity } from './AudioActivity.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Sound Match - Emparejar sonidos con imágenes
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
