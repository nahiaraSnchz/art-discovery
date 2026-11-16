/**
 * @file artwork.ts
 * @description Modelo de dominio para las obras de arte y paginación en Art Discovery.
 * Define las entidades y contratos de datos agnósticos a la API consumida,
 * asegurando un tipado estricto en toda la aplicación.
 * @module types/artwork
 */

export interface Artwork {
  id: string | number;
  title: string;
  artist: string;
  date: string;
  medium: string;
  imageUrl: string | null;
  department?: string;
  description?: string;
}

export interface ArtworkPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
