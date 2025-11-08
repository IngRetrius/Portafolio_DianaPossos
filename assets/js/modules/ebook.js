/**
 * Módulo del eBook Interactivo
 * Gestiona la navegación, progreso y multimedia del eBook
 */

let currentChapter = 0;
let ebookModal = null;

/**
 * Abre el eBook en un modal grande
 */
function openEbook() {
    createEbookModal();
    renderChapter(0);
    updateProgress();
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el eBook
 */
function closeEbook() {
    if (ebookModal) {
        ebookModal.remove();
        ebookModal = null;
        document.body.style.overflow = '';
    }
}

/**
 * Crea la estructura del modal del eBook
 */
function createEbookModal() {
    // Crear modal
    ebookModal = document.createElement('div');
    ebookModal.className = 'ebook-modal';
    ebookModal.innerHTML = `
        <div class="ebook-container">
            <!-- Header del eBook -->
            <div class="ebook-header">
                <div class="ebook-header__left">
                    <button class="ebook-btn ebook-btn--icon" id="ebookTableOfContents" title="Tabla de contenidos">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <h2 class="ebook-title">${ebookData.title}</h2>
                </div>
                <div class="ebook-header__right">
                    <button class="ebook-btn ebook-btn--icon" id="ebookDownload" title="Descargar PDF">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </button>
                    <button class="ebook-btn ebook-btn--icon" id="ebookClose" title="Cerrar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Barra de progreso -->
            <div class="ebook-progress-bar">
                <div class="ebook-progress-fill" id="ebookProgressFill"></div>
            </div>

            <!-- Contenido principal -->
            <div class="ebook-main">
                <!-- Sidebar (Tabla de contenidos) -->
                <aside class="ebook-sidebar" id="ebookSidebar">
                    <h3 class="ebook-sidebar__title">Contenidos</h3>
                    <nav class="ebook-toc" id="ebookTOC">
                        <!-- Se genera dinámicamente -->
                    </nav>
                </aside>

                <!-- Contenido del capítulo -->
                <div class="ebook-content-wrapper">
                    <article class="ebook-chapter" id="ebookChapter">
                        <!-- Se genera dinámicamente -->
                    </article>

                    <!-- Navegación inferior -->
                    <nav class="ebook-nav">
                        <button class="ebook-btn ebook-btn--nav" id="ebookPrev" disabled>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                            <span>Anterior</span>
                        </button>
                        <div class="ebook-chapter-indicator" id="ebookIndicator">
                            <!-- Se genera dinámicamente -->
                        </div>
                        <button class="ebook-btn ebook-btn--nav" id="ebookNext">
                            <span>Siguiente</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(ebookModal);

    // Event listeners
    document.getElementById('ebookClose').addEventListener('click', closeEbook);
    document.getElementById('ebookPrev').addEventListener('click', () => navigateChapter(-1));
    document.getElementById('ebookNext').addEventListener('click', () => navigateChapter(1));
    document.getElementById('ebookTableOfContents').addEventListener('click', toggleSidebar);
    document.getElementById('ebookDownload').addEventListener('click', downloadPDF);

    // Cerrar al hacer click fuera del contenido
    ebookModal.addEventListener('click', (e) => {
        if (e.target === ebookModal) {
            closeEbook();
        }
    });

    // Generar tabla de contenidos
    generateTableOfContents();
}

/**
 * Genera la tabla de contenidos
 */
function generateTableOfContents() {
    const tocContainer = document.getElementById('ebookTOC');
    const tocHTML = ebookData.chapters.map((chapter, index) => {
        if (chapter.type === 'cover') return '';

        return `
            <button class="ebook-toc__item ${index === currentChapter ? 'active' : ''}"
                    data-chapter="${index}">
                ${chapter.icon ? `<span class="toc-icon">${chapter.icon}</span>` : ''}
                <span class="toc-text">
                    ${chapter.number ? `<span class="toc-number">${chapter.number}.</span>` : ''}
                    ${chapter.title}
                </span>
            </button>
        `;
    }).join('');

    tocContainer.innerHTML = tocHTML;

    // Event listeners para items de TOC
    tocContainer.querySelectorAll('.ebook-toc__item').forEach(item => {
        item.addEventListener('click', (e) => {
            const chapterIndex = parseInt(e.currentTarget.dataset.chapter);
            goToChapter(chapterIndex);
        });
    });
}

/**
 * Renderiza un capítulo específico con animación de volteo
 */
function renderChapter(index, direction = 'next') {
    const chapter = ebookData.chapters[index];
    const chapterContainer = document.getElementById('ebookChapter');

    // Aplicar animación de volteo
    const animationClass = direction === 'next' ? 'page-turning-next' : 'page-turning-prev';
    chapterContainer.classList.add(animationClass);

    // Esperar a que termine la primera mitad de la animación
    setTimeout(() => {
        // Renderizar contenido
        chapterContainer.innerHTML = chapter.content;

        // Si el capítulo tiene multimedia, agregar sección
        if (chapter.media) {
            const mediaHTML = createMediaSection(chapter.media);
            chapterContainer.innerHTML += mediaHTML;
        }

        // Scroll to top
        chapterContainer.scrollTop = 0;
    }, 300);

    // Remover clase de animación al terminar
    setTimeout(() => {
        chapterContainer.classList.remove(animationClass);
    }, 600);

    // Actualizar navegación
    updateNavigation();
    updateTableOfContents();
}

/**
 * Crea la sección multimedia para un capítulo (integrada, sin modales)
 */
function createMediaSection(media) {
    let content = '';

    switch(media.type) {
        case 'podcast':
            content = `
                <div class="ebook-media">
                    <div class="ebook-media__header">
                        <h3 class="media-title">${media.title}</h3>
                        <p class="media-description">${media.description}</p>
                    </div>
                    <div class="ebook-media__player">
                        <video controls class="media-player">
                            <source src="assets/images/Potcast.mp4" type="video/mp4">
                            Tu navegador no soporta la reproducción de audio.
                        </video>
                    </div>
                </div>
            `;
            break;

        case 'video':
            content = `
                <div class="ebook-media">
                    <div class="ebook-media__header">
                        <h3 class="media-title">${media.title}</h3>
                        <p class="media-description">${media.description}</p>
                    </div>
                    <div class="ebook-media__player">
                        <video controls class="media-player">
                            <source src="assets/images/Video.mp4" type="video/mp4">
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                </div>
            `;
            break;

        case 'gallery':
            content = `
                <div class="ebook-media">
                    <div class="ebook-media__header">
                        <h3 class="media-title">${media.title}</h3>
                        <p class="media-description">${media.description}</p>
                    </div>
                    <div class="ebook-gallery">
                        <div class="gallery-grid">
                            <div class="gallery-item">
                                <img src="assets/images/galeria/1.jpg" alt="Comunidad Educativa Sede Puerres" loading="lazy">
                                <p class="gallery-caption">Comunidad Educativa Sede Puerres</p>
                            </div>
                            <div class="gallery-item">
                                <img src="assets/images/galeria/2.jpg" alt="Fachada principal de la sede Puerres" loading="lazy">
                                <p class="gallery-caption">Fachada principal de la sede Puerres</p>
                            </div>
                            <div class="gallery-item">
                                <img src="assets/images/galeria/3.jpg" alt="IEM Ciudadela Educativa de Pasto Sede Principal" loading="lazy">
                                <p class="gallery-caption">IEM Ciudadela Educativa de Pasto Sede Principal</p>
                            </div>
                            <div class="gallery-item">
                                <img src="assets/images/galeria/4.jpg" alt="Equipos tecnológicos disponibles en la Sede Puerres" loading="lazy">
                                <p class="gallery-caption">Equipos tecnológicos disponibles en la Sede Puerres</p>
                            </div>
                            <div class="gallery-item">
                                <img src="assets/images/galeria/6.png" alt="Instalaciones educativas" loading="lazy">
                                <p class="gallery-caption">Instalaciones educativas</p>
                            </div>
                            <div class="gallery-item">
                                <img src="assets/images/galeria/7.png" alt="Recursos didácticos" loading="lazy">
                                <p class="gallery-caption">Recursos didácticos</p>
                            </div>
                            <div class="gallery-item">
                                <img src="assets/images/galeria/8.png" alt="Espacios de aprendizaje" loading="lazy">
                                <p class="gallery-caption">Espacios de aprendizaje</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            break;
    }

    return content;
}

/**
 * Navega entre capítulos (relativo)
 */
function navigateChapter(direction) {
    const newIndex = currentChapter + direction;
    if (newIndex >= 0 && newIndex < ebookData.chapters.length) {
        const animDirection = direction > 0 ? 'next' : 'prev';
        currentChapter = newIndex;
        renderChapter(currentChapter, animDirection);
        updateProgress();
    }
}

/**
 * Va a un capítulo específico (absoluto)
 */
function goToChapter(index) {
    if (index >= 0 && index < ebookData.chapters.length) {
        const animDirection = index > currentChapter ? 'next' : 'prev';
        currentChapter = index;
        renderChapter(currentChapter, animDirection);
        updateProgress();

        // En móvil, cerrar sidebar después de seleccionar
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    }
}

/**
 * Actualiza los botones de navegación
 */
function updateNavigation() {
    const prevBtn = document.getElementById('ebookPrev');
    const nextBtn = document.getElementById('ebookNext');
    const indicator = document.getElementById('ebookIndicator');

    // Habilitar/deshabilitar botones
    prevBtn.disabled = currentChapter === 0;
    nextBtn.disabled = currentChapter === ebookData.chapters.length - 1;

    // Actualizar indicador
    const chapter = ebookData.chapters[currentChapter];
    indicator.innerHTML = `
        <span class="chapter-current">${currentChapter + 1}</span>
        <span class="chapter-separator">/</span>
        <span class="chapter-total">${ebookData.chapters.length}</span>
        <span class="chapter-name">${chapter.title}</span>
    `;
}

/**
 * Actualiza la tabla de contenidos (highlighting)
 */
function updateTableOfContents() {
    const tocItems = document.querySelectorAll('.ebook-toc__item');
    tocItems.forEach((item, index) => {
        const itemChapter = parseInt(item.dataset.chapter);
        if (itemChapter === currentChapter) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Actualiza la barra de progreso
 */
function updateProgress() {
    const progressFill = document.getElementById('ebookProgressFill');
    const progress = ((currentChapter + 1) / ebookData.chapters.length) * 100;
    progressFill.style.width = `${progress}%`;
}

/**
 * Toggle sidebar (tabla de contenidos)
 */
function toggleSidebar() {
    const sidebar = document.getElementById('ebookSidebar');
    sidebar.classList.toggle('active');
}

/**
 * Descarga el PDF
 */
function downloadPDF() {
    const link = document.createElement('a');
    link.href = 'documents/Referenciando%20-%20Ebook.pdf';
    link.download = 'Marco-Referencial-Proyecto.pdf';
    link.click();
}

/**
 * Navegación con teclado
 */
document.addEventListener('keydown', (e) => {
    if (!ebookModal) return;

    switch(e.key) {
        case 'ArrowLeft':
            navigateChapter(-1);
            break;
        case 'ArrowRight':
            navigateChapter(1);
            break;
        case 'Escape':
            closeEbook();
            break;
    }
});

/**
 * Inicialización del módulo
 */
function initEbook() {
    console.log('eBook module initialized');
}
