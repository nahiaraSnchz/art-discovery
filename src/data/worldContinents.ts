/**
 * @file worldContinents.ts
 * @description Coordenadas vectoriales [longitud, latitud] con generalización cartográfica
 * para garantizar separación visual limpia en estrechos, mares e islas.
 * @module data/worldContinents
 */

export const CONTINENTS: [number, number][][] = [
  // Eurasia unificada (con mayor separación en el Mediterráneo, Canal de la Mancha y Mar Rojo)
  [
    // Península Ibérica
    [-5.6, 36.8], // Tarifa / Gibraltar (elevado ligeramente para separar de África)
    [-9.2, 37.3], // Cabo de San Vicente
    [-9.8, 39.2], // Lisboa
    [-9.5, 43.2], // Finisterre (Galicia)
    [-5.8, 43.8], // Asturias / Cantábrico
    [-1.8, 43.5], // Golfo de Vizcaya

    // Francia Atlántica y Mar del Norte
    [-1.5, 46.0], // Burdeos
    [-4.8, 48.5], // Bretaña
    [-1.5, 49.8], // Normandía
    [2.0, 51.2], // Calais
    [5.0, 53.2], // Países Bajos
    [8.5, 55.2], // Dinamarca
    [10.5, 57.6], // Norte de Jutlandia
    [10.2, 54.5], // Báltico

    // Escandinavia
    [14.5, 54.2],
    [20.0, 54.8],
    [24.5, 59.5], // Estonia
    [28.5, 60.5], // San Petersburgo
    [25.0, 65.8], // Norte de Finlandia
    [20.5, 63.5],
    [18.2, 59.2], // Estocolmo
    [13.0, 55.5], // Sur de Suecia
    [10.8, 59.2], // Oslo
    [5.2, 60.5], // Bergen
    [6.5, 63.0],
    [14.5, 68.2], // Lofoten
    [25.0, 71.2], // Cabo Norte
    [31.5, 70.0],

    // Norte de Rusia y Siberia
    [43.0, 67.0],
    [62.0, 69.5],
    [82.0, 73.0],
    [105.0, 76.5],
    [140.0, 72.5],
    [175.0, 66.0],

    // Pacífico Asiático, China e Indochina
    [160.0, 52.0], // Kamchatka
    [142.0, 53.5],
    [135.0, 44.0],
    [129.5, 35.0], // Sur de Corea
    [126.0, 37.5],
    [122.0, 40.5],
    [118.0, 39.0],
    [122.2, 36.8], // Shandong
    [121.8, 31.0], // Shanghái
    [119.5, 25.5],
    [114.0, 22.3], // Hong Kong
    [108.5, 21.5],
    [109.2, 13.0], // Vietnam
    [105.0, 9.0],
    [100.5, 13.5], // Tailandia
    [103.8, 1.5], // Península Malaya
    [98.5, 8.5],
    [97.5, 16.5],

    // India
    [91.5, 22.3],
    [85.0, 19.5],
    [80.2, 13.0],
    [77.5, 8.2], // Sur de India
    [72.8, 19.0], // Bombay
    [68.5, 23.0],

    // Oriente Medio y Península Arábiga (separada del Mar Rojo)
    [66.5, 25.0],
    [57.0, 26.0],
    [48.5, 30.2], // Golfo Pérsico
    [55.8, 25.5],
    [59.8, 22.3], // Omán
    [54.0, 17.0],
    [44.2, 13.2], // Yemen (desplazado al NE para abrir el Mar Rojo)
    [39.5, 22.0],
    [35.5, 29.5],
    [34.5, 31.8], // Costa de Levante (separada de Egipto)

    // Mediterráneo Oriental, Grecia e Italia
    [36.0, 36.8], // Turquía
    [27.0, 37.0],
    [26.5, 40.3],
    [29.2, 41.3], // Estambul
    [41.0, 41.6], // Mar Negro
    [38.0, 45.2],
    [31.0, 46.5],
    [28.8, 41.5],
    [25.5, 40.8], // Grecia
    [23.8, 38.0],
    [22.5, 36.5],
    [20.0, 39.5],
    [14.2, 45.5], // Adriático
    [12.3, 45.4], // Venecia
    [14.2, 42.5],
    [18.4, 40.3], // Tacón de Italia
    [15.8, 38.2], // Punta de Italia
    [13.5, 41.3], // Roma / Nápoles
    [10.3, 43.8],
    [8.9, 44.5], // Génova

    // Costa Mediterránea Francesa y Española
    [7.0, 43.8],
    [4.5, 43.5], // Marsella
    [3.2, 42.5], // Cataluña
    [2.0, 41.4], // Barcelona
    [0.6, 40.6], // Ebro
    [-0.4, 39.4], // Valencia
    [-0.8, 37.7], // Murcia
    [-2.3, 37.0], // Almería
    [-4.4, 36.9], // Málaga
  ],

  // Gran Bretaña (desplazada ligeramente al NO para abrir el Canal de la Mancha)
  [
    [-6.0, 50.8],
    [0.6, 51.6],
    [1.0, 53.0],
    [-1.8, 55.4],
    [-2.3, 58.0],
    [-5.2, 58.8],
    [-5.6, 55.7],
    [-3.5, 53.7],
    [-5.3, 52.2],
  ],

  // Irlanda (separada del mar de Irlanda)
  [
    [-11.4, 52.0],
    [-7.4, 52.4],
    [-7.2, 55.3],
    [-11.0, 54.4],
  ],

  // Groenlandia
  [
    [-44.0, 60.5],
    [-22.0, 70.5],
    [-18.0, 81.0],
    [-60.0, 82.0],
    [-70.0, 76.0],
    [-52.0, 68.5],
  ],

  // América del Norte (con Baja California limpia y Panamá separado)
  [
    [-168.0, 65.5],
    [-156.0, 71.3],
    [-135.0, 69.5],
    [-95.0, 71.0],
    [-82.0, 69.0],
    [-92.0, 57.0], // Bahía de Hudson
    [-79.0, 54.0],
    [-78.0, 62.0],
    [-64.0, 60.0],
    [-55.5, 51.5], // Terranova
    [-64.0, 44.0],
    [-70.0, 41.8],
    [-74.0, 40.7], // Nueva York
    [-76.0, 35.2],
    [-80.2, 25.8], // Florida
    [-82.5, 28.0],
    [-89.5, 29.3],
    [-97.2, 26.0],
    [-96.2, 19.2],
    [-90.3, 21.3], // Yucatán
    [-87.0, 18.5],
    [-83.5, 15.0],
    [-79.5, 10.2], // Panamá Norte (separado de Sudamérica)
    [-85.5, 11.2],
    [-92.5, 15.2],
    [-105.5, 20.5],
    [-110.5, 27.5], // Mar de Cortés abierto
    [-114.2, 31.2],
    [-111.2, 23.0], // Punta de Baja California
    [-113.8, 24.2],
    [-117.2, 32.5], // California
    [-122.4, 37.8],
    [-124.5, 48.0],
    [-136.0, 58.0],
    [-150.0, 60.5],
    [-162.0, 55.0],
  ],

  // América del Sur
  [
    [-78.0, 8.2], // Colombia Norte (separado de Panamá)
    [-75.5, 10.2],
    [-71.5, 12.0],
    [-62.0, 10.2],
    [-51.0, 1.0],
    [-44.0, -2.5],
    [-35.0, -6.0],
    [-38.5, -13.0],
    [-41.0, -22.0], // Río de Janeiro
    [-48.5, -26.0],
    [-53.5, -33.5],
    [-58.0, -35.0], // Buenos Aires
    [-62.0, -40.5],
    [-66.0, -47.0],
    [-68.0, -55.0], // Tierra del Fuego
    [-74.5, -52.5],
    [-73.5, -41.5],
    [-71.5, -33.0],
    [-70.5, -18.5],
    [-77.0, -12.0], // Lima
    [-81.3, -4.5],
    [-80.0, 1.0],
    [-77.5, 7.0],
  ],

  // África (desplazada ligeramente al Sur y Oeste para abrir el Mediterráneo y el Mar Rojo)
  [
    [-6.2, 33.8], // Marruecos Norte (3° al sur de Gibraltar para marcar bien el estrecho)
    [3.0, 34.8], // Argelia
    [10.2, 35.2], // Túnez
    [11.5, 31.5],
    [20.0, 31.0], // Libia
    [31.0, 30.2], // Egipto (separado del Sinaí/Levante)
    [35.8, 20.0], // Costa Mar Rojo
    [41.5, 12.0], // Yibuti (separado de Yemen)
    [51.0, 11.8], // Cuerno de África
    [45.0, 2.0],
    [39.5, -6.5],
    [40.5, -15.0],
    [35.0, -24.5],
    [31.0, -29.8],
    [20.0, -34.8], // Sur de África
    [18.4, -33.9],
    [14.5, -23.0],
    [12.0, -6.0],
    [9.3, 0.5],
    [9.2, 4.0],
    [3.4, 6.4],
    [-4.0, 5.2],
    [-7.7, 4.4],
    [-13.7, 9.5],
    [-17.5, 14.7],
    [-17.0, 21.0],
    [-13.0, 27.5],
    [-9.8, 31.2],
  ],

  // Madagascar (con canal de Mozambique bien marcado)
  [
    [50.2, -12.0],
    [51.4, -15.5],
    [48.0, -25.0],
    [44.5, -25.0],
    [45.0, -19.5],
    [47.5, -15.5],
  ],

  // Japón (ensanchado y separado ligeramente de Corea)
  [
    [132.5, 31.5],
    [138.0, 33.5],
    [142.5, 35.5],
    [144.2, 40.5],
    [141.5, 41.5],
    [138.5, 37.5],
    [132.5, 34.2],
  ],
  [
    [141.5, 42.5],
    [147.2, 43.5],
    [143.2, 45.6],
  ],

  // Oceanía
  [
    [114.0, -22.0],
    [122.0, -17.5],
    [131.0, -12.0],
    [136.5, -12.5],
    [142.5, -10.8],
    [149.0, -21.0],
    [153.5, -28.0],
    [150.0, -37.5],
    [144.0, -38.5],
    [138.5, -35.0],
    [131.0, -31.8],
    [118.0, -35.0],
    [115.0, -34.0],
    [113.5, -26.0],
  ],
  [
    [166.5, -46.2],
    [174.5, -41.5],
    [172.0, -40.2],
    [165.5, -44.5],
  ],
  [
    [174.5, -39.5],
    [178.5, -37.7],
    [173.0, -34.2],
    [173.2, -37.2],
  ],
];
