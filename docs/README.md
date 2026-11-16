# Documentación Técnica de Art Discovery 📖

Guía interna para la redacción, estructuración y despliegue del portal de documentación técnica y requisitos del sistema, construido sobre **VitePress**.

---

## 🚀 Comandos del Portal de Documentación

Todos los comandos se ejecutan desde la raíz del repositorio:

| Comando                | Descripción                                                                                                      |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `npm run docs:dev`     | Inicia el servidor de desarrollo local en `http://localhost:5173` (o el puerto asignado) con recarga en caliente |
| `npm run docs:build`   | Genera los archivos HTML/JS estáticos listos para producción en `docs/.vitepress/dist/`                          |
| `npm run docs:preview` | Sirve en local la compilación estática generada en `dist/` para verificar antes de subir                         |

---

## 📂 Estructura de Directorios

```text
docs/
├── .vitepress/
│   ├── config.mts           # Configuración central (título, navegación, barra lateral)
│   ├── dist/                # Salida estática de compilación (ignorado en Git y ESLint)
│   └── cache/               # Archivos temporales de caché (ignorado en Git y ESLint)
├── requirements/            # Especificación de requisitos (RF, RNF, Casos de uso)
│   ├── functional.md
│   └── non-functional.md
├── architecture/            # Decisiones técnicas, proxy de Vite, pipeline de imágenes
│   └── architecture.md
├── index.md                 # Portada principal del portal de documentación
└── README.md                # Esta guía de desarrollo interno
```

---

## ✍️ Cómo Añadir una Nueva Página

### 1. Crear el archivo Markdown

Crea el archivo `.md` en la subcarpeta correspondiente (por ejemplo, `docs/requirements/use-cases.md`).

Añade los metadatos iniciales (_frontmatter_) en la parte superior:

```markdown
---
title: Casos de Uso
description: Casos de uso e interacciones del catálogo de obras
---

# Casos de Uso

Contenido detallado de la sección...
```

### 2. Registrar la página en la navegación (`.vitepress/config.mts`)

Para que aparezca en el menú superior o en la barra lateral izquierda, añade la ruta en el archivo de configuración:

```typescript
// docs/.vitepress/config.mts
import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Art Discovery Docs',
  description: 'Documentación técnica y especificación de requisitos',
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Requisitos', link: '/requirements/functional' },
      { text: 'Arquitectura', link: '/architecture/architecture' },
    ],
    sidebar: {
      '/requirements/': [
        {
          text: 'Especificación de Requisitos',
          items: [
            { text: 'Requisitos Funcionales', link: '/requirements/functional' },
            { text: 'Requisitos No Funcionales', link: '/requirements/non-functional' },
            { text: 'Casos de Uso', link: '/requirements/use-cases' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: 'Arquitectura y Diseño',
          items: [{ text: 'Pipeline de Datos y Proxy', link: '/architecture/architecture' }],
        },
      ],
    },
  },
});
```

---

## 💡 Recursos y Formatos Útiles en VitePress

### Contenedores destacados (Admonitions / Callouts)

Utiliza estas cajas para resaltar notas técnicas o advertencias:

```markdown
::: info NOTA
Este endpoint consume el proxy local configurado en Vite para sortear bloqueos de CORS.
:::

::: warning ADVERTENCIA
Las imágenes requieren el bypass de CORP vía wsrv.nl para evitar bloqueos NotSameOrigin en Chrome.
:::

::: tip CONSEJO
Usa debounce en campos de búsqueda para limitar el impacto en la cuota de la API.
:::
```

### Resaltado de código

Soporta cualquier lenguaje con numeración de líneas y líneas destacadas:

````markdown
```typescript{2,4-6}
export interface Artwork {
  id: string | number;
  title: string;
  artist: string;
}
```
````

```

---

## ⚠️ Reglas y Buenas Prácticas

1. **Rutas relativas limpias:** No incluyas la extensión `.md` en los enlaces internos de la barra lateral (usa `/requirements/functional` en lugar de `/requirements/functional.md`).
2. **Ignorar cachés en ESLint:** Nunca toques los archivos generados en `docs/.vitepress/cache/` ni `docs/.vitepress/dist/`. Ambos están excluidos de Git y del linter.
3. **Validación previa:** Antes de hacer push, ejecuta `npm run docs:build` en local para asegurar que no hay enlaces rotos que bloqueen el despliegue en GitHub Actions.
```
