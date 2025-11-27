/**
 * FILLINBLANK.JS
 * Actividad de completar oraciones con audio
 *
 * @module activities/FillInBlank
 */

import { AudioActivity } from './AudioActivity.js';
import { compareStrings } from '../../utils/helpers.js';

/**
 * Fill in the Blank - Completar oraciones con audio
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
