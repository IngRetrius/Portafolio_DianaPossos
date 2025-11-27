/**
 * IMAGE-PLACEHOLDERS.JS
 * Generador de placeholders SVG para imágenes mientras se consiguen las reales
 */

/**
 * Iconos SVG para cada categoría
 */
const SVG_ICONS = {
    // Objetos del aula
    'lapiz': '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
    'borrador': '<rect x="4" y="8" width="16" height="10" rx="2"/><path d="M8 6V4M12 6V4M16 6V4"/>',
    'cuaderno': '<rect x="5" y="3" width="14" height="18" rx="1"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="15" y2="15"/>',
    'regla': '<rect x="3" y="10" width="18" height="4" rx="1"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="9" y1="10" x2="9" y2="14"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="15" y1="10" x2="15" y2="14"/><line x1="18" y1="10" x2="18" y2="14"/>',
    'tijeras': '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    'libro': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',

    // Animales
    'vaca': '<ellipse cx="12" cy="14" rx="8" ry="6"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><path d="M6 8C5 6 4 5 3 5M18 8C19 6 20 5 21 5"/><rect x="10" y="19" width="1.5" height="3"/><rect x="12.5" y="19" width="1.5" height="3"/>',
    'gallina': '<ellipse cx="12" cy="13" rx="6" ry="5"/><circle cx="10" cy="9" r="3"/><path d="M7 9L5 7M13 9L15 7"/><polygon points="16,11 18,13 16,15"/>',
    'caballo': '<path d="M12 2C10 2 8 4 8 6v4l-2 8h4v6h4v-6h4l-2-8V6c0-2-2-4-4-4z"/><circle cx="10" cy="6" r="1"/><circle cx="14" cy="6" r="1"/>',
    'cerdo': '<ellipse cx="12" cy="14" rx="7" ry="5"/><circle cx="10" cy="12" r="2"/><circle cx="14" cy="12" r="2"/><ellipse cx="12" cy="16" rx="2" ry="1.5"/><circle cx="11" cy="16" r="0.5"/><circle cx="13" cy="16" r="0.5"/>',
    'oveja': '<ellipse cx="12" cy="14" rx="7" ry="5"/><circle cx="6" cy="12" r="2"/><circle cx="8" cy="9" r="2"/><circle cx="11" cy="8" r="2"/><circle cx="14" cy="9" r="2"/><circle cx="16" cy="12" r="2"/>',
    'perro': '<path d="M10 5C9 3 7 2 5 3M14 5C15 3 17 2 19 3"/><ellipse cx="12" cy="13" rx="6" ry="5"/><circle cx="10" cy="11" r="1"/><circle cx="14" cy="11" r="1"/><path d="M12 14v2"/>',

    // Elementos rurales
    'maiz': '<path d="M8 2l2 6 2-6 2 6 2-6v14c0 2-2 4-4 4h-4c-2 0-4-2-4-4V2l2 6 2-6z"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="16" y1="10" x2="16" y2="14"/>',
    'montaña': '<path d="M3 20L10 8l4 6 7-14v20z"/><path d="M10 8l2 3 3-5"/>',
    'rio': '<path d="M3 12c2-1 4 1 6 0s4-1 6 0 4 1 6 0M3 16c2-1 4 1 6 0s4-1 6 0 4 1 6 0" stroke-width="2" fill="none"/>',
    'arbol': '<circle cx="12" cy="8" r="5"/><rect x="10" y="13" width="4" height="9"/><circle cx="8" cy="6" r="2"/><circle cx="16" cy="6" r="2"/><circle cx="12" cy="3" r="2"/>',
    'cultivo': '<line x1="4" y1="20" x2="4" y2="10"/><line x1="8" y1="20" x2="8" y2="12"/><line x1="12" y1="20" x2="12" y2="10"/><line x1="16" y1="20" x2="16" y2="13"/><line x1="20" y1="20" x2="20" y2="11"/><path d="M4 10c0-2 1-3 2-3s2 1 2 3M12 10c0-2 1-3 2-3s2 1 2 3"/>',
    'casa': '<path d="M3 12l9-9 9 9"/><path d="M5 10v10h4v-6h6v6h4V10"/>',
    'camino': '<path d="M4 8h16M4 12h16M4 16h16" stroke-dasharray="4 4"/>',
    'flores': '<circle cx="8" cy="8" r="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="10" r="1"/><circle cx="10" cy="6" r="1"/><circle cx="10" cy="10" r="1"/><circle cx="16" cy="14" r="2"/><circle cx="14" cy="12" r="1"/><circle cx="14" cy="16" r="1"/><circle cx="18" cy="12" r="1"/><circle cx="18" cy="16" r="1"/>',

    // Rutinas escolares
    'despertar': '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    'desayunar': '<rect x="4" y="10" width="16" height="2"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="7" r="2"/><path d="M6 12v6h12v-6"/>',
    'caminar-escuela': '<circle cx="10" cy="5" r="2"/><path d="M10 7v6M8 10l2-1 2 1M10 13l-2 4M10 13l2 4"/><rect x="16" y="8" width="6" height="8"/><path d="M19 8V6"/>',
    'clase': '<rect x="4" y="6" width="16" height="12"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="4" y1="14" x2="20" y2="14"/><path d="M12 2v4"/>',
    'recreo': '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="10" r="1"/><path d="M12 13c2 2 4 0 4-2"/>',
    'almuerzo': '<rect x="4" y="12" width="16" height="2"/><circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><path d="M6 14v4h3M18 14v4h-3"/>',

    // Campana (para sonidos-entorno)
    'campana': '<path d="M12 2v2M12 18v2M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>'
};

/**
 * Colores por categoría
 */
const CATEGORY_COLORS = {
    'objetos-aula': { bg: '#E3F2FD', icon: '#1976D2' },
    'animales': { bg: '#E8F5E9', icon: '#388E3C' },
    'elementos-rurales': { bg: '#FFF3E0', icon: '#F57C00' },
    'rutinas-escolares': { bg: '#F3E5F5', icon: '#7B1FA2' }
};

/**
 * Generar SVG placeholder para una imagen
 * @param {string} category - Categoría (objetos-aula, animales, etc.)
 * @param {string} name - Nombre del elemento (lapiz, vaca, etc.)
 * @param {number} width - Ancho en píxeles (default: 400)
 * @param {number} height - Alto en píxeles (default: 300)
 * @returns {string} Data URI del SVG
 */
export function generatePlaceholderSVG(category, name, width = 400, height = 300) {
    const colors = CATEGORY_COLORS[category] || { bg: '#F5F5F5', icon: '#666666' };
    const iconPath = SVG_ICONS[name] || '<circle cx="12" cy="12" r="8"/>';
    const label = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
            <rect width="${width}" height="${height}" fill="${colors.bg}"/>
            <g transform="translate(${width/2 - 60}, ${height/2 - 80})">
                <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="${colors.icon}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${iconPath}
                </svg>
            </g>
            <text x="${width/2}" y="${height - 40}" font-family="Arial, sans-serif" font-size="24" font-weight="600" fill="${colors.icon}" text-anchor="middle">
                ${label}
            </text>
        </svg>
    `.trim();

    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generar todas las imágenes placeholder para una categoría
 * @param {string} category - Categoría
 * @param {Array<string>} names - Array de nombres
 * @returns {Object} Objeto con nombre: dataURI
 */
export function generateCategoryPlaceholders(category, names) {
    const placeholders = {};
    names.forEach(name => {
        placeholders[name] = generatePlaceholderSVG(category, name);
    });
    return placeholders;
}

/**
 * Generar todos los placeholders necesarios para Módulo 0
 */
export function generateModule0Placeholders() {
    return {
        'objetos-aula': generateCategoryPlaceholders('objetos-aula', [
            'lapiz', 'borrador', 'cuaderno', 'regla', 'tijeras', 'libro'
        ]),
        'animales': generateCategoryPlaceholders('animales', [
            'vaca', 'gallina', 'caballo', 'cerdo', 'oveja', 'perro'
        ])
    };
}

/**
 * Reemplazar rutas de imágenes con placeholders SVG solo si la imagen no existe
 * @param {string} imagePath - Ruta de la imagen (ej: 'assets/images/demos/animales/vaca.jpg')
 * @returns {string} Ruta de la imagen real o Data URI del placeholder
 */
export function getImageOrPlaceholder(imagePath) {
    // SIEMPRE devolver la ruta original para que el navegador intente cargar la imagen real
    // El navegador mostrará el alt text o manejará el error si no existe
    return imagePath;
}

/**
 * Agregar fallback de placeholder a una imagen si falla al cargar
 * @param {HTMLImageElement} imgElement - Elemento img
 */
export function addImageFallback(imgElement) {
    if (!imgElement) return;

    imgElement.addEventListener('error', function() {
        // Solo aplicar fallback si no se ha aplicado ya
        if (this.dataset.fallbackApplied) return;
        this.dataset.fallbackApplied = 'true';

        // Extraer categoría y nombre del path
        const match = this.src.match(/demos\/([^\/]+)\/([^\.]+)/);
        if (!match) return;

        const [, category, name] = match;

        // Generar placeholder solo si existe el icono SVG
        if (SVG_ICONS[name] && CATEGORY_COLORS[category]) {
            this.src = generatePlaceholderSVG(category, name);
        }
    });
}

/**
 * Inicializar fallbacks para todas las imágenes de demos en el documento
 */
export function initImageFallbacks() {
    const images = document.querySelectorAll('img[src*="demos/"]');
    images.forEach(img => addImageFallback(img));
}
