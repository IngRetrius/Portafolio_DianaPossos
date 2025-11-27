/**
 * DEMOS-DATA.JS
 * Configuración de módulos y actividades para las demos interactivas
 */

/**
 * Tipos de actividades disponibles
 */
export const ACTIVITY_TYPES = {
    memory: { component: 'MemoryGame', icon: 'grid' },
    flashcards: { component: 'Flashcards', icon: 'layers' },
    reveal: { component: 'RevealBoxes', icon: 'eye' },
    fill_blank: { component: 'FillInBlank', icon: 'headphones' },
    sound_match: { component: 'SoundMatch', icon: 'volume' },
    drag_order: { component: 'DragOrder', icon: 'list' },
    maze: { component: 'Maze', icon: 'map' },
    categorize: { component: 'Categorize', icon: 'folder' },
    mixed: { component: 'MixedGame', icon: 'shuffle' },
    certificate: { component: 'Certificate', icon: 'award' }
};

/**
 * Configuración completa de módulos y actividades
 */
export const DEMOS_CONFIG = {
    modules: [
        // MÓDULO 0: DIAGNÓSTICO
        {
            id: 'modulo-0',
            title: 'Módulo 0: Diagnóstico',
            description: 'Evaluación inicial de habilidades de memoria a corto plazo',
            activities: [
                {
                    id: 'm0-memory-objetos',
                    type: 'memory',
                    title: 'Memory Game - Objetos del Aula',
                    pairs: 6,
                    data: [
                        { id: 1, name: 'Lápiz', image: 'assets/images/demos/objetos-aula/lapiz.png' },
                        { id: 2, name: 'Borrador', image: 'assets/images/demos/objetos-aula/borrador.jpg' },
                        { id: 3, name: 'Cuaderno', image: 'assets/images/demos/objetos-aula/cuaderno.jpg' },
                        { id: 4, name: 'Regla', image: 'assets/images/demos/objetos-aula/regla.png' },
                        { id: 5, name: 'Tijeras', image: 'assets/images/demos/objetos-aula/tijeras.png' },
                        { id: 6, name: 'Libro', image: 'assets/images/demos/objetos-aula/libro.jpg' }
                    ],
                    settings: {
                        timeLimit: null,
                        attempts: null
                    }
                },
                {
                    id: 'm0-flashcards-animales',
                    type: 'flashcards',
                    title: 'Flashcards - Animales',
                    cards: [
                        { id: 1, front: 'assets/images/demos/animales/vaca.jpg', back: 'Vaca', alt: 'Imagen de una vaca' },
                        { id: 2, front: 'assets/images/demos/animales/gallina.jpg', back: 'Gallina', alt: 'Imagen de una gallina' },
                        { id: 3, front: 'assets/images/demos/animales/caballo.jpg', back: 'Caballo', alt: 'Imagen de un caballo' },
                        { id: 4, front: 'assets/images/demos/animales/cerdo.jpg', back: 'Cerdo', alt: 'Imagen de un cerdo' },
                        { id: 5, front: 'assets/images/demos/animales/oveja.jpg', back: 'Oveja', alt: 'Imagen de una oveja' },
                        { id: 6, front: 'assets/images/demos/animales/perro.jpg', back: 'Perro', alt: 'Imagen de un perro' }
                    ],
                    settings: {
                        autoPlay: false,
                        shuffleOrder: true
                    }
                }
            ]
        },

        // MÓDULO 1: MEMORIA VISUAL
        {
            id: 'modulo-1',
            title: 'Módulo 1: Memoria Visual',
            description: 'Fortalecimiento de la capacidad de retención visual',
            activities: [
                {
                    id: 'm1-reveal-rurales',
                    type: 'reveal',
                    title: 'Reveal Boxes - Elementos Rurales',
                    boxes: 8,
                    data: [
                        { id: 1, image: 'assets/images/demos/elementos-rurales/maiz.jpg', name: 'Maíz' },
                        { id: 2, image: 'assets/images/demos/elementos-rurales/montana.png', name: 'Montaña' },
                        { id: 3, image: 'assets/images/demos/elementos-rurales/rio.jpg', name: 'Río' },
                        { id: 4, image: 'assets/images/demos/elementos-rurales/arbol.jpeg', name: 'Árbol' },
                        { id: 5, image: 'assets/images/demos/elementos-rurales/cultivo.jpg', name: 'Cultivo' },
                        { id: 6, image: 'assets/images/demos/elementos-rurales/casa.jpg', name: 'Casa' },
                        { id: 7, image: 'assets/images/demos/elementos-rurales/camino.jpg', name: 'Camino' },
                        { id: 8, image: 'assets/images/demos/elementos-rurales/flores.jpg', name: 'Flores' }
                    ],
                    settings: {
                        revealTime: null
                    }
                },
                {
                    id: 'm1-memory-categorias',
                    type: 'memory',
                    title: 'Memory Game - Categorías Mixtas',
                    pairs: 8,
                    data: [
                        { id: 1, name: 'Vaca', image: 'assets/images/demos/animales/vaca.jpg', category: 'animales' },
                        { id: 2, name: 'Lápiz', image: 'assets/images/demos/objetos-aula/lapiz.png', category: 'objetos' },
                        { id: 3, name: 'Maíz', image: 'assets/images/demos/elementos-rurales/maiz.jpg', category: 'rural' },
                        { id: 4, name: 'Gallina', image: 'assets/images/demos/animales/gallina.jpg', category: 'animales' },
                        { id: 5, name: 'Cuaderno', image: 'assets/images/demos/objetos-aula/cuaderno.jpg', category: 'objetos' },
                        { id: 6, name: 'Río', image: 'assets/images/demos/elementos-rurales/rio.jpg', category: 'rural' },
                        { id: 7, name: 'Perro', image: 'assets/images/demos/animales/perro.jpg', category: 'animales' },
                        { id: 8, name: 'Árbol', image: 'assets/images/demos/elementos-rurales/arbol.jpeg', category: 'rural' }
                    ],
                    settings: {
                        timeLimit: null,
                        attempts: null
                    }
                }
            ]
        },

        // MÓDULO 2: MEMORIA AUDITIVA
        {
            id: 'modulo-2',
            title: 'Módulo 2: Memoria Auditiva',
            description: 'Desarrollo de la memoria auditiva',
            activities: [
                {
                    id: 'm2-fill-blank',
                    type: 'fill_blank',
                    title: 'Completa la Oración (Audio)',
                    questions: [
                        {
                            id: 1,
                            audio: 'assets/audio/palabra-faltante/oracion-01.mp3',
                            sentence: 'El perro ladra en el ___',
                            answer: 'patio',
                            alternatives: ['patio']
                        },
                        {
                            id: 2,
                            audio: 'assets/audio/palabra-faltante/oracion-02.mp3',
                            sentence: 'La vaca come hierba ___',
                            answer: 'fresca',
                            alternatives: ['fresca']
                        },
                        {
                            id: 3,
                            audio: 'assets/audio/palabra-faltante/oracion-03.mp3',
                            sentence: 'Los niños juegan en el ___',
                            answer: 'parque',
                            alternatives: ['parque']
                        },
                        {
                            id: 4,
                            audio: 'assets/audio/palabra-faltante/oracion-04.mp3',
                            sentence: 'El río corre por la ___',
                            answer: 'montaña',
                            alternatives: ['montaña', 'montana']
                        },
                        {
                            id: 5,
                            audio: 'assets/audio/palabra-faltante/oracion-05.mp3',
                            sentence: 'Las flores crecen en el ___',
                            answer: 'jardín',
                            alternatives: ['jardín', 'jardin']
                        }
                    ],
                    settings: {
                        allowRetries: true,
                        caseSensitive: false
                    }
                },
                {
                    id: 'm2-sound-match',
                    type: 'sound_match',
                    title: 'Empareja Sonidos del Entorno',
                    pairs: 8,
                    data: [
                        { id: 1, sound: 'assets/audio/sonidos-entorno/vaca.mp3', image: 'assets/images/demos/animales/vaca.jpg', name: 'Vaca' },
                        { id: 2, sound: 'assets/audio/sonidos-entorno/gallina.mp3', image: 'assets/images/demos/animales/gallina.jpg', name: 'Gallina' },
                        { id: 3, sound: 'assets/audio/sonidos-entorno/rio.mp3', image: 'assets/images/demos/elementos-rurales/rio.jpg', name: 'Río' },
                        { id: 4, sound: 'assets/audio/sonidos-entorno/viento.mp3', image: 'assets/images/demos/elementos-rurales/arbol.jpeg', name: 'Viento' },
                        { id: 5, sound: 'assets/audio/sonidos-entorno/campana.mp3', image: 'assets/images/demos/objetos-aula/campana.jpg', name: 'Campana' },
                        { id: 6, sound: 'assets/audio/sonidos-entorno/tractor.mp3', image: 'assets/images/demos/elementos-rurales/cultivo.jpg', name: 'Tractor' },
                        { id: 7, sound: 'assets/audio/sonidos-entorno/lluvia.mp3', image: 'assets/images/demos/elementos-rurales/casa.jpg', name: 'Lluvia' },
                        { id: 8, sound: 'assets/audio/sonidos-entorno/pajaros.mp3', image: 'assets/images/demos/elementos-rurales/flores.jpg', name: 'Pájaros' }
                    ],
                    settings: {
                        playOnce: false
                    }
                }
            ]
        },

        // MÓDULO 3: MEMORIA SECUENCIAL
        {
            id: 'modulo-3',
            title: 'Módulo 3: Memoria Secuencial',
            description: 'Refuerzo de la memoria secuencial',
            activities: [
                {
                    id: 'm3-drag-order',
                    type: 'drag_order',
                    title: 'Ordena las Rutinas Escolares',
                    instruction: 'Arrastra las imágenes para ordenar las actividades del día en el orden correcto',
                    hint: 'Piensa en el orden de las actividades desde que te levantas hasta que almuerzas en la escuela',
                    items: [
                        { id: 1, order: 1, image: 'assets/images/demos/rutinas-escolares/despertar.jpg', name: 'Despertar' },
                        { id: 2, order: 2, image: 'assets/images/demos/rutinas-escolares/desayunar.jpg', name: 'Desayunar' },
                        { id: 3, order: 3, image: 'assets/images/demos/rutinas-escolares/caminar-escuela.jpg', name: 'Ir a la escuela' },
                        { id: 4, order: 4, image: 'assets/images/demos/rutinas-escolares/clase.jpg', name: 'Clase' },
                        { id: 5, order: 5, image: 'assets/images/demos/rutinas-escolares/recreo.jpg', name: 'Recreo' },
                        { id: 6, order: 6, image: 'assets/images/demos/rutinas-escolares/almuerzo.jpg', name: 'Almuerzo' }
                    ],
                    settings: {
                        shuffleInitial: true
                    }
                },
                {
                    id: 'm3-maze',
                    type: 'maze',
                    title: 'Laberinto - Camino a la Escuela',
                    gridSize: 5,
                    start: { x: 0, y: 0 },
                    end: { x: 4, y: 4 },
                    walls: [
                        { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
                        { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 },
                        { x: 2, y: 4 }
                    ],
                    instructions: [
                        'Avanza hacia la derecha hasta encontrar el primer obstáculo',
                        'Baja una casilla cuando no puedas avanzar más',
                        'Continúa hacia la derecha buscando espacios libres',
                        'Sigue bajando hasta llegar a la meta (escuela)'
                    ],
                    settings: {
                        allowDiagonal: false,
                        showHints: true,
                        instructionTime: 15
                    }
                }
            ]
        },

        // MÓDULO 4: MEMORIA ASOCIATIVA
        {
            id: 'modulo-4',
            title: 'Módulo 4: Memoria Asociativa',
            description: 'Fortalecimiento de la memoria asociativa',
            activities: [
                {
                    id: 'm4-categorize',
                    type: 'categorize',
                    title: 'Clasifica por Categorías',
                    categories: [
                        { id: 'animales', name: 'Animales', color: '#4CAF50' },
                        { id: 'objetos', name: 'Objetos Escolares', color: '#2196F3' },
                        { id: 'rural', name: 'Elementos Rurales', color: '#FF9800' }
                    ],
                    items: [
                        { id: 1, name: 'Vaca', image: 'assets/images/demos/animales/vaca.jpg', category: 'animales' },
                        { id: 2, name: 'Lápiz', image: 'assets/images/demos/objetos-aula/lapiz.png', category: 'objetos' },
                        { id: 3, name: 'Maíz', image: 'assets/images/demos/elementos-rurales/maiz.jpg', category: 'rural' },
                        { id: 4, name: 'Gallina', image: 'assets/images/demos/animales/gallina.jpg', category: 'animales' },
                        { id: 5, name: 'Cuaderno', image: 'assets/images/demos/objetos-aula/cuaderno.jpg', category: 'objetos' },
                        { id: 6, name: 'Río', image: 'assets/images/demos/elementos-rurales/rio.jpg', category: 'rural' },
                        { id: 7, name: 'Caballo', image: 'assets/images/demos/animales/caballo.jpg', category: 'animales' },
                        { id: 8, name: 'Regla', image: 'assets/images/demos/objetos-aula/regla.png', category: 'objetos' },
                        { id: 9, name: 'Árbol', image: 'assets/images/demos/elementos-rurales/arbol.jpeg', category: 'rural' },
                        { id: 10, name: 'Oveja', image: 'assets/images/demos/animales/oveja.jpg', category: 'animales' },
                        { id: 11, name: 'Tijeras', image: 'assets/images/demos/objetos-aula/tijeras.png', category: 'objetos' },
                        { id: 12, name: 'Casa', image: 'assets/images/demos/elementos-rurales/casa.jpg', category: 'rural' }
                    ],
                    settings: {
                        shuffleItems: true
                    }
                },
                {
                    id: 'm4-memory-conceptos',
                    type: 'memory',
                    title: 'Memory Game - Conceptos Relacionados',
                    pairs: 8,
                    data: [
                        { id: 1, name: 'Vaca - Leche', concept: 'produce', image: 'assets/images/demos/animales/vaca.jpg' },
                        { id: 2, name: 'Gallina - Huevos', concept: 'produce', image: 'assets/images/demos/animales/gallina.jpg' },
                        { id: 3, name: 'Lápiz - Escribir', concept: 'acción', image: 'assets/images/demos/objetos-aula/lapiz.png' },
                        { id: 4, name: 'Tijeras - Cortar', concept: 'acción', image: 'assets/images/demos/objetos-aula/tijeras.png' },
                        { id: 5, name: 'Río - Agua', concept: 'elemento', image: 'assets/images/demos/elementos-rurales/rio.jpg' },
                        { id: 6, name: 'Árbol - Madera', concept: 'elemento', image: 'assets/images/demos/elementos-rurales/arbol.jpeg' },
                        { id: 7, name: 'Maíz - Amarillo', concept: 'color', image: 'assets/images/demos/elementos-rurales/maiz.jpg' },
                        { id: 8, name: 'Pasto - Verde', concept: 'color', image: 'assets/images/demos/elementos-rurales/cultivo.jpg' }
                    ],
                    settings: {
                        timeLimit: null,
                        attempts: null
                    }
                }
            ]
        },

        // MÓDULO 5: CONSOLIDACIÓN
        {
            id: 'modulo-5',
            title: 'Módulo 5: Consolidación',
            description: 'Integración de habilidades y certificación',
            activities: [
                {
                    id: 'm5-mixed',
                    type: 'mixed',
                    title: 'Juego Mixto - Desafío Final',
                    challenges: [
                        // Desafío 1: Memoria Visual
                        {
                            type: 'memory_visual',
                            title: 'Desafío 1: Memoriza los Elementos',
                            instruction: 'Observa atentamente las imágenes durante 10 segundos',
                            items: [
                                { id: 1, name: 'Vaca', image: 'assets/images/demos/animales/vaca.jpg' },
                                { id: 2, name: 'Lápiz', image: 'assets/images/demos/objetos-aula/lapiz.png' },
                                { id: 3, name: 'Maíz', image: 'assets/images/demos/elementos-rurales/maiz.jpg' },
                                { id: 4, name: 'Río', image: 'assets/images/demos/elementos-rurales/rio.jpg' }
                            ],
                            question: '¿Cuál de estos elementos NO estaba en la imagen?',
                            options: [
                                { id: 1, label: 'Vaca', correct: false },
                                { id: 2, label: 'Gallina', correct: true },
                                { id: 3, label: 'Lápiz', correct: false },
                                { id: 4, label: 'Maíz', correct: false }
                            ]
                        },
                        // Desafío 2: Secuencia
                        {
                            type: 'sequence',
                            title: 'Desafío 2: Recuerda la Secuencia',
                            instruction: 'Memoriza esta secuencia de pasos',
                            sequence: [
                                'Despertar',
                                'Desayunar',
                                'Ir a la escuela',
                                'Clase'
                            ],
                            question: '¿Qué viene después de "Desayunar"?',
                            answer: 'ir a la escuela'
                        },
                        // Desafío 3: Audio Match
                        {
                            type: 'audio_match',
                            title: 'Desafío 3: Identifica el Sonido',
                            instruction: 'Escucha atentamente el audio y selecciona la imagen correcta',
                            audio: 'assets/audio/sonidos-entorno/vaca.mp3',
                            options: [
                                { id: 1, label: 'Vaca', image: 'assets/images/demos/animales/vaca.jpg', correct: true },
                                { id: 2, label: 'Gallina', image: 'assets/images/demos/animales/gallina.jpg', correct: false },
                                { id: 3, label: 'Caballo', image: 'assets/images/demos/animales/caballo.jpg', correct: false },
                                { id: 4, label: 'Oveja', image: 'assets/images/demos/animales/oveja.jpg', correct: false }
                            ]
                        },
                        // Desafío 4: Memoria Visual 2
                        {
                            type: 'memory_visual',
                            title: 'Desafío 4: Memoriza de Nuevo',
                            instruction: 'Observa estas categorías de elementos',
                            items: [
                                { id: 1, name: 'Cuaderno', image: 'assets/images/demos/objetos-aula/cuaderno.jpg' },
                                { id: 2, name: 'Regla', image: 'assets/images/demos/objetos-aula/regla.png' },
                                { id: 3, name: 'Tijeras', image: 'assets/images/demos/objetos-aula/tijeras.png' },
                                { id: 4, name: 'Libro', image: 'assets/images/demos/objetos-aula/libro.jpg' }
                            ],
                            question: '¿Cuántos objetos escolares viste?',
                            options: [
                                { id: 1, label: '3 objetos', correct: false },
                                { id: 2, label: '4 objetos', correct: true },
                                { id: 3, label: '5 objetos', correct: false },
                                { id: 4, label: '6 objetos', correct: false }
                            ]
                        },
                        // Desafío 5: Secuencia 2
                        {
                            type: 'sequence',
                            title: 'Desafío 5: Orden de Elementos',
                            instruction: 'Observa esta lista de elementos rurales',
                            sequence: [
                                'Maíz',
                                'Montaña',
                                'Río',
                                'Árbol',
                                'Casa'
                            ],
                            question: '¿Qué elemento estaba en tercer lugar?',
                            answer: 'río'
                        }
                    ],
                    settings: {
                        timeLimit: 120
                    }
                },
                {
                    id: 'm5-certificate',
                    type: 'certificate',
                    title: 'Certificado de Logro',
                    template: {
                        background: 'assets/images/demos/certificado/template-bg.jpg',
                        logo: 'assets/images/demos/certificado/logo-wordwall.png',
                        title: 'Certificado de Logro',
                        subtitle: 'Proyecto Wordwall',
                        description: 'Por completar exitosamente las actividades de fortalecimiento de memoria a corto plazo'
                    },
                    settings: {
                        formats: ['png', 'pdf'],
                        requireName: true
                    }
                }
            ]
        }
    ]
};

/**
 * Obtener configuración de un módulo específico
 */
export function getModuleConfig(moduleId) {
    return DEMOS_CONFIG.modules.find(module => module.id === moduleId);
}

/**
 * Obtener configuración de una actividad específica
 */
export function getActivityConfig(activityId) {
    for (const module of DEMOS_CONFIG.modules) {
        const activity = module.activities.find(act => act.id === activityId);
        if (activity) {
            return activity;
        }
    }
    return null;
}

/**
 * Obtener total de actividades
 */
export function getTotalActivities() {
    return DEMOS_CONFIG.modules.reduce((total, module) => {
        return total + module.activities.length;
    }, 0);
}
