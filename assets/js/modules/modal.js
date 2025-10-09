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
            
            /* Scrollbar personalizado para el modal */
            .modal__content::-webkit-scrollbar {
                width: 8px;
            }

            .modal__content::-webkit-scrollbar-track {
                background: var(--color-gray-100);
                border-radius: 10px;
            }

            .modal__content::-webkit-scrollbar-thumb {
                background: var(--color-primary);
                border-radius: 10px;
            }

            .modal__content::-webkit-scrollbar-thumb:hover {
                background: var(--color-primary-dark);
            }

            /* Estilos para lista de referencias */
            .references-modal-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            .references-modal-list li {
                position: relative;
                padding-left: 2rem;
                margin-bottom: 1.25rem;
                font-size: 0.95rem;
                color: var(--color-text-secondary);
                line-height: 1.8;
            }

            .references-modal-list li::before {
                content: '📄';
                position: absolute;
                left: 0;
                top: 0;
            }

            .references-modal-list em {
                font-style: italic;
                color: var(--color-text-primary);
            }
            
            @media (max-width: 768px) {
                .modal__content {
                    max-width: 95%;
                    padding: var(--spacing-lg);
                }
                
                .references-modal-list li {
                    font-size: 0.9rem;
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
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">Avatar Profesional</h2>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <video 
                    controls 
                    autoplay 
                    muted 
                    loop
                    style="max-width: 500px; width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: var(--shadow-xl); display: block;">
                    <source src="assets/images/avatar.mp4" type="video/mp4">
                    Tu navegador no soporta la reproducción de videos.
                </video>
                <p style="color: var(--color-text-secondary); line-height: 1.8; max-width: 500px;">
                    Representación visual del perfil profesional de Diana Rocío Possos Beltrán,
                    enfocado en educación inclusiva y recursos digitales aplicados.
                </p>
            </div>
        `,
        
        poster: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">Póster Digital del Proyecto</h2>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <img src="assets/images/proyecto-wordwall.jpg" alt="Póster" style="max-width: 100%; max-height: 70vh; width: auto; height: auto; border-radius: 12px; box-shadow: var(--shadow-xl); margin-bottom: 1.5rem; object-fit: contain;">
                <p style="color: var(--color-text-secondary); line-height: 1.8; max-width: 600px;">
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
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">📖 Referencias Bibliográficas Completas</h2>
            <p style="display: inline-block; padding: 0.5rem 1rem; background-color: var(--color-gray-100); color: var(--color-text-secondary); font-size: 0.875rem; border-radius: 20px; margin-bottom: 1.5rem;">
                Normas APA v7
            </p>
            <div style="max-height: 500px; overflow-y: auto; padding: 1.5rem; background: var(--color-gray-50); border-radius: 12px;">
                <ul class="references-modal-list">
                    <li>Ainscow, M., & Booth, T. (2015). <em>Guía para la educación inclusiva</em>. Consorcio de Inclusión Educativa.</li>
                    <li>Cabero, J., & Llorente, M. (2015). Tecnologías de la información y la comunicación (TIC) para la inclusión educativa. <em>Revista de Educación Inclusiva</em>, 8(2), 45-60.</li>
                    <li>Cabero, J., & Valencia, L. (2019). Recursos digitales para la atención a la diversidad en educación. <em>Revista de Educación a Distancia</em>, 61(1), 1-20.</li>
                    <li>Calpa, S., & Unigarro, E. (2010). <em>La inclusión educativa en la Universidad de Nariño: Realidad y prospectiva</em>. https://sired.udenar.edu.co/10851/1/83287.pdf</li>
                    <li>Fals Borda, O. (1993). La investigación participativa y la intervención social. <em>Documentación Social: Investigación acción participativa</em>, 92, 9-21.</li>
                    <li>Flórez, C. (2013). Educación y discapacidad en contextos rurales. <em>Revista Colombiana de Educación Inclusiva</em>, 10(1), 34-50.</li>
                    <li>González, M., & Contreras, L. (2017). Las TIC como herramienta inclusiva para la estimulación cognitiva. <em>Revista Latinoamericana de Educación Inclusiva</em>, 11(1), 55-70.</li>
                    <li>Guanoluisa, J., Quichimbo, J., & Muevecela, S. (2022). La gamificación cooperativa como estrategia de enseñanza inclusiva en estudiantes de la Unidad Educativa "Molleturo". <em>Revista Religación</em>.</li>
                    <li>Hernández, R., Fernández, C., & Baptista, P. (2014). <em>Metodología de la investigación</em>.</li>
                    <li>Herrera, L., & Gutiérrez, M. (2017). Estimulación cognitiva en el aula inclusiva. <em>Revista de Psicopedagogía</em>, 14(2), 45-57.</li>
                    <li>Ministerio de Educación Nacional. (2017). <em>Decreto 1421 de 2017</em>.</li>
                    <li>Muñoz, J., Pérez, V., & Salazar, L. (2014). Estrategias de estimulación cognitiva en educación. <em>Revista Iberoamericana de Psicología y Educación</em>, 9(2), 77-90.</li>
                    <li>Narváez, N. (2020). <em>Materiales educativos digitales para fortalecer la enseñanza de los estudiantes con discapacidad cognitiva</em>. Repositorio Universidad de Córdoba.</li>
                    <li>Screpnik, C. R. (2024). Tecnologías digitales en la educación inclusiva: oportunidades, desafíos y perspectivas para personas con discapacidad cognitiva. <em>UTE Teaching & Technology</em>, (2), e3664.</li>
                    <li>UNESCO. (2005). <em>Directrices sobre políticas de inclusión en la educación</em>.</li>
                    <li>UNESCO. (2020). <em>Guía para asegurar la inclusión y la equidad en la educación</em>. París: UNESCO.</li>
                    <li>Uribe, R., Utrilla. S., & Santamaría, A. (2017). Aprendizaje basado en juegos: una alternativa viable para la enseñanza significativa de la sustentabilidad. <em>Revista electrónica sobre educación media y superior (CEMYS)</em>.</li>
                </ul>
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