/**
 * @file mapArtworks.ts
 * @description Parsea y normaliza las obras descargadas de Wikidata para pintarlas en el mapa.
 * @module data/mapArtworks
 */

import rawArtworks from './staticArtwork.json';

/** Estructura de cada fila del JSON simple de Wikidata */
interface RawWikidataArtwork {
  artwork: string;
  artworkLabel?: string;
  artistLabel?: string;
  year?: string | number;
  placeLabel?: string;
  coords?: string;
  image?: string;
}

/** Modelo limpio y tipado para el lienzo de p5.js */
export interface MapArtwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  place: string;
  lat: number;
  lng: number;
  image: string;
}

/**
 * Extrae longitud y latitud de la cadena WKT tipo Point(x, y)
 * En Wikidata, el primer valor es la longitud y el segundo la latitud.
 */
function parsePointCoords(wkt?: string): { lat: number; lng: number } | null {
  if (!wkt) return null;
  const match = wkt.match(/Point\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
  if (!match) return null;

  const lng = parseFloat(match[1]);
  const lat = parseFloat(match[2]);

  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  return { lat, lng };
}

/**
 * Convierte la URL original de Wikimedia Commons en una miniatura ligera de 320px.
 */
function getWikimediaThumbUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  const secureUrl = rawUrl.replace(/^http:\/\//i, 'https://');

  if (secureUrl.includes('commons.wikimedia.org/wiki/Special:FilePath/')) {
    const separator = secureUrl.includes('?') ? '&' : '?';
    return `${secureUrl}${separator}width=320`;
  }

  return secureUrl;
}

/** Transforma el JSON descargado en una lista de nodos listos para el mapa */
function buildMapArtworks(): MapArtwork[] {
  const records = rawArtworks as unknown as RawWikidataArtwork[];
  const seenIds = new Set<string>();
  const coordCounts = new Map<string, number>();
  const result: MapArtwork[] = [];

  for (const item of records) {
    // Evitar duplicados
    if (!item.artwork || seenIds.has(item.artwork)) continue;

    const parsed = parsePointCoords(item.coords);
    if (!parsed) continue;

    seenIds.add(item.artwork);

    // Si varias obras comparten ciudad exacta, distribuirlas un poco para que no se solapen en el mapa
    const key = `${parsed.lat.toFixed(2)},${parsed.lng.toFixed(2)}`;
    const count = coordCounts.get(key) ?? 0;
    if (count >= 3) continue; // Limitar a 3 obras por coordenada exacta
    coordCounts.set(key, count + 1);

    const angle = count * 2.4; // angulo en radianes
    const radius = count === 0 ? 0 : Math.min(0.6 + count * 0.25, 2.5);
    const offsertLat = parsed.lat + Math.sin(angle) * radius;
    const offsertLng = parsed.lng + Math.cos(angle) * radius;

    result.push({
      id: item.artwork,
      title: item.artworkLabel ?? 'Obra sin título',
      artist: item.artistLabel ?? 'Autor desconocido',
      year: item.year?.toString() ?? 's. XIX',
      place: item.placeLabel ?? 'Ubicación desconocida',
      lat: offsertLat,
      lng: offsertLng,
      image: getWikimediaThumbUrl(item.image),
    });
  }
  return result;
}

export const STATIC_MAP_ARTWORKS: MapArtwork[] = buildMapArtworks();
