INSTRUCCIONES PARA LA GALERÍA DE IMÁGENES
===========================================

Esta carpeta debe contener las imágenes de resultados y análisis del proyecto.

FORMATO DE NOMBRES:
- Las imágenes deben nombrarse numéricamente: 1.jpg, 2.jpg, 3.jpg, etc.
- Se recomienda usar formato JPG, pero también funcionan PNG (cambiar la extensión en modal.js si es necesario)

CANTIDAD DE IMÁGENES:
- El sistema está configurado para soportar hasta 20 imágenes
- Puede agregar menos imágenes sin problema
- Si necesita más de 20 imágenes, modifique el valor "maxImages" en assets/js/modules/modal.js (línea 333)

TAMAÑO RECOMENDADO:
- Ancho: entre 1200-1920 píxeles
- Alto: entre 800-1080 píxeles
- Peso: menos de 500KB por imagen (para mejor rendimiento)

NAVEGACIÓN:
- La galería se muestra con botones "Anterior" y "Siguiente"
- La navegación es cíclica (después de la última imagen vuelve a la primera)

EJEMPLO:
C:\Users\USUARIO1\Documents\Diana Rocio\Portafolio\assets\images\galeria\
  ├── 1.jpg
  ├── 2.jpg
  ├── 3.jpg
  └── ...

NOTA: Si no hay imágenes, el modal mostrará un mensaje indicando que la carpeta está vacía.
