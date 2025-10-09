// ==========================================
// MÓDULO DE MODAL
// ==========================================

function initModal() {
    console.log('Iniciando modal...');
    
    let modal = null;

    function createModal() {
        modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal__backdrop"></div>
            <div class="modal__content">
                <button class="modal__close" aria-label="Cerrar modal">&times;</button>
                <div class="modal__body"></div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: var(--z-index-modal);
                display: none;
                align-items: center;
                justify-content: center;
            }

            .modal.active {
                display: flex;
            }

            .modal__backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }

            .modal__content {
                position: relative;
                background-color: white;
                border-radius: var(--border-radius-xl);
                max-width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                padding: var(--spacing-2xl);
                box-shadow: var(--shadow-2xl);
                animation: scaleUp 0.3s ease-out;
            }

            .modal__close {
                position: absolute;
                top: var(--spacing-md);
                right: var(--spacing-md);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-color: var(--color-gray-200);
                color: var(--color-text-primary);
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all var(--transition-fast);
            }

            .modal__close:hover {
                background-color: var(--color-primary);
                color: white;
                transform: rotate(90deg);
            }

            .modal__body {
                margin-top: var(--spacing-lg);
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(modal);

        const backdrop = modal.querySelector('.modal__backdrop');
        const closeBtn = modal.querySelector('.modal__close');

        backdrop.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function openModal(content) {
        if (!modal) createModal();

        const modalBody = modal.querySelector('.modal__body');
        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    window.openModal = openModal;
    window.closeModal = closeModal;
    
    console.log('✅ Modal inicializado');
}