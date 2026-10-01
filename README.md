# Portfolio — Ezequiel Nieva

Portfolio personal como desarrollador fullstack junior y técnico electrónico. Sitio estático en HTML/CSS/JS vainilla (sin frameworks ni build tools), pensado para lanzar rápido y aprender los fundamentos antes de sumar herramientas como Vite + TypeScript.

🔗 **Sitio en vivo:** [eznievdev.netlify.app](https://eznievdev.netlify.app/)

## Secciones

- **Inicio** — presentación, con efecto de partículas interactivo hecho en Canvas puro (sin librerías).
- **Sobre mí** — perfil, stack técnico con íconos.
- **Trayectoria** — línea de tiempo de experiencia laboral y formación.
- **Proyectos** — cargados dinámicamente desde un JSON (`data/proyectos.json`), con imagen, tags, link y lightbox de zoom.
- **Contacto** — formulario funcional vía Netlify Forms, sin backend propio.

## Estructura del proyecto

```
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js            # Carga y renderiza los proyectos desde el JSON
│   ├── particles.js        # Efecto de partículas interactivo (sigue el mouse)
│   ├── bg-particles.js     # Capa de partículas de fondo, ambiental
│   ├── navbar.js            # Muestra el navbar recién al scrollear
│   ├── volver-arriba.js     # Botón flotante de "volver arriba"
│   └── lightbox.js          # Zoom al hacer click en las imágenes de proyectos
├── data/
│   ├── proyectos.json       # Contenido de la sección Proyectos
│   └── demo_proyectos/      # Demos HTML de herramientas propias (ej. NANOBYTE)
└── assets/
    ├── proyectos/            # Capturas de cada proyecto
    └── cv/                   # CV descargable en PDF
```

## Stack técnico

- **HTML / CSS / JavaScript vainilla** — sin React, Angular ni build tools.
- **Canvas 2D API** — para el efecto de partículas, escrito desde cero (sin librerías como tsParticles).
- **CSS Grid y Flexbox** — layout responsive, sin frameworks CSS.
- **Netlify** — hosting y Netlify Forms para el formulario de contacto.
- **Devicon** — íconos de tecnologías, vía CDN.

## Decisiones de diseño

- Paleta oscura con acento verde ("placa") y cobre ("soldadura") — referencia directa al perfil de técnico electrónico + desarrollador.
- Tipografía monoespaciada (`IBM Plex Mono`) en títulos y etiquetas, evocando terminal/esquemático; sans-serif (`Inter`) en el cuerpo de texto.
- Contenido de Proyectos separado del HTML (JSON + fetch) para no tener que tocar el código cada vez que se agrega un proyecto nuevo.

## Cómo correrlo localmente

No requiere instalación ni build. Basta con servir los archivos estáticos, por ejemplo con la extensión **Live Server** de VS Code, o:

```bash
python3 -m http.server 5500
```

y abrir `http://localhost:5500`.

## Próximos pasos

- Migración a Vite + TypeScript.
- Sección de servicios (técnico + desarrollo) — quedará en un sitio aparte, separado del portfolio.

---

Desarrollado por [Ezequiel Nieva](https://github.com/EzNiev).
