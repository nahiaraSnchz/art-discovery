# Art Discovery
[![Quality gate status](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=coverage)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)

> Herramienta interactiva para adivinar obras, periodos temporales y corrientes artísticas mediante el análisis cromático y la evolución temporal de sus paletas.

---

## 🎨 Características
* **Análisis cromático:** Extracción de colores dominantes a partir de colecciones pictóricas.
* **Líneas temporales de color:** Visualización de la evolución en el uso de pigmentos a lo largo de la historia del arte.
* **Mecánica interactiva:** Modo juego donde el usuario debe deducir el autor, movimiento o periodo basándose en franjas cromáticas.
* **Explicación contextual:** Presentación de la evolución cromática y de su posible relación con el contexto artístico e histórico.

## 🛠️ Stack Tecnológico
* **Frontend:** React / TypeScript / Vite
* **Procesamiento de color:** ColorThief / scikit-learn / Canvas API
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
├── docs/                # Documentación del proyecto y requisitos
├── .gitignore
├── package.json
└── README.md
```

La documentación detallada y el alcance preliminar están disponibles en [`docs/`](docs/).
