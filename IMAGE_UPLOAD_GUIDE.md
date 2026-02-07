# Guía de Carga de Imágenes

## Proceso para agregar nuevas imágenes

### Paso 1: Subir la imagen original
Copia el archivo de imagen a la carpeta `src/assets/uploads/`

Formatos soportados:
- `*.jpg` / `*.jpeg` - Fotos y imágenes con muchos colores
- `*.png` - Iconos, logos, banderas (fondo transparente)
- `*.webp` - Formato moderno (opcional)
- `*.gif` - Se copian sin comprimir

Ejemplo:
```
src/assets/uploads/mi_imagen.png
```

### Paso 2: Ejecutar la optimización
En la terminal, corre el script de optimización:

```bash
npm run images:optimize
```

Esto:
- ✅ Comprime las imágenes automáticamente
- ✅ Las coloca en `src/assets/optimized/`
- ✅ Mantiene la original si es más pequeña que la comprimida
- ✅ Muestra el porcentaje de ahorro

Ejemplo de salida:
```
Optimized: mi_imagen.png (saved 5.2%)
All done — optimized images are in: C:\...\src\assets\optimized
```

### Paso 3: Usar la imagen en componentes

#### Para iconos de habilidades en `SkillsSection.jsx`:
Las imágenes en `src/assets/optimized/` se cargan automáticamente.
Solo agrega la entrada en `src/data/content.js`:

```javascript
skills: [
  {
    name: 'Mi Herramienta',
    icon: 'mi_imagen.png', // La imagen se busca automáticamente
    level: 'Avanzado'
  }
]
```

#### Para banderas en `LanguageDropdown.jsx`:
Agrega la ruta en el archivo:

```javascript
const flagImages = {
    'mi_bandera.png': new URL('../assets/optimized/mi_bandera.png', import.meta.url).href
};

const languages = [
    { code: 'xx', label: 'Mi Idioma', flag: flagImages['mi_bandera.png'] }
];
```

#### Para otras imágenes:
Usa directamente desde `assets/optimized`:

```jsx
<img src="/src/assets/optimized/mi_imagen.png" alt="descripción" />
```

### Paso 4: Hacer build y desplegar
```bash
npm run build      # Construir para producción
vercel --prod      # Desplegar a Vercel
```

---

## Notas importantes

- **Carpeta de entrada**: `src/assets/uploads/` (originales sin comprimir)
- **Carpeta de salida**: `src/assets/optimized/` (imágenes comprimidas)
- **Automatización**: El script compara tamaños y usa la versión más pequeña
- **No comprimir manualmente**: Deja que el script lo haga
- **Commit ambas carpetas**: Git trackea uploads/ y optimized/ para referencia

## Ejemplo completo: Agregar nuevo skill icon

```bash
# 1. Copia la imagen
cp mi_herramienta.png src/assets/uploads/

# 2. Optimiza
npm run images:optimize

# 3. Agrega a content.js
# skills: [{ name: 'Mi Herramienta', icon: 'mi_herramienta.png', ... }]

# 4. Build y deploy
npm run build && vercel --prod
```

¡Eso es todo! 🚀
