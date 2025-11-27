/**
 * MIXEDGAME.JS
 * Juego mixto que combina memoria visual, auditiva y secuencial
 *
 * @module activities/MixedGame
 */

import { ActivityBase } from './ActivityBase.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Mixed Game - Desafío final combinando múltiples tipos de memoria
 *
 * @class MixedGame
 * @extends ActivityBase
 */
export class MixedGame extends ActivityBase {
    /**
     * Constructor de MixedGame
     * @param {Object} config - Configuración
     * @param {Array} config.challenges - Array de desafíos mixtos
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.challenges = config.challenges || [];
        this.currentChallenge = 0;
        this.score = 0;
        this.totalTime = 0;
        this.startTime = null;
    }

    getHTML() {
        if (this.currentChallenge >= this.challenges.length) {
            return this.renderComplete();
        }

        return `
            <div class="mixed-game">
                <div class="mixed-game__header">
                    <div class="mixed-game__info">
                        <span class="mixed-game__stat">Desafío: <strong>${this.currentChallenge + 1}</strong>/${this.challenges.length}</span>
                        <span class="mixed-game__stat">Puntuación: <strong>${this.score}</strong></span>
                    </div>
                </div>

                ${this.renderChallenge()}
            </div>
        `;
    }

    renderChallenge() {
        const challenge = this.challenges[this.currentChallenge];

        switch(challenge.type) {
            case 'memory_visual':
                return this.renderMemoryVisual(challenge);
            case 'sequence':
                return this.renderSequence(challenge);
            case 'audio_match':
                return this.renderAudioMatch(challenge);
            default:
                return '<p>Tipo de desafío no implementado</p>';
        }
    }

    renderMemoryVisual(challenge) {
        return `
            <div class="mixed-game__challenge">
                <h3 class="mixed-game__title">${challenge.title}</h3>
                <p class="mixed-game__instruction">${challenge.instruction}</p>

                <div class="mixed-game__visual-grid">
                    ${challenge.items.map(item => `
                        <div class="mixed-game__visual-item"
                             data-item-id="${item.id}"
                             role="button"
                             tabindex="0">
                            <img src="${getImageOrPlaceholder(item.image)}"
                                 alt="${item.name}"
                                 loading="lazy">
                        </div>
                    `).join('')}
                </div>

                <div class="mixed-game__question" style="display: none;">
                    <p><strong>${challenge.question}</strong></p>
                    <div class="mixed-game__options">
                        ${challenge.options.map(opt => `
                            <button class="btn btn--secondary mixed-game__option"
                                    data-option-id="${opt.id}"
                                    data-correct="${opt.correct}">
                                ${opt.label}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <button class="btn btn--primary mixed-game__next" data-action="show-question">
                    Continuar
                </button>

                <div class="mixed-game__feedback"></div>
            </div>
        `;
    }

    renderSequence(challenge) {
        return `
            <div class="mixed-game__challenge">
                <h3 class="mixed-game__title">${challenge.title}</h3>
                <p class="mixed-game__instruction">${challenge.instruction}</p>

                <div class="mixed-game__sequence">
                    ${challenge.sequence.map((item, index) => `
                        <div class="mixed-game__sequence-item"
                             data-position="${index}">
                            <span class="mixed-game__sequence-number">${index + 1}</span>
                            <span class="mixed-game__sequence-text">${item}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="mixed-game__question" style="display: none;">
                    <p><strong>${challenge.question}</strong></p>
                    <input type="text"
                           class="mixed-game__input"
                           placeholder="Tu respuesta"
                           data-answer="${challenge.answer}">
                    <button class="btn btn--primary" data-action="check-answer">
                        Verificar
                    </button>
                </div>

                <button class="btn btn--primary mixed-game__next" data-action="show-question">
                    Continuar
                </button>

                <div class="mixed-game__feedback"></div>
            </div>
        `;
    }

    renderAudioMatch(challenge) {
        return `
            <div class="mixed-game__challenge">
                <h3 class="mixed-game__title">${challenge.title}</h3>
                <p class="mixed-game__instruction">${challenge.instruction}</p>

                <div class="mixed-game__audio">
                    <button class="btn btn--primary mixed-game__audio-btn" data-audio="${challenge.audio}">
                        <span>🔊</span> Reproducir Audio
                    </button>
                </div>

                <div class="mixed-game__options">
                    ${challenge.options.map(opt => `
                        <div class="mixed-game__option-card"
                             data-option-id="${opt.id}"
                             data-correct="${opt.correct}"
                             role="button"
                             tabindex="0">
                            <img src="${getImageOrPlaceholder(opt.image)}"
                                 alt="${opt.label}"
                                 loading="lazy">
                            <span>${opt.label}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="mixed-game__feedback"></div>
            </div>
        `;
    }

    renderComplete() {
        const avgTime = this.totalTime / this.challenges.length;
        const percentage = Math.round((this.score / (this.challenges.length * 100)) * 100);

        return `
            <div class="mixed-game__complete">
                <div class="mixed-game__complete-icon">🏆</div>
                <h2>¡Desafío Completado!</h2>

                <div class="mixed-game__stats">
                    <div class="mixed-game__stat-card">
                        <span class="mixed-game__stat-label">Puntuación Final</span>
                        <span class="mixed-game__stat-value">${this.score} / ${this.challenges.length * 100}</span>
                    </div>
                    <div class="mixed-game__stat-card">
                        <span class="mixed-game__stat-label">Porcentaje</span>
                        <span class="mixed-game__stat-value">${percentage}%</span>
                    </div>
                    <div class="mixed-game__stat-card">
                        <span class="mixed-game__stat-label">Tiempo Promedio</span>
                        <span class="mixed-game__stat-value">${avgTime.toFixed(1)}s</span>
                    </div>
                </div>

                <button class="btn btn--primary" data-action="restart">
                    Jugar de Nuevo
                </button>
            </div>
        `;
    }

    attachEventListeners() {
        const challenge = this.challenges[this.currentChallenge];
        if (!challenge) return;

        this.startTime = Date.now();

        if (challenge.type === 'memory_visual') {
            this.attachMemoryVisualEvents();
        } else if (challenge.type === 'sequence') {
            this.attachSequenceEvents();
        } else if (challenge.type === 'audio_match') {
            this.attachAudioMatchEvents();
        }

        // Botón reiniciar
        const restartBtn = this.container.querySelector('[data-action="restart"]');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.reset());
        }
    }

    attachMemoryVisualEvents() {
        const showBtn = this.container.querySelector('[data-action="show-question"]');
        const grid = this.container.querySelector('.mixed-game__visual-grid');
        const questionDiv = this.container.querySelector('.mixed-game__question');
        const options = this.container.querySelectorAll('.mixed-game__option');

        if (showBtn) {
            showBtn.addEventListener('click', () => {
                grid.style.display = 'none';
                questionDiv.style.display = 'block';
                showBtn.style.display = 'none';
            });
        }

        options.forEach(btn => {
            btn.addEventListener('click', () => {
                const correct = btn.dataset.correct === 'true';
                this.handleAnswer(correct);
            });
        });
    }

    attachSequenceEvents() {
        const showBtn = this.container.querySelector('[data-action="show-question"]');
        const sequence = this.container.querySelector('.mixed-game__sequence');
        const questionDiv = this.container.querySelector('.mixed-game__question');
        const checkBtn = this.container.querySelector('[data-action="check-answer"]');
        const input = this.container.querySelector('.mixed-game__input');

        if (showBtn) {
            showBtn.addEventListener('click', () => {
                sequence.style.display = 'none';
                questionDiv.style.display = 'block';
                showBtn.style.display = 'none';
            });
        }

        if (checkBtn && input) {
            checkBtn.addEventListener('click', () => {
                const userAnswer = input.value.trim().toLowerCase();
                const correctAnswer = input.dataset.answer.toLowerCase();
                const correct = userAnswer === correctAnswer;
                this.handleAnswer(correct);
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkBtn.click();
                }
            });
        }
    }

    attachAudioMatchEvents() {
        const audioBtn = this.container.querySelector('.mixed-game__audio-btn');
        const options = this.container.querySelectorAll('.mixed-game__option-card');

        if (audioBtn) {
            audioBtn.addEventListener('click', () => {
                const audioPath = audioBtn.dataset.audio;

                if (!audioPath) {
                    this.showFeedback(false, 'No se encontró el archivo de audio');
                    return;
                }

                // Crear y reproducir audio
                const audio = new Audio(audioPath);

                // Deshabilitar botón mientras se reproduce
                audioBtn.disabled = true;
                audioBtn.innerHTML = '<span>🔊</span> Reproduciendo...';

                audio.play()
                    .then(() => {
                        this.showFeedback(true, 'Audio reproducido correctamente');
                    })
                    .catch(err => {
                        console.error('Error al reproducir audio:', err);
                        this.showFeedback(false, 'Error al reproducir el audio. Verifica que el archivo existe.');
                    })
                    .finally(() => {
                        // Rehabilitar botón cuando termine
                        audio.addEventListener('ended', () => {
                            audioBtn.disabled = false;
                            audioBtn.innerHTML = '<span>🔊</span> Reproducir Audio';
                        });

                        // Rehabilitar también si hubo error
                        setTimeout(() => {
                            audioBtn.disabled = false;
                            audioBtn.innerHTML = '<span>🔊</span> Reproducir Audio';
                        }, audio.duration * 1000 || 3000);
                    });
            });
        }

        options.forEach(card => {
            card.addEventListener('click', () => {
                const correct = card.dataset.correct === 'true';
                this.handleAnswer(correct);
            });
        });
    }

    handleAnswer(correct) {
        const timeSpent = (Date.now() - this.startTime) / 1000;
        this.totalTime += timeSpent;

        const feedbackDiv = this.container.querySelector('.mixed-game__feedback');

        if (correct) {
            // Puntuación: 100 puntos base - penalización por tiempo
            const points = Math.max(50, Math.round(100 - timeSpent));
            this.score += points;

            feedbackDiv.innerHTML = `
                <div class="feedback feedback--success">
                    ¡Correcto! +${points} puntos
                </div>
            `;
        } else {
            feedbackDiv.innerHTML = `
                <div class="feedback feedback--error">
                    Incorrecto. Intenta concentrarte más.
                </div>
            `;
        }

        setTimeout(() => {
            this.currentChallenge++;
            if (this.currentChallenge >= this.challenges.length) {
                this.complete();
            }
            this.render();
        }, 1500);
    }

    reset() {
        this.currentChallenge = 0;
        this.score = 0;
        this.totalTime = 0;
        this.isCompleted = false;
        this.render();
    }
}
