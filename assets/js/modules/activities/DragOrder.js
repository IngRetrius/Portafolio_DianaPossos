/**
 * DRAGORDER.JS
 * Actividad de ordenamiento secuencial con drag & drop
 *
 * @module activities/DragOrder
 */

import { DragDropActivity } from './DragDropActivity.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Drag & Drop Order - Ordenar elementos en secuencia correcta
 *
 * @class DragOrder
 * @extends DragDropActivity
 */
export class DragOrder extends DragDropActivity {
    /**
     * Constructor de DragOrder
     * @param {Object} config - Configuración
     * @param {Array} config.sequence - Secuencia correcta de elementos
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.correctSequence = config.sequence || config.items || [];
        // Si shuffleInitial está en settings, mezclar, sino dejar como está
        const shouldShuffle = config.settings?.shuffleInitial !== false;
        this.currentSequence = shouldShuffle ? shuffle([...this.correctSequence]) : [...this.correctSequence];
        this.isCorrect = false;
    }

    getHTML() {
        return `
            <div class="drag-order">
                <div class="drag-order__header">
                    <h3 class="drag-order__instruction">${this.config.instruction || 'Arrastra para ordenar correctamente'}</h3>
                    <button class="btn btn--small" data-action="check">
                        Verificar Orden
                    </button>
                </div>

                <div class="drag-order__container">
                    <div class="drag-order__items" data-drop-zone="items">
                        ${this.currentSequence.map((item, index) => this.renderItem(item, index)).join('')}
                    </div>
                </div>

                <div class="drag-order__feedback"></div>

                <div class="drag-order__hint">
                    <p><strong>Pista:</strong> ${this.config.hint || 'Ordena los elementos en la secuencia correcta'}</p>
                </div>
            </div>
        `;
    }

    renderItem(item, index) {
        return `
            <div class="drag-order__item drag-item"
                 draggable="true"
                 data-item-id="${item.id}"
                 data-position="${index}"
                 tabindex="0"
                 role="button"
                 aria-label="${item.name}">
                <div class="drag-order__item-number">${index + 1}</div>
                <div class="drag-order__item-content">
                    <img src="${getImageOrPlaceholder(item.image)}"
                         alt="${item.name}"
                         loading="lazy">
                    <span class="drag-order__item-label">${item.name}</span>
                </div>
                <div class="drag-order__item-handle">
                    <span>⋮⋮</span>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const container = this.container.querySelector('.drag-order__items');
        const checkBtn = this.container.querySelector('[data-action="check"]');

        // Inicializar drag & drop
        this.initDragDrop(container);

        // Botón verificar
        if (checkBtn) {
            checkBtn.addEventListener('click', () => this.checkOrder());
        }

        // Keyboard navigation (opcional - para accesibilidad)
        this.attachKeyboardNavigation();
    }

    /**
     * Manejar drop de elementos
     */
    handleDrop(dropTarget, draggedElement) {
        const dropZone = dropTarget.closest('[data-drop-zone="items"]');
        if (!dropZone) return;

        const targetItem = dropTarget.closest('.drag-order__item');

        if (targetItem && targetItem !== draggedElement) {
            // Intercambiar posiciones
            this.swapItems(draggedElement, targetItem);
        }
    }

    /**
     * Intercambiar dos elementos
     */
    swapItems(item1, item2) {
        const parent = item1.parentNode;
        const item1Index = Array.from(parent.children).indexOf(item1);
        const item2Index = Array.from(parent.children).indexOf(item2);

        if (item1Index < item2Index) {
            parent.insertBefore(item2, item1);
            parent.insertBefore(item1, parent.children[item2Index]);
        } else {
            parent.insertBefore(item1, item2);
            parent.insertBefore(item2, parent.children[item1Index]);
        }

        // Actualizar números
        this.updateItemNumbers();

        // Limpiar feedback previo
        const feedbackDiv = this.container.querySelector('.drag-order__feedback');
        if (feedbackDiv) {
            feedbackDiv.innerHTML = '';
        }
    }

    /**
     * Actualizar números de posición
     */
    updateItemNumbers() {
        const items = this.container.querySelectorAll('.drag-order__item');
        items.forEach((item, index) => {
            const numberDiv = item.querySelector('.drag-order__item-number');
            if (numberDiv) {
                numberDiv.textContent = index + 1;
            }
            item.dataset.position = index;
        });
    }

    /**
     * Verificar orden actual
     */
    checkOrder() {
        const items = this.container.querySelectorAll('.drag-order__item');
        const currentOrder = Array.from(items).map(item => item.dataset.itemId);
        const correctOrder = this.correctSequence.map(item => item.id);

        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
        const feedbackDiv = this.container.querySelector('.drag-order__feedback');

        if (isCorrect) {
            feedbackDiv.innerHTML = `
                <div class="feedback feedback--success">
                    <strong>¡Correcto!</strong> Has ordenado la secuencia correctamente.
                </div>
            `;

            // Deshabilitar drag
            items.forEach(item => {
                item.draggable = false;
                item.classList.add('is-correct');
            });

            this.isCorrect = true;
            setTimeout(() => this.complete(), 1000);
        } else {
            // Mostrar cuántos están correctos
            let correctCount = 0;
            currentOrder.forEach((id, index) => {
                if (id === correctOrder[index]) {
                    correctCount++;
                }
            });

            feedbackDiv.innerHTML = `
                <div class="feedback feedback--error">
                    <strong>Incorrecto.</strong> Tienes ${correctCount} de ${correctOrder.length} en la posición correcta. Intenta de nuevo.
                </div>
            `;
        }
    }

    /**
     * Navegación por teclado (accesibilidad)
     */
    attachKeyboardNavigation() {
        const items = this.container.querySelectorAll('.drag-order__item');
        let selectedIndex = -1;

        items.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (this.isCorrect) return;

                const currentIndex = Array.from(items).indexOf(item);

                switch(e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        if (selectedIndex === -1) {
                            selectedIndex = currentIndex;
                            item.classList.add('is-selected');
                        } else if (selectedIndex === currentIndex) {
                            selectedIndex = -1;
                            item.classList.remove('is-selected');
                        } else {
                            // Intercambiar
                            this.swapItems(items[selectedIndex], item);
                            items[selectedIndex].classList.remove('is-selected');
                            selectedIndex = -1;
                        }
                        break;

                    case 'ArrowUp':
                        e.preventDefault();
                        if (currentIndex > 0) {
                            this.swapItems(item, items[currentIndex - 1]);
                        }
                        break;

                    case 'ArrowDown':
                        e.preventDefault();
                        if (currentIndex < items.length - 1) {
                            this.swapItems(item, items[currentIndex + 1]);
                        }
                        break;

                    case 'Escape':
                        if (selectedIndex !== -1) {
                            items[selectedIndex].classList.remove('is-selected');
                            selectedIndex = -1;
                        }
                        break;
                }
            });
        });
    }

    reset() {
        this.currentSequence = shuffle([...this.correctSequence]);
        this.isCorrect = false;
        this.isCompleted = false;
        this.render();
    }
}
