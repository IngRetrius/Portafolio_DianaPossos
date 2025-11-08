/**
 * Datos del eBook - Marco Referencial del Proyecto
 * Cada capítulo incluye contenido, multimedia y metadatos
 */

const ebookData = {
    title: "Marco Referencial del Proyecto",
    subtitle: "Fortalecimiento de la memoria a corto plazo mediante Wordwall",
    author: "Diana Rocío Possos Beltrán",

    chapters: [
        // PORTADA
        {
            id: 'portada',
            number: '',
            title: 'Portada',
            type: 'cover',
            content: `
                <div class="ebook-cover">
                    <div class="ebook-cover__logo">
                        <img src="assets/images/logo-unicartagena.png" alt="Universidad de Cartagena">
                    </div>
                    <h1 class="ebook-cover__title">Marco Referencial del Proyecto</h1>
                    <h2 class="ebook-cover__subtitle">
                        Fortalecimiento de la memoria a corto plazo mediada por la secuencia didáctica
                        como estrategia pedagógica, a través de la plataforma Wordwall
                    </h2>
                    <div class="ebook-cover__author">
                        <p><strong>Diana Rocío Possos Beltrán</strong></p>
                        <p>Maestría en Recursos Digitales Aplicados a la Educación</p>
                        <p>Universidad de Cartagena</p>
                    </div>
                </div>
            `
        },

        // INTRODUCCIÓN
        {
            id: 'introduccion',
            number: '',
            title: 'Introducción',
            type: 'content',
            icon: '',
            content: `
                <h2>Presentación del E-book sobre el Marco Referencial</h2>

                <p class="ebook-highlight">
                    La educación inclusiva representa uno de los mayores desafíos y compromisos del
                    sistema educativo colombiano, especialmente en contextos rurales donde las
                    barreras para el aprendizaje se multiplican.
                </p>

                <p>
                    En la Ciudadela Educativa de Pasto, sede Puerres, he identificado una necesidad
                    imperante: <strong>fortalecer la memoria a corto plazo</strong> de estudiantes de grado
                    quinto que presentan discapacidad cognitiva leve o moderada.
                </p>

                <div class="ebook-callout ebook-callout--primary">
                    <h3>¿Por qué este proyecto?</h3>
                    <p>
                        Los estudiantes con dificultades de memoria a corto plazo enfrentan obstáculos
                        significativos: olvidan instrucciones básicas, tienen baja retención de información
                        y presentan escasa capacidad para asociar conceptos. Esto no solo afecta su
                        rendimiento académico, sino también su autoestima, motivación y sentido de
                        pertenencia en el aula.
                    </p>
                </div>

                <h3>La pregunta central de investigación</h3>
                <p class="ebook-question">
                    ¿Cómo fortalecer la memoria a corto plazo mediante una secuencia didáctica
                    apoyada en la plataforma digital Wordwall?
                </p>

                <h3>La propuesta: Wordwall como herramienta de transformación</h3>
                <p>
                    La plataforma <strong>Wordwall</strong> emerge como una solución pedagógica innovadora
                    que permite crear actividades digitales interactivas, lúdicas y adaptadas a las
                    necesidades específicas de estudiantes con discapacidad cognitiva. A través del
                    <em>aprendizaje basado en juegos</em>, busco estimular la memoria mediante actividades
                    visuales, repetitivas y motivadoras que favorecen el aprendizaje significativo.
                </p>
            `,
            media: {
                type: 'video',
                title: 'Video Explicativo del Marco Referencial',
                description: 'Presentación visual completa de todos los marcos: contextual, legal, conceptual y teórico que fundamentan esta investigación'
            }
        },

        // MARCO CONTEXTUAL
        {
            id: 'contexto',
            number: '1',
            title: 'Marco Contextual',
            type: 'content',
            icon: '',
            content: `
                <h2><span class="chapter-number">1.</span> Marco Contextual</h2>

                <p class="ebook-intro">
                    El contexto en el que se desarrolla esta investigación es fundamental para
                    comprender los desafíos y oportunidades del proyecto.
                </p>

                <h3>Ubicación y características</h3>
                <p>
                    La <strong>Ciudadela Educativa de Pasto, sede Puerres</strong>, se encuentra ubicada
                    en una zona rural del municipio de Pasto, departamento de Nariño, Colombia.
                </p>

                <div class="ebook-stats">
                    <div class="stat-card">
                        <div class="stat-number">10-14</div>
                        <div class="stat-label">años de edad</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">4</div>
                        <div class="stat-label">estudiantes de inclusión</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">Rural</div>
                        <div class="stat-label">contexto educativo</div>
                    </div>
                </div>

                <h3>Condiciones socioeconómicas</h3>
                <ul class="ebook-list">
                    <li><strong>Vulnerabilidad socioeconómica:</strong> La mayoría de las familias se dedican a actividades agrícolas con ingresos limitados</li>
                    <li><strong>Acceso limitado a tecnología:</strong> Conectividad intermitente y escasos dispositivos digitales en los hogares</li>
                    <li><strong>Barreras geográficas:</strong> Dificultades de transporte que afectan la asistencia regular</li>
                    <li><strong>Recursos educativos limitados:</strong> Pocos materiales especializados para educación inclusiva</li>
                </ul>

                <div class="ebook-callout ebook-callout--info">
                    <h4>Importancia del contexto rural</h4>
                    <p>
                        Según Flórez (2013), la educación en contextos rurales enfrenta desafíos
                        particulares que se intensifican cuando se trata de estudiantes con discapacidad
                        cognitiva. La brecha digital y la escasez de recursos especializados hacen aún
                        más valiosa la implementación de estrategias innovadoras como el uso de Wordwall.
                    </p>
                </div>

                <h3>Características de la población estudiantil</h3>
                <p>Los estudiantes participantes en este proyecto presentan:</p>
                <ul class="ebook-list">
                    <li>Discapacidad cognitiva leve o moderada</li>
                    <li>Trastornos mixtos de las habilidades escolares</li>
                    <li>Dificultades significativas en memoria a corto plazo</li>
                    <li>Baja retención de instrucciones verbales</li>
                    <li>Necesidad de apoyo pedagógico personalizado</li>
                </ul>
            `,
            media: {
                type: 'gallery',
                title: 'Galería: Sede Puerres',
                description: 'Imágenes de la institución educativa y su contexto'
            }
        },

        // MARCO LEGAL
        {
            id: 'legal',
            number: '2',
            title: 'Marco Legal',
            type: 'content',
            icon: '',
            content: `
                <h2><span class="chapter-number">2.</span> Marco Legal</h2>

                <p class="ebook-intro">
                    La educación inclusiva en Colombia cuenta con un sólido marco normativo que
                    garantiza el derecho a la educación de calidad para todas las personas.
                </p>

                <h3>Ley 1618 de 2013</h3>
                <div class="ebook-law">
                    <div class="law-title">Ley Estatutaria 1618 de 2013</div>
                    <p>
                        <strong>"Por medio de la cual se establecen las disposiciones para garantizar
                        el pleno ejercicio de los derechos de las personas con discapacidad."</strong>
                    </p>
                    <p>Esta ley establece:</p>
                    <ul class="ebook-list">
                        <li>Garantía de acceso a la educación inclusiva en todos los niveles</li>
                        <li>Eliminación de barreras actitudinales, pedagógicas y físicas</li>
                        <li>Ajustes razonables en el proceso educativo</li>
                        <li>Formación docente en inclusión educativa</li>
                    </ul>
                </div>

                <h3>Decreto 1421 de 2017</h3>
                <div class="ebook-law">
                    <div class="law-title">Decreto 1421 de 2017</div>
                    <p>
                        <strong>"Por el cual se reglamenta en el marco de la educación inclusiva
                        la atención educativa a la población con discapacidad."</strong>
                    </p>
                    <p>Este decreto reglamenta:</p>
                    <ul class="ebook-list">
                        <li><strong>PIAR (Plan Individual de Ajustes Razonables):</strong> Herramienta
                        para planificar apoyos y ajustes pedagógicos personalizados</li>
                        <li><strong>DUA (Diseño Universal para el Aprendizaje):</strong> Principios
                        para crear ambientes de aprendizaje flexibles</li>
                        <li><strong>Evaluación diferenciada:</strong> Adaptación de criterios y
                        estrategias de evaluación</li>
                        <li><strong>Recursos de apoyo:</strong> Tecnologías y materiales especializados</li>
                    </ul>
                </div>

                <div class="ebook-callout ebook-callout--success">
                    <h4>Relevancia para este proyecto</h4>
                    <p>
                        Este proyecto se alinea directamente con el Decreto 1421 al proponer una
                        secuencia didáctica apoyada en tecnología (Wordwall) como recurso de apoyo
                        pedagógico. La implementación de actividades gamificadas constituye un
                        <strong>ajuste razonable</strong> que facilita el acceso al currículo y
                        fortalece capacidades cognitivas específicas.
                    </p>
                </div>

                <h3>Directrices UNESCO</h3>
                <p>
                    Adicionalmente, este proyecto se fundamenta en las
                    <strong>Directrices sobre políticas de inclusión en la educación</strong> (UNESCO, 2005),
                    que establecen que la educación inclusiva no es solo una cuestión de acceso,
                    sino de <em>calidad, participación y resultados de aprendizaje</em>.
                </p>
            `
        },

        // MARCO CONCEPTUAL
        {
            id: 'conceptual',
            number: '3',
            title: 'Marco Conceptual',
            type: 'content',
            icon: '',
            content: `
                <h2><span class="chapter-number">3.</span> Marco Conceptual</h2>

                <p class="ebook-intro">
                    Este proyecto se sustenta en cuatro categorías conceptuales fundamentales que
                    se entrelazan para dar forma a la propuesta pedagógica.
                </p>

                <div class="concept-grid">
                    <div class="concept-card">
                        <h3>Herramientas Digitales</h3>
                        <p>
                            Recursos tecnológicos diseñados para facilitar, enriquecer y transformar
                            los procesos de enseñanza-aprendizaje. Wordwall es una plataforma que
                            permite crear actividades interactivas gamificadas adaptadas a necesidades
                            educativas diversas.
                        </p>
                        <div class="concept-quote">
                            "Las herramientas digitales, cuando se usan con intencionalidad pedagógica,
                            pueden transformar radicalmente las experiencias de aprendizaje de
                            estudiantes con discapacidad cognitiva."
                        </div>
                    </div>

                    <div class="concept-card">
                        <h3>Educación Inclusiva</h3>
                        <p>
                            Enfoque educativo que valora la diversidad como un activo, no como un
                            problema. Busca garantizar el derecho a una educación de calidad para
                            todos, eliminando barreras y proporcionando apoyos necesarios.
                        </p>
                        <div class="concept-quote">
                            "La inclusión no es integrar a quien está fuera, sino transformar el
                            sistema para que todos tengan un lugar desde el principio."
                            <cite>— Ainscow & Booth, 2015</cite>
                        </div>
                    </div>

                    <div class="concept-card">
                        <h3>Estimulación Cognitiva</h3>
                        <p>
                            Conjunto de técnicas y actividades dirigidas a mejorar el funcionamiento
                            de capacidades cognitivas como la memoria, atención, percepción y
                            razonamiento. En este proyecto, se enfoca específicamente en la
                            <strong>memoria a corto plazo</strong>.
                        </p>
                        <div class="concept-details">
                            <h4>Memoria a corto plazo</h4>
                            <p>
                                Capacidad para retener y manipular información durante períodos breves
                                (segundos a minutos). Es esencial para seguir instrucciones, resolver
                                problemas y procesar información nueva.
                            </p>
                        </div>
                    </div>

                    <div class="concept-card">
                        <h3>Motivación</h3>
                        <p>
                            Factor psicológico que impulsa, dirige y sostiene el comportamiento hacia
                            el logro de objetivos. La gamificación aprovecha elementos lúdicos para
                            incrementar la motivación intrínseca.
                        </p>
                        <div class="concept-quote">
                            "Estudiantes con discapacidad cognitiva a menudo experimentan frustración
                            y desmotivación. Los juegos digitales ofrecen un entorno seguro donde el
                            error se percibe como parte natural del aprendizaje."
                        </div>
                    </div>
                </div>

                <div class="ebook-callout ebook-callout--primary">
                    <h4>Relación entre conceptos</h4>
                    <p>
                        Estos cuatro conceptos se integran en la propuesta pedagógica: las
                        <strong>herramientas digitales</strong> (Wordwall) se utilizan en un contexto de
                        <strong>educación inclusiva</strong> para realizar <strong>estimulación cognitiva</strong>
                        de la memoria a corto plazo, aprovechando la <strong>motivación</strong> que
                        generan las actividades gamificadas.
                    </p>
                </div>
            `
        },

        // MARCO TEÓRICO
        {
            id: 'teorico',
            number: '4',
            title: 'Marco Teórico',
            type: 'content',
            icon: '',
            content: `
                <h2><span class="chapter-number">4.</span> Marco Teórico</h2>

                <p class="ebook-intro">
                    Este proyecto se fundamenta en investigaciones previas que demuestran el
                    potencial de las tecnologías educativas para fortalecer procesos cognitivos
                    en estudiantes con necesidades educativas especiales.
                </p>

                <h3>Tecnología educativa para la inclusión</h3>
                <div class="ebook-reference">
                    <div class="ref-authors">Cabero & Valencia (2019)</div>
                    <p>
                        En su investigación <em>"Recursos digitales para la atención a la diversidad
                        en educación"</em>, estos autores demuestran que las herramientas digitales
                        interactivas permiten:
                    </p>
                    <ul class="ebook-list">
                        <li>Personalización de contenidos según ritmos de aprendizaje</li>
                        <li>Retroalimentación inmediata que refuerza el aprendizaje</li>
                        <li>Representación múltiple de la información (visual, auditiva, kinestésica)</li>
                        <li>Motivación sostenida a través de elementos lúdicos</li>
                    </ul>
                </div>

                <h3>Estimulación cognitiva mediante TIC</h3>
                <div class="ebook-reference">
                    <div class="ref-authors">González & Contreras (2017)</div>
                    <p>
                        Su estudio <em>"Las TIC como herramienta inclusiva para la estimulación
                        cognitiva"</em> evidencia que actividades digitales estructuradas mejoran
                        significativamente la memoria a corto plazo en estudiantes con discapacidad
                        cognitiva leve, especialmente cuando:
                    </p>
                    <ul class="ebook-list">
                        <li>Se utilizan estímulos visuales claros y atractivos</li>
                        <li>Se implementa repetición espaciada</li>
                        <li>Se proporciona refuerzo positivo inmediato</li>
                        <li>Se adapta el nivel de dificultad progresivamente</li>
                    </ul>
                </div>

                <h3>Aprendizaje basado en juegos</h3>
                <div class="ebook-reference">
                    <div class="ref-authors">Guanoluisa, Quichimbo & Muevecela (2022)</div>
                    <p>
                        En su trabajo sobre <em>"La gamificación cooperativa como estrategia de
                        enseñanza inclusiva"</em>, estos investigadores concluyen que:
                    </p>
                    <blockquote class="ebook-quote">
                        "La gamificación reduce la ansiedad asociada al error, fomenta la
                        participación activa y transforma el proceso de aprendizaje en una
                        experiencia placentera, lo cual es especialmente valioso para estudiantes
                        que han experimentado fracaso escolar recurrente."
                    </blockquote>
                </div>

                <h3>Educación inclusiva en contextos rurales</h3>
                <div class="ebook-reference">
                    <div class="ref-authors">Flórez (2013)</div>
                    <p>
                        Su investigación sobre <em>"Educación y discapacidad en contextos rurales"</em>
                        alerta sobre las barreras específicas de zonas rurales:
                    </p>
                    <ul class="ebook-list">
                        <li>Escasez de docentes especializados en educación especial</li>
                        <li>Limitado acceso a materiales didácticos adaptados</li>
                        <li>Falta de acompañamiento profesional continuo</li>
                    </ul>
                    <p>
                        Por ello, propone el uso de <strong>tecnologías educativas</strong> como
                        herramientas democratizadoras que pueden reducir estas brechas.
                    </p>
                </div>

                <div class="ebook-callout ebook-callout--success">
                    <h4>Síntesis teórica</h4>
                    <p>
                        Los estudios revisados convergen en que las tecnologías digitales,
                        especialmente aquellas con componentes gamificados, constituyen una
                        estrategia efectiva para estimular la memoria a corto plazo en estudiantes
                        con discapacidad cognitiva, siempre que se diseñen con intencionalidad
                        pedagógica, se adapten al contexto y se implementen de manera sistemática.
                    </p>
                </div>
            `,
            media: {
                type: 'podcast',
                title: 'Podcast: Fundamentos Teóricos del Proyecto',
                description: 'Explicación detallada de los autores y teorías que sustentan esta investigación sobre educación inclusiva y tecnología educativa'
            }
        },

        // METODOLOGÍA
        {
            id: 'metodologia',
            number: '5',
            title: 'Metodología',
            type: 'content',
            icon: '',
            content: `
                <h2><span class="chapter-number">5.</span> Metodología</h2>

                <h3>Investigación Acción Participativa (IAP)</h3>
                <p>
                    Este proyecto se enmarca en el modelo de <strong>Investigación Acción Participativa</strong>,
                    reconociendo mi rol como docente-investigadora que no solo observa, sino que se
                    involucra activamente en el diseño e implementación de una secuencia didáctica
                    transformadora.
                </p>

                <div class="ebook-callout ebook-callout--info">
                    <h4>¿Qué es la IAP?</h4>
                    <p>
                        Según Fals Borda (1993), la IAP es un enfoque de investigación que combina
                        la producción de conocimiento con la acción transformadora de la realidad,
                        involucrando a los participantes como co-investigadores.
                    </p>
                </div>

                <h3>Enfoque Mixto</h3>
                <p>Adopto un <strong>enfoque mixto</strong> que combina:</p>

                <div class="methodology-columns">
                    <div class="method-column">
                        <h4>Técnicas Cuantitativas</h4>
                        <ul class="ebook-list">
                            <li>Pruebas pre y post intervención</li>
                            <li>Análisis estadístico descriptivo</li>
                            <li>Medición de rendimiento en actividades</li>
                            <li>Registro de tiempos de retención</li>
                        </ul>
                    </div>

                    <div class="method-column">
                        <h4>Técnicas Cualitativas</h4>
                        <ul class="ebook-list">
                            <li>Observación participante</li>
                            <li>Diarios de campo</li>
                            <li>Entrevistas semiestructuradas</li>
                            <li>Análisis de percepciones y motivación</li>
                        </ul>
                    </div>
                </div>

                <h3>Población de Estudio</h3>
                <p>
                    Trabajo con <strong>cuatro estudiantes de inclusión del grado quinto</strong>,
                    seleccionados intencionalmente por presentar:
                </p>
                <ul class="ebook-list">
                    <li>Discapacidad cognitiva leve o moderada</li>
                    <li>Trastornos mixtos de las habilidades escolares</li>
                    <li>Dificultades significativas en memoria a corto plazo</li>
                </ul>

                <div class="ebook-callout ebook-callout--primary">
                    <p>
                        Esta muestra reducida permite una intervención <strong>profunda, personalizada
                        y respetuosa</strong> de los ritmos de aprendizaje de cada estudiante.
                    </p>
                </div>

                <h3>Fases del Proyecto</h3>
                <div class="phases-timeline">
                    <div class="phase">
                        <div class="phase-number">1</div>
                        <div class="phase-content">
                            <h4>Diagnóstico</h4>
                            <p>Evaluación inicial de memoria a corto plazo</p>
                        </div>
                    </div>
                    <div class="phase">
                        <div class="phase-number">2</div>
                        <div class="phase-content">
                            <h4>Diseño</h4>
                            <p>Creación de secuencia didáctica con Wordwall</p>
                        </div>
                    </div>
                    <div class="phase">
                        <div class="phase-number">3</div>
                        <div class="phase-content">
                            <h4>Implementación</h4>
                            <p>Aplicación de actividades gamificadas</p>
                        </div>
                    </div>
                    <div class="phase">
                        <div class="phase-number">4</div>
                        <div class="phase-content">
                            <h4>Evaluación</h4>
                            <p>Análisis de resultados y ajustes</p>
                        </div>
                    </div>
                </div>
            `
        },

        // JUSTIFICACIÓN
        {
            id: 'justificacion',
            number: '6',
            title: 'Justificación',
            type: 'content',
            icon: '',
            content: `
                <h2><span class="chapter-number">6.</span> Justificación</h2>

                <p class="ebook-highlight">
                    Esta investigación se justifica desde múltiples dimensiones que convergen en
                    un objetivo común: <strong>transformar vidas a través de la educación inclusiva
                    y la tecnología</strong>.
                </p>

                <div class="justification-grid">
                    <div class="justification-card">
                        <h3>Dimensión Pedagógica</h3>
                        <p>
                            Ofrece estrategias innovadoras adaptadas a las necesidades de estudiantes
                            con discapacidad cognitiva, contribuyendo al repertorio de prácticas
                            inclusivas efectivas.
                        </p>
                    </div>

                    <div class="justification-card">
                        <h3>Dimensión Social</h3>
                        <p>
                            Contribuye a reducir la brecha digital en zonas rurales y promueve la
                            equidad educativa, garantizando que estudiantes en contextos vulnerables
                            accedan a tecnologías educativas de calidad.
                        </p>
                    </div>

                    <div class="justification-card">
                        <h3>Dimensión Ética</h3>
                        <p>
                            Responde al compromiso con la educación inclusiva y el respeto por la
                            diversidad. La inclusión no es un acto de caridad, sino un ejercicio de
                            <strong>justicia educativa</strong>.
                        </p>
                    </div>

                    <div class="justification-card">
                        <h3>Dimensión Tecnológica</h3>
                        <p>
                            Demuestra el potencial transformador de las herramientas digitales cuando
                            se usan con intencionalidad pedagógica, mostrando que la tecnología no es
                            un fin, sino un medio para el aprendizaje.
                        </p>
                    </div>
                </div>

                <div class="ebook-callout ebook-callout--success">
                    <h4>Impacto esperado</h4>
                    <p>
                        Este proyecto aspira a generar conocimiento situado que pueda replicarse en
                        contextos similares, fortaleciendo así la educación inclusiva en zonas rurales
                        de Colombia y demostrando que con creatividad, compromiso y tecnología, es
                        posible construir aulas más equitativas donde todos los estudiantes tengan la
                        oportunidad de aprender, crecer y ser felices.
                    </p>
                </div>
            `
        },

        // REFERENCIAS
        {
            id: 'referencias',
            number: '',
            title: 'Referencias',
            type: 'content',
            icon: '',
            content: `
                <h2>Referencias Bibliográficas</h2>
                <p class="ebook-subtitle">Normas APA v7</p>

                <div class="references-list">
                    <div class="reference-item">
                        Ainscow, M., & Booth, T. (2015). <em>Guía para la educación inclusiva</em>.
                        Consorcio de Inclusión Educativa.
                    </div>

                    <div class="reference-item">
                        Cabero, J., & Valencia, L. (2019). Recursos digitales para la atención a la
                        diversidad en educación. <em>Revista de Educación a Distancia</em>, 61(1), 1-20.
                    </div>

                    <div class="reference-item">
                        Congreso de la República de Colombia. (2013). <em>Ley 1618 de 2013</em>.
                        Por medio de la cual se establecen las disposiciones para garantizar el pleno
                        ejercicio de los derechos de las personas con discapacidad.
                    </div>

                    <div class="reference-item">
                        Fals Borda, O. (1993). La investigación participativa y la intervención social.
                        <em>Documentación Social: Investigación acción participativa</em>, 92, 9-21.
                    </div>

                    <div class="reference-item">
                        Flórez, C. (2013). Educación y discapacidad en contextos rurales.
                        <em>Revista Colombiana de Educación Inclusiva</em>, 10(1), 34-50.
                    </div>

                    <div class="reference-item">
                        González, M., & Contreras, L. (2017). Las TIC como herramienta inclusiva para
                        la estimulación cognitiva. <em>Revista Latinoamericana de Educación Inclusiva</em>,
                        11(1), 55-70.
                    </div>

                    <div class="reference-item">
                        Guanoluisa, J., Quichimbo, J., & Muevecela, S. (2022). La gamificación cooperativa
                        como estrategia de enseñanza inclusiva en estudiantes de la Unidad Educativa
                        "Molleturo". <em>Revista Religación</em>.
                    </div>

                    <div class="reference-item">
                        Herrera, L., & Gutiérrez, M. (2017). Estimulación cognitiva en el aula inclusiva.
                        <em>Revista de Psicopedagogía</em>, 14(2), 45-57.
                    </div>

                    <div class="reference-item">
                        Ministerio de Educación Nacional. (2017). <em>Decreto 1421 de 2017</em>.
                        Por el cual se reglamenta en el marco de la educación inclusiva la atención
                        educativa a la población con discapacidad.
                    </div>

                    <div class="reference-item">
                        UNESCO. (2005). <em>Directrices sobre políticas de inclusión en la educación</em>.
                        Organización de las Naciones Unidas para la Educación, la Ciencia y la Cultura.
                    </div>
                </div>
            `
        }
    ]
};
