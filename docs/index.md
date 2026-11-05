---
layout: home

hero:
  name: 'Art Discovery'
  text: 'Documentación Técnica y Requisitos'
  tagline: 'Sistema interactivo para el análisis cromático, evolución temporal y clasificación de corrientes pictóricas.'
  actions:
    - theme: brand
      text: Ver alcance preliminar
      link: /alcance-preliminar
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

## 📌 Contexto Académico

Esta documentación recoge el ciclo de análisis, diseño e implementación para la asignatura **Informática Audiovisual** (Grado en Ingeniería Informática del Software, Escuela de Ingeniería Informática – Universidad de Oviedo).

El documento [Alcance preliminar del sistema](/alcance-preliminar) contiene la propuesta inicial para validar el propósito, el MVP, los requisitos, los riesgos y las decisiones pendientes del proyecto.

### Organización del documento

1. **[Alcance preliminar](/alcance-preliminar):** Propósito, límites, MVP, riesgos y decisiones pendientes.
2. **[Introducción y contexto](/requisitos/01-introduccion):** Problema, contexto y objetivos de la aplicación.
3. **[Stakeholders y usuarios](/requisitos/02-stakeholders):** Actores, responsabilidades y exclusiones iniciales.
4. **[Requisitos funcionales](/requisitos/03-funcionales):** Comportamiento y capacidades verificables.
5. **[Requisitos no funcionales](/requisitos/04-no-funcionales):** Condiciones de calidad y restricciones.
6. **[Datos y fuentes](/requisitos/05-datos-y-fuentes):** Entidades, fuentes previstas y tratamiento cromático.
7. **[Criterios de aceptación](/requisitos/06-criterios-aceptacion):** Comprobaciones para validar el MVP.
