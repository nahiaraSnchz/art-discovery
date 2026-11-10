/**
 * @file artService.ts
 * @description Módulo de servicio para comunicarse con la API del Art Institute of Chicago.
 * Implementa el patrón adaptador (Data Mapper) para transformar respuestas HTTP en entidades limpias de nuestro dominio.
 */

import type { Artwork } from '../types/artwork';

// Ruta relativa que intercepta el proxy configurado en Vite (vite.config.ts).
// En local, Vite redirige esto a https://api.artic.edu sin exponer cabeceras que causen CORS.
const BASE_URL = '/api-artic/api/v1/artworks';

/**
 * Tipado de la respuesta cruda de la API del museo.
 * Declaramos solo las propiedades que nos interesan para tener tipado estricto sin usar `any`.
 */
interface ArticItem {
  id: number;
  title: string | null;
  artist_title: string | null;
  date_display: string | null;
  medium_display: string | null;
  image_id: string | null;
}

interface ArticApiResponse {
  data: ArticItem[];
}

/**
 * Construye la URL pública de la imagen a través del CDN de wsrv.nl.
 *
 * El servidor de imágenes del museo devuelve la cabecera 'Cross-Origin-Resource-Policy: same-origin',
 * lo que hace que el navegador bloquee la imagen si se carga desde un origen distinto.
 * Al pasar la ruta por el proxy de imágenes de código abierto wsrv.nl:
 * 1. El servidor de wsrv.nl descarga la imagen directamente sin restricciones de navegador.
 * 2. Nos la sirve con cabeceras CORS permisivas y compresión optimizada.
 *
 * @param imageId - Identificador único de imagen IIIF proporcionado por la API.
 * @returns URL procesada o null si la obra no dispone de archivo gráfico digitalizado.
 */
function buildImageUrl(imageId: string | null): string | null {
  if (!imageId) return null;

  // Ruta física del estándar IIIF del Art Institute of Chicago (resolución de 843px de ancho)
  const iiifPath = `/iiif/2/${imageId}/full/843,/0/default.jpg`;

  if (import.meta.env.DEV) {
    return `/iiif-artic${iiifPath}`;
  }

  // wsrv.nl requiere la ruta sin 'https://' y con codificación de caracteres especiales
  return `https://wsrv.nl/?url=${encodeURIComponent(`https://www.artic.edu${iiifPath}`)}`;
}

/**
 * Transforma un elemento de la API de Chicago a la entidad Artwork de nuestro dominio.
 */
function mapToArtwork(item: ArticItem): Artwork {
  return {
    id: item.id,
    title: item.title ?? 'Obra sin título',
    artist: item.artist_title ?? 'Artista desconocido',
    date: item.date_display ?? 'Fecha no disponible',
    medium: item.medium_display ?? 'Técnica no especificada',
    imageUrl: buildImageUrl(item.image_id),
  };
}

/**
 * Obtiene un listado paginado de obras de arte.
 *
 * @param page - Número de página actual (por defecto 1).
 * @param limit - Cantidad de obras a solicitar por petición (por defecto 12).
 * @returns Promesa con el array de obras mapeadas a la interfaz Artwork.
 */
export async function fetchArtworks(page = 1, limit = 12): Promise<Artwork[]> {
  const query = encodeURIComponent(
    JSON.stringify({
      bool: {
        must: [{ exists: { field: 'image_id' } }],
      },
    })
  );

  // se optimiza el payload solicitando únicamente los campos necesarios con '?fields='
  const url = `${BASE_URL}/search?query=${query}&page=${page}&limit=${limit}&fields=id,title,artist_title,date_display,medium_display,image_id`;

  // Verificamos si la respuesta HTTP es exitosa
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error en la API de arte: ${response.status} ${response.statusText}`);
  }

  const payload: ArticApiResponse = await response.json();

  // Patrón Mapper: transformamos el formato del proveedor a nuestro modelo de frontend
  return payload.data.map((item: ArticItem): Artwork => ({
    id: item.id,
    // Se usa el operador de coalescencia nula (??) para garantizar textos por defecto
    // en caso de que la obra contenga valores nulos en el museo
    title: item.title ?? 'Obra sin título',
    artist: item.artist_title ?? 'Artista desconocido',
    date: item.date_display ?? 'Fecha no disponible',
    medium: item.medium_display ?? 'Técnica no especificada',
    imageUrl: buildImageUrl(item.image_id),
  }));
}

/**
 *
 * Busca obras por término de texto (título, artista o palabras clave).
 *
 * @param query - Texto introducido por el usuario.
 * @param page - Número de página de resultados.
 * @param limit - Cantidad de resultados por página.
 */
export async function searchArtworks(query: string, page = 1, limit = 12): Promise<Artwork[]> {
  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${BASE_URL}/search?q=${encodedQuery}&page=${page}&limit=${limit}&fields=id,title,artist_title,date_display,medium_display,image_id`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al buscar obras: ${response.status} ${response.statusText}`);
  }

  const payload: ArticApiResponse = await response.json();
  return payload.data.map(mapToArtwork);
}
