# Requisitos funcionales

Estos requisitos describen el comportamiento que deberá ofrecer el MVP. El alcance general y las exclusiones se mantienen en [Alcance preliminar](/alcance-preliminar).

| Identificador | Nombre | Descripción | Prioridad |
|---|---|---|:---:|
| RF-01 | Iniciar partida | El sistema permitirá iniciar una partida sin autenticación. | Alta |
| RF-02 | Cargar colección | El sistema utilizará una colección curada de obras con metadatos y paletas disponibles. | Alta |
| RF-03 | Procesar paletas | El sistema obtendrá o utilizará los colores dominantes de cada obra y su proporción relativa. | Alta |
| RF-04 | Generar línea temporal | El sistema representará cronológicamente la evolución de las paletas de un artista, movimiento o periodo. | Alta |
| RF-05 | Mostrar reto | El sistema mostrará una progresión cromática, una paleta o una línea temporal como evidencia del reto. | Alta |
| RF-06 | Ofrecer respuestas | El sistema ofrecerá varias respuestas posibles para identificar un artista, movimiento o época. | Alta |
| RF-07 | Validar respuesta | El sistema validará la opción seleccionada e indicará si es correcta. | Alta |
| RF-08 | Revelar contexto | Tras la respuesta, el sistema mostrará la solución, las obras utilizadas y una explicación artística e histórica. | Alta |
| RF-09 | Mostrar evolución | La explicación mostrará los cambios relevantes de color o pigmentos a lo largo del tiempo. | Media |
| RF-10 | Gestionar sesión | El sistema registrará durante la sesión los retos realizados, respuestas y puntuación. | Media |
| RF-11 | Avanzar en partida | El sistema permitirá pasar al siguiente reto y consultar el resultado de la partida. | Media |
| RF-12 | Mostrar fuentes | El sistema indicará las fuentes de las obras, metadatos y explicaciones utilizadas. | Alta |
| RF-13 | Distinguir evidencia | El sistema diferenciará los datos documentados de las interpretaciones sobre el uso del color. | Alta |

## 1. Reglas de la partida

- El reto ocultará la imagen original hasta después de la respuesta.
- El modo inicial será de respuesta múltiple.
- La respuesta libre queda fuera del MVP.
- La puntuación y la racha, si se implementan, se conservarán solo durante la sesión.
