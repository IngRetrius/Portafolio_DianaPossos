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
                    <div class="fill-blank__input-wrapper">
                        <input type="text"
                               class="fill-blank__input"
                               placeholder="Escribe la palabra faltante"
                               autocomplete="off"
                               data-question="${this.currentQuestion}">
                    </div>
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

        console.log('CheckAnswer llamado');
        console.log('Input:', input);
        console.log('FeedbackDiv:', feedbackDiv);
        console.log('Question:', question);

        if (!input || !input.value.trim()) {
            feedbackDiv.innerHTML = '<p class="feedback feedback--error">Por favor escribe una respuesta</p>';
            return;
        }

        const userAnswer = input.value.trim();
        const caseSensitive = this.config.settings?.caseSensitive || false;

        console.log('User answer:', userAnswer);
        console.log('Expected answer:', question.answer);
        console.log('Alternatives:', question.alternatives);

        // Verificar contra respuesta principal y alternativas
        const allAnswers = [question.answer, ...(question.alternatives || [])];
        console.log('All answers:', allAnswers);

        const isCorrect = allAnswers.some(answer => {
            const result = compareStrings(userAnswer, answer, caseSensitive);
            console.log(`Comparing "${userAnswer}" with "${answer}": ${result}`);
            return result;
        });

        console.log('Is correct:', isCorrect);

        if (isCorrect) {
            this.correctAnswers++;
            feedbackDiv.innerHTML = '<p class="feedback feedback--success">Correcto ✓</p>';

            setTimeout(() => {
                this.currentQuestion++;
                this.complete();
                this.render();
            }, 1500);
        } else {
            console.log('Mostrando mensaje de error');
            feedbackDiv.innerHTML = `<p class="feedback feedback--error">✗ Incorrecto. La respuesta correcta es: <strong>${question.answer}</strong></p>`;
            console.log('HTML asignado:', feedbackDiv.innerHTML);
            input.disabled = true;

            setTimeout(() => {
                this.currentQuestion++;
                this.complete();
                this.render();
            }, 2500);
        }
    }

    reset() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.isCompleted = false;
        this.render();
    }
}
