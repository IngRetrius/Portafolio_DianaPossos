/**
 * HELPERS.JS
 * Utilidades compartidas para todas las actividades
 */

/**
 * Shuffle array usando algoritmo Fisher-Yates
 * @param {Array} array - Array a mezclar
 * @returns {Array} Nuevo array mezclado
 */
export function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Generar ID único
 * @returns {string} ID único
 */
export function generateId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Debounce función
 * @param {Function} func - Función a hacer debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle función
 * @param {Function} func - Función a hacer throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} Función con throttle
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Normalizar string para comparación (remove acentos, lowercase, trim)
 * @param {string} str - String a normalizar
 * @returns {string} String normalizado
 */
export function normalizeString(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

/**
 * Comparar strings de forma flexible
 * @param {string} str1 - Primera string
 * @param {string} str2 - Segunda string
 * @param {boolean} caseSensitive - Si debe ser case sensitive
 * @returns {boolean} True si coinciden
 */
export function compareStrings(str1, str2, caseSensitive = false) {
    if (caseSensitive) {
        return str1.trim() === str2.trim();
    }
    return normalizeString(str1) === normalizeString(str2);
}

/**
 * Calcular distancia de Levenshtein entre dos strings
 * @param {string} str1 - Primera string
 * @param {string} str2 - Segunda string
 * @returns {number} Distancia de edición
 */
export function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

/**
 * Calcular similitud porcentual entre dos strings
 * @param {string} str1 - Primera string
 * @param {string} str2 - Segunda string
 * @returns {number} Porcentaje de similitud (0-100)
 */
export function stringSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) {
        return 100;
    }

    const distance = levenshteinDistance(longer, shorter);
    return ((longer.length - distance) / longer.length) * 100;
}

/**
 * Esperar tiempo determinado (para async/await)
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} Promise que se resuelve después del tiempo
 */
export function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Clamp número entre mín y máx
 * @param {number} value - Valor a limitar
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} Valor limitado
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Obtener coordenadas de un evento (mouse o touch)
 * @param {Event} event - Evento de mouse o touch
 * @returns {Object} Coordenadas {x, y}
 */
export function getEventCoordinates(event) {
    if (event.touches && event.touches.length > 0) {
        return {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    } else if (event.changedTouches && event.changedTouches.length > 0) {
        return {
            x: event.changedTouches[0].clientX,
            y: event.changedTouches[0].clientY
        };
    } else {
        return {
            x: event.clientX,
            y: event.clientY
        };
    }
}

/**
 * Detectar si es dispositivo móvil
 * @returns {boolean} True si es móvil
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Detectar si soporta touch
 * @returns {boolean} True si soporta touch
 */
export function supportsTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Formatear tiempo en mm:ss
 * @param {number} seconds - Segundos totales
 * @returns {string} Tiempo formateado
 */
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Animar número de 0 a valor final
 * @param {HTMLElement} element - Elemento DOM
 * @param {number} start - Valor inicial
 * @param {number} end - Valor final
 * @param {number} duration - Duración en ms
 */
export function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, 16);
}

/**
 * Crear elemento DOM desde HTML string
 * @param {string} html - HTML string
 * @returns {HTMLElement} Elemento creado
 */
export function createElementFromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

/**
 * Obtener elemento más cercano que coincida con selector
 * @param {HTMLElement} element - Elemento inicial
 * @param {string} selector - Selector CSS
 * @returns {HTMLElement|null} Elemento encontrado o null
 */
export function closest(element, selector) {
    if (element.closest) {
        return element.closest(selector);
    }
    // Polyfill para navegadores antiguos
    let el = element;
    while (el) {
        if (el.matches(selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

/**
 * Focus trap para modales
 * @param {HTMLElement} container - Contenedor del modal
 */
export function trapFocus(container) {
    const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    container.addEventListener('keydown', handleTabKey);

    // Focus primer elemento
    if (firstElement) {
        firstElement.focus();
    }

    return () => {
        container.removeEventListener('keydown', handleTabKey);
    };
}

/**
 * Precargar imagen
 * @param {string} src - URL de la imagen
 * @returns {Promise<HTMLImageElement>} Promise con imagen cargada
 */
export function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/**
 * Precargar múltiples imágenes
 * @param {Array<string>} srcs - Array de URLs
 * @returns {Promise<Array>} Promise con todas las imágenes
 */
export function preloadImages(srcs) {
    return Promise.all(srcs.map(src => preloadImage(src)));
}
