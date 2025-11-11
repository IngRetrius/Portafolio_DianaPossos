/**
 * Datos de Evaluación y Sistema Gamificado
 * Criterios de evaluación, badges y sistema de puntos
 */

const evaluationData = {
    // Sistema de puntos
    scoring: {
        cellCompleted: 10,      // Puntos por casilla completada
        activityCompleted: 5,   // Puntos por actividad Wordwall completada
        quizPassed: 15          // Puntos por quiz o reto superado
    },

    // Badges disponibles
    badges: [
        {
            id: 'explorer',
            name: 'Explorador Inicial',
            description: 'Completar Semana 1',
            icon: '⭐',
            week: 1,
            unlocked: false
        },
        {
            id: 'visual-memory',
            name: 'Memoria Visual',
            description: 'Completar Semanas 2-3',
            icon: '👁️',
            weeks: [2, 3],
            unlocked: false
        },
        {
            id: 'auditory-memory',
            name: 'Memoria Auditiva',
            description: 'Completar Semanas 4-5',
            icon: '👂',
            weeks: [4, 5],
            unlocked: false
        },
        {
            id: 'sequential-memory',
            name: 'Memoria Secuencial',
            description: 'Completar Semana 6',
            icon: '🔢',
            week: 6,
            unlocked: false
        },
        {
            id: 'associative-memory',
            name: 'Memoria Asociativa',
            description: 'Completar Semana 7',
            icon: '🔗',
            week: 7,
            unlocked: false
        },
        {
            id: 'memory-master',
            name: 'Maestro de la Memoria',
            description: 'Completar todas las semanas',
            icon: '🏆',
            weeks: [1, 2, 3, 4, 5, 6, 7, 8],
            unlocked: false
        }
    ],

    // Criterios de evaluación
    rubrics: {
        diagnostic: {
            name: 'Evaluación Diagnóstica',
            criteria: [
                {
                    name: 'Nivel de retención inicial',
                    levels: ['Bajo', 'Medio', 'Alto'],
                    description: 'Capacidad de retener información a corto plazo'
                },
                {
                    name: 'Atención sostenida',
                    levels: ['Limitada', 'Moderada', 'Buena'],
                    description: 'Capacidad de mantener la atención en actividades estructuradas'
                },
                {
                    name: 'Familiarización con tecnología',
                    levels: ['Ninguna', 'Básica', 'Avanzada'],
                    description: 'Conocimiento previo de herramientas digitales'
                }
            ]
        },
        formative: {
            name: 'Evaluación Formativa',
            criteria: [
                {
                    name: 'Participación activa',
                    levels: ['Baja', 'Media', 'Alta'],
                    description: 'Nivel de participación en las actividades'
                },
                {
                    name: 'Progreso en memoria visual',
                    levels: ['Sin progreso', 'Progreso moderado', 'Progreso significativo'],
                    description: 'Mejora en la capacidad de memoria visual'
                },
                {
                    name: 'Progreso en memoria auditiva',
                    levels: ['Sin progreso', 'Progreso moderado', 'Progreso significativo'],
                    description: 'Mejora en la capacidad de memoria auditiva'
                },
                {
                    name: 'Progreso en memoria secuencial',
                    levels: ['Sin progreso', 'Progreso moderado', 'Progreso significativo'],
                    description: 'Mejora en la capacidad de memoria secuencial'
                },
                {
                    name: 'Progreso en memoria asociativa',
                    levels: ['Sin progreso', 'Progreso moderado', 'Progreso significativo'],
                    description: 'Mejora en la capacidad de memoria asociativa'
                },
                {
                    name: 'Motivación y autoestima',
                    levels: ['Baja', 'Media', 'Alta'],
                    description: 'Nivel de motivación y confianza en el aprendizaje'
                }
            ]
        },
        summative: {
            name: 'Evaluación Sumativa',
            criteria: [
                {
                    name: 'Desempeño en Wordwall',
                    levels: ['< 50%', '50-70%', '> 70%'],
                    description: 'Porcentaje de aciertos en actividades Wordwall'
                },
                {
                    name: 'Proyecto colaborativo',
                    levels: ['No completado', 'Completado básico', 'Completado avanzado'],
                    description: 'Participación y calidad del proyecto final'
                },
                {
                    name: 'Progreso cognitivo individual',
                    levels: ['Sin mejora', 'Mejora moderada', 'Mejora significativa'],
                    description: 'Comparación entre evaluación diagnóstica y final'
                },
                {
                    name: 'Aplicación en contexto',
                    levels: ['Limitada', 'Moderada', 'Extensa'],
                    description: 'Capacidad de aplicar estrategias de memoria en situaciones cotidianas'
                }
            ]
        }
    },

    // Adaptaciones por tipo de discapacidad
    adaptations: {
        'retardo-mental': {
            name: 'Retardo mental leve o moderado',
            adjustments: [
                'Instrucciones simplificadas y visuales',
                'Tiempo adicional para completar actividades',
                'Retroalimentación inmediata y positiva',
                'Actividades con menor nivel de complejidad'
            ]
        },
        'tea': {
            name: 'TEA (Trastorno del Espectro Autista)',
            adjustments: [
                'Rutinas visuales y predecibles',
                'Eliminación de estímulos distractores',
                'Uso de pictogramas y apoyos visuales',
                'Estructura clara y consistente'
            ]
        },
        'trastornos-mixtos': {
            name: 'Trastornos mixtos del aprendizaje',
            adjustments: [
                'Combinación de canales visuales y auditivos',
                'Retroalimentación multisensorial',
                'Actividades adaptadas al ritmo individual',
                'Apoyo personalizado según necesidades'
            ]
        }
    }
};

