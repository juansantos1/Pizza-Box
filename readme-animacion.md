# Animación de Transición de Carrusel (Framer Motion)

En el componente [CorporateProjects.jsx](file:///C:/Users/USER/Desktop/JuanSteven/Programacion/Casa_Moderna/src/components/CorporateProjects.jsx) del proyecto, se utiliza la librería **Framer Motion** para lograr transiciones suaves y fluidas tanto de los textos (nombre de la empresa, título, descripción) como de las imágenes al pasar al siguiente o anterior slide.

---

## Nombre de las Animaciones

Las transiciones constan de dos efectos principales combinados mediante un contenedor `<AnimatePresence>`:

1. **Desplazamiento Vertical con Fade (Desvanecimiento)**: Utilizado para el bloque de texto. El texto entra subiendo suavemente desde abajo (`y: 24` a `0`) y sale subiendo hacia arriba (`y: -24` con desvanecimiento).
2. **Escalado Suave con Fade (Desvanecimiento y Zoom)**: Utilizado para la imagen. La imagen entra escalando suavemente de mayor a menor (`scale: 1.04` a `1`) y sale encogiéndose ligeramente (`scale: 0.97` con desvanecimiento).

---

## Código de las Animaciones (Variantes)

Aquí tienes el código correspondiente a la configuración de las variantes de Framer Motion:

```javascript
/* ────────────────────────────────────────────────────────────
   Variantes de animación para el bloque de texto dinámico
   (Fade + Desplazamiento en el eje Y)
   ──────────────────────────────────────────────────────────── */
const textVariants = {
  initial: { y: 24, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeInOut' },
  },
  exit: {
    y: -24,
    opacity: 0,
    transition: { duration: 0.28, ease: 'easeInOut' },
  },
};

/* ────────────────────────────────────────────────────────────
   Variantes de animación para la imagen
   (Fade + Zoom/Escala suave)
   ──────────────────────────────────────────────────────────── */
const imageVariants = {
  initial: { opacity: 0, scale: 1.04 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};
```

---

## Cómo se Utiliza en el Código (Estructura de React)

Para que estas animaciones funcionen al cambiar de elemento (cuando cambia el estado `activeIndex`), se envuelven en un componente `<AnimatePresence mode="popLayout">` y se proporciona un `key` único que dependa del índice activo actual. Esto le indica a Framer Motion que el elemento anterior ha sido desmontado y que debe renderizar uno nuevo aplicando la animación de salida (`exit`) y entrada (`initial` -> `animate`).

### 1. Animación del Bloque de Texto (Columna Izquierda)

```jsx
import { motion, AnimatePresence } from 'framer-motion';

// ...

<div className="relative overflow-hidden min-h-[260px] md:min-h-[300px] w-full">
  <AnimatePresence mode="popLayout">
    <motion.div
      key={activeIndex} // Clave fundamental para disparar la animación al cambiar de slide
      variants={textVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 flex flex-col gap-5"
    >
      {/* Badge del cliente */}
      <div>{slides[activeIndex].company}</div>
      
      {/* Título */}
      <h3>{slides[activeIndex].title}</h3>
      
      {/* Descripción */}
      <p>{slides[activeIndex].description}</p>
    </motion.div>
  </AnimatePresence>
</div>
```

### 2. Animación de la Imagen (Columna Derecha)

```jsx
<div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
  <AnimatePresence mode="popLayout">
    <motion.img
      key={`img-${activeIndex}`} // Clave única para la imagen basada en el índice activo
      src={slides[activeIndex].image}
      alt={slides[activeIndex].title}
      variants={imageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
    />
  </AnimatePresence>
</div>
```

---

## Claves Técnicas de la Animación

- **`mode="popLayout"`**: Esta propiedad de `<AnimatePresence>` es crucial. Permite que el elemento saliente se posicione de forma absoluta (`pop out` del flujo del diseño) para que el elemento entrante pueda iniciar su animación de inmediato sin empujar hacia abajo o distorsionar temporalmente el diseño de la página.
- **`key={activeIndex}`**: Al cambiar el valor de `activeIndex`, React sabe que el componente tiene una clave diferente, lo que obliga a Framer Motion a ejecutar la animación de transición de salida de un elemento y de entrada del siguiente elemento al mismo tiempo.
