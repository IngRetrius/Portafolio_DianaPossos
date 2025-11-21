/**
 * Módulo de Diseño Instruccional
 * Sistema de navegación mejorado con zoom, pan, hotspots y navegación secuencial
 * Incluye minimap, auto-scroll y resaltado de secciones
 */

let instructionalDesignModal = null;
let panzoomInstance = null;
let currentSectionIndex = 0;
let sections = [];
let isMinimapVisible = false;

/**
 * Inicializa el módulo de diseño instruccional
 */
function initInstructionalDesign() {
    document.addEventListener('keydown', handleKeyboardNavigation);
    console.log('Módulo de Diseño Instruccional inicializado');
}

/**
 * Maneja la navegación por teclado
 */
function handleKeyboardNavigation(e) {
    if (!instructionalDesignModal) return;

    switch(e.key) {
        case 'Escape':
            closeInstructionalDesign();
            break;
        case 'ArrowRight':
        case 'ArrowDown':
            e.preventDefault();
            navigateToSection('next');
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            navigateToSection('prev');
            break;
        case 'Home':
            e.preventDefault();
            navigateToSection(0);
            break;
        case 'End':
            e.preventDefault();
            navigateToSection(sections.length - 1);
            break;
    }
}

/**
 * Abre el modal de diseño instruccional con la infografía interactiva
 */
function openInstructionalDesign() {
    if (instructionalDesignModal) {
        return;
    }

    sections = instructionalDesignData.infographicSections;
    currentSectionIndex = 0;
    document.body.style.overflow = 'hidden';
    createInfographicModal();

    setTimeout(() => {
        if (instructionalDesignModal) {
            instructionalDesignModal.classList.add('active');
        }
    }, 10);
}

/**
 * Cierra el modal de diseño instruccional
 */
function closeInstructionalDesign() {
    if (!instructionalDesignModal) {
        return;
    }

    instructionalDesignModal.classList.remove('active');

    // Destruir instancia de Panzoom
    if (panzoomInstance) {
        panzoomInstance.destroy();
        panzoomInstance = null;
    }

    setTimeout(() => {
        if (instructionalDesignModal) {
            instructionalDesignModal.remove();
            instructionalDesignModal = null;
            document.body.style.overflow = '';
        }
    }, 300);
}

/**
 * Crea la estructura DOM del modal con infografía interactiva
 */
function createInfographicModal() {
    const modal = document.createElement('div');
    modal.className = 'id-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'id-modal-title');

    modal.innerHTML = `
        <div class="id-modal-backdrop" onclick="closeInstructionalDesign()"></div>

        <div class="id-modal-container">
            <!-- Header -->
            <header class="id-modal-header">
                <div class="id-header-content">
                    <h2 id="id-modal-title" class="id-title">
                        ${instructionalDesignData.infographic.title}
                    </h2>
                    <p class="id-subtitle">${instructionalDesignData.subtitle}</p>
                </div>

                <div class="id-header-controls">
                    <button
                        class="id-btn id-btn-minimap"
                        id="idBtnMinimap"
                        onclick="toggleMinimap()"
                        title="Mostrar/Ocultar minimapa"
                        aria-label="Mostrar/Ocultar minimapa">
                        <span class="id-icon">&#128506;</span>
                        <span class="id-btn-text">Mapa</span>
                    </button>

                    <button
                        class="id-btn id-btn-pdf"
                        onclick="openFullDocument()"
                        title="Abrir PDF completo"
                        aria-label="Abrir documento PDF completo">
                        <span class="id-icon">&#128196;</span>
                        <span class="id-btn-text">PDF</span>
                    </button>

                    <button
                        class="id-btn id-btn-close"
                        onclick="closeInstructionalDesign()"
                        title="Cerrar"
                        aria-label="Cerrar diseño instruccional">
                        <span class="id-icon">&times;</span>
                    </button>
                </div>
            </header>

            <!-- Main Content Area -->
            <div class="id-modal-body">
                <!-- Panel de navegación lateral -->
                <aside class="id-navigation-panel">
                    <div class="id-nav-header">
                        <h3>Secciones</h3>
                        <span class="id-section-counter" id="idSectionCounter">1 / ${sections.length}</span>
                    </div>

                    <div class="id-nav-sections" id="idNavSections">
                        ${renderNavigationList()}
                    </div>

                    <div class="id-nav-footer">
                        <p class="id-nav-hint">
                            <strong>Navegación:</strong><br>
                            &larr; &rarr; : Secciones<br>
                            Rueda: Zoom<br>
                            Arrastrar: Mover
                        </p>
                    </div>
                </aside>

                <!-- Contenedor de infografía con Panzoom -->
                <div class="id-viewport-wrapper">
                    <!-- Controles de zoom -->
                    <div class="id-zoom-panel">
                        <div class="id-zoom-controls">
                            <button
                                class="id-btn-zoom"
                                onclick="zoomIn()"
                                title="Acercar"
                                aria-label="Acercar zoom">
                                <span class="id-icon">+</span>
                            </button>
                            <button
                                class="id-btn-zoom"
                                onclick="zoomReset()"
                                title="Restablecer"
                                aria-label="Restablecer zoom">
                                <span class="id-icon">&#8226;</span>
                            </button>
                            <button
                                class="id-btn-zoom"
                                onclick="zoomOut()"
                                title="Alejar"
                                aria-label="Alejar zoom">
                                <span class="id-icon">−</span>
                            </button>
                        </div>
                        <div class="id-zoom-info">
                            <span id="idZoomLevel">100%</span>
                        </div>
                    </div>

                    <!-- Minimap -->
                    <div class="id-minimap" id="idMinimap" style="display: none;">
                        <div class="id-minimap-header">
                            <span>Vista General</span>
                            <button class="id-minimap-close" onclick="toggleMinimap()">&times;</button>
                        </div>
                        <div class="id-minimap-viewport">
                            <img
                                src="${instructionalDesignData.infographic.imagePath}"
                                alt="Vista general"
                                class="id-minimap-image">
                            <div class="id-minimap-indicator" id="idMinimapIndicator"></div>
                        </div>
                    </div>

                    <!-- Viewport principal -->
                    <div class="id-infographic-viewport" id="idViewport">
                        <div class="id-infographic-container" id="idInfographicContainer">
                            <img
                                src="${instructionalDesignData.infographic.imagePath}"
                                alt="${instructionalDesignData.infographic.title}"
                                class="id-infographic-image"
                                id="idInfographicImage"
                                onload="initPanzoomAndHotspots()">

                            <!-- Capa de hotspots -->
                            <div class="id-hotspots-layer" id="idHotspotsLayer">
                                ${renderHotspots()}
                            </div>
                        </div>
                    </div>

                    <!-- Indicador de sección actual -->
                    <div class="id-section-indicator" id="idSectionIndicator">
                        <div class="id-indicator-content">
                            <span class="id-indicator-icon">&#9758;</span>
                            <span class="id-indicator-text" id="idIndicatorText">Contexto</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer con navegación -->
            <footer class="id-modal-footer">
                <button
                    class="id-btn-nav id-btn-prev"
                    onclick="navigateToSection('prev')"
                    id="idBtnPrev"
                    aria-label="Sección anterior">
                    <span class="id-icon">&larr;</span>
                    <span class="id-nav-text">Anterior</span>
                </button>

                <div class="id-progress-container">
                    <div class="id-progress-bar">
                        <div class="id-progress-fill" id="idProgressFill" style="width: ${(100 / sections.length)}%"></div>
                    </div>
                    <span class="id-progress-text" id="idProgressText">${currentSectionIndex + 1} de ${sections.length}</span>
                </div>

                <button
                    class="id-btn-nav id-btn-next"
                    onclick="navigateToSection('next')"
                    id="idBtnNext"
                    aria-label="Siguiente sección">
                    <span class="id-nav-text">Siguiente</span>
                    <span class="id-icon">&rarr;</span>
                </button>
            </footer>
        </div>
    `;

    document.body.appendChild(modal);
    instructionalDesignModal = modal;
}

/**
 * Renderiza la lista de navegación lateral
 */
function renderNavigationList() {
    return sections
        .map((section, index) => `
            <button
                class="id-nav-item ${index === 0 ? 'active' : ''}"
                data-section-index="${index}"
                onclick="navigateToSection(${index})"
                aria-label="Navegar a ${section.title}">
                <span class="id-nav-number">${index + 1}</span>
                <span class="id-nav-title">${section.title}</span>
            </button>
        `)
        .join('');
}

/**
 * Renderiza los hotspots interactivos sobre la infografía
 */
function renderHotspots() {
    return sections
        .map((hotspot, index) => `
            <div
                class="id-hotspot ${index === 0 ? 'active' : ''}"
                data-hotspot-id="${hotspot.id}"
                data-hotspot-index="${index}"
                style="
                    top: ${hotspot.position.top};
                    left: ${hotspot.position.left};
                    width: ${hotspot.position.width};
                    height: ${hotspot.position.height};
                "
                onclick="navigateToSection(${index})"
                onmouseenter="previewHotspot(${index})"
                onmouseleave="hideHotspotPreview()"
                role="button"
                tabindex="0"
                aria-label="${hotspot.title}">
                <div class="id-hotspot-overlay"></div>
                <div class="id-hotspot-label">
                    <span class="id-hotspot-number">${index + 1}</span>
                    <span class="id-hotspot-title">${hotspot.title}</span>
                </div>
            </div>
        `)
        .join('');
}

/**
 * Inicializa Panzoom y los hotspots después de cargar la imagen
 */
function initPanzoomAndHotspots() {
    const container = document.getElementById('idInfographicContainer');
    if (!container) return;

    // Cargar Panzoom desde CDN si no está disponible
    if (typeof Panzoom === 'undefined') {
        loadPanzoomLibrary();
        return;
    }

    // Inicializar Panzoom
    panzoomInstance = Panzoom(container, {
        maxScale: 3,
        minScale: 0.5,
        step: 0.3,
        startScale: 1,
        startX: 0,
        startY: 0,
        canvas: true,
        contain: 'outside',
        cursor: 'move'
    });

    // Eventos de zoom con rueda del mouse
    const viewport = document.getElementById('idViewport');
    if (viewport) {
        viewport.addEventListener('wheel', function(e) {
            e.preventDefault();
            panzoomInstance.zoomWithWheel(e);
            updateZoomLevel();
            updateMinimapIndicator();
        }, { passive: false });
    }

    // Actualizar nivel de zoom en la UI
    container.addEventListener('panzoomchange', function() {
        updateZoomLevel();
        updateMinimapIndicator();
    });

    // Ajustar hotspots al zoom
    container.addEventListener('panzoomchange', adjustHotspotsToZoom);

    // Navegar a la primera sección
    setTimeout(() => {
        navigateToSection(0);
    }, 300);

    console.log('Panzoom inicializado correctamente');
}

/**
 * Carga la librería Panzoom desde CDN
 */
function loadPanzoomLibrary() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js';
    script.onload = function() {
        console.log('Panzoom cargado desde CDN');
        initPanzoomAndHotspots();
    };
    script.onerror = function() {
        console.error('Error al cargar Panzoom. Modo de navegación limitado');
        enableFallbackNavigation();
    };
    document.head.appendChild(script);
}

/**
 * Habilita navegación alternativa si Panzoom no carga
 */
function enableFallbackNavigation() {
    const container = document.getElementById('idInfographicContainer');
    if (!container) return;

    let scale = 1;

    // Zoom con botones
    window.zoomIn = function() {
        scale = Math.min(scale + 0.2, 3);
        container.style.transform = `scale(${scale})`;
        updateZoomLevel();
    };

    window.zoomOut = function() {
        scale = Math.max(scale - 0.2, 0.5);
        container.style.transform = `scale(${scale})`;
        updateZoomLevel();
    };

    window.zoomReset = function() {
        scale = 1;
        container.style.transform = 'scale(1)';
        updateZoomLevel();
    };

    console.log('Navegación en modo fallback activada');
}

/**
 * Actualiza el nivel de zoom en la UI
 */
function updateZoomLevel() {
    if (!panzoomInstance) return;

    const scale = panzoomInstance.getScale();
    const zoomLevelEl = document.getElementById('idZoomLevel');
    if (zoomLevelEl) {
        zoomLevelEl.textContent = `${Math.round(scale * 100)}%`;
    }
}

/**
 * Ajusta los hotspots al nivel de zoom actual
 */
function adjustHotspotsToZoom() {
    if (!panzoomInstance) return;

    const scale = panzoomInstance.getScale();
    const hotspots = document.querySelectorAll('.id-hotspot');

    hotspots.forEach(hotspot => {
        const borderWidth = Math.max(2, 3 / scale);
        hotspot.style.borderWidth = `${borderWidth}px`;
    });
}

/**
 * Controles de zoom
 */
function zoomIn() {
    if (panzoomInstance) {
        panzoomInstance.zoomIn();
        updateZoomLevel();
        updateMinimapIndicator();
    }
}

function zoomOut() {
    if (panzoomInstance) {
        panzoomInstance.zoomOut();
        updateZoomLevel();
        updateMinimapIndicator();
    }
}

function zoomReset() {
    if (panzoomInstance) {
        panzoomInstance.reset();
        updateZoomLevel();
        updateMinimapIndicator();
    }
}

/**
 * Navega a una sección específica o relativa
 */
function navigateToSection(target) {
    let newIndex;

    if (typeof target === 'number') {
        newIndex = target;
    } else if (target === 'next') {
        newIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    } else if (target === 'prev') {
        newIndex = Math.max(currentSectionIndex - 1, 0);
    } else {
        return;
    }

    // No hacer nada si ya estamos en esa sección
    if (newIndex === currentSectionIndex) return;

    currentSectionIndex = newIndex;
    const section = sections[currentSectionIndex];

    // Actualizar UI
    updateNavigationUI();
    updateActiveHotspot();
    updateSectionIndicator(section.title);
    scrollToSection(section);
}

/**
 * Hace scroll suave a una sección específica con zoom fijo a 300%
 */
function scrollToSection(section) {
    if (!panzoomInstance) return;

    const container = document.getElementById('idInfographicContainer');
    const image = document.getElementById('idInfographicImage');
    const viewport = document.getElementById('idViewport');

    if (!container || !image || !viewport) return;

    // Obtener el estado actual de panzoom
    const currentScale = panzoomInstance.getScale();
    const currentPan = panzoomInstance.getPan();

    // Obtener dimensiones de la imagen en su escala BASE (1x)
    // Usamos offsetWidth/Height que son las dimensiones CSS renderizadas a escala 1
    const imageBaseWidth = image.offsetWidth;
    const imageBaseHeight = image.offsetHeight;

    console.log('Dimensiones base imagen (1x):', imageBaseWidth, 'x', imageBaseHeight);
    console.log('Escala actual:', currentScale);

    // Calcular posición del centro de la sección (porcentajes de la imagen)
    const sectionTop = parseFloat(section.position.top) / 100;
    const sectionLeft = parseFloat(section.position.left) / 100;
    const sectionWidth = parseFloat(section.position.width) / 100;
    const sectionHeight = parseFloat(section.position.height) / 100;

    // Centro de la sección en píxeles (a escala 1x)
    const centerX = (sectionLeft + sectionWidth / 2) * imageBaseWidth;
    const centerY = (sectionTop + sectionHeight / 2) * imageBaseHeight;

    console.log('Sección:', section.title);
    console.log('Porcentajes - Top:', sectionTop * 100, '% Left:', sectionLeft * 100, '%');
    console.log('Centro en imagen (1x):', centerX, centerY);

    // Dimensiones del viewport
    const viewportWidth = viewport.offsetWidth;
    const viewportHeight = viewport.offsetHeight;

    console.log('Viewport:', viewportWidth, 'x', viewportHeight);

    // Zoom fijo a 300%
    const targetZoom = 3.0;

    // Aplicar zoom a 300%
    panzoomInstance.zoom(targetZoom, { animate: true });

    // Esperar a que el zoom se complete antes de hacer pan
    setTimeout(() => {
        // Calcular la posición para centrar la sección en el viewport
        // Pan X = (mitad del viewport) - (posición del centro de la sección escalada)
        const targetX = (viewportWidth / 2) - (centerX * targetZoom);
        const targetY = (viewportHeight / 2) - (centerY * targetZoom);

        console.log('Pan calculado:', targetX, targetY);

        panzoomInstance.pan(targetX, targetY, { animate: true });

        updateZoomLevel();
        updateMinimapIndicator();
    }, 400);
}

/**
 * Actualiza la UI de navegación
 */
function updateNavigationUI() {
    // Actualizar botones de navegación
    const btnPrev = document.getElementById('idBtnPrev');
    const btnNext = document.getElementById('idBtnNext');

    if (btnPrev) {
        btnPrev.disabled = currentSectionIndex === 0;
    }

    if (btnNext) {
        btnNext.disabled = currentSectionIndex === sections.length - 1;
    }

    // Actualizar contador
    const counter = document.getElementById('idSectionCounter');
    if (counter) {
        counter.textContent = `${currentSectionIndex + 1} / ${sections.length}`;
    }

    // Actualizar barra de progreso
    const progressFill = document.getElementById('idProgressFill');
    const progressText = document.getElementById('idProgressText');

    if (progressFill) {
        const progress = ((currentSectionIndex + 1) / sections.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    if (progressText) {
        progressText.textContent = `${currentSectionIndex + 1} de ${sections.length}`;
    }

    // Actualizar lista de navegación
    const navItems = document.querySelectorAll('.id-nav-item');
    navItems.forEach((item, index) => {
        if (index === currentSectionIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Actualiza el hotspot activo
 */
function updateActiveHotspot() {
    const hotspots = document.querySelectorAll('.id-hotspot');
    hotspots.forEach((hotspot, index) => {
        if (index === currentSectionIndex) {
            hotspot.classList.add('active');
        } else {
            hotspot.classList.remove('active');
        }
    });
}

/**
 * Actualiza el indicador de sección
 */
function updateSectionIndicator(title) {
    const indicatorText = document.getElementById('idIndicatorText');
    const indicator = document.getElementById('idSectionIndicator');

    if (indicatorText) {
        indicatorText.textContent = title;
    }

    // Animación de aparición
    if (indicator) {
        indicator.classList.remove('show');
        setTimeout(() => {
            indicator.classList.add('show');
        }, 50);
    }
}

/**
 * Vista previa del hotspot al pasar el mouse
 */
function previewHotspot(index) {
    const hotspot = document.querySelector(`[data-hotspot-index="${index}"]`);
    if (hotspot && index !== currentSectionIndex) {
        hotspot.classList.add('hover');
    }
}

function hideHotspotPreview() {
    document.querySelectorAll('.id-hotspot').forEach(h => {
        if (!h.classList.contains('active')) {
            h.classList.remove('hover');
        }
    });
}

/**
 * Toggle del minimap
 */
function toggleMinimap() {
    isMinimapVisible = !isMinimapVisible;
    const minimap = document.getElementById('idMinimap');
    const btn = document.getElementById('idBtnMinimap');

    if (minimap) {
        minimap.style.display = isMinimapVisible ? 'flex' : 'none';
        if (isMinimapVisible) {
            updateMinimapIndicator();
        }
    }

    if (btn) {
        btn.classList.toggle('active', isMinimapVisible);
    }
}

/**
 * Actualiza el indicador de posición en el minimap
 */
function updateMinimapIndicator() {
    if (!isMinimapVisible || !panzoomInstance) return;

    const indicator = document.getElementById('idMinimapIndicator');
    const viewport = document.getElementById('idViewport');
    const container = document.getElementById('idInfographicContainer');
    const image = document.getElementById('idInfographicImage');

    if (!indicator || !viewport || !container || !image) return;

    const scale = panzoomInstance.getScale();
    const pan = panzoomInstance.getPan();

    // Calcular el área visible en la imagen original
    const viewportWidth = viewport.offsetWidth;
    const viewportHeight = viewport.offsetHeight;
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    // Calcular posición y tamaño del indicador
    const visibleWidth = viewportWidth / scale;
    const visibleHeight = viewportHeight / scale;

    const offsetX = -pan.x / scale;
    const offsetY = -pan.y / scale;

    // Convertir a porcentajes para el minimap
    const indicatorLeft = (offsetX / imageWidth) * 100;
    const indicatorTop = (offsetY / imageHeight) * 100;
    const indicatorWidth = (visibleWidth / imageWidth) * 100;
    const indicatorHeight = (visibleHeight / imageHeight) * 100;

    indicator.style.left = `${indicatorLeft}%`;
    indicator.style.top = `${indicatorTop}%`;
    indicator.style.width = `${indicatorWidth}%`;
    indicator.style.height = `${indicatorHeight}%`;
}

/**
 * Abre el documento PDF completo
 */
function openFullDocument() {
    const pdfPath = instructionalDesignData.infographic.fullDocPath;
    window.open(pdfPath, '_blank');
}

// Exportar funciones globales
window.initInstructionalDesign = initInstructionalDesign;
window.openInstructionalDesign = openInstructionalDesign;
window.closeInstructionalDesign = closeInstructionalDesign;
window.navigateToSection = navigateToSection;
window.previewHotspot = previewHotspot;
window.hideHotspotPreview = hideHotspotPreview;
window.openFullDocument = openFullDocument;
window.toggleMinimap = toggleMinimap;
window.zoomIn = zoomIn;
window.zoomOut = zoomOut;
window.zoomReset = zoomReset;
