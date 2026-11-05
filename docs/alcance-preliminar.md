# Alcance preliminar del sistema

> **Estado:** propuesta inicial pendiente de validación y aprobación.

## 1. Propósito

Art Discovery será una aplicación web educativa e interactiva que permitirá identificar un artista, estilo artístico o época histórica a partir de la evolución cromática de una colección de obras.

La experiencia combinará análisis cromático, visualización temporal y una mecánica de juego basada en preguntas y respuestas. El color será la evidencia principal del reto, pero nunca se presentará como una prueba definitiva de autoría o estilo.

## 2. Objetivos del proyecto

- Representar las paletas cromáticas predominantes de obras de arte.
- Mostrar la evolución del color a lo largo de una trayectoria artística o periodo histórico.
- Proponer retos para identificar artistas, movimientos o épocas.
- Explicar visual y contextualmente el resultado de cada reto.
- Facilitar el descubrimiento de relaciones entre color, técnica, contexto histórico y evolución artística.

## 3. Alcance incluido

La primera versión comprenderá:

- Una colección limitada y curada de obras.
- Paletas cromáticas calculadas previamente o durante la preparación de los datos.
- Agrupación de obras por artista, movimiento y periodo.
- Líneas temporales y visualizaciones de color.
- Retos de identificación con respuestas múltiples.
- Explicaciones posteriores a cada respuesta.
- Puntuación y progreso durante la sesión actual.
- Aplicación web sin autenticación.

Los requisitos detallados se especifican en [Requisitos funcionales](/requisitos/03-funcionales) y [Requisitos no funcionales](/requisitos/04-no-funcionales).

## 4. Fuera del alcance inicial

- Edición avanzada del catálogo desde la interfaz.
- Procesamiento masivo en tiempo real.
- Reconocimiento automático de autor a partir de cualquier imagen subida por el usuario.
- Respuesta libre con evaluación semántica.
- Perfiles de usuario y sincronización entre dispositivos.
- Clasificaciones globales.
- Aplicación móvil nativa.
- Recomendaciones personalizadas.
- Análisis profundo de conservación o composición pictórica.
- Certificación de autoría o autenticidad de obras.

## 5. MVP propuesto

El MVP deberá permitir completar este flujo:

1. Iniciar una partida.
2. Visualizar una progresión cromática asociada a un conjunto de obras.
3. Elegir una respuesta entre varias opciones.
4. Recibir la validación de la respuesta.
5. Consultar la solución, las obras utilizadas y una explicación contextual.
6. Avanzar al siguiente reto y consultar el resultado de la sesión.

## 6. Riesgos y supuestos

- La paleta puede variar según la iluminación, digitalización, restauración o calidad de la imagen.
- Una relación cromática puede sugerir un estilo, pero no demostrar por sí sola la autoría.
- Las fechas pueden ser aproximadas o incompletas.
- Las explicaciones históricas requieren validación documental.
- Las APIs externas pueden imponer límites de uso o cambiar su formato.
- Las fuentes de imágenes y metadatos deben ser compatibles con sus licencias.

## 7. Decisiones pendientes

1. Determinar si el MVP priorizará artistas, movimientos, épocas o los tres tipos de reto.
2. Decidir entre datos exclusivamente curados o consultas a APIs en tiempo real.
3. Seleccionar el algoritmo de extracción y comparación de colores.
4. Fijar el número de obras y retos del MVP.
5. Establecer el equilibrio entre precisión cromática y experiencia de juego.
6. Decidir si se permitirá explorar el catálogo fuera de las partidas.
7. Determinar si las explicaciones serán revisadas manualmente o generadas automáticamente.

## 8. Documentos relacionados

- [Introducción y contexto](/requisitos/01-introduccion)
- [Stakeholders y usuarios](/requisitos/02-stakeholders)
- [Requisitos funcionales](/requisitos/03-funcionales)
- [Requisitos no funcionales](/requisitos/04-no-funcionales)
- [Datos y fuentes](/requisitos/05-datos-y-fuentes)
- [Criterios de aceptación](/requisitos/06-criterios-aceptacion)
