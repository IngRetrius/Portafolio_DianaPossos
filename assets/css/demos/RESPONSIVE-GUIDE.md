# Guía del Sistema Responsive - Demos

Este documento explica el sistema responsive modular implementado para `demos.html`.

## 📁 Estructura de Archivos

```
assets/css/demos/
├── demos-base.css          # Estilos base (hero, progress, footer)
├── demos-tabs.css          # Sistema de pestañas/tabs
├── demos-responsive.css    # ✨ NUEVO: Sistema responsive modular
└── activities/             # Estilos de actividades individuales
```

## 📱 Breakpoints Definidos

El sistema responsive utiliza 6 breakpoints principales:

| Breakpoint | Tamaño | Dispositivo | Características |
|------------|--------|-------------|-----------------|
| **XL** | 1200px+ | Desktop Large | Contenido amplio, máximo espaciado |
| **LG** | 992px - 1199px | Desktop / Tablet Landscape | Contenido optimizado |
| **MD** | 768px - 991px | Tablet Portrait | Navegación compacta |
| **SM** | 576px - 767px | Mobile Large | Layout simplificado |
| **XS** | 480px - 575px | Mobile | Interfaz compacta |
| **XXS** | 360px - 479px | Mobile Small | Interfaz ultra compacta |

## 🎯 Características Especiales

### 1. **Orientación Landscape (Móvil)**
```css
@media (max-height: 600px) and (orientation: landscape)
```
- Reduce padding vertical
- Optimiza espacios para pantallas horizontales pequeñas

### 2. **Pantallas Retina**
```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)
```
- Optimiza calidad de imagen de fondo
- Mejora bordes en efectos glassmorfismo

### 3. **Modo Impresión**
```css
@media print
```
- Elimina fondos y efectos
- Convierte a blanco/negro
- Oculta navegación y footer

### 4. **Reducción de Movimiento (Accesibilidad)**
```css
@media (prefers-reduced-motion: reduce)
```
- Desactiva animaciones
- Transiciones instantáneas
- Mejora accesibilidad

### 5. **Dark Mode**
```css
@media (prefers-color-scheme: dark)
```
- Ajusta overlay del hero
- Tonos más oscuros optimizados

## 🔧 Componentes Responsive

### Hero Section
- **Desktop (1200px+)**: Título hasta 3.5rem, contenedor 900px
- **Tablet (768px)**: Título 2xl, padding reducido
- **Mobile (480px)**: Título lg, layout compacto
- **Mobile Small (360px)**: Título base, espaciado mínimo

### Progress Bar
- **Desktop**: Altura 12px, padding xl
- **Tablet**: Altura 10px, padding md
- **Mobile**: Altura 8px, padding sm
- **Mobile Small**: Altura 6px, texto 0.7rem

### Activity Cards
- **Desktop**: Padding xl, espacio generoso
- **Tablet**: Padding md, header en columna
- **Mobile**: Padding sm, layout compacto
- **Mobile Small**: Padding xs, border-radius reducido

### Container
- **Desktop XL**: Max-width 1400px
- **Desktop**: Max-width 1140px
- **Tablet/Mobile**: Padding variable (xl → md → sm → xs)

## 📐 Sistema de Espaciado

El sistema utiliza variables CSS del archivo `variables.css`:

```css
--spacing-xs: 0.25rem   (4px)
--spacing-sm: 0.5rem    (8px)
--spacing-md: 1rem      (16px)
--spacing-lg: 1.5rem    (24px)
--spacing-xl: 2rem      (32px)
--spacing-2xl: 3rem     (48px)
```

## 🎨 Tipografía Responsive

Utiliza `clamp()` para tipografía fluida:

```css
font-size: clamp(min, preferred, max);
```

**Ejemplos:**
- Título Desktop: `clamp(2.5rem, 4vw, 3.5rem)`
- Título Tablet: `clamp(1.75rem, 3vw, 2.5rem)`

## 🧪 Testing de Dispositivos

### Dispositivos Recomendados para Pruebas:

#### Desktop
- 1920x1080 (Full HD)
- 1440x900 (MacBook Pro)
- 1366x768 (Laptop común)

#### Tablet
- iPad Pro (1024x1366)
- iPad (768x1024)
- Surface Pro (912x1368)

#### Mobile
- iPhone 14 Pro (393x852)
- iPhone SE (375x667)
- Samsung Galaxy S21 (360x800)
- Pixel 5 (393x851)

#### Mobile Small
- iPhone 5/SE (320x568)
- Galaxy Fold (280x653 cerrado)

## 🔍 Debugging Tips

### Chrome DevTools
1. Abre DevTools (F12)
2. Click en "Toggle Device Toolbar" (Ctrl+Shift+M)
3. Selecciona dispositivo o personaliza dimensiones
4. Prueba orientación landscape/portrait

### Testing Responsive
```javascript
// Console de navegador
console.log('Width:', window.innerWidth);
console.log('Height:', window.innerHeight);
console.log('Pixel Ratio:', window.devicePixelRatio);
```

### Verificar Media Queries Activas
```javascript
// Verificar si un breakpoint está activo
window.matchMedia('(max-width: 768px)').matches; // true/false
```

## 📝 Buenas Prácticas

### ✅ DO (Hacer)
- Usar variables CSS para valores consistentes
- Probar en dispositivos reales cuando sea posible
- Considerar touch targets (mínimo 44x44px)
- Usar `clamp()` para tipografía fluida
- Optimizar imágenes para diferentes resoluciones

### ❌ DON'T (No hacer)
- Hardcodear valores de píxeles
- Usar solo desktop para testing
- Ignorar orientación landscape
- Olvidar accesibilidad (reduced motion)
- Usar unidades absolutas en responsive

## 🚀 Optimizaciones de Rendimiento

### Imágenes de Fondo
- Usa `background-attachment: scroll` en móvil
- Considera `will-change` para animaciones
- Optimiza con WebP cuando sea posible

### Glassmorfismo
- Reduce `backdrop-filter` blur en móviles lentos
- Usa `transform: translateZ(0)` para aceleración GPU
- Considera desactivar en dispositivos antiguos

### Animaciones
- Respeta `prefers-reduced-motion`
- Usa `transform` y `opacity` para mejor rendimiento
- Evita animar `width`, `height`, `top`, `left`

## 🔗 Archivos Relacionados

- `demos-base.css` - Estilos base
- `demos-tabs.css` - Sistema de pestañas
- `variables.css` - Variables globales
- `animations.css` - Animaciones globales

## 📊 Orden de Carga CSS

```html
<!-- Utils primero -->
<link rel="stylesheet" href="assets/css/utils/variables.css">
<link rel="stylesheet" href="assets/css/utils/reset.css">
<link rel="stylesheet" href="assets/css/utils/animations.css">

<!-- Base styles -->
<link rel="stylesheet" href="assets/css/main.css">
<link rel="stylesheet" href="assets/css/components/header.css">

<!-- Demos specific -->
<link rel="stylesheet" href="assets/css/demos/demos-base.css">
<link rel="stylesheet" href="assets/css/demos/demos-tabs.css">
<link rel="stylesheet" href="assets/css/demos/demos-responsive.css"> <!-- ÚLTIMO -->
```

**IMPORTANTE**: `demos-responsive.css` debe cargarse **después** de `demos-base.css` para que los media queries sobrescriban correctamente los estilos base.

## 🆘 Troubleshooting

### Problema: Estilos responsive no se aplican
**Solución**: Verifica el orden de carga de CSS. `demos-responsive.css` debe ir después de `demos-base.css`.

### Problema: Glassmorfismo no funciona en Safari
**Solución**: Incluye prefijo `-webkit-backdrop-filter`:
```css
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

### Problema: Imagen de fondo no se ve en móvil
**Solución**: Verifica la ruta y usa `background-size: cover` con `background-position: center`.

### Problema: Texto muy pequeño en móviles
**Solución**: Usa `font-size: clamp()` o aumenta el tamaño mínimo en breakpoints pequeños.

---

**Última actualización**: 2025-11-27
**Autor**: Claude Code
**Versión**: 1.0.0
