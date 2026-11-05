# Art Discovery

> Proyecto para la asignatura de **Informática Audiovisual**. Herramienta interactiva para adivinar obras, periodos temporales y corrientes artísticas mediante el análisis cromático y la evolución temporal de sus paletas.

---

## 🎨 Características
* **Análisis cromático:** Extracción de colores dominantes a partir de colecciones pictóricas.
* **Líneas temporales de color:** Visualización de la evolución en el uso de pigmentos a lo largo de la historia del arte.
* **Mecánica interactiva:** Modo juego donde el usuario debe deducir el autor o periodo basándose en franjas cromáticas.

## 🛠️ Stack Tecnológico
* **Frontend:** [React / TypeScript / Vite / Tailwind CSS / HTML5 Canvas] *(ajustar a tu stack)*
* **Procesamiento de color:** [ColorThief / scikit-learn / Canvas API]
* **Fuente de datos:** APIs de dominio público ([The Met API](https://metmuseum.github.io/), Rijksmuseum, Wikidata)

## 📁 Estructura del Repositorio
```text
├── public/              # Assets estáticos
├── src/
│   ├── assets/          # Iconos y estilos globales
│   ├── components/      # Componentes UI (Timeline, ColorBar, Card)
│   ├── data/            # JSONs con metadatos y paletas preprocesadas
│   ├── hooks/           # Lógica y estado del juego
│   └── utils/           # Algoritmos de extracción y comparación cromática
├── .gitignore
├── package.json
└── README.md
