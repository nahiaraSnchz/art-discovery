---
layout: home

hero:
  name: 'Art Discovery'
  text: 'Documentación Técnica y Requisitos'
  tagline: 'Sistema interactivo para el análisis cromático, evolución temporal y clasificación de corrientes pictóricas.'
  actions:
    - theme: brand
      text: Explorar Requisitos
      link: /requisitos/01-introduccion
    - theme: alt
      text: Ver en GitHub
      link: https://github.com/nahiaraSnchz/art-discovery

features:
  - title: 🎯 Propósito del Sistema
    details: Plataforma didáctica orientada a deducir artistas, épocas o movimientos mediante líneas temporales de paletas cromáticas dominantes.
  - title: 📐 Ingeniería de Requisitos
    details: Especificación detallada de casos de uso, requisitos funcionales (RF), no funcionales (RNF) y perfiles de usuario.
  - title: 🎨 Colorimetría y Algoritmos
    details: Pipeline de extracción de color, cuantización de paletas ($k$-means / histogramas) y visualización gráfica interactiva.
  - title: ⚙️ Arquitectura y Calidad
    details: Pipeline de integración continua (CI) en GitHub Actions, pruebas automatizadas y análisis estático con SonarQube Cloud.
---

### Organización del documento

1. **[Introducción y Alcance](/requisitos/01-introduccion):** Objetivos del sistema y delimitación del problema.
2. **[Stakeholders y Usuarios](/requisitos/02-stakeholders):** Actores involucrados y público objetivo.
3. **[Requisitos Funcionales](/requisitos/03-funcionales):** Comportamiento y capacidades de la aplicación.
4. **[Requisitos No Funcionales](/requisitos/04-no-funcionales):** Rendimiento, accesibilidad cromática y compatibilidad.
