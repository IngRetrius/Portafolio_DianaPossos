# 📱 Referencia Rápida de Breakpoints - Demos

## Tabla de Breakpoints

| Nombre | Rango | Media Query | Hero Title Size | Container Padding | Progress Height |
|--------|-------|-------------|-----------------|-------------------|-----------------|
| **XXS** | 0-359px | `max-width: 360px` | base (1rem) | xs (4px) | 6px |
| **XS** | 360-479px | `max-width: 480px` | lg (1.125rem) | xs-sm | 6px |
| **SM** | 480-575px | `max-width: 576px` | xl (1.25rem) | sm (8px) | 8px |
| **MD** | 576-767px | `max-width: 768px` | 2xl (1.5rem) | md (16px) | 10px |
| **LG** | 768-991px | `max-width: 992px` | clamp(1.75-2.5rem) | md-lg | 10px |
| **XL** | 992-1199px | `max-width: 1199px` | clamp(2-3rem) | lg (24px) | 12px |
| **XXL** | 1200px+ | `min-width: 1200px` | clamp(2.5-3.5rem) | xl (32px) | 12px |

## Cambios Visuales por Breakpoint

### 🖥️ Desktop Large (1200px+)
```
✓ Contenedor: 1400px max-width
✓ Hero: Título hasta 3.5rem
✓ Glassmorfismo: Blur 12px completo
✓ Padding: Espaciado máximo (xl/2xl)
✓ Activity Cards: Layout espacioso
```

### 💻 Desktop (992px - 1199px)
```
✓ Contenedor: 1140px max-width
✓ Hero: Título 2-3rem fluido
✓ Padding: lg (24px)
✓ Navigation: Ligeramente compacta
```

### 📱 Tablet Landscape (992px)
```
✓ Hero: Padding reducido
✓ Título: 1.75-2.5rem
✓ Navegación: Compacta
✓ Font sizes: Reducidos
```

### 📱 Tablet Portrait (768px)
```
⚠ CAMBIO IMPORTANTE
✓ Background: Fixed → Scroll
✓ Activity Cards: Stack verticalmente
✓ Header: Puede cambiar a hamburger
✓ Progress bar: 10px altura
```

### 📱 Mobile Large (576px)
```
✓ Layout: Completamente vertical
✓ Glassmorfismo: Blur reducido
✓ Texto: Tamaños compactos
✓ Padding: Mínimo (sm)
```

### 📱 Mobile (480px)
```
⚠ ULTRA COMPACTO
✓ Hero: Padding mínimo
✓ Título: lg size
✓ Progress: 6px altura
✓ Border radius: Reducido
```

### 📱 Mobile Small (360px)
```
⚠ CRÍTICO - Dispositivos pequeños
✓ Título: base size (1rem)
✓ Todo el padding: xs
✓ Font: 0.7rem mínimo
✓ Layout: Ultra compacto
```

## Testing Checklist

### ✅ Dispositivos Desktop
- [ ] 1920x1080 (Full HD)
- [ ] 1440x900 (MacBook Pro 13")
- [ ] 1366x768 (Laptop común)
- [ ] 1280x720 (HD)

### ✅ Dispositivos Tablet
- [ ] iPad Pro 12.9" (1024x1366)
- [ ] iPad Air (820x1180)
- [ ] iPad Mini (768x1024)
- [ ] Surface Pro (912x1368)
- [ ] Tablet Android 10" (800x1280)

### ✅ Dispositivos Mobile
- [ ] iPhone 14 Pro (393x852)
- [ ] iPhone 14 (390x844)
- [ ] iPhone SE (375x667)
- [ ] Pixel 7 (412x915)
- [ ] Galaxy S21 (360x800)
- [ ] Moto G Power (412x823)

### ✅ Mobile Small (Critical)
- [ ] iPhone 5/SE (320x568) ⚠️
- [ ] Galaxy Fold cerrado (280x653) ⚠️
- [ ] Dispositivos antiguos (320-360px)

### ✅ Orientaciones
- [ ] Portrait (vertical)
- [ ] Landscape (horizontal)
- [ ] Landscape con altura < 600px

### ✅ Casos Especiales
- [ ] Pantallas Retina (2x, 3x)
- [ ] Dark mode preference
- [ ] Reduced motion preference
- [ ] Print preview
- [ ] Zoom 150%, 200%

## Comandos DevTools Chrome

### Abrir Device Toolbar
```
Windows/Linux: Ctrl + Shift + M
Mac: Cmd + Shift + M
```

### Dispositivos Preconfigurados
```javascript
// En la consola de DevTools
console.log('Width:', window.innerWidth);
console.log('Height:', window.innerHeight);
console.log('Device Pixel Ratio:', window.devicePixelRatio);
```

### Verificar Breakpoint Activo
```javascript
// Verificar si estamos en mobile
window.matchMedia('(max-width: 768px)').matches

// Verificar landscape
window.matchMedia('(orientation: landscape)').matches

// Verificar retina
window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches
```

### Custom Device Dimensions
```
1. DevTools → Toggle Device Toolbar
2. Select "Responsive"
3. Enter custom width x height
4. Test all breakpoints
```

## Problemas Comunes y Soluciones

### ❌ Problema: Texto se corta en mobile
**Solución**: Agregar `word-break: break-word` o `overflow-wrap: break-word`

### ❌ Problema: Glassmorfismo no funciona
**Solución**: Verificar soporte de `backdrop-filter` y agregar prefijo `-webkit-`

### ❌ Problema: Imagen no carga en mobile
**Solución**: Verificar ruta relativa y usar `background-size: cover`

### ❌ Problema: Layout se rompe entre 768-992px
**Solución**: Verificar que el breakpoint MD tenga todos los estilos necesarios

### ❌ Problema: Touch targets muy pequeños
**Solución**: Mínimo 44x44px para elementos clickeables en mobile

## Performance Tips

### 🚀 Optimización por Dispositivo

**Desktop (1200px+)**
- Blur completo OK
- Animaciones complejas OK
- Imágenes full resolution

**Tablet (768-991px)**
- Blur moderado (8-10px)
- Animaciones suaves
- Imágenes optimizadas

**Mobile (< 768px)**
- Blur mínimo (6-8px)
- Animaciones esenciales solo
- Imágenes comprimidas
- `background-attachment: scroll` (no fixed)

**Mobile Small (< 480px)**
- Considerar desactivar blur
- Animaciones mínimas
- Imágenes muy comprimidas

## Media Query Order

```css
/* ⚠️ IMPORTANTE: Orden correcto */

/* 1. Desktop first (optional enhancements) */
@media (min-width: 1200px) { }

/* 2. Desktop/Tablet adaptations */
@media (max-width: 1199px) { }
@media (max-width: 992px) { }

/* 3. Tablet critical */
@media (max-width: 768px) { }

/* 4. Mobile critical */
@media (max-width: 576px) { }
@media (max-width: 480px) { }
@media (max-width: 360px) { }

/* 5. Special cases */
@media (orientation: landscape) { }
@media (prefers-reduced-motion) { }
@media print { }
```

## Recursos Adicionales

- 📄 `RESPONSIVE-GUIDE.md` - Guía completa del sistema
- 📄 `demos-responsive.css` - Implementación del código
- 📄 `demos-base.css` - Estilos base
- 📄 `variables.css` - Variables globales

---

**Última actualización**: 2025-11-27
**Archivo**: `assets/css/demos/demos-responsive.css`
