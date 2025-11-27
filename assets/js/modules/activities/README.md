# Activities Module

Módulo de actividades interactivas para el Proyecto Wordwall - Fortalecimiento de Memoria a Corto Plazo.

## Arquitectura

Cada actividad está en su propio archivo siguiendo el principio de **Single Responsibility**.

### Jerarquía de Clases

```
ActivityBase (clase base abstracta)
├── MemoryGame (Módulo 0, 1, 4)
├── Flashcards (Módulo 0)
├── RevealBoxes (Módulo 1)
├── Maze (Módulo 3)
├── MixedGame (Módulo 5)
├── Certificate (Módulo 5)
├── AudioActivity (clase base abstracta)
│   ├── FillInBlank (Módulo 2)
│   └── SoundMatch (Módulo 2)
└── DragDropActivity (clase base abstracta)
    ├── DragOrder (Módulo 3)
    └── Categorize (Módulo 4)
```

## Archivos

### Clases Base

- **ActivityBase.js** - Clase base para todas las actividades
  - Proporciona: render(), getHTML(), attachEventListeners(), complete(), showFeedback(), reset(), destroy()

- **AudioActivity.js** - Clase base para actividades con audio
  - Extiende: ActivityBase
  - Proporciona: createAudioPlayer(), playAudio(), pauseAudio(), stopAudio(), renderAudioControls()

- **DragDropActivity.js** - Clase base para actividades con drag & drop
  - Extiende: ActivityBase
  - Proporciona: initDesktopDrag(), initTouchDrag(), handleDrop(), initDragDrop()

### Clases Concretas

**Módulo 0 - Diagnóstico:**
- **MemoryGame.js** - Juego de emparejamiento de tarjetas
  - Extiende: ActivityBase

- **Flashcards.js** - Tarjetas interactivas con navegación
  - Extiende: ActivityBase

**Módulo 1 - Memoria Visual:**
- **RevealBoxes.js** - Revelación de elementos ocultos
  - Extiende: ActivityBase

**Módulo 2 - Memoria Auditiva:**
- **FillInBlank.js** - Completar oraciones con audio
  - Extiende: AudioActivity

- **SoundMatch.js** - Emparejar sonidos con imágenes
  - Extiende: AudioActivity

**Módulo 3 - Memoria Secuencial:**
- **DragOrder.js** - Ordenar elementos en secuencia
  - Extiende: DragDropActivity

- **Maze.js** - Laberinto navegable con instrucciones
  - Extiende: ActivityBase

**Módulo 4 - Memoria Asociativa:**
- **Categorize.js** - Clasificar elementos por categorías
  - Extiende: DragDropActivity

**Módulo 5 - Consolidación:**
- **MixedGame.js** - Desafío mixto combinando todos los tipos
  - Extiende: ActivityBase

- **Certificate.js** - Generador de certificados con Canvas
  - Extiende: ActivityBase

## Uso

Para agregar una nueva actividad:

1. Crear archivo en `activities/NuevaActividad.js`
2. Extender de ActivityBase o una clase base apropiada
3. Implementar los métodos requeridos: `getHTML()`, `attachEventListeners()`
4. Registrar en `activity-loader.js`:
   ```javascript
   import { NuevaActividad } from './activities/NuevaActividad.js';

   const ACTIVITY_CONSTRUCTORS = {
       // ...
       nueva: NuevaActividad
   };
   ```
5. Crear el CSS correspondiente en `assets/css/demos/activities/nueva-actividad.css`
6. Incluir el CSS en `demos.html`

## Buenas Prácticas

- ✅ Una clase por archivo
- ✅ Nombres de archivo en PascalCase (MemoryGame.js)
- ✅ Imports explícitos al inicio del archivo
- ✅ JSDoc para documentación
- ✅ Separación de lógica y estilos (CSS externo)
- ✅ Uso de eventos personalizados (`demo:activityComplete`)
- ✅ Cleanup apropiado en `destroy()`
