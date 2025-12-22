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

            /* Estilos para botones de galería */
            #prevImage, #nextImage {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            #prevImage:hover, #nextImage:hover {
                background-color: var(--color-primary-dark);
                transform: scale(1.05);
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            }

            #prevImage:active, #nextImage:active {
                transform: scale(0.95);
            }

            /* Animaciones de galería */
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes slideInFromRight {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes fadeOut {
                from {
                    opacity: 1;
                }
                to {
                    opacity: 0;
                }
            }

            /* Clases de animación para imágenes */
            .gallery-image-transition {
                transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                            transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .gallery-image-fadeout {
                opacity: 0;
                transform: scale(0.98);
            }

            .gallery-image-fadein {
                animation: fadeInScale 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .gallery-slide-right {
                animation: slideInFromRight 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .gallery-slide-left {
                animation: slideInFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            /* Indicador de carga */
            .gallery-loader {
                display: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 40px;
                height: 40px;
                border: 4px solid var(--color-gray-200);
                border-top-color: var(--color-primary);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                z-index: 10;
            }

            .gallery-loader.active {
                display: block;
            }

            @keyframes spin {
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }

            /* Contador de galería animado */
            #galleryCounter {
                transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            }

            #galleryCounter.pulse {
                animation: pulse 0.3s ease-in-out;
            }

            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            /* Descripción animada */
            #imageDescription {
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }

            #imageDescription.updating {
                opacity: 0;
                transform: translateY(10px);
            }

            @media (max-width: 768px) {
                .modal__content {
                    max-width: 95%;
                    padding: var(--spacing-lg);
                }

                .references-modal-list li {
                    font-size: 0.9rem;
                }

                #prevImage, #nextImage {
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                }

                #galleryContainer {
                    padding: 0 0.5rem;
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
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">📚 E-book del Proyecto</h2>
            <div style="margin-bottom: 1.5rem;">
                <iframe
                    src="documents/Referenciando - Ebook.pdf"
                    style="width: 100%; height: 70vh; border: none; border-radius: 12px; box-shadow: var(--shadow-xl);"
                    title="E-book del Proyecto de Investigación">
                </iframe>
            </div>
            <div style="text-align: center; padding: 1rem; background: var(--color-gray-100); border-radius: 8px;">
                <p style="color: var(--color-text-secondary); margin-bottom: 1rem; line-height: 1.6;">
                    <strong>Fortalecimiento de la memoria a corto plazo</strong><br>
                    Documento completo del trabajo de investigación sobre el uso de Wordwall como
                    herramienta pedagógica para fortalecer procesos cognitivos.
                </p>
                <a href="documents/Referenciando - Ebook.pdf" class="btn btn--primary" download style="display: inline-block;">
                    📥 Descargar E-book (PDF)
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
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">Propuesta Metodológica</h2>
            <div style="text-align: center;">
                <p style="color: var(--color-text-secondary); line-height: 1.8; max-width: 720px; margin: 0 auto 1rem;">
                    Marco metodológico basado en Investigación Acción Participativa (IAP)
                    con enfoque mixto y estrategia de aprendizaje basado en juegos.
                </p>
                <div style="display:flex; gap:.5rem; justify-content:center; margin-bottom:.75rem;">
                    <a href="documents/Metodologia%20video.mp4" download class="btn btn--primary" style="padding:.5rem 1rem;">Descargar Video</a>
                </div>
                <div style="width:100%; max-width:900px; margin:0 auto; aspect-ratio:16/9; background:var(--color-gray-100); border-radius:12px; overflow:hidden; box-shadow:var(--shadow-xl);">
                    <video controls style="width:100%; height:100%; display:block; background:black;">
                        <source src="documents/Metodologia%20video.mp4" type="video/mp4">
                        Tu navegador no soporta la reproducción de video.
                    </video>
                </div>
            </div>
        `,
        
        diseno: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">Diseño Instruccional</h2>
            <p style="color: var(--color-text-secondary); line-height: 1.8;">
                Planificación pedagógica detallada de las intervenciones educativas,
                adaptadas a las necesidades de los estudiantes de inclusión.
            </p>
        `,
        
        video: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">Video Tutorial</h2>
            <div style="text-align: center;">
                <p style="color: var(--color-text-secondary); margin-bottom: 1rem; max-width: 720px; margin-left: auto; margin-right: auto;">
                    Guía práctica sobre el uso de las actividades digitales implementadas en Wordwall.
                </p>
                <div style="width: 100%; max-width: 900px; margin: 1rem auto 0;">
                    <div style="display:flex; gap: .5rem; justify-content: center; margin-bottom: .75rem;">
                        <button id="videoBtnYT" class="btn btn--primary" style="padding: .5rem 1rem;">Ver en YouTube</button>
                        <button id="videoBtnPDF" class="btn btn--secondary" style="padding: .5rem 1rem;">Ver PDF</button>
                        <a id="videoDownloadLink" href="documents/Video_tutorial.pdf" download class="btn btn--primary" style="padding: .5rem 1rem; margin-left: .25rem;">Descargar PDF</a>
                    </div>
                    <div id="videoContentContainer" style="width: 100%; aspect-ratio: 16/9; background: var(--color-gray-100); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-xl);">
                        <!-- Contenido dinámico: iframe YouTube o PDF -->
                    </div>
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
        `,

        potcast: `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">🎙️ Podcast del Proyecto</h2>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <video
                    controls
                    style="max-width: 800px; width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: var(--shadow-xl); display: block;">
                    <source src="assets/images/Potcast.mp4" type="video/mp4">
                    Tu navegador no soporta la reproducción de videos.
                </video>
                <p style="color: var(--color-text-secondary); line-height: 1.8; max-width: 600px;">
                    Presentación podcast de investigación sobre el fortalecimiento de la memoria
                    a corto plazo mediante la plataforma Wordwall.
                </p>
            </div>
        `,

        'video-metodologia': `
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem; text-align: center;">Marco de referencia</h2>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <video
                    controls
                    style="max-width: 800px; width: 100%; height: auto; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: var(--shadow-xl); display: block;">
                    <source src="assets/images/Video.mp4" type="video/mp4">
                    Tu navegador no soporta la reproducción de videos.
                </video>
                <p style="color: var(--color-text-secondary); line-height: 1.8; max-width: 600px;">
                    Video explicativo sobre el marco de referencia del proyecto, 
                    que presenta los aspectos teóricos, conceptuales y contextuales que sustentan la investigación.
                </p>
            </div>
        `,

        galeria: 'GALLERY_PLACEHOLDER'
    };

    // Función auxiliar para generar galería de imágenes
    function generateGalleryContent() {
        // Detectar imágenes disponibles en la carpeta galería
        const maxImages = 8; // Límite de imágenes a buscar
        const availableImages = [];

        // Intentar detectar imágenes de forma síncrona
        // Nota: En producción, verificar manualmente qué imágenes existen
        for (let i = 1; i <= maxImages; i++) {
            const extension = i <= 4 ? 'jpg' : 'png';
            availableImages.push({
                src: `assets/images/galeria/${i}.${extension}`,
                alt: `Resultado ${i}`
            });
        }

        if (availableImages.length === 0) {
            return `
                <h2 style="color: var(--color-primary); text-align: center; margin-bottom: 1.5rem;">Galería de fotos</h2>
                <div style="text-align: center; padding: 3rem; background: var(--color-gray-100); border-radius: 12px;">
                    <p style="color: var(--color-text-secondary); font-size: 1.2rem;">
                        📁 No hay imágenes disponibles en la galería
                    </p>
                    <p style="color: var(--color-text-secondary); margin-top: 1rem; font-size: 0.9rem;">
                        Agregue imágenes numeradas (1.jpg, 2.jpg, etc.) en la carpeta assets/images/galeria/
                    </p>
                </div>
            `;
        }

        return `
            <h2 style="color: var(--color-primary); text-align: center; margin-bottom: 1.5rem;">Galería de Fotos</h2>
            <div id="galleryContainer" style="position: relative; max-width: 900px; margin: 0 auto;">
                <div id="galleryImage" style="text-align: center; position: relative; min-height: 400px;">
                    <img id="currentImage"
                        src="${availableImages[0].src}"
                        alt="${availableImages[0].alt}"
                        class="gallery-image-transition"
                        style="max-width: 100%; max-height: 60vh; width: auto; height: auto; border-radius: 12px; box-shadow: var(--shadow-xl); object-fit: contain;"
                        onerror="this.parentElement.innerHTML='<div style=\\'padding: 3rem; background: var(--color-gray-100); border-radius: 12px; text-align: center;\\'><p style=\\'color: var(--color-text-secondary);\\'>No hay imágenes disponibles en la galería</p><p style=\\'color: var(--color-text-secondary); margin-top: 1rem; font-size: 0.9rem;\\'>Agregue imágenes numeradas (1.jpg, 2.jpg, etc.) en assets/images/galeria/</p></div>'">
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; gap: 1rem;">
                    <button id="prevImage" onclick="galleryNavigate(-1)"
                        style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.2rem; transition: all 0.3s;">
                        ← Anterior
                    </button>

                    <div id="galleryCounter" style="color: var(--color-text-secondary); font-weight: 600; font-size: 1rem;">
                        <span id="currentImageNumber">1</span> / <span id="totalImages">${availableImages.length}</span>
                    </div>

                    <button id="nextImage" onclick="galleryNavigate(1)"
                        style="padding: 0.75rem 1.5rem; background-color: var(--color-primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.2rem; transition: all 0.3s;">
                        Siguiente →
                    </button>
                </div>

                <div style="text-align: center; margin-top: 1rem;">
                    <p id="imageDescription" style="color: var(--color-text-secondary); line-height: 1.8;">
                        Galería fotográfica del proyecto, donde se muestran las principales actividades, procesos y resultados desarrollados durante su ejecución.
                    </p>
                </div>
            </div>
        `;
    }

    // Variables globales para la galería
    let currentGalleryIndex = 0;
    const galleryImages = [
        {
            src: 'assets/images/galeria/1.jpg',
            alt: 'Comunidad Educativa Sede Puerres',
            description: 'Comunidad Educativa Sede Puerres'
        },
        {
            src: 'assets/images/galeria/2.jpg',
            alt: 'Fachada principal de la sede Puerres',
            description: 'Fachada principal de la sede Puerres'
        },
        {
            src: 'assets/images/galeria/3.jpg',
            alt: 'IEM Ciudadela Educativa de Pasto Sede Principal',
            description: 'IEM Ciudadela Educativa de Pasto Sede Principal.'
        },
        {
            src: 'assets/images/galeria/4.jpg',
            alt: 'Equipos tecnológicos disponibles en la Sede Puerres',
            description: 'Equipos tecnológicos disponibles en la Sede Puerres.'
        },
        {
            src: 'assets/images/galeria/5.png',
            alt: 'Resultado 5',
            description: 'Galería fotográfica del proyecto, donde se muestran las principales actividades, procesos y resultados desarrollados durante su ejecución.'
        },
        {
            src: 'assets/images/galeria/6.png',
            alt: 'Resultado 6',
            description: 'Galería fotográfica del proyecto, donde se muestran las principales actividades, procesos y resultados desarrollados durante su ejecución.'
        },
        {
            src: 'assets/images/galeria/7.png',
            alt: 'Resultado 7',
            description: 'Galería fotográfica del proyecto, donde se muestran las principales actividades, procesos y resultados desarrollados durante su ejecución.'
        },
        {
            src: 'assets/images/galeria/8.png',
            alt: 'Resultado 8',
            description: 'Galería fotográfica del proyecto, donde se muestran las principales actividades, procesos y resultados desarrollados durante su ejecución.'
        }
    ];

    // Variables de control de animación
    let isAnimating = false;
    let imagePreloadCache = new Map();

    // Variables para gestos táctiles
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50; // Píxeles mínimos para detectar swipe

    /**
     * Precarga una imagen para transiciones suaves
     * @param {string} src - URL de la imagen a precargar
     * @returns {Promise<HTMLImageElement>}
     */
    function preloadImage(src) {
        if (imagePreloadCache.has(src)) {
            return Promise.resolve(imagePreloadCache.get(src));
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                imagePreloadCache.set(src, img);
                resolve(img);
            };
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Actualiza la descripción con animación suave
     * @param {HTMLElement} element - Elemento de descripción
     * @param {string} newText - Nuevo texto a mostrar
     */
    function updateDescriptionAnimated(element, newText) {
        if (!element) return;

        element.classList.add('updating');

        setTimeout(() => {
            element.textContent = newText;
            element.classList.remove('updating');
        }, 300);
    }

    /**
     * Actualiza el contador con efecto pulse
     * @param {HTMLElement} element - Elemento contador
     * @param {number} newValue - Nuevo valor del contador
     */
    function updateCounterAnimated(element, newValue) {
        if (!element) return;

        element.classList.add('pulse');
        element.textContent = newValue;

        setTimeout(() => {
            element.classList.remove('pulse');
        }, 300);
    }

    /**
     * Función de navegación de galería con animaciones profesionales
     * @param {number} direction - Dirección de navegación (-1 para anterior, 1 para siguiente)
     */
    window.galleryNavigate = function(direction) {
        // Prevenir clicks múltiples durante la animación
        if (isAnimating) return;
        isAnimating = true;

        // Calcular nuevo índice con navegación circular
        const previousIndex = currentGalleryIndex;
        currentGalleryIndex += direction;

        if (currentGalleryIndex < 0) {
            currentGalleryIndex = galleryImages.length - 1;
        } else if (currentGalleryIndex >= galleryImages.length) {
            currentGalleryIndex = 0;
        }

        // Obtener elementos del DOM
        const imgElement = document.getElementById('currentImage');
        const loaderElement = document.getElementById('galleryLoader');
        const counterElement = document.getElementById('currentImageNumber');
        const descElement = document.getElementById('imageDescription');

        if (!imgElement) {
            isAnimating = false;
            return;
        }

        // Determinar la dirección de la animación
        const animationClass = direction > 0 ? 'gallery-slide-right' : 'gallery-slide-left';

        // Fase 1: Fade out de la imagen actual
        imgElement.classList.add('gallery-image-fadeout');

        // Fase 2: Precargar nueva imagen y actualizar
        setTimeout(() => {
            const newImageData = galleryImages[currentGalleryIndex];

            preloadImage(newImageData.src)
                .then(() => {
                    // Actualizar fuente de imagen
                    imgElement.src = newImageData.src;
                    imgElement.alt = newImageData.alt;

                    // Remover clase de fadeout y agregar animación de entrada
                    imgElement.classList.remove('gallery-image-fadeout');
                    imgElement.classList.add(animationClass);

                    // Actualizar contador y descripción con animaciones
                    updateCounterAnimated(counterElement, currentGalleryIndex + 1);
                    updateDescriptionAnimated(descElement, newImageData.description);

                    // Limpiar clases de animación después de completarse
                    setTimeout(() => {
                        imgElement.classList.remove(animationClass);
                        isAnimating = false;

                        // Precargar imágenes adyacentes para la próxima navegación
                        preloadAdjacentImages(currentGalleryIndex);
                    }, 500);
                })
                .catch((error) => {
                    console.error('Error al cargar imagen:', error);

                    // En caso de error, revertir al índice anterior
                    currentGalleryIndex = previousIndex;
                    imgElement.classList.remove('gallery-image-fadeout');

                    isAnimating = false;
                });
        }, 400);
    };

    /**
     * Precarga imágenes adyacentes para navegación fluida
     * @param {number} currentIndex - Índice actual en la galería
     */
    function preloadAdjacentImages(currentIndex) {
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;

        // Precargar siguiente y anterior de forma asíncrona
        preloadImage(galleryImages[nextIndex].src).catch(() => {});
        preloadImage(galleryImages[prevIndex].src).catch(() => {});
    }

    /**
     * Manejador de eventos de teclado para navegación en galería
     * @param {KeyboardEvent} event - Evento de teclado
     */
    function handleGalleryKeyboard(event) {
        const modal = document.querySelector('.modal.active');
        const galleryContainer = document.getElementById('galleryContainer');

        // Solo actuar si el modal está activo y contiene la galería
        if (!modal || !galleryContainer) return;

        switch(event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                window.galleryNavigate(-1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                window.galleryNavigate(1);
                break;
        }
    }

    /**
     * Manejador de inicio de toque para swipe
     * @param {TouchEvent} event - Evento táctil
     */
    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
    }

    /**
     * Manejador de fin de toque para detectar swipe
     * @param {TouchEvent} event - Evento táctil
     */
    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    }

    /**
     * Detecta y ejecuta la acción de swipe
     */
    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) {
            return; // No es un swipe válido
        }

        if (swipeDistance > 0) {
            // Swipe derecha - imagen anterior
            window.galleryNavigate(-1);
        } else {
            // Swipe izquierda - imagen siguiente
            window.galleryNavigate(1);
        }
    }

    /**
     * Inicializa la lógica del modal de video para alternar entre YouTube y PDF
     * @param {HTMLElement} modalBody - el contenedor del cuerpo del modal
     */
    function initVideoModal(modalBody) {
        if (!modalBody) return;

        const ytBtn = modalBody.querySelector('#videoBtnYT');
        const pdfBtn = modalBody.querySelector('#videoBtnPDF');
        const container = modalBody.querySelector('#videoContentContainer');
        const downloadLink = modalBody.querySelector('#videoDownloadLink');

        const ytEmbedHtml = `
            <div style="width:100%; height:100%;">
                <iframe
                    src="https://www.youtube-nocookie.com/embed/JwwKHOWdF30?rel=0&cc_load_policy=1&cc_lang_pref=es"
                    title="Video Tutorial - Diana Possos"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    style="width:100%; height:100%; border:0; display:block;">
                </iframe>
            </div>
        `;

        const pdfEmbedHtml = `
            <div style="width:100%; height:100%;">
                <iframe
                    src="documents/Video_tutorial.pdf"
                    title="Video Tutorial (PDF)"
                    frameborder="0"
                    style="width:100%; height:100%; border:0; display:block;">
                </iframe>
            </div>
        `;

        function showYT() {
            if (!container) return;
            container.innerHTML = ytEmbedHtml;
            ytBtn && ytBtn.classList.add('active');
            pdfBtn && pdfBtn.classList.remove('active');
        }

        function showPDF() {
            if (!container) return;
            container.innerHTML = pdfEmbedHtml;
            pdfBtn && pdfBtn.classList.add('active');
            ytBtn && ytBtn.classList.remove('active');
            // Asegurar que el enlace de descarga apunte correctamente
            if (downloadLink) downloadLink.href = 'documents/Video_tutorial.pdf';
        }

        // Añadir listeners
        ytBtn && ytBtn.addEventListener('click', showYT);
        pdfBtn && pdfBtn.addEventListener('click', showPDF);

        // Mostrar YouTube por defecto
        showYT();
    }

    /**
     * Inicializa event listeners para gestos táctiles
     */
    function initTouchGestures() {
        const galleryImage = document.getElementById('galleryImage');
        if (galleryImage) {
            galleryImage.addEventListener('touchstart', handleTouchStart, { passive: true });
            galleryImage.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
    }

    /**
     * Limpia event listeners de gestos táctiles
     */
    function removeTouchGestures() {
        const galleryImage = document.getElementById('galleryImage');
        if (galleryImage) {
            galleryImage.removeEventListener('touchstart', handleTouchStart);
            galleryImage.removeEventListener('touchend', handleTouchEnd);
        }
    }

    function openModal(contentId) {
        if (!modal) createModal();

        const modalBody = modal.querySelector('.modal__body');

        let content;

        // Manejar galería de forma especial
        if (contentId === 'galeria') {
            currentGalleryIndex = 0; // Reset al abrir
            content = generateGalleryContent();

            // Añadir listeners para navegación por teclado y táctil
            setTimeout(() => {
                document.addEventListener('keydown', handleGalleryKeyboard);
                initTouchGestures();
                // Precargar imágenes adyacentes para mejor rendimiento
                preloadAdjacentImages(currentGalleryIndex);
            }, 100);
        } else {
            content = modalContents[contentId] || `
                <h2 style="color: var(--color-primary);">Contenido no disponible</h2>
                <p style="color: var(--color-text-secondary);">Este contenido estará disponible próximamente.</p>
            `;
        }

        modalBody.innerHTML = content;
        // Inicializar comportamiento específico para el modal de video (alternar YouTube/PDF)
        if (contentId === 'video') {
            initVideoModal(modalBody);
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        console.log(`Modal abierto: ${contentId}`);
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Limpiar event listeners de galería
            document.removeEventListener('keydown', handleGalleryKeyboard);
            removeTouchGestures();

            // Limpiar cache de imágenes para liberar memoria
            imagePreloadCache.clear();

            // Detener reproducción de medios (videos/iframes) limpiando el contenido del modal
            const modalBody = modal.querySelector('.modal__body');
            if (modalBody) modalBody.innerHTML = '';

            // Reset animación
            isAnimating = false;

            console.log('Modal cerrado');
        }
    }

    // Exponer funciones globalmente
    window.openModal = openModal;
    window.closeModal = closeModal;
    
    console.log('✅ Modal inicializado con contenidos predefinidos');
}