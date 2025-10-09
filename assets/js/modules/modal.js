// ==========================================
// MÓDULO DE MODAL ACTUALIZADO
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
                z-index: 9999;
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
                z-index: 10000;
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
                border: none;
            }

            .modal__close:hover {
                background-color: var(--color-primary);
                color: white;
                transform: rotate(90deg);
            }

            .modal__body {
                margin-top: var(--spacing-lg);
            }
            
            @media (max-width: 768px) {
                .modal__content {
                    max-width: 95%;
                    padding: var(--spacing-lg);
                }
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

    // Contenidos predefinidos para los modales
    const modalContents = {
        avatar: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Avatar Profesional</h2>
            <div style="text-align: center;">
                <img src="assets/images/avatar.jpg" alt="Avatar" style="max-width: 300px; border-radius: 50%; margin-bottom: 1.5rem; box-shadow: var(--shadow-xl);">
                <p style="color: var(--color-text-secondary); line-height: 1.8;">
                    Representación visual del perfil profesional de Diana Rocío Possos Beltrán,
                    enfocado en educación inclusiva y recursos digitales aplicados.
                </p>
            </div>
        `,
        
        poster: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Póster Digital del Proyecto</h2>
            <div style="text-align: center;">
                <img src="assets/images/proyecto-wordwall.jpg" alt="Póster" style="max-width: 100%; border-radius: 12px; box-shadow: var(--shadow-xl); margin-bottom: 1.5rem;">
                <p style="color: var(--color-text-secondary); line-height: 1.8;">
                    Síntesis visual del proyecto de investigación sobre fortalecimiento de memoria
                    a corto plazo mediante Wordwall en estudiantes de inclusión.
                </p>
            </div>
        `,
        
        ebook: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">📚 E-book del Proyecto</h2>
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 12px; color: white; margin-bottom: 1.5rem;">
                <h3 style="margin-bottom: 1rem;">Fortalecimiento de la memoria a corto plazo</h3>
                <p>Documento completo del trabajo de investigación</p>
            </div>
            <div style="padding: 1rem; background: var(--color-gray-100); border-radius: 8px;">
                <p style="color: var(--color-text-secondary); margin-bottom: 1rem;">
                    El e-book contiene la investigación completa sobre el uso de Wordwall como
                    herramienta pedagógica para fortalecer procesos cognitivos.
                </p>
                <a href="documents/ebook.pdf" class="btn btn--primary" download style="display: inline-block;">
                    Descargar E-book (PDF)
                </a>
            </div>
        `,
        
        unidad: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Unidad Didáctica</h2>
            <p style="color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 1rem;">
                Secuencia de actividades diseñadas específicamente para fortalecer la memoria
                a corto plazo en estudiantes con necesidades educativas especiales.
            </p>
            <div style="background: var(--color-gray-100); padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
                <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Contenidos:</h4>
                <ul style="color: var(--color-text-secondary); line-height: 1.8;">
                    <li>Objetivos de aprendizaje</li>
                    <li>Actividades secuenciadas</li>
                    <li>Recursos digitales</li>
                    <li>Evaluación de progreso</li>
                </ul>
            </div>
        `,
        
        infografia: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Infografía del Proyecto</h2>
            <p style="text-align: center; color: var(--color-text-secondary);">
                Visualización de los conceptos clave, metodología y resultados esperados
                del proyecto de investigación.
            </p>
        `,
        
        propuesta: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Propuesta Metodológica</h2>
            <p style="color: var(--color-text-secondary); line-height: 1.8;">
                Marco metodológico basado en Investigación Acción Participativa (IAP)
                con enfoque mixto y estrategia de aprendizaje basado en juegos.
            </p>
        `,
        
        diseno: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Diseño Instruccional</h2>
            <p style="color: var(--color-text-secondary); line-height: 1.8;">
                Planificación pedagógica detallada de las intervenciones educativas,
                adaptadas a las necesidades de los estudiantes de inclusión.
            </p>
        `,
        
        video: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Video Tutorial</h2>
            <div style="text-align: center;">
                <p style="color: var(--color-text-secondary); margin-bottom: 1.5rem;">
                    Guía práctica sobre el uso de las actividades digitales implementadas en Wordwall
                </p>
                <div style="background: var(--color-gray-100); padding: 3rem; border-radius: 12px;">
                    <p>🎥 Video próximamente disponible</p>
                </div>
            </div>
        `,
        
        referencias: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Referencias Bibliográficas Completas</h2>
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 1rem;">
                <strong>Formato:</strong> APA v7
            </p>
            <div style="max-height: 400px; overflow-y: auto; padding: 1rem; background: var(--color-gray-100); border-radius: 8px;">
                <ol style="color: var(--color-text-secondary); line-height: 2;">
                    <li>Autor, A. (2024). <em>Título del libro sobre educación inclusiva</em>. Editorial Académica.</li>
                    <li>Autor, B., & Autor, C. (2023). Recursos digitales en educación especial. <em>Revista de Educación</em>, 15(2), 100-120.</li>
                    <li>Organización Mundial. (2022). <em>Informe sobre educación inclusiva</em>. https://example.com</li>
                    <li>Autor, D. (2021). Wordwall como herramienta pedagógica. <em>Tecnología Educativa</em>, 8(1), 45-60.</li>
                </ol>
            </div>
        `
    };

    function openModal(contentId) {
        if (!modal) createModal();

        const modalBody = modal.querySelector('.modal__body');
        const content = modalContents[contentId] || `
            <h2 style="color: var(--color-primary);">Contenido no disponible</h2>
            <p style="color: var(--color-text-secondary);">Este contenido estará disponible próximamente.</p>
        `;
        
        modalBody.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log(`Modal abierto: ${contentId}`);
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Modal cerrado');
        }
    }

    // Exponer funciones globalmente
    window.openModal = openModal;
    window.closeModal = closeModal;
    
    console.log('✅ Modal inicializado con contenidos predefinidos');
}