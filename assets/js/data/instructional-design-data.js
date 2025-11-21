/**
 * Datos del Diseño Instruccional - Modelo ADDIE
 * Contenido estructurado del documento de diseño instruccional
 */

const instructionalDesignData = {
    title: "Diseño Instruccional - Modelo ADDIE",
    subtitle: "Fortalecimiento de Memoria a Corto Plazo con Wordwall",
    description: "Diseño instruccional sistemático para estudiantes de inclusión en zona rural",

    // Información general del proyecto
    projectInfo: {
        author: "Diana Rocío Possos Beltrán",
        tutor: "Fredy Andrés Aponte Novoa",
        institution: "Universidad de Cartagena",
        program: "Maestría en Recursos Digitales Aplicados a la Educación",
        location: "Vereda Puerres, Pasto, Nariño",
        date: "19/11/2025"
    },

    // Infografía
    infographic: {
        title: "Infografía del Diseño Instruccional",
        imagePath: "documents/Infografia diseño instruccional.png",
        pdfPath: "documents/Infografia diseño instruccional.pdf",
        fullDocPath: "documents/Diseño instruccional.pdf"
    },

    // Secciones principales del diseño instruccional
    sections: [
        {
            id: "introduccion",
            title: "Introducción",
            icon: "📋",
            order: 1,
            content: `
                <div class="id-section">
                    <h2>Introducción</h2>
                    <p>
                        El diseño instruccional constituye un proceso sistemático de planificación, desarrollo y
                        evaluación de experiencias de aprendizaje que facilita la adquisición de conocimientos y
                        habilidades. En el contexto de la educación inclusiva, particularmente para estudiantes con
                        necesidades educativas especiales, la implementación de un modelo estructurado se vuelve
                        fundamental para garantizar la efectividad pedagógica.
                    </p>
                    <p>
                        El presente diseño instruccional adopta el <strong>modelo ADDIE</strong>, un marco metodológico ampliamente
                        reconocido que estructura el proceso educativo en cinco fases interrelacionadas: Análisis,
                        Diseño, Desarrollo, Implementación y Evaluación.
                    </p>
                    <div class="highlight-box">
                        <h3>Población Objetivo</h3>
                        <ul>
                            <li>4 estudiantes con discapacidad cognitiva leve/moderada</li>
                            <li>Grado quinto de primaria</li>
                            <li>Edades: 10-14 años</li>
                            <li>Vereda Puerres, Pasto, Nariño</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "fundamentacion",
            title: "Fundamentación del Diseño",
            icon: "🎓",
            order: 2,
            content: `
                <div class="id-section">
                    <h2>1. Fundamentación del Diseño Instruccional</h2>

                    <h3>Enfoque Teórico</h3>
                    <p>El diseño se fundamenta en los principios del:</p>
                    <ul>
                        <li><strong>Constructivismo Social (Vygotsky, 1978):</strong> El aprendizaje es un proceso activo donde
                        el estudiante construye conocimiento a partir de la interacción con su entorno social y cultural.</li>
                        <li><strong>Aprendizaje Significativo (Ausubel, 2002):</strong> Se promueve mediante la conexión entre
                        nuevos conocimientos y estructuras cognitivas previas.</li>
                        <li><strong>Aprendizaje Basado en Juegos:</strong> Utiliza el juego como herramienta esencial para el
                        desarrollo cognitivo en contextos lúdicos libres de presión evaluativa tradicional.</li>
                    </ul>

                    <h3>Justificación del Modelo ADDIE</h3>
                    <div class="highlight-box">
                        <h4>Características que justifican la selección:</h4>
                        <ul>
                            <li><strong>Enfoque sistemático:</strong> Estructura clara y organizada, esencial para población vulnerable</li>
                            <li><strong>Iteratividad:</strong> Retroalimentación continua y ajustes en cada fase</li>
                            <li><strong>Adaptabilidad:</strong> Flexibilidad para incorporar metodologías específicas</li>
                            <li><strong>Calidad probada:</strong> Asociado con diseño de alta calidad y objetivos claros</li>
                            <li><strong>Evaluación integrada:</strong> Evaluación en cada fase, no solo al final</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "analisis",
            title: "Análisis de Necesidades",
            icon: "🔍",
            order: 3,
            content: `
                <div class="id-section">
                    <h2>2. Análisis de Necesidades Educativas (Fase 1 - ADDIE)</h2>

                    <h3>Contexto Identificado</h3>
                    <ul>
                        <li><strong>Ubicación:</strong> Institución Educativa en Vereda Puerres, municipio de Pasto, Nariño</li>
                        <li><strong>Características:</strong> Zona rural con limitado acceso a servicios tecnológicos</li>
                        <li><strong>Conectividad:</strong> Intermitente</li>
                        <li><strong>Distancia:</strong> Aproximadamente 45 minutos del casco urbano</li>
                    </ul>

                    <h3>Caracterización de la Población</h3>
                    <div class="info-grid">
                        <div class="info-card">
                            <h4>Estudiantes</h4>
                            <p>4 estudiantes (muestra intencional)</p>
                            <p>Edad: 10-14 años</p>
                            <p>Grado: Quinto de primaria</p>
                        </div>
                        <div class="info-card">
                            <h4>Diagnóstico</h4>
                            <p>Discapacidad cognitiva leve a moderada</p>
                            <p>Certificada por profesional de salud</p>
                        </div>
                        <div class="info-card">
                            <h4>Contexto</h4>
                            <p>Familias campesinas</p>
                            <p>Nivel educativo básico</p>
                            <p>Economía de subsistencia</p>
                        </div>
                    </div>

                    <h3>Problemática Central</h3>
                    <div class="problem-box">
                        <p>Los estudiantes presentan <strong>dificultades significativas en memoria a corto plazo</strong>,
                        lo que afecta múltiples dimensiones de su aprendizaje:</p>
                        <ul>
                            <li>Olvido de contenidos presentados minutos antes</li>
                            <li>Requieren múltiples repeticiones para consolidar aprendizajes</li>
                            <li>Dificultad para recordar más de dos pasos consecutivos</li>
                            <li>Limitaciones para relacionar información nueva con conocimientos previos</li>
                            <li>Baja autoestima académica y desmotivación progresiva</li>
                        </ul>
                    </div>

                    <h3>Barreras Identificadas</h3>
                    <div class="barriers-section">
                        <div class="barrier-type">
                            <h4>Barreras de Acceso</h4>
                            <ul>
                                <li>Limitado acceso a internet en hogares</li>
                                <li>Escasez de recursos didácticos adaptados a NEE</li>
                                <li>Necesidad de capacitación docente en TIC para inclusión</li>
                            </ul>
                        </div>
                        <div class="barrier-type">
                            <h4>Barreras de Participación</h4>
                            <ul>
                                <li>Predominio de enseñanza magistral tradicional</li>
                                <li>Ritmo de clase superior a capacidad de procesamiento</li>
                                <li>Instrumentos de evaluación no adaptados</li>
                            </ul>
                        </div>
                        <div class="barrier-type">
                            <h4>Barreras Actitudinales</h4>
                            <ul>
                                <li>Actitudes poco inclusivas de algunos compañeros</li>
                                <li>Riesgo de subestimar potencial de aprendizaje</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: "objetivos",
            title: "Objetivos del Diseño",
            icon: "🎯",
            order: 4,
            content: `
                <div class="id-section">
                    <h2>3. Objetivos del Diseño Instruccional</h2>

                    <div class="objective-main">
                        <h3>Objetivo General</h3>
                        <p>
                            Diseñar, implementar y evaluar una secuencia didáctica basada en juegos digitales que
                            fortalezca la memoria a corto plazo en estudiantes de inclusión de grado quinto mediante la
                            plataforma Wordwall, promoviendo aprendizajes significativos y mejorando su desempeño
                            académico y socioemocional.
                        </p>
                    </div>

                    <h3>Objetivos Específicos</h3>

                    <div class="objectives-grid">
                        <div class="objective-card">
                            <h4>1. Objetivo de Diagnóstico</h4>
                            <ul>
                                <li>Identificar el nivel inicial de memoria a corto plazo</li>
                                <li>Caracterizar las dificultades cognitivas específicas</li>
                                <li>Establecer una línea base cuantitativa y cualitativa</li>
                            </ul>
                            <p class="indicator"><strong>Indicadores:</strong> Porcentaje de aciertos en prueba diagnóstica,
                            registro de conductas observables, identificación de fortalezas y debilidades individuales</p>
                        </div>

                        <div class="objective-card">
                            <h4>2. Objetivo de Diseño</h4>
                            <ul>
                                <li>Crear actividades digitales interactivas adaptadas</li>
                                <li>Seleccionar formatos apropiados de Wordwall</li>
                                <li>Establecer secuencia progresiva de dificultad</li>
                            </ul>
                            <p class="indicator"><strong>Indicadores:</strong> Número de actividades diseñadas,
                            validación positiva de expertos (≥4/5), coherencia objetivos-actividades</p>
                        </div>

                        <div class="objective-card">
                            <h4>3. Objetivo de Implementación</h4>
                            <ul>
                                <li>Aplicar secuencia de 12-15 sesiones</li>
                                <li>Promover motivación intrínseca mediante gamificación</li>
                                <li>Realizar ajustes metodológicos en tiempo real</li>
                            </ul>
                            <p class="indicator"><strong>Indicadores:</strong> Asistencia ≥90%, nivel de engagement observado,
                            número de ajustes realizados y su justificación</p>
                        </div>

                        <div class="objective-card">
                            <h4>4. Objetivo de Evaluación</h4>
                            <ul>
                                <li>Medir cambios mediante comparación pre-test vs post-test</li>
                                <li>Observar cambios actitudinales y motivacionales</li>
                                <li>Validar efectividad mediante triangulación de datos</li>
                            </ul>
                            <p class="indicator"><strong>Indicadores:</strong> Incremento porcentual en aciertos,
                            cambios reportados en entrevistas, conclusiones sobre replicabilidad</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: "diseno-secuencia",
            title: "Diseño de la Secuencia",
            icon: "🎨",
            order: 5,
            content: `
                <div class="id-section">
                    <h2>4. Diseño de la Secuencia Didáctica (Fase 2 - ADDIE)</h2>

                    <h3>Marco Metodológico: Aprendizaje Basado en Juegos (ABJ)</h3>
                    <p>
                        Según Uribe et al. (2017), el ABJ es una herramienta esencial para el desarrollo cognitivo que permite:
                    </p>
                    <ul>
                        <li>Participación activa del estudiante</li>
                        <li>Interacciones sociales significativas</li>
                        <li>Desarrollo de habilidades en contextos lúdicos libres de presión evaluativa</li>
                        <li>Entorno seguro donde el error es parte natural del proceso</li>
                    </ul>

                    <h3>Especificaciones Técnicas</h3>
                    <div class="platform-info">
                        <h4>Plataforma: Wordwall (https://wordwall.net)</h4>
                        <p><strong>Justificación de la elección:</strong></p>
                        <ul>
                            <li>Interfaz intuitiva y amigable para usuarios con poca experiencia</li>
                            <li>Amplia variedad de plantillas interactivas</li>
                            <li>Posibilidad de imprimir actividades para usar sin conexión</li>
                            <li>Versión gratuita con funcionalidades suficientes</li>
                            <li>Compatibilidad con computadoras y tabletas</li>
                        </ul>

                        <h4>Beneficios para estudiantes con NEE:</h4>
                        <ul>
                            <li><strong>Retroalimentación inmediata:</strong> Saben al instante si su respuesta es correcta</li>
                            <li><strong>Elementos visuales y auditivos:</strong> Imágenes, colores, sonidos y animaciones</li>
                            <li><strong>Repetición sin monotonía:</strong> Variaciones aleatorias que evitan aburrimiento</li>
                            <li><strong>Adaptabilidad al ritmo individual:</strong> Sin presión temporal</li>
                            <li><strong>Refuerzo positivo:</strong> Sonidos de celebración y mensajes motivadores</li>
                        </ul>
                    </div>

                    <h3>Estructura de Sesiones</h3>
                    <div class="session-structure">
                        <div class="session-phase">
                            <h4>1. Activación / Calentamiento (5 minutos)</h4>
                            <ul>
                                <li>Saludo afectivo y personalizado</li>
                                <li>Recordatorio de la sesión anterior (ejercitar memoria)</li>
                                <li>Presentación del objetivo del día</li>
                                <li>Anticipación de la estructura de la sesión</li>
                            </ul>
                        </div>

                        <div class="session-phase">
                            <h4>2. Desarrollo / Actividad Principal (25-30 minutos)</h4>
                            <ul>
                                <li>Demostración docente (5 min): Modelar la actividad verbalizando el pensamiento</li>
                                <li>Práctica en parejas (15-20 min): Trabajo colaborativo con acompañamiento personalizado</li>
                                <li>Rotación de actividades (opcional): Si hay diferentes juegos</li>
                            </ul>
                        </div>

                        <div class="session-phase">
                            <h4>3. Consolidación / Cierre Cognitivo (10 minutos)</h4>
                            <ul>
                                <li>Conversación grupal sobre aprendizajes</li>
                                <li>Juego de repaso rápido</li>
                                <li>Conexión con la vida cotidiana</li>
                                <li>Retroalimentación positiva específica</li>
                                <li>Estrategias metacognitivas</li>
                            </ul>
                        </div>

                        <div class="session-phase">
                            <h4>4. Cierre Administrativo (5 minutos)</h4>
                            <ul>
                                <li>Guardar y cerrar correctamente las computadoras</li>
                                <li>Registro en diario de campo</li>
                                <li>Anticipación de la próxima sesión</li>
                                <li>Ritual de despedida</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Componentes de las Actividades</h3>
                    <div class="activity-components">
                        <h4>Principios de diseño:</h4>
                        <ul>
                            <li><strong>Simplicidad visual:</strong> Fondos claros, máximo 3 colores principales</li>
                            <li><strong>Instrucciones claras:</strong> Frases cortas (máximo 8 palabras) con íconos</li>
                            <li><strong>Progresión gradual:</strong> Inicio con 4-6 elementos, aumento hasta 8-10</li>
                            <li><strong>Refuerzo multimodal:</strong> Combinación de texto, imagen y sonido</li>
                            <li><strong>Tiempo flexible:</strong> Sin límites en etapas iniciales</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "desarrollo",
            title: "Desarrollo de Recursos",
            icon: "🛠️",
            order: 6,
            content: `
                <div class="id-section">
                    <h2>5. Desarrollo de Recursos Digitales (Fase 3 - ADDIE)</h2>

                    <h3>Plantillas Wordwall Seleccionadas</h3>
                    <p>Wordwall ofrece más de 30 formatos de actividades. Se seleccionan las siguientes por su pertinencia
                    para estimular la memoria:</p>

                    <div class="templates-grid">
                        <div class="template-card">
                            <h4>1. Encuentra la Coincidencia / Parejas</h4>
                            <p><strong>Función cognitiva:</strong> Memoria visual, reconocimiento, asociación</p>
                            <p><strong>Ejemplo:</strong> Emparejar animales con sus crías, departamentos con capitales</p>
                        </div>

                        <div class="template-card">
                            <h4>2. Cuestionario / Quiz</h4>
                            <p><strong>Función cognitiva:</strong> Recuperación de información, comprensión lectora</p>
                            <p><strong>Ejemplo:</strong> Preguntas sobre cuento leído, conceptos de ciencias</p>
                        </div>

                        <div class="template-card">
                            <h4>3. Orden Correcto / Secuencia</h4>
                            <p><strong>Función cognitiva:</strong> Memoria secuencial, pensamiento lógico</p>
                            <p><strong>Ejemplo:</strong> Ordenar pasos del ciclo del agua, secuencia numérica</p>
                        </div>

                        <div class="template-card">
                            <h4>4. Clasificación / Agrupar</h4>
                            <p><strong>Función cognitiva:</strong> Categorización, asociación conceptual</p>
                            <p><strong>Ejemplo:</strong> Clasificar animales según hábitat, agrupar alimentos</p>
                        </div>

                        <div class="template-card">
                            <h4>5. Rueda Aleatoria / Ruleta</h4>
                            <p><strong>Función cognitiva:</strong> Atención, memoria inmediata, expresión oral</p>
                            <p><strong>Ejemplo:</strong> Ruleta con imágenes que el estudiante debe nombrar</p>
                        </div>

                        <div class="template-card">
                            <h4>6. Voltear Fichas / Tarjetas</h4>
                            <p><strong>Función cognitiva:</strong> Recuperación de información, asociación</p>
                            <p><strong>Ejemplo:</strong> Tarjeta con imagen de figura geométrica, al voltear aparece su nombre</p>
                        </div>

                        <div class="template-card">
                            <h4>7. Verdadero o Falso</h4>
                            <p><strong>Función cognitiva:</strong> Comprensión, memoria de hechos</p>
                            <p><strong>Ejemplo:</strong> Afirmaciones sobre texto leído, conceptos de ciencias sociales</p>
                        </div>

                        <div class="template-card">
                            <h4>8. Completar la Frase / Palabra Faltante</h4>
                            <p><strong>Función cognitiva:</strong> Memoria contextual, vocabulario</p>
                            <p><strong>Ejemplo:</strong> Completar oraciones sobre contenidos estudiados</p>
                        </div>
                    </div>

                    <h3>Niveles de Dificultad Progresiva</h3>
                    <div class="levels-progression">
                        <div class="level-box">
                            <h4>Nivel 1: Inicial/Básico (Sesiones 1-4)</h4>
                            <ul>
                                <li>4-6 elementos por actividad</li>
                                <li>Tiempo ilimitado</li>
                                <li>Apoyo visual máximo</li>
                                <li>Instrucciones verbales además de escritas</li>
                                <li>Repetición sin restricción</li>
                                <li>Retroalimentación muy positiva</li>
                            </ul>
                            <p class="example">Ejemplo: Juego de parejas con 6 tarjetas (3 pares) de animales comunes</p>
                        </div>

                        <div class="level-box">
                            <h4>Nivel 2: Intermedio (Sesiones 5-8)</h4>
                            <ul>
                                <li>6-8 elementos por actividad</li>
                                <li>Apoyo visual moderado</li>
                                <li>Introducción gradual de límite de tiempo (opcional)</li>
                                <li>Instrucciones escritas con pictogramas</li>
                                <li>Hasta 3 intentos por actividad</li>
                                <li>Retroalimentación con orientación para mejorar</li>
                            </ul>
                            <p class="example">Ejemplo: Clasificar 8 animales en 2 categorías (herbívoros/carnívoros)</p>
                        </div>

                        <div class="level-box">
                            <h4>Nivel 3: Avanzado/Consolidación (Sesiones 9-12)</h4>
                            <ul>
                                <li>8-10 elementos por actividad</li>
                                <li>Menor apoyo visual</li>
                                <li>Desafíos opcionales con tiempo</li>
                                <li>Instrucciones escritas breves</li>
                                <li>Actividades que combinan varios tipos de memoria</li>
                                <li>Retroalimentación con preguntas metacognitivas</li>
                            </ul>
                            <p class="example">Ejemplo: Ordenar 8 pasos de un proceso complejo (ciclo del agua completo)</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: "implementacion",
            title: "Implementación",
            icon: "⚙️",
            order: 7,
            content: `
                <div class="id-section">
                    <h2>6. Implementación (Fase 4 - ADDIE)</h2>

                    <h3>Protocolo de Aplicación</h3>

                    <div class="implementation-protocol">
                        <div class="protocol-phase">
                            <h4>Preparación Previa a Cada Sesión</h4>
                            <ol>
                                <li><strong>Verificación técnica (10 minutos antes):</strong>
                                    <ul>
                                        <li>Encender computadoras y verificar funcionamiento</li>
                                        <li>Abrir actividades de Wordwall en pestañas del navegador</li>
                                        <li>Probar conexión a internet; activar plan B si no hay</li>
                                        <li>Preparar material impreso de respaldo</li>
                                    </ul>
                                </li>
                                <li><strong>Preparación del ambiente:</strong>
                                    <ul>
                                        <li>Organizar sillas en parejas frente a computadoras</li>
                                        <li>Colocar letrero visual con objetivo de la sesión</li>
                                        <li>Tener listos instrumentos de observación</li>
                                        <li>Preparar refuerzos positivos (stickers, sellos)</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>

                        <div class="protocol-phase">
                            <h4>Durante la Sesión</h4>
                            <ul>
                                <li><strong>Inicio:</strong> Recibir afectuosamente, realizar rutina de activación</li>
                                <li><strong>Desarrollo:</strong> Acompañar trabajo en parejas con observación activa</li>
                                <li><strong>Cierre:</strong> Facilitar conversación de consolidación</li>
                            </ul>
                        </div>

                        <div class="protocol-phase">
                            <h4>Después de la Sesión</h4>
                            <ul>
                                <li>Completar registros detallados en diario de campo</li>
                                <li>Guardar capturas de pantalla de resultados en Wordwall</li>
                                <li>Analizar observaciones y planificar ajustes</li>
                                <li>Comunicar avances a docente titular y profesional de apoyo</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Ajustes Durante la Intervención</h3>
                    <p>El modelo ADDIE es iterativo, permitiendo modificaciones basadas en evidencia:</p>

                    <div class="adjustments-types">
                        <div class="adjustment-type">
                            <h4>Ajustes de Contenido</h4>
                            <ul>
                                <li>Simplificar o complejizar actividades según desempeño real</li>
                                <li>Cambiar temas si no resultan motivantes</li>
                                <li>Agregar ejemplos del contexto local</li>
                            </ul>
                        </div>

                        <div class="adjustment-type">
                            <h4>Ajustes Metodológicos</h4>
                            <ul>
                                <li>Modificar tamaño de grupos (individual, parejas, tríos)</li>
                                <li>Variar tiempo de sesiones si hay fatiga o alta motivación</li>
                                <li>Incorporar más pausas activas o dinámicas corporales</li>
                            </ul>
                        </div>

                        <div class="adjustment-type">
                            <h4>Ajustes Técnicos</h4>
                            <ul>
                                <li>Usar más material impreso si conexión falla frecuentemente</li>
                                <li>Alternar entre computadora y tablet según preferencias</li>
                                <li>Permitir que estudiantes elijan qué juego hacer primero</li>
                            </ul>
                        </div>

                        <div class="adjustment-type">
                            <h4>Ajustes de Apoyo</h4>
                            <ul>
                                <li>Aumentar acompañamiento individualizado para mayor dificultad</li>
                                <li>Invitar a profesional de apoyo para co-facilitar sesiones complejas</li>
                                <li>Solicitar apoyo de pares avanzados (tutoría entre iguales)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: "evaluacion",
            title: "Sistema de Evaluación",
            icon: "📊",
            order: 8,
            content: `
                <div class="id-section">
                    <h2>7. Sistema de Evaluación Integral (Fase 5 - ADDIE)</h2>

                    <p>La evaluación en ADDIE es continua y multidimensional, abarcando tanto el recurso digital
                    como el impacto en los estudiantes.</p>

                    <h3>Evaluación del Impacto en Estudiantes</h3>

                    <div class="evaluation-types">
                        <div class="eval-type">
                            <h4>1. Evaluación Diagnóstica (Pre-test)</h4>
                            <p><strong>Objetivo:</strong> Establecer línea base del nivel inicial de memoria a corto plazo</p>

                            <h5>Estructura de la prueba:</h5>
                            <ul>
                                <li><strong>Parte 1:</strong> Reconocimiento visual inmediato (10 ítems)</li>
                                <li><strong>Parte 2:</strong> Memoria secuencial (5 ítems)</li>
                                <li><strong>Parte 3:</strong> Recuerdo de información verbal (5 ítems)</li>
                                <li><strong>Parte 4:</strong> Seguimiento de instrucciones (3 ítems)</li>
                            </ul>
                            <p><strong>Puntaje máximo:</strong> 23 puntos</p>
                        </div>

                        <div class="eval-type">
                            <h4>2. Evaluación Procesual (Durante la intervención)</h4>
                            <p><strong>Técnicas:</strong></p>
                            <ul>
                                <li><strong>Observación Participante Sistemática:</strong> Registro de comportamientos
                                observables relacionados con memoria, atención y motivación</li>
                                <li><strong>Diario de Campo Reflexivo:</strong> Narrativa detallada de cada sesión con
                                análisis reflexivo</li>
                            </ul>

                            <h5>Aspectos observados:</h5>
                            <ul>
                                <li>Atención sostenida en actividad</li>
                                <li>Recuerda instrucciones sin repetir</li>
                                <li>Completa actividades sin ayuda</li>
                                <li>Muestra interés y motivación</li>
                                <li>Solicita apoyo docente</li>
                                <li>Expresa frustración o celebra logros</li>
                                <li>Ayuda a compañeros</li>
                            </ul>
                        </div>

                        <div class="eval-type">
                            <h4>3. Evaluación Sumativa (Post-test)</h4>
                            <p><strong>Objetivo:</strong> Medir avances logrados tras la intervención completa</p>

                            <h5>Indicadores de éxito esperados:</h5>
                            <ul>
                                <li>Incremento mínimo del 20% en puntaje total por estudiante</li>
                                <li>Mejora en al menos 3 de las 4 categorías evaluadas</li>
                                <li>Reducción del tiempo necesario para completar tareas similares</li>
                                <li>Mayor autonomía y menor necesidad de repetir instrucciones</li>
                            </ul>
                        </div>

                        <div class="eval-type">
                            <h4>4. Evaluación Cualitativa - Entrevistas a Profundidad</h4>
                            <p><strong>Participantes:</strong></p>
                            <ul>
                                <li>Docente titular del grado quinto</li>
                                <li>Profesional de apoyo (educación especial)</li>
                                <li>Opcionalmente: Padres de familia o cuidadores</li>
                            </ul>

                            <h5>Bloques de entrevista:</h5>
                            <ol>
                                <li>Percepción sobre inclusión educativa</li>
                                <li>Dificultades de memoria observadas</li>
                                <li>Valoración de la estrategia con Wordwall</li>
                                <li>Proyección y sostenibilidad</li>
                            </ol>
                        </div>
                    </div>

                    <h3>Categorías de Análisis</h3>
                    <div class="analysis-categories">
                        <div class="category-card">
                            <h4>1. Herramientas Digitales</h4>
                            <ul>
                                <li>Efectividad de Wordwall</li>
                                <li>Formatos más utilizados</li>
                                <li>Accesibilidad en contexto rural</li>
                                <li>Usabilidad para estudiantes NEE</li>
                            </ul>
                        </div>

                        <div class="category-card">
                            <h4>2. Educación Inclusiva</h4>
                            <ul>
                                <li>Ajustes razonables implementados</li>
                                <li>Participación equitativa</li>
                                <li>Eliminación de barreras</li>
                                <li>Respeto a la diversidad</li>
                            </ul>
                        </div>

                        <div class="category-card">
                            <h4>3. Estimulación Cognitiva</h4>
                            <ul>
                                <li>Mejora en memoria visual</li>
                                <li>Mejora en memoria secuencial</li>
                                <li>Atención sostenida</li>
                                <li>Capacidad de seguir instrucciones</li>
                                <li>Asociación de conceptos</li>
                            </ul>
                        </div>

                        <div class="category-card">
                            <h4>4. Motivación y Dimensión Socioemocional</h4>
                            <ul>
                                <li>Disposición hacia las actividades</li>
                                <li>Persistencia en tareas</li>
                                <li>Expresiones de satisfacción</li>
                                <li>Autoestima académica</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Triangulación de Datos</h3>
                    <p>Para garantizar validez y confiabilidad, se realiza triangulación metodológica cruzando
                    múltiples fuentes de información:</p>
                    <ul>
                        <li><strong>Datos cuantitativos:</strong> Pre-test y post-test</li>
                        <li><strong>Datos cualitativos observacionales:</strong> Fichas de observación y diario de campo</li>
                        <li><strong>Datos cualitativos de entrevistas:</strong> Percepciones de docentes y profesionales</li>
                        <li><strong>Validación de expertos:</strong> Evaluación del RED con rúbrica</li>
                    </ul>
                </div>
            `
        },
        {
            id: "cronograma",
            title: "Cronograma",
            icon: "📅",
            order: 9,
            content: `
                <div class="id-section">
                    <h2>10. Cronograma de Implementación</h2>

                    <p>El proyecto se desarrolla en 6 fases a lo largo de 16 semanas (4 meses aproximadamente).</p>

                    <div class="timeline">
                        <div class="timeline-phase">
                            <div class="phase-header">
                                <span class="phase-number">1</span>
                                <h4>Diagnóstico</h4>
                                <span class="phase-duration">2 semanas</span>
                            </div>
                            <ul>
                                <li>Observación inicial del contexto</li>
                                <li>Reunión con docentes y profesional de apoyo</li>
                                <li>Solicitud de permisos institucionales y familiares</li>
                                <li>Aplicación de pre-test</li>
                                <li>Análisis de resultados diagnósticos</li>
                            </ul>
                        </div>

                        <div class="timeline-phase">
                            <div class="phase-header">
                                <span class="phase-number">2</span>
                                <h4>Diseño y Desarrollo</h4>
                                <span class="phase-duration">3 semanas</span>
                            </div>
                            <ul>
                                <li>Diseño de secuencia didáctica completa</li>
                                <li>Creación de 15-20 actividades en Wordwall</li>
                                <li>Elaboración de instrumentos de evaluación</li>
                                <li>Validación por expertas</li>
                                <li>Preparación de material complementario</li>
                            </ul>
                        </div>

                        <div class="timeline-phase">
                            <div class="phase-header">
                                <span class="phase-number">3</span>
                                <h4>Implementación</h4>
                                <span class="phase-duration">6 semanas</span>
                            </div>
                            <ul>
                                <li>Aplicación de secuencia didáctica (12-15 sesiones)</li>
                                <li>Registro sistemático en diario de campo</li>
                                <li>Observación participante en cada sesión</li>
                                <li>Ajustes metodológicos según respuesta de estudiantes</li>
                                <li>Comunicación continua con equipo</li>
                            </ul>
                        </div>

                        <div class="timeline-phase">
                            <div class="phase-header">
                                <span class="phase-number">4</span>
                                <h4>Evaluación Final</h4>
                                <span class="phase-duration">2 semanas</span>
                            </div>
                            <ul>
                                <li>Aplicación de post-test</li>
                                <li>Realización de entrevistas a profundidad</li>
                                <li>Recolección de percepciones finales</li>
                                <li>Organización de datos cuantitativos y cualitativos</li>
                            </ul>
                        </div>

                        <div class="timeline-phase">
                            <div class="phase-header">
                                <span class="phase-number">5</span>
                                <h4>Análisis e Interpretación</h4>
                                <span class="phase-duration">2 semanas</span>
                            </div>
                            <ul>
                                <li>Tabulación de datos cuantitativos</li>
                                <li>Transcripción y codificación de entrevistas</li>
                                <li>Análisis de diarios de campo</li>
                                <li>Triangulación de datos</li>
                                <li>Elaboración de conclusiones</li>
                            </ul>
                        </div>

                        <div class="timeline-phase">
                            <div class="phase-header">
                                <span class="phase-number">6</span>
                                <h4>Socialización</h4>
                                <span class="phase-duration">1 semana</span>
                            </div>
                            <ul>
                                <li>Redacción de informe final</li>
                                <li>Presentación de resultados a comunidad educativa</li>
                                <li>Entrega de recomendaciones para continuidad</li>
                                <li>Difusión de hallazgos (artículo, ponencia)</li>
                            </ul>
                        </div>
                    </div>

                    <div class="calendar-info">
                        <h3>Calendario Tentativo</h3>
                        <ul>
                            <li><strong>Inicio:</strong> Febrero 2025</li>
                            <li><strong>Finalización:</strong> Mayo 2025</li>
                            <li><strong>Horario de sesiones:</strong> Martes y jueves, 9:00-9:45 a.m.</li>
                            <li><strong>Total:</strong> 16 semanas (4 meses aproximadamente)</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            id: "recursos",
            title: "Recursos Necesarios",
            icon: "💼",
            order: 10,
            content: `
                <div class="id-section">
                    <h2>9. Recursos Necesarios</h2>

                    <h3>Recursos Tecnológicos</h3>
                    <div class="resources-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Recurso</th>
                                    <th>Cantidad</th>
                                    <th>Disponibilidad</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Computadoras de escritorio</td>
                                    <td>Mínimo 4 (ideal 6)</td>
                                    <td>Disponibles en sala de sistemas</td>
                                    <td>Sistema operativo Windows</td>
                                </tr>
                                <tr>
                                    <td>Conexión a internet</td>
                                    <td>Velocidad mínima 2 Mbps</td>
                                    <td>Disponible (intermitente)</td>
                                    <td>Plan B: Material impreso</td>
                                </tr>
                                <tr>
                                    <td>Plataforma Wordwall</td>
                                    <td>1 cuenta</td>
                                    <td>Versión gratuita o institucional</td>
                                    <td>Permite crear hasta 5 actividades gratis</td>
                                </tr>
                                <tr>
                                    <td>Tablet</td>
                                    <td>1</td>
                                    <td>Dispositivo personal docente</td>
                                    <td>Para demostraciones y respaldo</td>
                                </tr>
                                <tr>
                                    <td>Proyector o pantalla grande</td>
                                    <td>1</td>
                                    <td>Disponible en sala de sistemas</td>
                                    <td>Para modelar actividades</td>
                                </tr>
                                <tr>
                                    <td>Impresora</td>
                                    <td>1</td>
                                    <td>Disponible en institución</td>
                                    <td>Para material de respaldo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>Recursos Humanos</h3>
                    <div class="human-resources">
                        <ul>
                            <li><strong>Tiempo docente investigadora:</strong> 60 horas totales (20h diseño, 25h implementación, 15h evaluación)</li>
                            <li><strong>Tiempo docente titular:</strong> 15 horas (apoyo en sesiones)</li>
                            <li><strong>Tiempo profesional de apoyo:</strong> 10 horas (asesoría)</li>
                            <li><strong>Tiempo expertas evaluadoras:</strong> 4 horas c/u (8 total)</li>
                        </ul>
                    </div>

                    <h3>Presupuesto Total Estimado</h3>
                    <div class="budget-summary">
                        <table>
                            <thead>
                                <tr>
                                    <th>Categoría</th>
                                    <th>Costo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Recursos tecnológicos</td>
                                    <td>$60.000 COP (Wordwall premium opcional)</td>
                                </tr>
                                <tr>
                                    <td>Recursos humanos</td>
                                    <td>$200.000 COP (honorarios expertos, opcional)</td>
                                </tr>
                                <tr>
                                    <td>Recursos pedagógicos</td>
                                    <td>$75.000 COP</td>
                                </tr>
                                <tr>
                                    <td>Imprevistos (10%)</td>
                                    <td>$33.500 COP</td>
                                </tr>
                                <tr class="total-row">
                                    <td><strong>TOTAL</strong></td>
                                    <td><strong>$368.500 COP</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="budget-note">
                            <strong>Nota:</strong> El costo puede reducirse a aproximadamente $100.000 COP usando
                            versión gratuita de Wordwall y colaboración académica de expertas sin honorarios.
                        </p>
                    </div>
                </div>
            `
        },
        {
            id: "criterios-calidad",
            title: "Criterios de Calidad",
            icon: "✅",
            order: 11,
            content: `
                <div class="id-section">
                    <h2>11. Criterios de Calidad del Diseño</h2>

                    <p>Para garantizar rigor científico y pedagógico, el diseño instruccional cumple con los
                    siguientes criterios de calidad:</p>

                    <div class="quality-criteria">
                        <div class="criterion-card">
                            <h3>1. Validez</h3>
                            <p><strong>Definición:</strong> Grado en que el diseño mide realmente lo que pretende medir y
                            responde efectivamente a la problemática identificada.</p>

                            <h4>Estrategias para garantizarla:</h4>
                            <ul>
                                <li><strong>Validez de contenido:</strong> Instrumentos revisados por expertas</li>
                                <li><strong>Validez de constructo:</strong> Fundamentos teóricos claramente articulados</li>
                                <li><strong>Validez ecológica:</strong> Diseño adaptado al contexto real de zona rural</li>
                                <li><strong>Validez de expertos:</strong> Dos profesionales con experiencia revisan y aprueban</li>
                            </ul>
                        </div>

                        <div class="criterion-card">
                            <h3>2. Confiabilidad</h3>
                            <p><strong>Definición:</strong> Consistencia y estabilidad de los datos recolectados.</p>

                            <h4>Estrategias para garantizarla:</h4>
                            <ul>
                                <li><strong>Múltiples fuentes de información:</strong> Combinación de datos cuantitativos y cualitativos</li>
                                <li><strong>Registro sistemático:</strong> Instrumentos estructurados que reducen subjetividad</li>
                                <li><strong>Diario de campo detallado:</strong> Narrativas densas para comprensión del contexto</li>
                                <li><strong>Triangulación:</strong> Cruce de al menos tres fuentes de datos</li>
                                <li><strong>Auditoría externa:</strong> Revisión de coherencia entre datos y conclusiones</li>
                            </ul>
                        </div>

                        <div class="criterion-card">
                            <h3>3. Pertinencia</h3>
                            <p><strong>Definición:</strong> Adecuación del diseño al contexto específico y a las necesidades
                            reales de la población objetivo.</p>

                            <h4>Estrategias para garantizarla:</h4>
                            <ul>
                                <li><strong>Diagnóstico exhaustivo:</strong> Fase de análisis profunda</li>
                                <li><strong>Participación de actores locales:</strong> Docentes que conocen a los estudiantes</li>
                                <li><strong>Adaptación curricular:</strong> Contenidos alineados con DBA del MEN</li>
                                <li><strong>Ajustes razonables:</strong> Diseño flexible con modificaciones individuales</li>
                                <li><strong>Viabilidad tecnológica:</strong> Consideración de recursos realmente disponibles</li>
                            </ul>
                        </div>

                        <div class="criterion-card">
                            <h3>4. Coherencia Interna</h3>
                            <p><strong>Definición:</strong> Alineación lógica entre todos los componentes del diseño instruccional.</p>

                            <h4>Verificación de coherencia:</h4>
                            <ul>
                                <li>Problemática ↔ Dificultades en memoria a corto plazo</li>
                                <li>Fundamentos ↔ Constructivismo social, aprendizaje significativo, ABJ</li>
                                <li>Modelo ADDIE ↔ Necesidad de proceso sistemático e iterativo</li>
                                <li>Objetivos ↔ Fortalecer memoria mediante juegos digitales</li>
                                <li>Actividades ↔ Estimulación de componentes específicos de memoria</li>
                                <li>Evaluación ↔ Medición de memoria a corto plazo y motivación</li>
                            </ul>
                        </div>

                        <div class="criterion-card">
                            <h3>5. Replicabilidad</h3>
                            <p><strong>Definición:</strong> Posibilidad de que otros docentes/investigadores implementen el
                            diseño en contextos similares.</p>

                            <h4>Estrategias para facilitarla:</h4>
                            <ul>
                                <li><strong>Documentación exhaustiva:</strong> Cada fase descrita con suficiente detalle</li>
                                <li><strong>Instrumentos disponibles:</strong> Todos los instrumentos incluidos en anexos</li>
                                <li><strong>Descripción de ajustes:</strong> Modificaciones registradas con sus razones</li>
                                <li><strong>Identificación de facilitadores y barreras:</strong> Factores críticos de éxito</li>
                                <li><strong>Plataforma accesible:</strong> Wordwall es una herramienta de acceso público</li>
                            </ul>
                        </div>

                        <div class="criterion-card">
                            <h3>6. Viabilidad</h3>
                            <p><strong>Definición:</strong> Factibilidad real de implementación considerando recursos, tiempo
                            y condiciones del contexto.</p>

                            <h4>Evidencia de viabilidad:</h4>
                            <ul>
                                <li><strong>Recursos disponibles:</strong> Computadoras existen en la institución</li>
                                <li><strong>Tiempo suficiente:</strong> 6 semanas es realista en calendario escolar</li>
                                <li><strong>Apoyo institucional:</strong> Autorización de directivos y compromiso de docentes</li>
                                <li><strong>Presupuesto accesible:</strong> Inferior a $400.000 COP</li>
                                <li><strong>Capacitación mínima:</strong> Formación en maestría de recursos digitales</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: "consideraciones-eticas",
            title: "Consideraciones Éticas",
            icon: "⚖️",
            order: 12,
            content: `
                <div class="id-section">
                    <h2>12. Consideraciones Éticas</h2>

                    <p>La investigación educativa con población vulnerable requiere especial atención a principios éticos.</p>

                    <div class="ethics-principles">
                        <div class="ethics-card">
                            <h3>1. Consentimiento Informado</h3>
                            <h4>Proceso:</h4>
                            <ol>
                                <li><strong>Autorización institucional:</strong> Solicitud formal al rector/coordinador presentando
                                propuesta completa del proyecto, objetivos, metodología y beneficios esperados.</li>
                                <li><strong>Consentimiento de familias:</strong> Documento escrito en lenguaje sencillo explicando:
                                    <ul>
                                        <li>Propósito del proyecto</li>
                                        <li>Actividades que realizarán los estudiantes</li>
                                        <li>Uso de datos (evaluaciones, observaciones, grabaciones)</li>
                                        <li>Voluntariedad de la participación</li>
                                        <li>Derecho a retirarse en cualquier momento</li>
                                        <li>Confidencialidad de la información</li>
                                        <li>Beneficios esperados</li>
                                    </ul>
                                </li>
                                <li><strong>Asentimiento de estudiantes:</strong> Explicación adaptada a su nivel de comprensión,
                                con apoyo visual (pictogramas), solicitando su acuerdo verbal para participar.</li>
                            </ol>
                            <p class="principle"><strong>Principio:</strong> Nadie participa sin comprensión y aceptación voluntaria.</p>
                        </div>

                        <div class="ethics-card">
                            <h3>2. Confidencialidad y Anonimato</h3>
                            <h4>Medidas de protección:</h4>
                            <ul>
                                <li><strong>Uso de seudónimos:</strong> En todos los registros escritos se usan nombres ficticios o
                                códigos (Estudiante 1, E1, etc.)</li>
                                <li><strong>Protección de datos personales:</strong> Archivos digitales con información sensible se
                                almacenan en dispositivo con contraseña, acceso exclusivo de la investigadora</li>
                                <li><strong>Difusión responsable:</strong> Fotografías o videos solo se usan con autorización explícita
                                y nunca mostrando rostros identificables</li>
                                <li><strong>Agregación de datos:</strong> Los resultados se presentan de forma grupal o con códigos</li>
                            </ul>
                        </div>

                        <div class="ethics-card">
                            <h3>3. Principio de No Maleficencia</h3>
                            <p><strong>Compromiso:</strong> No generar daño físico, psicológico o emocional a los participantes.</p>

                            <h4>Estrategias:</h4>
                            <ul>
                                <li><strong>Evitar frustración innecesaria:</strong> Actividades diseñadas en zona de desarrollo próximo</li>
                                <li><strong>Refuerzo positivo constante:</strong> Celebración de logros, reformulación del error como oportunidad</li>
                                <li><strong>Respeto a ritmos individuales:</strong> No presión temporal, no comparaciones negativas</li>
                                <li><strong>Detección temprana de malestar:</strong> Si un estudiante muestra ansiedad o rechazo significativo,
                                se suspende su participación</li>
                                <li><strong>Suspensión si es necesario:</strong> Si el proyecto genera más daño que beneficio, se suspende
                                éticamente</li>
                            </ul>
                        </div>

                        <div class="ethics-card">
                            <h3>4. Principio de Beneficencia</h3>
                            <p><strong>Compromiso:</strong> Maximizar beneficios para los participantes.</p>

                            <h4>Beneficios esperados:</h4>
                            <ul>
                                <li><strong>Directo para estudiantes:</strong> Mejora en memoria, mayor motivación, aprendizajes
                                significativos, desarrollo de habilidades digitales</li>
                                <li><strong>Para la institución:</strong> Estrategia innovadora que puede incorporarse a prácticas
                                regulares, capacitación docente en uso de recursos digitales</li>
                                <li><strong>Para la comunidad académica:</strong> Generación de conocimiento sobre educación inclusiva
                                con TIC en zonas rurales</li>
                            </ul>
                        </div>

                        <div class="ethics-card">
                            <h3>5. Justicia y Equidad</h3>
                            <p><strong>Compromiso:</strong> Todos los estudiantes del grupo de inclusión tienen igual oportunidad de
                            participar y beneficiarse.</p>

                            <h4>Garantías:</h4>
                            <ul>
                                <li><strong>Selección no discriminatoria:</strong> Los 4 estudiantes con diagnóstico de discapacidad cognitiva
                                son invitados a participar, independientemente de género, nivel socioeconómico u otro factor</li>
                                <li><strong>Adaptación a necesidades individuales:</strong> Los ajustes razonables se hacen según necesidades
                                de cada uno, garantizando equidad</li>
                                <li><strong>Acceso post-proyecto:</strong> Se deja acceso a las actividades de Wordwall para que docentes puedan
                                continuar usándolas</li>
                            </ul>
                        </div>

                        <div class="ethics-card">
                            <h3>6. Devolución de Resultados</h3>
                            <p><strong>Compromiso:</strong> La comunidad educativa tiene derecho a conocer los hallazgos del proyecto.</p>

                            <h4>Plan de socialización:</h4>
                            <ul>
                                <li><strong>Informe ejecutivo:</strong> Documento de 5-10 páginas en lenguaje accesible entregado a
                                directivos, docentes y familias</li>
                                <li><strong>Presentación oral:</strong> Reunión con comunidad educativa para explicar resultados principales,
                                responder preguntas y recoger retroalimentación</li>
                                <li><strong>Recomendaciones prácticas:</strong> Guía de uso de Wordwall y estrategias para que docentes puedan
                                continuar implementando la propuesta</li>
                                <li><strong>Reconocimiento:</strong> Agradecimiento público a todos los participantes por su contribución al
                                conocimiento pedagógico</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    ],

    // Secciones de la infografía divididas en 4 zonas principales centradas
    // Posiciones ajustadas para la infografía vertical completa
    infographicSections: [
        {
            id: "seccion-superior",
            title: "Contexto y Análisis",
            description: "Contexto del proyecto, análisis de necesidades, fundamentación pedagógica y objetivos del diseño",
            position: { top: "8%", left: "0%", width: "100%", height: "22%" }
        },
        {
            id: "seccion-media-alta",
            title: "Diseño y Estructura",
            description: "Estructura de actividades en Wordwall, modelo de sesión y diseño de la secuencia didáctica",
            position: { top: "32%", left: "0%", width: "100%", height: "22%" }
        },
        {
            id: "seccion-media-baja",
            title: "Evaluación y Análisis",
            description: "Sistema de evaluación integral, categorías de análisis y triangulación de datos",
            position: { top: "56%", left: "0%", width: "100%", height: "22%" }
        },
        {
            id: "seccion-inferior",
            title: "Implementación y Resultados",
            description: "Cronograma, criterios de calidad, consideraciones éticas y resultados esperados",
            position: { top: "80%", left: "0%", width: "100%", height: "18%" }
        }
    ]
};
