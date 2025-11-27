/**
 * MAZE.JS
 * Laberinto navegable siguiendo instrucciones
 *
 * @module activities/Maze
 */

import { ActivityBase } from './ActivityBase.js';

/**
 * Maze - Laberinto con navegación por instrucciones
 *
 * @class Maze
 * @extends ActivityBase
 */
export class Maze extends ActivityBase {
    /**
     * Constructor de Maze
     * @param {Object} config - Configuración
     * @param {number} config.gridSize - Tamaño del grid (ej: 5 para 5x5)
     * @param {Object} config.start - Posición inicial {x, y}
     * @param {Object} config.end - Posición objetivo {x, y}
     * @param {Array} config.obstacles - Array de obstáculos [{x, y}, ...]
     * @param {Array} config.instructions - Instrucciones a memorizar
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.gridSize = config.gridSize || 5;
        this.startPos = config.start || {x: 0, y: 0};
        this.endPos = config.end || config.goal || {x: 4, y: 4}; // Soportar tanto 'end' como 'goal'
        this.obstacles = config.obstacles || config.walls || []; // Soportar tanto 'obstacles' como 'walls'
        this.instructions = config.instructions || [];
        this.currentPos = {...this.startPos};
        this.path = [{...this.startPos}];
        this.movesCount = 0;
        this.showInstructions = this.instructions && this.instructions.length > 0;
        this.instructionTime = config.settings?.instructionTime || 10; // segundos
        this.timer = null;
    }

    getHTML() {
        return `
            <div class="maze">
                <div class="maze__header">
                    <div class="maze__info">
                        <span class="maze__stat">Movimientos: <strong>${this.movesCount}</strong></span>
                        <span class="maze__stat">Posición: <strong>(${this.currentPos.x}, ${this.currentPos.y})</strong></span>
                    </div>
                    <button class="btn btn--small" data-action="reset">
                        Reiniciar ↻
                    </button>
                </div>

                ${this.showInstructions ? this.renderInstructions() : ''}

                <div class="maze__container">
                    <div class="maze__grid" data-size="${this.gridSize}">
                        ${this.renderGrid()}
                    </div>

                    <div class="maze__controls">
                        <div class="maze__controls-row">
                            <button class="btn btn--secondary maze__btn" data-action="up" aria-label="Arriba">↑</button>
                        </div>
                        <div class="maze__controls-row">
                            <button class="btn btn--secondary maze__btn" data-action="left" aria-label="Izquierda">←</button>
                            <button class="btn btn--secondary maze__btn" data-action="down" aria-label="Abajo">↓</button>
                            <button class="btn btn--secondary maze__btn" data-action="right" aria-label="Derecha">→</button>
                        </div>
                    </div>
                </div>

                <div class="maze__feedback"></div>
            </div>
        `;
    }

    renderInstructions() {
        // Si no hay instrucciones, solo mostrar botón de comenzar
        if (!this.instructions || this.instructions.length === 0) {
            return `
                <div class="maze__instructions">
                    <p class="maze__instructions-text">Usa las flechas o los botones para llegar desde la casa (verde) hasta la escuela (roja).</p>
                    <button class="btn btn--primary" data-action="start">
                        Comenzar
                    </button>
                </div>
            `;
        }

        return `
            <div class="maze__instructions">
                <h4>Memoriza estas instrucciones:</h4>
                <ol class="maze__instructions-list">
                    ${this.instructions.map(inst => `<li>${inst}</li>`).join('')}
                </ol>
                <p class="maze__instructions-timer">Tiempo restante: <strong id="maze-timer">${this.instructionTime}</strong>s</p>
                <button class="btn btn--primary" data-action="start">
                    Comenzar
                </button>
            </div>
        `;
    }

    renderGrid() {
        let html = '';
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cellClass = this.getCellClass(x, y);
                const cellContent = this.getCellContent(x, y);
                html += `
                    <div class="maze__cell ${cellClass}"
                         data-x="${x}"
                         data-y="${y}">
                        ${cellContent}
                    </div>
                `;
            }
        }
        return html;
    }

    getCellClass(x, y) {
        const classes = [];

        // Inicio
        if (x === this.startPos.x && y === this.startPos.y) {
            classes.push('maze__cell--start');
        }

        // Fin
        if (x === this.endPos.x && y === this.endPos.y) {
            classes.push('maze__cell--end');
        }

        // Obstáculo
        if (this.isObstacle(x, y)) {
            classes.push('maze__cell--obstacle');
        }

        // Posición actual
        if (x === this.currentPos.x && y === this.currentPos.y) {
            classes.push('maze__cell--current');
        }

        // Camino recorrido
        if (this.isInPath(x, y)) {
            classes.push('maze__cell--visited');
        }

        return classes.join(' ');
    }

    getCellContent(x, y) {
        if (x === this.startPos.x && y === this.startPos.y) {
            return '<span class="maze__icon">🏁</span>';
        }
        if (x === this.endPos.x && y === this.endPos.y) {
            return '<span class="maze__icon">🎯</span>';
        }
        if (x === this.currentPos.x && y === this.currentPos.y) {
            return '<span class="maze__icon">👤</span>';
        }
        if (this.isObstacle(x, y)) {
            return '<span class="maze__icon">🚧</span>';
        }
        return '';
    }

    isObstacle(x, y) {
        return this.obstacles.some(obs => obs.x === x && obs.y === y);
    }

    isInPath(x, y) {
        return this.path.some(pos => pos.x === x && pos.y === y);
    }

    attachEventListeners() {
        const startBtn = this.container.querySelector('[data-action="start"]');
        const resetBtn = this.container.querySelector('[data-action="reset"]');
        const controlBtns = this.container.querySelectorAll('.maze__controls button[data-action]');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startMaze());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }

        controlBtns.forEach(btn => {
            const action = btn.dataset.action;
            if (['up', 'down', 'left', 'right'].includes(action)) {
                btn.addEventListener('click', () => this.move(action));
            }
        });

        // Navegación por teclado
        document.addEventListener('keydown', this.handleKeyboard.bind(this));
    }

    startMaze() {
        const instructionsDiv = this.container.querySelector('.maze__instructions');
        const timerSpan = this.container.querySelector('#maze-timer');

        // Si no hay instrucciones, solo ocultar el panel y empezar
        if (!this.instructions || this.instructions.length === 0) {
            this.showInstructions = false;
            if (instructionsDiv) {
                instructionsDiv.style.display = 'none';
            }
            return;
        }

        // Si hay instrucciones, iniciar temporizador
        let timeLeft = this.instructionTime;

        this.timer = setInterval(() => {
            timeLeft--;
            if (timerSpan) {
                timerSpan.textContent = timeLeft;
            }

            if (timeLeft <= 0) {
                clearInterval(this.timer);
                this.showInstructions = false;
                if (instructionsDiv) {
                    instructionsDiv.style.display = 'none';
                }
                this.showFeedback(true, '¡Comienza a navegar!');
            }
        }, 1000);
    }

    move(direction) {
        if (this.showInstructions) {
            this.showFeedback(false, 'Primero memoriza las instrucciones');
            return;
        }

        const newPos = {...this.currentPos};

        switch(direction) {
            case 'up':
                newPos.y--;
                break;
            case 'down':
                newPos.y++;
                break;
            case 'left':
                newPos.x--;
                break;
            case 'right':
                newPos.x++;
                break;
        }

        // Validar movimiento
        if (!this.isValidMove(newPos)) {
            this.showFeedback(false, 'Movimiento inválido');
            return;
        }

        // Actualizar posición
        this.currentPos = newPos;
        this.path.push({...newPos});
        this.movesCount++;

        // Re-renderizar grid
        this.updateGrid();

        // Verificar si llegó al final
        if (this.currentPos.x === this.endPos.x && this.currentPos.y === this.endPos.y) {
            setTimeout(() => {
                this.showFeedback(true, `¡Llegaste a la meta en ${this.movesCount} movimientos!`);
                this.complete();
            }, 300);
        }
    }

    isValidMove(pos) {
        // Fuera de límites
        if (pos.x < 0 || pos.x >= this.gridSize || pos.y < 0 || pos.y >= this.gridSize) {
            return false;
        }

        // Obstáculo
        if (this.isObstacle(pos.x, pos.y)) {
            return false;
        }

        return true;
    }

    updateGrid() {
        const gridDiv = this.container.querySelector('.maze__grid');
        if (gridDiv) {
            gridDiv.innerHTML = this.renderGrid();
        }

        const movesSpan = this.container.querySelector('.maze__stat strong');
        if (movesSpan) {
            movesSpan.textContent = this.movesCount;
        }

        const posSpan = this.container.querySelectorAll('.maze__stat strong')[1];
        if (posSpan) {
            posSpan.textContent = `(${this.currentPos.x}, ${this.currentPos.y})`;
        }
    }

    handleKeyboard(e) {
        if (!this.isActive || this.showInstructions) return;

        const keyMap = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'w': 'up',
            'W': 'up',
            's': 'down',
            'S': 'down',
            'a': 'left',
            'A': 'left',
            'd': 'right',
            'D': 'right'
        };

        const direction = keyMap[e.key];
        if (direction) {
            e.preventDefault();
            this.move(direction);
        }
    }

    reset() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.currentPos = {...this.startPos};
        this.path = [{...this.startPos}];
        this.movesCount = 0;
        this.showInstructions = true;
        this.isCompleted = false;
        this.render();
    }

    destroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        document.removeEventListener('keydown', this.handleKeyboard);
        super.destroy();
    }
}
