# Art Discovery

[![Quality gate status](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=nahiaraSnchz_art-discovery&metric=coverage)](https://sonarcloud.io/summary/new_code?id=nahiaraSnchz_art-discovery)

> Herramienta interactiva para adivinar obras, periodos temporales y corrientes artísticas mediante el análisis cromático y la evolución temporal de sus paletas.

---

## 🎨 Características

- **Análisis cromático:** Extracción de colores dominantes a partir de colecciones pictóricas.
- **Líneas temporales de color:** Visualización de la evolución en el uso de pigmentos a lo largo de la historia del arte.
- **Mecánica interactiva:** Modo juego donde el usuario debe deducir el autor o periodo basándose en franjas cromáticas.

## 🛠️ Stack Tecnológico

- **Framework:** React 19
- **Lenguaje:** TypeScript (modo estricto)
- **Empaquetador y entorno local:** Vite
- **Estilos:** CSS3 modular con metodología BEM y variables de diseño
- **Calidad de código:** ESLint (Flat Config) + TypeScript ESLint
- **Documentación técnica:** VitePress

## 🚀 Puesta en marcha en local

### 1. Requisitos previos

- **Node.js** v20 o superior
- **npm** v10 o superior

### 2. Instalación de dependencias

Clona el repositorio, sitúate en tu rama de trabajo e instala las dependencias sincronizadas:

```bash
git clone <url-del-repositorio>
cd art-discovery
git checkout <tu-rama>
npm install
```

### 3. Comandos disponibles

| Comando              | Acción                                                      |
| :------------------- | :---------------------------------------------------------- |
| `npm run dev`        | Inicia el servidor de desarrollo en `http://localhost:5173` |
| `npm run build`      | Compila y optimiza la aplicación para producción en `dist/` |
| `npm run lint`       | Ejecuta el análisis estático de código con ESLint           |
| `npm run preview`    | Previsualiza el build de producción en local                |
| `npm run docs:dev`   | Inicia el servidor local de documentación VitePress         |
| `npm run docs:build` | Genera la web estática de la documentación                  |

---

## 🏛️ Decisiones Técnicas y Arquitectura

### 1. Proxy Inverso para la API (Bypass de CORS y 403)

La API de Chicago bloquea las llamadas directas desde `localhost` vía Cloudflare. Vite actúa como proxy local interceptando la ruta `/api-artic` para:

- Redirigir hacia `https://api.artic.edu`.
- Limpiar cabeceras `origin` y `referer`.
- Inyectar la cabecera `AIC-User-Agent` requerida por los términos de uso del museo.

### 2. Pipeline de Imágenes IIIF y Bypass de CORP

El CDN de imágenes del museo devuelve `Cross-Origin-Resource-Policy: same-origin`, impidiendo que el navegador pinte las imágenes en un dominio externo.

- Las URLs de imagen se procesan a través de `https://wsrv.nl/?url=...`.
- Este proxy intermedio sirve los recursos con cabeceras CORS abiertas y compresión adaptativa sin saturar el servidor origen.

---

## 🧩 Componentes y Módulos Implementados

```text
src/
├── components/
│   ├── ArtworkCard.tsx      # Ficha atómica de obra (imagen diferida, metadata y fallback)
│   ├── ArtworkCard.css      # Estilos visuales de la tarjeta con BEM
│   ├── SearchBar.tsx        # Barra de entrada de búsqueda con botón de borrado rápido
│   └── SearchBar.css        # Estilos y estados focus/hover del buscador
├── hooks/
│   └── useDebounce.ts       # Hook reactivo para retrasar peticiones al escribir (450ms)
├── services/
│   └── artService.ts        # Adaptador HTTP (fetchArtworks, searchArtworks y mapper de dominio)
├── types/
│   └── artwork.ts           # Interfaces TypeScript (Artwork, ArtworkPagination)
├── App.tsx                  # Orquestador: vista principal, paginación y gestión de estados
├── App.css                  # Layout general, contenedor y cuadrícula adaptable
└── index.css                # Variables de diseño globales y reseteo base
```

---

## 🌿 Flujo de Trabajo con Git

1. **Ramas de funcionalidad:** Trabaja siempre sobre ramas temáticas (`feature/<nombre>`, `fix/<nombre>`).
2. **Commits semánticos:** Sigue el estándar de Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
3. **Control de calidad:** Antes de subir cualquier cambio, comprueba que el linter pasa en verde:
   ```bash
   npm run lint
   ```
