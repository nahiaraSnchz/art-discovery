/**
 * @file App.tsx
 * @description Componente raíz / vista principal de la galería Art Discovery.
 */

import { useEffect, useMemo, useState } from 'react';
import type { Artwork } from '@/types/artwork';
import { fetchArtworks, searchArtworks } from '@/services/artService';
import { ArtworkCard } from '@/components/ArtworkCard';
import { SearchBar } from '@/components/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { WorldMap } from '@/components/WorldMap';
import { Navbar, type ViewMode } from '@/components/Navbar';
import { STATIC_MAP_ARTWORKS } from '@/data/mapArtworks';
import { YearRangeSlider } from '@/components/YearRangeSlider';
import {
  getYearBounds,
  hasValidYears,
  isYearInRange,
  normalizeYearRange,
  type YearBounds,
  type YearRange,
} from '@/utils/yearRange';
import './App.css';

const DEFAULT_YEAR_BOUNDS: YearBounds = {
  min: 1885,
  max: 1889,
};

const MAP_YEAR_BOUNDS = getYearBounds(
  STATIC_MAP_ARTWORKS.map((artwork) => artwork.year),
  DEFAULT_YEAR_BOUNDS
);

export default function App() {
  // Estados de la vista:
  // Estado que controla qué pantalla está viendo el usuario ('map' por defecto)
  const [activeView, setActiveView] = useState<ViewMode>('map');
  // Estados del catálogo
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Estados de búsqueda y paginación
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [mapYearRange, setMapYearRange] = useState<YearRange>(MAP_YEAR_BOUNDS);
  const [catalogYearRange, setCatalogYearRange] = useState<YearRange | null>(null);
  const [catalogYearBounds, setCatalogYearBounds] = useState<YearBounds | null>(null);

  // Retrasa la ejecución de la petición para no saturar la API al escribir
  const debouncedQuery = useDebounce(searchTerm, 450);

  // Resetea a la primera página cuando el usuario modifica el texto de búsqueda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleCatalogYearRangeChange = (range: YearRange) => {
    if (!catalogYearBounds) return;

    setCatalogYearRange(normalizeYearRange(range, catalogYearBounds));
    setPage(1);
  };

  const filteredArtworks = useMemo(
    () =>
      catalogYearRange
        ? artworks.filter((artwork) => isYearInRange(artwork.date, catalogYearRange))
        : artworks,
    [artworks, catalogYearRange]
  );

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const request = debouncedQuery.trim()
      ? searchArtworks(debouncedQuery, page, 12)
      : fetchArtworks(page, 12);

    request
      .then((data) => {
        if (!isCancelled) {
          const dates = data.map((artwork) => artwork.date);
          const loadedBounds = getYearBounds(dates, MAP_YEAR_BOUNDS);
          const nextBounds = hasValidYears(dates) ? loadedBounds : MAP_YEAR_BOUNDS;

          setArtworks(data);
          setCatalogYearBounds(nextBounds);
          setCatalogYearRange((previousRange) =>
            previousRange
              ? normalizeYearRange(previousRange, nextBounds)
              : nextBounds
          );
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
      .catch((err: Error) => {
        if (!isCancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery, page]);

  return (
    <>
      {/* Barra de navegación superior persistente */}
      <Navbar activeView={activeView} onSelectView={setActiveView} />

      <main className="app-container">
        {/* Vista 1: Mapa Mundi */}
        {activeView === 'map' && (
          <WorldMap
            yearRange={mapYearRange}
            onYearRangeChange={setMapYearRange}
            yearBounds={MAP_YEAR_BOUNDS}
          />
        )}

        {/* Vista 2: Catálogo de Obras */}
        {activeView === 'catalog' && (
          <>
            <SearchBar value={searchTerm} onChange={handleSearchChange} />

            {catalogYearBounds && catalogYearRange && (
              <YearRangeSlider
                bounds={catalogYearBounds}
                value={catalogYearRange}
                onChange={handleCatalogYearRangeChange}
                idPrefix="catalog-year"
              />
            )}

            {loading && <div className="state-loading">Cargando obras...</div>}
            {error && <div className="state-error">{error}</div>}

            {!loading && !error && (artworks.length === 0 || filteredArtworks.length === 0) && (
              <div className="state-loading">
                {filteredArtworks.length === 0 && artworks.length > 0 && catalogYearRange
                  ? `No se encontraron obras para “${debouncedQuery}” dentro del periodo seleccionado.`
                  : `No se encontraron obras para “${debouncedQuery}”. Prueba con otro término.`}
              </div>
            )}

            {!loading && !error && filteredArtworks.length > 0 && (
              <>
                <section className="art-grid" aria-label="Catálogo de obras">
                  {filteredArtworks.map((art) => (
                    <ArtworkCard key={art.id} artwork={art} />
                  ))}
                </section>

                <nav className="pagination" aria-label="Navegación de páginas">
                  <button
                    type="button"
                    className="pagination__button"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  >
                    ← Anterior
                  </button>

                  <span className="pagination__current">Página {page}</span>

                  <button
                    type="button"
                    className="pagination__button"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Siguiente →
                  </button>
                </nav>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}
