/**
 * @file App.tsx
 * @description Componente raíz / vista principal de la galería Art Discovery.
 */

import { useEffect, useState } from 'react';
import type { Artwork } from '@/types/artwork';
import { fetchArtworks, searchArtworks } from '@/services/artService';
import { ArtworkCard } from '@/components/ArtworkCard';
import { SearchBar } from '@/components/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { WorldMap } from '@/components/WorldMap';
import { Navbar, type ViewMode } from '@/components/Navbar';
import './App.css';

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

  // Retrasa la ejecución de la petición para no saturar la API al escribir
  const debouncedQuery = useDebounce(searchTerm, 450);

  // Control de estado previo para ajustar loading durante renderizado sin provocar renders en cascada
  const [prevQuery, setPrevQuery] = useState<string>(debouncedQuery);
  const [prevPage, setPrevPage] = useState<number>(page);

  if (debouncedQuery !== prevQuery || page !== prevPage) {
    setPrevQuery(debouncedQuery);
    setPrevPage(page);
    setLoading(true);
    setError(null);
  }

  // Resetea a la primera página cuando el usuario modifica el texto de búsqueda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  /**
   * Efecto de carga de obras:
   * Solo dispara peticiones HTTP cuando el usuario entra en la vista 'catalog',
   * evitando llamadas innecesarias mientras explora el mapa estático.
   */
  useEffect(() => {
    if (activeView !== 'catalog') return;

    let isCancelled = false;

    const request = debouncedQuery.trim()
      ? searchArtworks(debouncedQuery, page, 12)
      : fetchArtworks(page, 12);

    request
      .then((data) => {
        if (!isCancelled) {
          setArtworks(data);
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
  }, [activeView, debouncedQuery, page]); // se vuelve a ejecutar cada vez que cambia page

  return (
    <>
      {/* Barra de navegación superior persistente */}
      <Navbar activeView={activeView} onSelectView={setActiveView} />

      <main className="app-container">
        {/* Vista 1: Mapa Mundi */}
        {activeView === 'map' && <WorldMap />}

        {/* Vista 2: Catálogo de Obras */}
        {activeView === 'catalog' && (
          <>
            <SearchBar value={searchTerm} onChange={handleSearchChange} />

            {loading && <div className="state-loading">Cargando obras...</div>}
            {error && <div className="state-error">{error}</div>}

            {!loading && !error && artworks.length === 0 && (
              <div className="state-loading">
                No se encontraron obras para &ldquo;{debouncedQuery}&rdquo;. Prueba con otro
                término.
              </div>
            )}

            {!loading && !error && artworks.length > 0 && (
              <>
                <section className="art-grid" aria-label="Catálogo de obras">
                  {artworks.map((art) => (
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
