/**
 * Módulo del Juego de Mesa Virtual
 * Tablero visual interactivo tipo juego de mesa
 */

let currentWeek = -1; // -1 = START, 0-7 = Semanas 1-8, 8 = GOAL, 9+ = Special cells
let boardGameModal = null;
let selectedCell = null;
let completedWeeks = [];
let totalPoints = 0;
let unlockedBadges = [];

/**
 * Abre el juego de mesa en un modal grande
 */
function openBoardGame() {
    loadProgress();
    createBoardGameModal();
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el juego de mesa
 */
function closeBoardGame() {
    if (boardGameModal) {
        saveProgress();
        boardGameModal.remove();
        boardGameModal = null;
        document.body.style.overflow = '';
    }
}

/**
 * Crea la estructura del modal del juego con tablero visual
 */
function createBoardGameModal() {
    // Crear modal
    boardGameModal = document.createElement('div');
    boardGameModal.className = 'board-game-modal';
    boardGameModal.setAttribute('role', 'dialog');
    boardGameModal.setAttribute('aria-label', 'Juego de Mesa Virtual');
    boardGameModal.setAttribute('aria-modal', 'true');
    
    boardGameModal.innerHTML = `
        <div class="board-game-container">
            <!-- Header del juego -->
            <div class="board-game-header">
                <div class="board-game-header__left">
                    <h2 class="board-game-title">${boardGameData.title}</h2>
                    <p class="board-game-subtitle">${boardGameData.subtitle}</p>
                </div>
                <div class="board-game-header__right">
                    <div class="board-game-stats">
                        <span class="board-game-points" id="boardGamePoints" title="Puntos totales">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 6v6l4 2"></path>
                            </svg>
                            ${totalPoints} pts
                        </span>
                        <span class="board-game-badges" id="boardGameBadges" title="Badges obtenidos">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                            </svg>
                            ${unlockedBadges.length} badges
                        </span>
                    </div>
                    <button class="board-game-btn board-game-btn--icon" id="boardGameClose" title="Cerrar" aria-label="Cerrar juego">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Barra de progreso -->
            <div class="board-game-progress-bar">
                <div class="board-game-progress-fill" id="boardGameProgressFill"></div>
            </div>

            <!-- Área principal del tablero -->
            <div class="board-game-main">
                <!-- Tablero visual -->
                <div class="board-game-visual-board" id="boardGameVisualBoard">
                    <!-- Se genera dinámicamente -->
                </div>

                <!-- Overlay para cerrar panel -->
                <div class="board-game-overlay" id="boardGameOverlay"></div>

                <!-- Panel de contenido (se muestra al hacer click en una casilla) -->
                <div class="board-game-content-panel" id="boardGameContentPanel">
                    <div class="board-game-panel-header">
                        <h3 class="board-game-panel-title" id="boardGamePanelTitle">Contenido</h3>
                        <button class="board-game-panel-close" id="boardGamePanelClose" aria-label="Cerrar panel">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="board-game-content" id="boardGameContent">
                        <div class="board-game-content-placeholder">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin: 0 auto 1rem; opacity: 0.3;">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="15" y2="9"></line>
                                <line x1="9" y1="15" x2="15" y2="15"></line>
                            </svg>
                            <h3>Selecciona una casilla</h3>
                            <p>Haz clic en una casilla del tablero para explorar su contenido</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(boardGameModal);

    // Event listeners
    document.getElementById('boardGameClose').addEventListener('click', closeBoardGame);
    document.getElementById('boardGamePanelClose').addEventListener('click', closeContentPanel);
    document.getElementById('boardGameOverlay').addEventListener('click', closeContentPanel);

    // Cerrar al hacer click fuera del contenido
    boardGameModal.addEventListener('click', (e) => {
        if (e.target === boardGameModal) {
            closeBoardGame();
        }
    });
    
    // Renderizar tablero y actualizar avatar después de un breve delay
    setTimeout(() => {
        renderBoard();
        updateProgress();
        updateBadges();
        // Si hay una semana actual, mostrar el avatar
        if (currentWeek !== -1 && currentWeek !== undefined) {
            selectedCell = currentWeek;
            updateBoardCells();
        }
    }, 100);
}

/**
 * Renderiza el tablero visual
 */
function renderBoard() {
    const boardContainer = document.getElementById('boardGameVisualBoard');
    
    // Crear estructura del tablero tipo juego de mesa
    // Layout visual tipo serpientes y escaleras con camino claro
    // START -> S1 -> S2 -> S3 -> S4 -> (baja) -> S5 -> S6 -> S7 -> S8 -> GOAL
    
    let boardHTML = '<div class="board-game-path">';
    
    // Título del tablero
    boardHTML += '<div class="board-game-path-title">';
    boardHTML += '<h3>El Camino del Aprendizaje</h3>';
    boardHTML += '<p>Recorre las 8 semanas y explora las casillas especiales</p>';
    boardHTML += '</div>';
    
    // Fila 1: START -> S1 -> S2 -> S3 -> S4
    boardHTML += '<div class="board-game-row board-game-row--top">';
    boardHTML += createCell(-1, 'start', 'INICIO', ''); // START
    boardHTML += createPathConnector('right');
    boardHTML += createCell(0, 'week', 'S1', ''); // Semana 1
    boardHTML += createPathConnector('right');
    boardHTML += createCell(1, 'week', 'S2', ''); // Semana 2
    boardHTML += createPathConnector('right');
    boardHTML += createCell(2, 'week', 'S3', ''); // Semana 3
    boardHTML += createPathConnector('right');
    boardHTML += createCell(3, 'week', 'S4', ''); // Semana 4
    boardHTML += '</div>';

    // Espacio entre filas
    boardHTML += '<div class="board-game-connector-vertical"></div>';

    // Fila 2: S5 -> S6 -> S7 -> S8 -> GOAL
    boardHTML += '<div class="board-game-row board-game-row--bottom">';
    boardHTML += createCell(4, 'week', 'S5', ''); // Semana 5
    boardHTML += createPathConnector('right');
    boardHTML += createCell(5, 'week', 'S6', ''); // Semana 6
    boardHTML += createPathConnector('right');
    boardHTML += createCell(6, 'week', 'S7', ''); // Semana 7
    boardHTML += createPathConnector('right');
    boardHTML += createCell(7, 'week', 'S8', ''); // Semana 8
    boardHTML += createPathConnector('right');
    boardHTML += createCell(8, 'goal', 'META', ''); // GOAL
    boardHTML += '</div>';

    // Separador visual
    boardHTML += '<div class="board-game-separator"></div>';

    // Fila 3: Casillas especiales integradas al tablero
    boardHTML += '<div class="board-game-row board-game-row--special">';
    boardHTML += createSpecialCell('competencies', 'COMPETENCIAS', 'Competencias');
    boardHTML += createPathConnector('right');
    boardHTML += createSpecialCell('evaluation', 'EVALUACIÓN', 'Evaluación');
    boardHTML += createPathConnector('right');
    boardHTML += createSpecialCell('resources', 'RECURSOS', 'Recursos');
    boardHTML += createPathConnector('right');
    boardHTML += createSpecialCell('infographic', 'INFOGRAFÍA', 'Infografía');
    boardHTML += '</div>';

    boardHTML += '</div>';
    
    boardContainer.innerHTML = boardHTML;
    
    // Agregar event listeners a las casillas
    boardContainer.querySelectorAll('.board-game-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const weekIndex = parseInt(cell.dataset.week);
            const specialId = cell.dataset.special;
            if (specialId) {
                openSpecialCell(specialId);
            } else {
                openWeek(weekIndex);
            }
        });
        
        // Navegación por teclado
        cell.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const weekIndex = parseInt(cell.dataset.week);
                const specialId = cell.dataset.special;
                if (specialId) {
                    openSpecialCell(specialId);
                } else {
                    openWeek(weekIndex);
                }
            }
        });
    });
}

/**
 * Crea una casilla del tablero
 */
function createCell(weekIndex, type, label, title = '') {
    const isCompleted = completedWeeks.includes(weekIndex);
    const isActive = selectedCell === weekIndex;
    const week = weekIndex >= 0 && weekIndex < boardGameData.weeks.length ? boardGameData.weeks[weekIndex] : null;
    
    // Obtener el título real de la semana si existe
    let weekTitle = title;
    if (week && week.title) {
        weekTitle = week.title;
    }
    
    // Número de casilla: START = 0, Semanas 1-8 = 1-8, GOAL = 9
    let cellNumber = '';
    if (weekIndex === -1) {
        cellNumber = '0';
    } else if (weekIndex === 8) {
        cellNumber = '9';
    } else {
        cellNumber = (weekIndex + 1).toString();
    }
    
    let cellClass = `board-game-cell board-game-cell--${type}`;
    if (isActive) cellClass += ' active';
    if (isCompleted) cellClass += ' completed';
    
    return `
        <div class="${cellClass}" data-week="${weekIndex}" role="button" tabindex="0" aria-label="${weekTitle || label}">
            ${type !== 'start' && type !== 'goal' ? `<div class="cell-number">${cellNumber}</div>` : ''}
            <div class="cell-content">
                <span class="cell-label">${label}</span>
                ${weekTitle && type !== 'start' && type !== 'goal' ? `<span class="cell-title">${weekTitle}</span>` : ''}
            </div>
            ${isCompleted ? '<span class="cell-checkmark">✓</span>' : ''}
        </div>
    `;
}

/**
 * Crea un conector de camino
 */
function createPathConnector(direction) {
    return `<div class="board-game-path-connector board-game-path-connector--${direction}"></div>`;
}

/**
 * Crea una casilla especial
 */
function createSpecialCell(specialId, label, title) {
    const specialWeek = 9 + ['competencies', 'evaluation', 'resources', 'infographic'].indexOf(specialId);
    const isActive = selectedCell === specialWeek;

    let cellClass = `board-game-cell board-game-cell--special board-game-cell--special-${specialId}`;
    if (isActive) cellClass += ' active';

    return `
        <div class="${cellClass}" data-special="${specialId}" data-week="${specialWeek}" role="button" tabindex="0" aria-label="${title}">
            <div class="cell-content">
                <span class="cell-label">${label}</span>
            </div>
        </div>
    `;
}

/**
 * Abre el contenido de una semana
 */
function openWeek(weekIndex) {
    selectedCell = weekIndex;
    currentWeek = weekIndex;
    
    const contentPanel = document.getElementById('boardGameContentPanel');
    const overlay = document.getElementById('boardGameOverlay');
    const content = document.getElementById('boardGameContent');
    const panelTitle = document.getElementById('boardGamePanelTitle');
    
    let contentHTML = '';
    let titleText = 'Contenido';
    
    if (weekIndex === -1) {
        // START
        contentHTML = boardGameData.start.content;
        titleText = 'Inicio';
    } else if (weekIndex === 8) {
        // GOAL
        contentHTML = boardGameData.goal.content;
        titleText = 'Meta';
        setTimeout(() => {
            const certBtn = document.getElementById('downloadCertificate');
            if (certBtn) {
                certBtn.addEventListener('click', generateCertificate);
            }
        }, 100);
    } else if (weekIndex >= 0 && weekIndex < boardGameData.weeks.length) {
        // Semana normal
        const week = boardGameData.weeks[weekIndex];
        contentHTML = renderWeekContent(week);
        titleText = `Semana ${week.number}`;
        
        // Marcar como completada si no lo está
        if (!completedWeeks.includes(weekIndex)) {
            markWeekCompleted(weekIndex);
        }
    }
    
    if (panelTitle) panelTitle.textContent = titleText;
    if (content) content.innerHTML = contentHTML;
    if (contentPanel) contentPanel.classList.add('active');
    if (overlay) overlay.classList.add('active');
    
    // Actualizar estado visual de las casillas y mover el avatar
    updateBoardCells();
    updateProgress();
    saveProgress();
}

/**
 * Abre el contenido de una casilla especial
 */
function openSpecialCell(specialId) {
    const specialKeys = Object.keys(boardGameData.specialCells);
    const specialIndex = specialKeys.indexOf(specialId);
    if (specialIndex !== -1) {
        const specialWeek = 9 + specialIndex;
        selectedCell = specialWeek;
        const contentPanel = document.getElementById('boardGameContentPanel');
        const overlay = document.getElementById('boardGameOverlay');
        const content = document.getElementById('boardGameContent');
        const panelTitle = document.getElementById('boardGamePanelTitle');
        const specialCell = boardGameData.specialCells[specialId];
        
        panelTitle.textContent = specialCell.title;
        content.innerHTML = specialCell.content;
        contentPanel.classList.add('active');
        overlay.classList.add('active');
        
        // Actualizar estado visual de las casillas
        updateBoardCells();
    }
}

/**
 * Cierra el panel de contenido
 */
function closeContentPanel() {
    const contentPanel = document.getElementById('boardGameContentPanel');
    const overlay = document.getElementById('boardGameOverlay');
    if (contentPanel) {
        contentPanel.classList.remove('active');
    }
    if (overlay) {
        overlay.classList.remove('active');
    }
    // Mantener selectedCell para que el avatar permanezca visible
    // Esto indica la posición actual del jugador en el tablero
}

/**
 * Actualiza el estado visual de las casillas y mueve el avatar
 */
function updateBoardCells() {
    // Remover estado activo de todas las casillas (pero mantener el avatar si selectedCell no es null)
    document.querySelectorAll('.board-game-cell').forEach(cell => {
        cell.classList.remove('active');
        // Solo remover avatar si esta casilla no es la activa
        const weekIndex = parseInt(cell.dataset.week);
        if (weekIndex !== selectedCell) {
            const existingAvatar = cell.querySelector('.cell-avatar');
            if (existingAvatar) {
                existingAvatar.remove();
            }
        }
    });
    
    // Agregar estado activo y avatar a la casilla seleccionada
    if (selectedCell !== null && selectedCell !== undefined) {
        const activeCell = document.querySelector(`.board-game-cell[data-week="${selectedCell}"]`);
        if (activeCell) {
            activeCell.classList.add('active');
            
            // Verificar si ya existe un avatar
            let avatar = activeCell.querySelector('.cell-avatar');
            if (!avatar) {
                // Crear y agregar avatar
                avatar = document.createElement('div');
                avatar.className = 'cell-avatar';
                avatar.id = 'boardGameAvatar';
                avatar.innerHTML = `
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                `;
                activeCell.appendChild(avatar);
                
                // Animación de aparición
                setTimeout(() => {
                    avatar.classList.add('show');
                }, 50);
            } else {
                // Si ya existe, asegurarse de que tenga la clase show
                avatar.classList.add('show');
            }
        }
    }
}

/**
 * Renderiza el contenido de una semana
 */
function renderWeekContent(week) {
    const activitiesHTML = week.activities.map(activity => `
        <li class="activity-item">
            <strong>${activity.name}</strong>
            <span class="activity-description">${activity.description}</span>
        </li>
    `).join('');

    const contentsHTML = week.contents.map(content => `
        <li>${content}</li>
    `).join('');

    return `
        <div class="board-game-week-content">
            <div class="week-header">
                <span class="week-number">Semana ${week.number}</span>
                <h2 class="week-title">${week.title}</h2>
                ${week.badge ? `<span class="week-badge">${week.badge}</span>` : ''}
            </div>

            <div class="week-info">
                <div class="info-item">
                    <strong>Fase:</strong> ${week.phase}
                </div>
                <div class="info-item">
                    <strong>Módulo:</strong> ${week.module}
                </div>
                <div class="info-item">
                    <strong>Duración:</strong> ${week.duration}
                </div>
            </div>

            <div class="week-section">
                <h3>Objetivo</h3>
                <p>${week.objective}</p>
            </div>

            <div class="week-section">
                <h3>Contenidos</h3>
                <ul class="week-list">
                    ${contentsHTML}
                </ul>
            </div>

            <div class="week-section">
                <h3>Actividades</h3>
                <ul class="activities-list">
                    ${activitiesHTML}
                </ul>
            </div>

            ${week.resources && week.resources.length > 0 ? `
                <div class="week-section">
                    <h3>Recursos</h3>
                    <ul class="resources-list">
                        ${week.resources.map(resource => `<li><a href="${resource.url}" target="_blank">${resource.name}</a></li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Marca una semana como completada
 */
function markWeekCompleted(weekIndex) {
    if (!completedWeeks.includes(weekIndex)) {
        completedWeeks.push(weekIndex);
        totalPoints += evaluationData.scoring.cellCompleted;
        saveProgress();
        updateProgress();
        updateBadges();
        checkBadgeUnlock(weekIndex);
        
        // Actualizar visualmente la casilla
        const cell = document.querySelector(`.board-game-cell[data-week="${weekIndex}"]`);
        if (cell) {
            cell.classList.add('completed');
        }
    }
}

/**
 * Verifica si se desbloquea un badge
 */
function checkBadgeUnlock(weekIndex) {
    evaluationData.badges.forEach(badge => {
        if (unlockedBadges.includes(badge.id)) return;
        
        let shouldUnlock = false;
        
        if (badge.week && weekIndex === badge.week - 1) {
            shouldUnlock = true;
        } else if (badge.weeks) {
            // Verificar si todas las semanas del badge están completadas
            shouldUnlock = badge.weeks.every(w => completedWeeks.includes(w - 1));
        }
        
        if (shouldUnlock) {
            unlockBadge(badge.id);
        }
    });
}

/**
 * Desbloquea un badge
 */
function unlockBadge(badgeId) {
    const badge = evaluationData.badges.find(b => b.id === badgeId);
    if (badge && !unlockedBadges.includes(badgeId)) {
        unlockedBadges.push(badgeId);
        badge.unlocked = true;
        totalPoints += evaluationData.scoring.quizPassed;
        saveProgress();
        updateBadges();
        
        // Mostrar notificación
        showBadgeNotification(badge);
    }
}

/**
 * Muestra una notificación de badge desbloqueado
 */
function showBadgeNotification(badge) {
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div class="badge-notification-content">
            <span class="badge-icon">${badge.icon}</span>
            <div class="badge-info">
                <strong>¡Badge Desbloqueado!</strong>
                <p>${badge.name}</p>
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Actualiza la visualización de badges
 */
function updateBadges() {
    const badgesElement = document.getElementById('boardGameBadges');
    const pointsElement = document.getElementById('boardGamePoints');
    
    if (badgesElement) {
        badgesElement.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
            </svg>
            ${unlockedBadges.length} badges
        `;
    }
    
    if (pointsElement) {
        pointsElement.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
            </svg>
            ${totalPoints} pts
        `;
    }
}

/**
 * Actualiza la barra de progreso
 */
function updateProgress() {
    const progressFill = document.getElementById('boardGameProgressFill');
    const totalWeeks = boardGameData.weeks.length + 2; // START + 8 semanas + GOAL
    const completedCount = completedWeeks.filter(w => w >= -1 && w <= 8).length;
    const progress = (completedCount / totalWeeks) * 100;
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
}

/**
 * Guarda el progreso en localStorage
 */
function saveProgress() {
    const progress = {
        currentWeek: currentWeek,
        completedWeeks: completedWeeks,
        totalPoints: totalPoints,
        unlockedBadges: unlockedBadges,
        lastVisit: new Date().toISOString()
    };
    localStorage.setItem('boardGame_progress', JSON.stringify(progress));
}

/**
 * Carga el progreso desde localStorage
 */
function loadProgress() {
    const saved = localStorage.getItem('boardGame_progress');
    if (saved) {
        try {
            const progress = JSON.parse(saved);
            currentWeek = progress.currentWeek !== undefined ? progress.currentWeek : -1;
            completedWeeks = progress.completedWeeks || [];
            totalPoints = progress.totalPoints || 0;
            unlockedBadges = progress.unlockedBadges || [];
            
            // Establecer la última semana completada como semana actual si existe
            if (completedWeeks.length > 0 && currentWeek === -1) {
                const lastCompleted = Math.max(...completedWeeks.filter(w => w >= 0 && w < 8));
                if (lastCompleted >= 0) {
                    currentWeek = lastCompleted;
                    selectedCell = lastCompleted;
                }
            }
            
            // Actualizar badges en evaluationData
            evaluationData.badges.forEach(badge => {
                badge.unlocked = unlockedBadges.includes(badge.id);
            });
        } catch (e) {
            console.error('Error loading progress:', e);
        }
    }
}

/**
 * Genera el certificado digital
 */
function generateCertificate() {
    const certificateContent = `
Certificado de Participación
Wordwall Quest: 8 Semanas de Memoria

Este certificado reconoce la exploración completa de la secuencia didáctica
"Fortalecimiento de la memoria a corto plazo mediante Wordwall"

Participante: Visitante del Portafolio
Fecha: ${new Date().toLocaleDateString('es-CO')}
Puntos obtenidos: ${totalPoints}
Badges desbloqueados: ${unlockedBadges.length}

Universidad de Cartagena
Maestría en Recursos Digitales Aplicados a la Educación
    `.trim();
    
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificado-wordwall-quest.txt';
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Navegación con teclado
 */
document.addEventListener('keydown', (e) => {
    if (!boardGameModal) return;
    
    // Prevenir navegación si hay un input activo
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    switch(e.key) {
        case 'Escape':
            e.preventDefault();
            const contentPanel = document.getElementById('boardGameContentPanel');
            if (contentPanel && contentPanel.classList.contains('active')) {
                closeContentPanel();
            } else {
                closeBoardGame();
            }
            break;
    }
});

/**
 * Inicialización del módulo
 */
function initBoardGame() {
    console.log('Board Game module initialized');
}
