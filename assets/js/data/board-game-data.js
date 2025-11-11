/**
 * Datos del Juego de Mesa Virtual - 8 Semanas de Memoria
 * Contenido de las semanas y casillas especiales
 */

const boardGameData = {
    title: "Wordwall Quest: 8 Semanas de Memoria",
    subtitle: "El Camino del Aprendizaje Inclusivo",
    description: "Secuencia didáctica para fortalecer la memoria a corto plazo mediante actividades gamificadas con Wordwall",

    // Casilla de inicio
    start: {
        id: 'start',
        title: 'Inicio',
        type: 'start',
        content: `
            <div class="board-game-start">
                <h2>Bienvenido al Juego de Mesa Virtual</h2>
                <p class="board-game-intro">
                    Explora las 8 semanas de la secuencia didáctica diseñada para fortalecer 
                    la memoria a corto plazo en estudiantes de inclusión mediante actividades 
                    gamificadas con Wordwall.
                </p>
                <div class="board-game-objectives">
                    <h3>Objetivos del Juego</h3>
                    <ul>
                        <li>Conocer la secuencia didáctica completa</li>
                        <li>Explorar las actividades de cada semana</li>
                        <li>Comprender los criterios de evaluación</li>
                        <li>Acceder a recursos y materiales</li>
                    </ul>
                </div>
                <div class="board-game-instructions">
                    <h3>Instrucciones</h3>
                    <p>Haz clic en "Siguiente" para comenzar con la Semana 1, o explora las casillas especiales 
                    para conocer más sobre competencias, evaluación y recursos.</p>
                </div>
            </div>
        `
    },

    // Semanas del programa (1-8)
    weeks: [
        // Semana 1
        {
            id: 'week1',
            number: 1,
            title: 'Diagnóstico y Familiarización con Wordwall',
            phase: 'Exploración y diagnóstico',
            module: 'Familiarización',
            objective: 'Identificar el nivel inicial de memoria de los estudiantes y familiarizarlos con los entornos digitales.',
            duration: '3 sesiones de 20 minutos',
            contents: [
                'Introducción a la memoria a corto plazo',
                'Presentación de la plataforma Wordwall',
                'Objetivos de la secuencia didáctica'
            ],
            activities: [
                {
                    name: 'Busca la pareja',
                    description: 'Objetos del aula',
                    type: 'wordwall'
                },
                {
                    name: 'Voltear fichas',
                    description: 'Animales',
                    type: 'wordwall'
                },
                {
                    name: 'Rueda aleatoria',
                    description: 'Presentación personal',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: 'Explorador Inicial'
        },

        // Semana 2
        {
            id: 'week2',
            number: 2,
            title: 'Memoria Visual - Reconocimiento Básico',
            phase: 'Desarrollo',
            module: 'Memoria Visual',
            objective: 'Desarrollar la capacidad de reconocimiento visual de formas, colores y objetos, y establecer asociaciones imagen-palabra básicas.',
            duration: '3 sesiones de 25 minutos',
            contents: [
                'Reconocimiento de formas, colores y objetos',
                'Asociación imagen-palabra básica',
                'Estimulación de la memoria visual'
            ],
            activities: [
                {
                    name: 'Busca la pareja',
                    description: 'Frutas y colores',
                    type: 'wordwall'
                },
                {
                    name: 'Abre la caja',
                    description: 'Elementos del entorno rural',
                    type: 'wordwall'
                },
                {
                    name: 'Diagrama etiquetado',
                    description: 'Partes del cuerpo',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: null
        },

        // Semana 3
        {
            id: 'week3',
            number: 3,
            title: 'Memoria Visual - Asociación Avanzada',
            phase: 'Desarrollo',
            module: 'Memoria Visual',
            objective: 'Fortalecer la asociación imagen-palabra compleja y el reconocimiento de patrones visuales.',
            duration: '3 sesiones de 25 minutos',
            contents: [
                'Asociación imagen-palabra compleja',
                'Reconocimiento de patrones visuales',
                'Memoria visual avanzada'
            ],
            activities: [
                {
                    name: 'Busca la pareja avanzada',
                    description: 'Categorías',
                    type: 'wordwall'
                },
                {
                    name: 'Memoria visual con secuencias',
                    description: 'Patrones y secuencias',
                    type: 'wordwall'
                },
                {
                    name: 'Identificación de diferencias',
                    description: 'Discriminación visual',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: 'Memoria Visual'
        },

        // Semana 4
        {
            id: 'week4',
            number: 4,
            title: 'Memoria Auditiva - Retención Básica',
            phase: 'Desarrollo',
            module: 'Memoria Auditiva',
            objective: 'Desarrollar la capacidad de retener información auditiva y establecer asociaciones sonido-imagen iniciales.',
            duration: '3 sesiones de 25 minutos',
            contents: [
                'Retención de palabras escuchadas',
                'Asociación sonido-imagen inicial',
                'Estimulación de la memoria auditiva'
            ],
            activities: [
                {
                    name: 'Palabra faltante',
                    description: 'Audio y texto',
                    type: 'wordwall'
                },
                {
                    name: 'Cuestionario con audio',
                    description: 'Preguntas auditivas',
                    type: 'wordwall'
                },
                {
                    name: 'Repetición de secuencias auditivas',
                    description: 'Memoria auditiva básica',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: null
        },

        // Semana 5
        {
            id: 'week5',
            number: 5,
            title: 'Memoria Auditiva - Integración',
            phase: 'Desarrollo',
            module: 'Memoria Auditiva',
            objective: 'Integrar información auditiva compleja y establecer asociaciones sonido-imagen avanzadas.',
            duration: '3 sesiones de 25 minutos',
            contents: [
                'Integración de información auditiva',
                'Asociación sonido-imagen compleja',
                'Memoria auditiva avanzada'
            ],
            activities: [
                {
                    name: 'Juego de concurso auditivo',
                    description: 'Competición auditiva',
                    type: 'wordwall'
                },
                {
                    name: 'Memoria auditiva con historias',
                    description: 'Narrativas auditivas',
                    type: 'wordwall'
                },
                {
                    name: 'Identificación de sonidos del entorno',
                    description: 'Sonidos ambientales',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: 'Memoria Auditiva'
        },

        // Semana 6
        {
            id: 'week6',
            number: 6,
            title: 'Memoria Secuencial',
            phase: 'Desarrollo',
            module: 'Memoria Secuencial',
            objective: 'Desarrollar la capacidad de retener y reproducir secuencias de eventos y procesos ordenados.',
            duration: '3 sesiones de 25 minutos',
            contents: [
                'Orden y secuencia de eventos',
                'Retención de pasos en procesos',
                'Memoria secuencial'
            ],
            activities: [
                {
                    name: 'Ordenar rutinas escolares',
                    description: 'Secuencias diarias',
                    type: 'wordwall'
                },
                {
                    name: 'Persecución en laberinto',
                    description: 'Secuencias espaciales',
                    type: 'wordwall'
                },
                {
                    name: 'Rueda aleatoria',
                    description: 'Secuencia de hechos',
                    type: 'wordwall'
                },
                {
                    name: 'Secuencias temporales',
                    description: 'Orden temporal',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: 'Memoria Secuencial'
        },

        // Semana 7
        {
            id: 'week7',
            number: 7,
            title: 'Memoria Asociativa',
            phase: 'Desarrollo',
            module: 'Memoria Asociativa',
            objective: 'Desarrollar la capacidad de establecer relaciones conceptuales y categorizar información.',
            duration: '3 sesiones de 25 minutos',
            contents: [
                'Relaciones conceptuales y categorización',
                'Asociación de conceptos relacionados',
                'Memoria asociativa'
            ],
            activities: [
                {
                    name: 'Clasificación por grupos',
                    description: 'Categorización',
                    type: 'wordwall'
                },
                {
                    name: 'Busca la pareja avanzada',
                    description: 'Conceptos relacionados',
                    type: 'wordwall'
                },
                {
                    name: 'Cuestionario de asociaciones',
                    description: 'Relaciones conceptuales',
                    type: 'wordwall'
                },
                {
                    name: 'Organización de información',
                    description: 'Estructuración conceptual',
                    type: 'wordwall'
                }
            ],
            resources: [],
            badge: 'Memoria Asociativa'
        },

        // Semana 8
        {
            id: 'week8',
            number: 8,
            title: 'Consolidación y Cierre',
            phase: 'Consolidación',
            module: 'Evaluación y cierre',
            objective: 'Consolidar los aprendizajes, evaluar el progreso y celebrar los logros alcanzados.',
            duration: '4 sesiones de 30 minutos',
            contents: [
                'Aplicación práctica de lo aprendido',
                'Autoevaluación con pictogramas',
                'Celebración de logros',
                'Generación de certificado digital'
            ],
            activities: [
                {
                    name: 'Juego de memoria grupal',
                    description: 'Actividad colaborativa',
                    type: 'wordwall'
                },
                {
                    name: 'Caja de logros personales',
                    description: 'Autoevaluación',
                    type: 'wordwall'
                },
                {
                    name: 'Mercado de la memoria',
                    description: 'Actividad práctica sin tecnología',
                    type: 'presential'
                },
                {
                    name: 'Generación de certificado digital',
                    description: 'Reconocimiento de logros',
                    type: 'certificate'
                }
            ],
            resources: [],
            badge: 'Maestro de la Memoria'
        }
    ],

    // Casilla final
    goal: {
        id: 'goal',
        title: 'Meta',
        type: 'goal',
        content: `
            <div class="board-game-goal">
                <h2>¡Felicitaciones!</h2>
                <p>Has completado todas las 8 semanas de la secuencia didáctica.</p>
                <div class="board-game-achievements">
                    <h3>Logros Alcanzados</h3>
                    <ul>
                        <li>Has explorado todas las semanas del programa</li>
                        <li>Conoces las actividades de cada módulo</li>
                        <li>Comprendes los objetivos y competencias</li>
                        <li>Has accedido a los recursos y materiales</li>
                    </ul>
                </div>
                <div class="board-game-certificate">
                    <p>Descarga tu certificado digital para reconocer tu participación en este recorrido educativo.</p>
                    <button class="btn btn--primary" id="downloadCertificate">Descargar Certificado</button>
                </div>
            </div>
        `
    },

    // Casillas especiales
    specialCells: {
        competencies: {
            id: 'competencies',
            title: 'Competencias',
            type: 'special',
            content: `
                <div class="board-game-special">
                    <h2>Competencias del Programa</h2>
                    
                    <h3>Competencias Generales</h3>
                    <ul>
                        <li><strong>Cognitiva:</strong> Procesar y retener información temporal de manera efectiva</li>
                        <li><strong>Comunicativa:</strong> Expresar y comprender ideas mediante múltiples canales</li>
                        <li><strong>Digital:</strong> Usar recursos tecnológicos accesibles para el aprendizaje</li>
                        <li><strong>Inclusiva:</strong> Valorar la diversidad en el aprendizaje y respetar diferentes ritmos</li>
                        <li><strong>Aprendizaje autónomo:</strong> Aplicar estrategias de memorización de forma independiente</li>
                    </ul>

                    <h3>Competencias Específicas por Grupo</h3>
                    
                    <div class="competency-group">
                        <h4>Retardo mental leve o moderado</h4>
                        <ul>
                            <li>Retener y asociar elementos visuales simples</li>
                            <li>Seguir instrucciones de 2-3 pasos</li>
                            <li>Reconocer patrones visuales básicos</li>
                        </ul>
                    </div>

                    <div class="competency-group">
                        <h4>TEA (Trastorno del Espectro Autista)</h4>
                        <ul>
                            <li>Seguir rutinas visuales y predecibles</li>
                            <li>Asociar imágenes con palabras de forma sistemática</li>
                            <li>Mantener atención en actividades estructuradas</li>
                        </ul>
                    </div>

                    <div class="competency-group">
                        <h4>Trastornos mixtos del aprendizaje</h4>
                        <ul>
                            <li>Combinar canales visuales y auditivos</li>
                            <li>Procesar información multisensorial</li>
                            <li>Responder positivamente a retroalimentación inmediata</li>
                        </ul>
                    </div>
                </div>
            `
        },

        evaluation: {
            id: 'evaluation',
            title: 'Evaluación',
            type: 'special',
            content: `
                <div class="board-game-special">
                    <h2>Sistema de Evaluación</h2>
                    
                    <h3>Evaluación Diagnóstica</h3>
                    <p><strong>Método:</strong> Observación inicial del nivel de retención y atención</p>
                    <p><strong>Instrumentos:</strong> Actividades de la Semana 1 (Busca la pareja, Voltear fichas, Rueda aleatoria)</p>
                    <p><strong>Propósito:</strong> Establecer línea base del nivel de memoria a corto plazo</p>

                    <h3>Evaluación Formativa</h3>
                    <p><strong>Métodos:</strong></p>
                    <ul>
                        <li>Rúbricas adaptadas por tipo de discapacidad</li>
                        <li>Registros visuales semanales</li>
                        <li>Autoevaluaciones con pictogramas</li>
                        <li>Observación de participación y motivación</li>
                    </ul>
                    <p><strong>Frecuencia:</strong> Semanal, después de cada módulo</p>

                    <h3>Evaluación Sumativa</h3>
                    <p><strong>Componentes:</strong></p>
                    <ul>
                        <li>Desempeño en actividades Wordwall (porcentaje de aciertos)</li>
                        <li>Proyecto colaborativo final</li>
                        <li>Participación activa en sesiones</li>
                        <li>Progreso cognitivo individual (comparación diagnóstico vs. final)</li>
                    </ul>

                    <h3>Evaluación de Impacto Social y Emocional</h3>
                    <p><strong>Métodos:</strong></p>
                    <ul>
                        <li>Entrevistas a estudiantes sobre confianza y autoestima</li>
                        <li>Entrevistas a familias sobre aplicación del aprendizaje en casa</li>
                        <li>Observación de interacciones sociales en el aula</li>
                        <li>Registro de actitudes hacia el aprendizaje</li>
                    </ul>
                </div>
            `
        },

        resources: {
            id: 'resources',
            title: 'Recursos',
            type: 'special',
            content: `
                <div class="board-game-special">
                    <h2>Recursos y Materiales</h2>
                    
                    <h3>Recursos Tecnológicos</h3>
                    <ul>
                        <li>Portátil del docente</li>
                        <li>Televisor por aula (para proyección)</li>
                        <li>Conexión a internet (opcional, para actividades en línea)</li>
                        <li>Plataforma Wordwall (gratuita, con opción premium)</li>
                        <li>Navegador web actualizado (Chrome, Firefox, Edge)</li>
                    </ul>

                    <h3>Recursos Didácticos</h3>
                    <ul>
                        <li>Pictogramas para apoyo visual</li>
                        <li>Materiales visuales impresos</li>
                        <li>Recursos concretos para reforzar la memoria (objetos, tarjetas)</li>
                        <li>Rúbricas de evaluación adaptadas</li>
                        <li>Registros de progreso</li>
                    </ul>

                    <h3>Enlaces a Actividades Wordwall</h3>
                    <p>Las actividades de Wordwall estarán disponibles en la plataforma. 
                    Los docentes pueden acceder a ellas mediante los enlaces proporcionados 
                    en cada semana del programa.</p>

                    <h3>Materiales Descargables</h3>
                    <ul>
                        <li><a href="documents/Referenciando%20-%20Ebook.pdf" download>Marco Referencial del Proyecto (PDF)</a></li>
                        <li><a href="documents/tesis-completa.pdf" download>Tesis Completa (PDF)</a></li>
                    </ul>
                </div>
            `
        },

        infographic: {
            id: 'infographic',
            title: 'Infografía',
            type: 'special',
            content: `
                <div class="board-game-special">
                    <h2>Infografía del Programa</h2>

                    <div class="infographic-image-container">
                        <img src="assets/images/Infografía Listado de Actividades Creativas 3D Doodle Multicolor.jpg"
                             alt="Infografía del programa de fortalecimiento de la memoria a corto plazo"
                             class="infographic-full-image"
                             loading="lazy">
                    </div>

                    <div class="infographic-description">
                        <h3>Acerca de esta Infografía</h3>
                        <p>Esta infografía resume visualmente la estructura completa de la secuencia didáctica de 8 semanas,
                        incluyendo objetivos, actividades, recursos y metodología de evaluación para el fortalecimiento de
                        la memoria a corto plazo mediante Wordwall en estudiantes de inclusión.</p>
                    </div>
                </div>
            `
        }
    }
};

