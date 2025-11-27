/**
 * AUDIOACTIVITY.JS
 * Clase base abstracta para actividades con audio
 *
 * @module activities/AudioActivity
 */

import { ActivityBase } from './ActivityBase.js';

/**
 * Audio Activity - Clase base para actividades con audio
 *
 * @class AudioActivity
 * @extends ActivityBase
 * @abstract
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
