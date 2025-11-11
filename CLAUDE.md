# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
always update claude.md after every commit.
## Project Overview

This is an academic portfolio website for Diana Rocío Possos Beltrán's Master's thesis in Digital Resources Applied to Education at Universidad de Cartagena. The site showcases research on strengthening short-term memory in students with cognitive disabilities using Wordwall and gamification strategies.

**Project Type:** Static single-page application (SPA)
**Language:** Spanish (es)
**Framework:** Vanilla JavaScript with modular architecture
**No build system:** Direct file serving - no compilation needed

## Architecture

### Modular JavaScript Structure

The codebase follows a **modular pattern** with separation of concerns:

```
assets/js/
├── main.js              # Entry point - orchestrates all modules
├── modules/             # Feature modules (loaded before main.js)
│   ├── navigation.js    # Header navigation + dropdown + mobile menu
│   ├── scroll.js        # Smooth scrolling + scroll animations
│   ├── modal.js         # Modal system for viewing content
│   ├── tabs.js          # Tab switching in "Diseñando" section
│   ├── carousel.js      # Carousel for project presentation
│   └── animations.js    # General animations + intersection observers
└── data/
    └── projectData.js   # Static data (if needed)
```

**Initialization flow:**
1. All modules define global functions (`initNavigation()`, `initModal()`, etc.)
2. `main.js` calls each module's init function in the `init()` function
3. Runs when DOM is ready via `DOMContentLoaded` or immediately if already loaded

### CSS Architecture

Component-based architecture with utility classes:

```
assets/css/
├── main.css             # Global styles (buttons, sections, typography)
├── utils/               # Foundation layer
│   ├── variables.css    # CSS custom properties (colors, spacing, fonts)
│   ├── reset.css        # CSS reset/normalization
│   └── animations.css   # Reusable animations (@keyframes)
└── components/          # UI components (one file per section)
    ├── header.css       # Navigation bar
    ├── hero.css         # Hero section
    ├── about.css        # About section
    ├── products.css     # Academic products section
    ├── project.css      # Thesis project section
    ├── carousel.css     # Carousel styles
    ├── credits.css      # Credits/references section
    ├── contact.css      # Contact section
    └── footer.css       # Footer
```

**Load order matters:** Variables → Reset → Animations → Main → Components (as shown in `index.html` lines 12-27)

### Content Sections

The single-page site has these main sections:

1. **Header** (`#header`) - Sticky navigation with dropdown for "Productos"
2. **Hero** (`#inicio`) - Introduction with avatar and thesis download link
3. **About** (`#sobre-mi`) - Academic background and experience
4. **Productos Académicos** (`#productos`) - Three subsections:
   - **Identificando** (`#identificando`) - Avatar and digital poster
   - **Referenciando** (`#referenciando`) - E-book of the research
   - **Diseñando** (`#disenando`) - Tabbed content with 6 tabs: Unidad Didáctica, Infografía, Propuesta Metodológica, Diseño Instruccional, Producto Final, Video Tutorial
5. **Proyecto** (`#proyecto`) - Carousel presenting the thesis project
6. **Créditos** (`#creditos`) - References (APA v7), acknowledgments, licensing (CC BY-NC-SA 4.0), sitemap
7. **Contacto** (`#contacto`) - Email and LinkedIn
8. **Footer** - University branding and copyright

## Key Features

### Modal System

The modal system (`assets/js/modules/modal.js`) dynamically creates modals to display:
- Avatar video (`.mp4`)
- Posters (images)
- E-book (PDF viewer)
- Videos (embedded `.mp4` or external links)
- Documents (embedded PDFs)

**Usage pattern:**
```javascript
// Called from onclick attributes in HTML
openModal('avatar')    // Opens assets/images/avatar.mp4
openModal('poster')    // Opens assets/images/proyecto-wordwall.jpg
openModal('ebook')     // Opens documents/ebook.pdf (if exists)
openModal('video')     // Opens assets/images/Video.mp4
```

The modal injects content into a dynamically created DOM structure with backdrop blur and close handlers.

### Navigation Dropdown

The "Productos" menu item has a dropdown submenu linking to the three subsections of academic products. Mobile navigation uses a hamburger menu that overlays the screen.

**Implementation:** See `assets/js/modules/navigation.js` and `assets/css/components/header.css`

### Tab System

The "Diseñando" section uses client-side tabs without page reload:
- 6 tabs: Unidad Didáctica, Infografía, Propuesta Metodológica, Diseño Instruccional, Producto Final, Video Tutorial
- Clicking a tab shows/hides panels using `.active` class
- Implementation: `assets/js/modules/tabs.js`

## File Locations

### Documents
- `documents/tesis-completa.pdf` - Full thesis PDF (1.4 MB)
- `documents/ebook.pdf` - E-book version (if separate from thesis)

### Images & Media
- `assets/images/avatar.jpg` - Profile photo (102 KB)
- `assets/images/avatar.mp4` - Avatar presentation video (976 KB)
- `assets/images/Video.mp4` - Tutorial video (19.3 MB)
- `assets/images/Potcast.mp4` - Podcast/audio content (92.9 MB)
- `assets/images/proyecto-wordwall.jpg` - Poster image (122 KB)
- `assets/images/logo-unicartagena.png` - University logo (1.4 MB)
- `assets/images/icons/` - SVG icons (email, LinkedIn, etc.)

## Development Commands

### Serving the Site

This is a **static site** with no build process. Serve directly:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed)
npx http-server -p 8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000`

### No Build/Compile Required

- **No package.json** - No npm dependencies
- **No bundler** - Scripts load via `<script>` tags
- **No preprocessors** - Pure CSS (no Sass/Less)
- **No transpilation** - Modern vanilla JavaScript

### Git Workflow

Current branch: `main`
Clean working tree (as of conversation start)

Recent commits focus on updating assets (avatar, poster, video) and links.

## Content & Academic Context

### Research Focus
- **Topic:** Short-term memory strengthening in students with cognitive disabilities
- **Method:** Gamification using Wordwall platform
- **Population:** 5th-grade inclusive education students at Ciudadela Educativa de Pasto, sede Puerres
- **Approach:** Participatory Action Research with mixed methods and game-based learning

### Key Technologies Referenced
- **Wordwall:** Primary digital resource for creating interactive educational games
- **Inclusive education tools:** Digital resources for cognitive stimulation

### Academic Standards
- **References:** APA v7 format (17 references listed in credits section)
- **Licensing:** Creative Commons BY-NC-SA 4.0
- **Language:** Spanish (Colombia)

## Styling Conventions

### CSS Custom Properties (variables.css)
All colors, spacing, and typography use CSS variables:
- `--color-primary`, `--color-secondary` - Brand colors
- `--spacing-sm`, `--spacing-md`, `--spacing-lg`, etc. - Spacing scale
- `--font-size-base`, `--font-size-xl`, etc. - Typography scale
- `--transition-base`, `--shadow-lg`, etc. - Effects

**When making style changes:** Use existing variables rather than hardcoded values.

### Responsive Design
Mobile-first approach with breakpoints defined in `variables.css`. The header navigation transforms to a hamburger menu on mobile.

## Common Tasks

### Adding New Content to Modals
1. Add the content file to `assets/images/` or `documents/`
2. Update the modal data in `assets/js/modules/modal.js` (see `getModalContent()` function)
3. Add a button with `onclick="openModal('identifier')"`

### Modifying Section Content
- Edit `index.html` directly (lines are numbered for reference)
- Section structure is semantic HTML5 with clear id attributes
- Keep Spanish language and academic tone

### Updating Styles
1. Check if a CSS variable exists in `assets/css/utils/variables.css`
2. Edit the specific component file in `assets/css/components/`
3. Maintain consistent spacing using the spacing scale variables

### Adding New Interactive Features
1. Create a new module in `assets/js/modules/`
2. Define an init function (e.g., `initFeatureName()`)
3. Add script tag to `index.html` (before `main.js`)
4. Call the init function from `main.js` init()

## Browser Compatibility

Target: Modern browsers (ES6+ JavaScript, CSS Grid, CSS Custom Properties)
No IE11 support needed for academic portfolio context.

## Contact & Metadata

- **Author:** Diana Rocío Possos Beltrán
- **Email:** Dianiya2007@gmail.com
- **LinkedIn:** linkedin.com/in/diana-rocio-possos-beltran-0b472b1b1/
- **Institution:** Universidad de Cartagena, Maestría en Recursos Digitales Aplicados a la Educación
- **Thesis Advisor:** Fredy Andres Aponte Novoa
- **Project Director:** Erika Ardila Mantilla
