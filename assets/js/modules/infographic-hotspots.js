/* ===================================
   INFOGRAPHIC HOTSPOTS MODULE
   Interactive infographic with clickable hotspots
   =================================== */

(function() {
    'use strict';

    let currentModal = null;
    let currentDetailPanel = null;
    let currentBackdrop = null;
    let zoomLevel = 1;
    let isPanning = false;
    let startX, startY, scrollLeft, scrollTop;

    /**
     * Initialize the infographic hotspots module
     */
    function initInfographicHotspots() {
        console.log('Infographic Hotspots module initialized');
    }

    /**
     * Open the infographic modal with hotspots
     */
    function openInfographicHotspots() {
        if (typeof infographicHotspotsData === 'undefined') {
            console.error('Infographic hotspots data not loaded');
            return;
        }

        // Create modal structure
        currentModal = createModal();
        document.body.appendChild(currentModal);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Initialize after a brief delay to ensure DOM is ready
        setTimeout(() => {
            initializeHotspots();
            attachEventListeners();
        }, 100);
    }

    /**
     * Create the modal structure
     */
    function createModal() {
        const modal = document.createElement('div');
        modal.className = 'infographic-modal';
        modal.innerHTML = `
            <div class="infographic-modal__content">
                <div class="infographic-modal__header">
                    <h2 class="infographic-modal__title">${infographicHotspotsData.title}</h2>
                    <button class="infographic-modal__close" aria-label="Cerrar">&times;</button>
                </div>
                <div class="infographic-modal__body">
                    <div class="info-panel">
                        <div class="info-panel__title">💡 Instrucciones</div>
                        <p class="info-panel__text">Haz clic en los puntos numerados para explorar cada sección del diseño instruccional</p>
                    </div>
                    <div class="infographic-container">
                        <img
                            src="${infographicHotspotsData.imagePath}"
                            alt="Infografía de Diseño Instruccional"
                            class="infographic-container__image"
                            draggable="false"
                        >
                        <div class="infographic-container__overlay"></div>
                    </div>
                    <div class="zoom-controls">
                        <button class="zoom-btn" data-action="zoom-in" title="Acercar">+</button>
                        <button class="zoom-btn" data-action="zoom-out" title="Alejar">−</button>
                        <button class="zoom-btn" data-action="zoom-reset" title="Restablecer">⟲</button>
                    </div>
                </div>
            </div>
        `;
        return modal;
    }

    /**
     * Initialize hotspots on the infographic
     */
    function initializeHotspots() {
        const overlay = currentModal.querySelector('.infographic-container__overlay');
        const image = currentModal.querySelector('.infographic-container__image');

        // Wait for image to load
        if (!image.complete) {
            image.addEventListener('load', () => placeHotspots(overlay));
        } else {
            placeHotspots(overlay);
        }
    }

    /**
     * Place hotspots on the overlay
     */
    function placeHotspots(overlay) {
        infographicHotspotsData.hotspots.forEach(hotspot => {
            const hotspotElement = createHotspotElement(hotspot);
            overlay.appendChild(hotspotElement);
        });
    }

    /**
     * Create a hotspot element
     */
    function createHotspotElement(hotspot) {
        const element = document.createElement('div');
        element.className = 'hotspot';
        element.style.left = hotspot.x;
        element.style.top = hotspot.y;
        element.style.transform = 'translate(-50%, -50%)';
        element.dataset.hotspotId = hotspot.id;

        element.innerHTML = `
            <div class="hotspot__marker">${hotspot.number}</div>
            <div class="hotspot__tooltip">${hotspot.title}</div>
        `;

        element.addEventListener('click', () => openDetailPanel(hotspot));

        return element;
    }

    /**
     * Open detail panel for a hotspot
     */
    function openDetailPanel(hotspot) {
        // Close existing panel if any
        closeDetailPanel();

        // Create backdrop
        currentBackdrop = document.createElement('div');
        currentBackdrop.className = 'detail-backdrop';
        document.body.appendChild(currentBackdrop);

        // Create detail panel
        currentDetailPanel = createDetailPanelElement(hotspot);
        document.body.appendChild(currentDetailPanel);

        // Trigger animation
        requestAnimationFrame(() => {
            currentBackdrop.classList.add('active');
            currentDetailPanel.classList.add('active');
        });

        // Attach close handlers
        currentBackdrop.addEventListener('click', closeDetailPanel);
        const closeBtn = currentDetailPanel.querySelector('.detail-panel__close');
        closeBtn.addEventListener('click', closeDetailPanel);

        // ESC key to close
        document.addEventListener('keydown', handleEscapeKey);
    }

    /**
     * Create detail panel element
     */
    function createDetailPanelElement(hotspot) {
        const panel = document.createElement('div');
        panel.className = 'detail-panel';

        let sectionsHTML = '';
        hotspot.content.sections.forEach(section => {
            sectionsHTML += `
                <h3>${section.heading}</h3>
                <div>${section.text}</div>
            `;
        });

        panel.innerHTML = `
            <div class="detail-panel__header">
                <div class="detail-panel__number">${hotspot.number}</div>
                <h3 class="detail-panel__title">${hotspot.title}</h3>
                <button class="detail-panel__close" aria-label="Cerrar">&times;</button>
            </div>
            <div class="detail-panel__body">
                ${sectionsHTML}
            </div>
        `;

        return panel;
    }

    /**
     * Close detail panel
     */
    function closeDetailPanel() {
        if (currentDetailPanel) {
            currentDetailPanel.classList.remove('active');
            currentBackdrop.classList.remove('active');

            setTimeout(() => {
                if (currentDetailPanel) {
                    currentDetailPanel.remove();
                    currentDetailPanel = null;
                }
                if (currentBackdrop) {
                    currentBackdrop.remove();
                    currentBackdrop = null;
                }
            }, 300);

            document.removeEventListener('keydown', handleEscapeKey);
        }
    }

    /**
     * Handle ESC key press
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeDetailPanel();
        }
    }

    /**
     * Close the main infographic modal
     */
    function closeInfographicModal() {
        closeDetailPanel();

        if (currentModal) {
            currentModal.style.opacity = '0';
            setTimeout(() => {
                if (currentModal) {
                    currentModal.remove();
                    currentModal = null;
                }
                document.body.style.overflow = '';
                zoomLevel = 1;
            }, 300);
        }
    }

    /**
     * Handle zoom controls
     */
    function handleZoom(action) {
        const container = currentModal.querySelector('.infographic-container');
        const image = currentModal.querySelector('.infographic-container__image');
        const overlay = currentModal.querySelector('.infographic-container__overlay');

        if (action === 'zoom-in') {
            zoomLevel = Math.min(zoomLevel + 0.2, 3);
        } else if (action === 'zoom-out') {
            zoomLevel = Math.max(zoomLevel - 0.2, 0.5);
        } else if (action === 'zoom-reset') {
            zoomLevel = 1;
        }

        image.style.transform = `scale(${zoomLevel})`;
        overlay.style.transform = `scale(${zoomLevel})`;
        image.style.transformOrigin = 'top left';
        overlay.style.transformOrigin = 'top left';

        // Adjust container size
        const originalWidth = image.naturalWidth || image.offsetWidth;
        const originalHeight = image.naturalHeight || image.offsetHeight;
        container.style.width = `${originalWidth * zoomLevel}px`;
        container.style.height = `${originalHeight * zoomLevel}px`;
    }

    /**
     * Attach event listeners
     */
    function attachEventListeners() {
        // Close button
        const closeBtn = currentModal.querySelector('.infographic-modal__close');
        closeBtn.addEventListener('click', closeInfographicModal);

        // Zoom controls
        const zoomButtons = currentModal.querySelectorAll('.zoom-btn');
        zoomButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                handleZoom(action);
            });
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !currentDetailPanel) {
                closeInfographicModal();
            }
        });

        // Pan functionality
        const modalBody = currentModal.querySelector('.infographic-modal__body');

        modalBody.addEventListener('mousedown', (e) => {
            // Only enable panning when zoomed
            if (zoomLevel > 1) {
                isPanning = true;
                startX = e.pageX - modalBody.offsetLeft;
                startY = e.pageY - modalBody.offsetTop;
                scrollLeft = modalBody.scrollLeft;
                scrollTop = modalBody.scrollTop;
                modalBody.style.cursor = 'grabbing';
            }
        });

        modalBody.addEventListener('mouseleave', () => {
            isPanning = false;
            modalBody.style.cursor = 'default';
        });

        modalBody.addEventListener('mouseup', () => {
            isPanning = false;
            modalBody.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
        });

        modalBody.addEventListener('mousemove', (e) => {
            if (!isPanning) return;
            e.preventDefault();
            const x = e.pageX - modalBody.offsetLeft;
            const y = e.pageY - modalBody.offsetTop;
            const walkX = (x - startX) * 2;
            const walkY = (y - startY) * 2;
            modalBody.scrollLeft = scrollLeft - walkX;
            modalBody.scrollTop = scrollTop - walkY;
        });

        // Set initial cursor
        modalBody.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
    }

    // Expose global functions
    window.initInfographicHotspots = initInfographicHotspots;
    window.openInfographicHotspots = openInfographicHotspots;
    window.closeInfographicModal = closeInfographicModal;

})();
