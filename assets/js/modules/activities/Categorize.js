/**
 * CATEGORIZE.JS
 * Actividad de clasificación por categorías con drag & drop
 *
 * @module activities/Categorize
 */

import { DragDropActivity } from './DragDropActivity.js';
import { getImageOrPlaceholder } from '../../utils/image-placeholders.js';
import { shuffle } from '../../utils/helpers.js';

/**
 * Categorize - Clasificar elementos en categorías
 *
 * @class Categorize
 * @extends DragDropActivity
 */
export class Categorize extends DragDropActivity {
    /**
     * Constructor de Categorize
     * @param {Object} config - Configuración
     * @param {Array} config.categories - Array de categorías [{id, name, color}, ...]
     * @param {Array} config.items - Array de items a clasificar [{id, name, image, category}, ...]
     * @param {string} containerId - ID del contenedor
     */
    constructor(config, containerId) {
        super(config, containerId);
        this.categories = config.categories || [];
        this.items = shuffle(config.items || []);
        this.placedItems = new Map(); // category -> [items]
        this.unplacedItems = [...this.items];
    }

    getHTML() {
        return `
            <div class="categorize">
                <div class="categorize__header">
                    <h3 class="categorize__instruction">${this.config.instruction || 'Arrastra cada elemento a su categoría correcta'}</h3>
                    <div class="categorize__progress">
                        Clasificados: <strong>${this.placedItems.size > 0 ? this.getTotalPlaced() : 0}</strong>/${this.items.length}
                    </div>
                </div>

                <div class="categorize__container">
                    <!-- Items no clasificados -->
                    <div class="categorize__items drop-zone"
                         data-drop-zone="unplaced">
                        <h4>Elementos para clasificar</h4>
                        <div class="categorize__items-grid">
                            ${this.unplacedItems.map(item => this.renderItem(item)).join('')}
                        </div>
                    </div>

                    <!-- Categorías -->
                    <div class="categorize__categories">
                        ${this.categories.map(category => this.renderCategory(category)).join('')}
                    </div>
                </div>

                <div class="categorize__feedback"></div>
            </div>
        `;
    }

    renderItem(item) {
        return `
            <div class="categorize__item drag-item"
                 draggable="true"
                 data-item-id="${item.id}"
                 data-category="${item.category}"
                 tabindex="0"
                 role="button"
                 aria-label="${item.name}">
                <img src="${getImageOrPlaceholder(item.image)}"
                     alt="${item.name}"
                     loading="lazy">
                <span class="categorize__item-label">${item.name}</span>
            </div>
        `;
    }

    renderCategory(category) {
        const itemsInCategory = this.getItemsInCategory(category.id);

        return `
            <div class="categorize__category drop-zone"
                 data-drop-zone="category"
                 data-category-id="${category.id}"
                 style="--category-color: ${category.color || '#2196f3'}">
                <div class="categorize__category-header">
                    <h4>${category.name}</h4>
                    <span class="categorize__category-count">${itemsInCategory.length}</span>
                </div>
                <div class="categorize__category-items">
                    ${itemsInCategory.map(item => this.renderItem(item)).join('')}
                </div>
            </div>
        `;
    }

    getItemsInCategory(categoryId) {
        return this.placedItems.get(categoryId) || [];
    }

    getTotalPlaced() {
        let total = 0;
        this.placedItems.forEach(items => {
            total += items.length;
        });
        return total;
    }

    attachEventListeners() {
        const container = this.container.querySelector('.categorize__container');

        // Inicializar drag & drop
        this.initDragDrop(container);

        // Delegación de eventos para items dinámicos
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dropZone = e.target.closest('.drop-zone');
            if (dropZone) {
                dropZone.classList.add('is-over');
            }
        });

        container.addEventListener('dragleave', (e) => {
            const dropZone = e.target.closest('.drop-zone');
            if (dropZone && !dropZone.contains(e.relatedTarget)) {
                dropZone.classList.remove('is-over');
            }
        });

        container.addEventListener('drop', (e) => {
            const dropZone = e.target.closest('.drop-zone');
            if (dropZone) {
                dropZone.classList.remove('is-over');
            }
        });
    }

    handleDrop(dropTarget, draggedElement) {
        const dropZone = dropTarget.closest('.drop-zone');
        if (!dropZone) {
            console.log('No drop zone found for target:', dropTarget);
            return;
        }

        // Convertir itemId a número para comparación
        const itemId = parseInt(draggedElement.dataset.itemId);
        const correctCategory = draggedElement.dataset.category;
        const zoneType = dropZone.dataset.dropZone;

        console.log('Drop:', { itemId, correctCategory, zoneType, categoryId: dropZone.dataset.categoryId });

        if (zoneType === 'category') {
            const categoryId = dropZone.dataset.categoryId;
            this.placeItemInCategory(itemId, categoryId, correctCategory);
        } else if (zoneType === 'unplaced') {
            this.returnItemToUnplaced(itemId);
        }
    }

    placeItemInCategory(itemId, categoryId, correctCategory) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        const isCorrect = categoryId === correctCategory;

        // Remover de categoría anterior si existe
        this.removeItemFromAllCategories(itemId);

        // Remover de no clasificados
        this.unplacedItems = this.unplacedItems.filter(i => i.id !== itemId);

        // Agregar a nueva categoría
        if (!this.placedItems.has(categoryId)) {
            this.placedItems.set(categoryId, []);
        }
        this.placedItems.get(categoryId).push(item);

        // Re-renderizar
        this.updateView();

        // Feedback
        if (isCorrect) {
            this.showFeedback(true, `¡Correcto! ${item.name} va en esta categoría`);
        } else {
            this.showFeedback(false, `Incorrecto. ${item.name} no va en esta categoría`);
        }

        // Verificar si completó
        this.checkCompletion();
    }

    returnItemToUnplaced(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        // Remover de categorías
        this.removeItemFromAllCategories(itemId);

        // Agregar a no clasificados si no está
        if (!this.unplacedItems.find(i => i.id === itemId)) {
            this.unplacedItems.push(item);
        }

        this.updateView();
    }

    removeItemFromAllCategories(itemId) {
        this.placedItems.forEach((items, categoryId) => {
            const filtered = items.filter(i => i.id !== itemId);
            if (filtered.length > 0) {
                this.placedItems.set(categoryId, filtered);
            } else {
                this.placedItems.delete(categoryId);
            }
        });
    }

    updateView() {
        const container = this.container.querySelector('.categorize__container');
        if (container) {
            container.innerHTML = `
                <div class="categorize__items drop-zone" data-drop-zone="unplaced">
                    <h4>Elementos para clasificar</h4>
                    <div class="categorize__items-grid">
                        ${this.unplacedItems.map(item => this.renderItem(item)).join('')}
                    </div>
                </div>
                <div class="categorize__categories">
                    ${this.categories.map(category => this.renderCategory(category)).join('')}
                </div>
            `;
        }

        // Actualizar contador
        const progress = this.container.querySelector('.categorize__progress strong');
        if (progress) {
            progress.textContent = this.getTotalPlaced();
        }
    }

    checkCompletion() {
        // Verificar si todos están clasificados
        if (this.unplacedItems.length > 0) return;

        // Verificar si todos están correctos
        let allCorrect = true;
        this.placedItems.forEach((items, categoryId) => {
            items.forEach(item => {
                if (item.category !== categoryId) {
                    allCorrect = false;
                }
            });
        });

        if (allCorrect) {
            setTimeout(() => {
                const feedbackDiv = this.container.querySelector('.categorize__feedback');
                if (feedbackDiv) {
                    feedbackDiv.innerHTML = `
                        <div class="feedback feedback--success">
                            <strong>¡Excelente!</strong> Has clasificado todos los elementos correctamente.
                        </div>
                    `;
                }
                this.complete();
            }, 500);
        } else {
            const feedbackDiv = this.container.querySelector('.categorize__feedback');
            if (feedbackDiv) {
                feedbackDiv.innerHTML = `
                    <div class="feedback feedback--error">
                        Algunos elementos no están en la categoría correcta. Revisa y vuelve a intentar.
                    </div>
                `;
            }
        }
    }

    reset() {
        this.placedItems.clear();
        this.unplacedItems = shuffle([...this.items]);
        this.isCompleted = false;
        this.render();
    }
}
