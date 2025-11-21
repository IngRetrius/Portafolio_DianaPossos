/* ===================================
   INFOGRAPHIC HOTSPOTS DATA
   Content and positions for interactive hotspots
   =================================== */

const infographicHotspotsData = {
    title: "Diseño Instruccional - Ciudadela Educativa de Pasto",
    imagePath: "documents/Infografia diseño instruccional.png",

    // Hotspots positioned as percentages of image dimensions
    // Format: { x: '%', y: '%', number: 1, title: '...', content: {...} }
    hotspots: [
        {
            id: 1,
            x: '15%',
            y: '12%',
            number: 1,
            title: 'Contexto y Fundamentación',
            content: {
                sections: [
                    {
                        heading: 'Contexto',
                        text: `
                            <p><strong>Ubicación:</strong> Vereda Puerres, zona rural de Pasto, Nariño</p>
                            <p><strong>Población:</strong> 64 estudiantes de grado quinto</p>
                            <p><strong>Edades:</strong> 10-16 años</p>
                            <p><strong>Características:</strong> Discapacidad cognitiva leve/moderada y trastornos mixtos de habilidades escolares</p>
                        `
                    },
                    {
                        heading: 'Fundamentación Pedagógica',
                        text: `
                            <p><strong>Enfoque Teórico:</strong></p>
                            <ul>
                                <li>Constructivismo Social (Vygotsky)</li>
                                <li>Aprendizaje Significativo (Ausubel)</li>
                                <li>Aprendizaje Basado en Juegos</li>
                            </ul>
                            <p><strong>Objetivo General:</strong> Diseñar, implementar y evaluar una secuencia didáctica basada en gamificación para fortalecer la memoria a corto plazo.</p>
                        `
                    }
                ]
            }
        },
        {
            id: 2,
            x: '50%',
            y: '12%',
            number: 2,
            title: 'Análisis de Necesidades',
            content: {
                sections: [
                    {
                        heading: 'Problemática Central',
                        text: `
                            <ul>
                                <li>Dificultades de retención a corto plazo</li>
                                <li>Baja retención de información</li>
                                <li>Problemas para seguir instrucciones</li>
                                <li>Escasa asociación de conceptos</li>
                                <li>Bajo rendimiento académico</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'Estrategia: Aprendizaje Basado en Juegos (ABJ)',
                        text: `
                            <p><strong>Características:</strong></p>
                            <ul>
                                <li>Formatos visuales e interactivos</li>
                                <li>Repetición lúdica y no monótona</li>
                                <li>Adaptación a ritmos individuales</li>
                                <li>Retroalimentación inmediata</li>
                                <li>Elementos multimedia (sonido, imagen, animación)</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 3,
            x: '85%',
            y: '12%',
            number: 3,
            title: 'Objetivos del Diseño',
            content: {
                sections: [
                    {
                        heading: 'Objetivos Principales',
                        text: `
                            <ul>
                                <li><strong>Diseño:</strong> Crear secuencia didáctica gamificada</li>
                                <li><strong>Implementación:</strong> Seleccionar formatos apropiados</li>
                                <li><strong>Evaluación:</strong> Establecer gradación de dificultad</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'Objetivos Específicos',
                        text: `
                            <ul>
                                <li>Identificar nivel inicial de memoria a corto plazo</li>
                                <li>Caracterizar habilidades específicas</li>
                                <li>Establecer línea base medible</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 4,
            x: '30%',
            y: '33%',
            number: 4,
            title: 'Estructura de Actividades en Wordwall',
            content: {
                sections: [
                    {
                        heading: 'Niveles de Dificultad',
                        text: `
                            <p><strong>Nivel 1 - Inicial/Baja dificultad:</strong></p>
                            <ul>
                                <li>4-6 elementos</li>
                                <li>Instrucciones simples</li>
                                <li>1-2 elementos por comando</li>
                                <li>Categorías simples</li>
                            </ul>

                            <p><strong>Nivel 2 - Intermedio:</strong></p>
                            <ul>
                                <li>7-10 elementos</li>
                                <li>Categorías múltiples</li>
                            </ul>

                            <p><strong>Nivel 3 - Avanzado:</strong></p>
                            <ul>
                                <li>12+ elementos</li>
                                <li>Relaciones complejas</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 5,
            x: '70%',
            y: '40%',
            number: 5,
            title: 'Modelo de Sesión',
            content: {
                sections: [
                    {
                        heading: 'Estructura por Sesión (45 minutos)',
                        text: `
                            <ul>
                                <li><strong>ACTIVACIÓN:</strong> 5 min</li>
                                <li><strong>DESARROLLO:</strong> 30 min</li>
                                <li><strong>CONSOLIDACIÓN:</strong> 5 min</li>
                                <li><strong>CIERRE:</strong> 5 min</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 6,
            x: '20%',
            y: '52%',
            number: 6,
            title: 'Sistema de Evaluación',
            content: {
                sections: [
                    {
                        heading: '10 Dimensiones Evaluadas',
                        text: `
                            <ol>
                                <li><strong>Pertinencia pedagógica</strong> - Alineación con objetivos</li>
                                <li><strong>Claridad</strong> - Instrucciones comprensibles</li>
                                <li><strong>Coherencia</strong> - Relación lógica entre actividades</li>
                                <li><strong>Calidad técnica</strong> - Sin errores técnicos</li>
                                <li><strong>Adecuación pedagógica</strong> - Inclusivo y adaptable</li>
                                <li><strong>Funcionalidad</strong> - Fácil de usar</li>
                                <li><strong>Contenido</strong> - Organizado y conectado</li>
                                <li><strong>Accesibilidad</strong> - Disponible y sin emociones negativas</li>
                                <li><strong>Motivación</strong> - Capta atención</li>
                                <li><strong>Innovación</strong> - Usa novedades de TIC</li>
                            </ol>
                            <p><strong>Instrumento:</strong> Rúbrica Likert (1-5) en Google Forms</p>
                        `
                    }
                ]
            }
        },
        {
            id: 7,
            x: '50%',
            y: '60%',
            number: 7,
            title: 'Categorías de Análisis',
            content: {
                sections: [
                    {
                        heading: 'Áreas de Evaluación NEE',
                        text: `
                            <ol>
                                <li><strong>Estimulación Cognitiva</strong> - Retención, procesamiento</li>
                                <li><strong>Mejora en memoria corto plazo</strong></li>
                                <li><strong>Capacidad secuencial</strong> - Orden de información</li>
                                <li><strong>Concentración</strong></li>
                                <li><strong>Motivación</strong></li>
                                <li><strong>Autonomía</strong></li>
                                <li><strong>Disposición hacia actividades</strong></li>
                                <li><strong>Percepción en tareas</strong></li>
                                <li><strong>Expresiones de satisfacción</strong></li>
                            </ol>
                        `
                    }
                ]
            }
        },
        {
            id: 8,
            x: '85%',
            y: '60%',
            number: 8,
            title: 'Triangulación de Datos',
            content: {
                sections: [
                    {
                        heading: 'Cruces de Información',
                        text: `
                            <table style="width:100%; border-collapse: collapse; margin: 1rem 0;">
                                <thead>
                                    <tr style="background: #8b5cf6; color: white;">
                                        <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Aspecto</th>
                                        <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Datos Cuantitativos</th>
                                        <th style="padding: 0.75rem; text-align: left; border: 1px solid #ddd;">Datos Cualitativos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;"><strong>Mejora memoria</strong></td>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;">PrePost test</td>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;">Observación conductista</td>
                                    </tr>
                                    <tr style="background: #f8f9fa;">
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;"><strong>Motivación</strong></td>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;">Escala likert</td>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;">Diario campo</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;"><strong>Inclusión</strong></td>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;">Participación medible</td>
                                        <td style="padding: 0.75rem; border: 1px solid #ddd;">Entrevistas docentes</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    }
                ]
            }
        },
        {
            id: 9,
            x: '15%',
            y: '78%',
            number: 9,
            title: 'Cronograma de Implementación',
            content: {
                sections: [
                    {
                        heading: 'Fases del Proyecto',
                        text: `
                            <p><strong>Total: 16 semanas (4 meses aproximadamente)</strong></p>

                            <ul>
                                <li><strong>1. Diagnóstico:</strong> 2 semanas</li>
                                <li><strong>2. Capacitación:</strong> 1 semana</li>
                                <li><strong>3. Implementación Fase 1:</strong> 3 semanas</li>
                                <li><strong>4. Evaluación Intermedia:</strong> 1 semana</li>
                                <li><strong>5. Implementación Fase 2:</strong> 4 semanas</li>
                                <li><strong>6. Análisis:</strong> 2 semanas</li>
                                <li><strong>7. Ajustes:</strong> 1 semana</li>
                                <li><strong>8. Documentación:</strong> 2 semanas</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'Actividades Clave',
                        text: `
                            <ul>
                                <li>Crear una cuenta inicial, Ver perfil</li>
                                <li>Crear actividades, Valorar con expertos</li>
                                <li>10 Sesiones con Wordwall</li>
                                <li>Tests evaluativos</li>
                                <li>Triangulación, Conclusiones</li>
                                <li>Reporte de resultados</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 10,
            x: '40%',
            y: '84%',
            number: 10,
            title: 'Criterios de Calidad',
            content: {
                sections: [
                    {
                        heading: 'Validez',
                        text: `
                            <ul>
                                <li>Instrumentos revisados por expertos</li>
                                <li>Triangulación metodológica</li>
                                <li>Coherencia objetivos-evaluación</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'Confiabilidad',
                        text: `
                            <ul>
                                <li>Múltiples fuentes información</li>
                                <li>Registro sistemático</li>
                                <li>Procedimientos estandarizados</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'Pertinencia',
                        text: `
                            <ul>
                                <li>Ajustada a contexto rural</li>
                                <li>Adaptado a estudiantes NEE</li>
                                <li>Responde a problemática real</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'Viabilidad',
                        text: `
                            <ul>
                                <li>Recursos disponibles</li>
                                <li>Tiempo suficiente</li>
                                <li>Apoyo institucional</li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 11,
            x: '68%',
            y: '88%',
            number: 11,
            title: 'Consideraciones Éticas',
            content: {
                sections: [
                    {
                        heading: 'Principios Éticos',
                        text: `
                            <ul>
                                <li><strong>Autorización familias y directivos</strong></li>
                                <li><strong>Confidencialidad identidad estudiantes</strong></li>
                                <li><strong>Inclusión equitativa</strong></li>
                                <li><strong>Devolución resultados a comunidad</strong></li>
                                <li><strong>Compromiso no generar daño</strong></li>
                            </ul>
                        `
                    }
                ]
            }
        },
        {
            id: 12,
            x: '25%',
            y: '95%',
            number: 12,
            title: 'Resultados Esperados',
            content: {
                sections: [
                    {
                        heading: 'En Estudiantes',
                        text: `
                            <ul>
                                <li>Mejora en memoria a corto plazo</li>
                                <li>Mayor retención de información</li>
                                <li>Mejor seguimiento de instrucciones</li>
                                <li>Incremento de autoestima</li>
                                <li>Mayor participación en clase</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'En Docentes',
                        text: `
                            <ul>
                                <li>Nuevas estrategias pedagógicas</li>
                                <li>Apropiación de herramientas digitales</li>
                                <li>Mayor comprensión de NEE</li>
                                <li>Capacidad de adaptación curricular</li>
                            </ul>
                        `
                    },
                    {
                        heading: 'En Institución',
                        text: `
                            <ul>
                                <li>Fortalecimiento de educación inclusiva</li>
                                <li>Reducción brecha digital</li>
                                <li>Modelo replicable en otros grados</li>
                                <li>Compromiso con equidad educativa</li>
                            </ul>
                        `
                    }
                ]
            }
        }
    ]
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = infographicHotspotsData;
}
