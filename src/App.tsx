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
import './App.css';

export default function App() {
  // Estados de la vista:
  // Lista de obras recuperadas del backend
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  // Indicador de carga para mostrar retroalimentación al usuario
  const [loading, setLoading] = useState<boolean>(true);
  // Mensaje de error en caso de que la petición HTTP falle
  const [error, setError] = useState<string | null>(null);
  // Estados de navegación y filtrado
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
   * Hook de efecto (useEffect):
   * Al pasarle un array de dependencias vacío ([]), se ejecuta exactamente una vez
   * cuando el componente se monta en el navegador por primera vez (fase de montaje).
   */
  useEffect(() => {
    let isCancelled = false; // Bandera para evitar actualizar el estado si el componente se desmonta

    // Si hay un termino de busqueda, se usa searchArtworks, si no, fetchArtworks
    const request = debouncedQuery.trim()
      ? searchArtworks(debouncedQuery, page, 12)
      : fetchArtworks(page, 12);

    request
      .then((data) => {
        if (!isCancelled) {
          // Petición exitosa: guardamos los datos en el estado
          setArtworks(data);
          // scroll suave hacia arriba al cambiar de pagina
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      })
      .catch((err: Error) => {
        // En caso de error, guardamos el mensaje en el estado
        setError(err.message);
      })
      .finally(() => {
        // Se ejecuta siempre (tanto en éxito como en fallo) para apagar el spinner/loader
        setLoading(false);
      });
    // Cleanup: cancela la actualización si cambian los parametros antes de resolver
    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery, page]); // se vuelve a ejecutar cada vez que cambia page

  return (
    <main className="app-container">
      <header className="app-header">
        <h1 className="app-header__title">Art Discovery</h1>
        <p className="app-header__subtitle">Explorador del patrimonio artístico</p>
      </header>

      {/* Componente de entrada de búsqueda */}
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      {/* Renderizado condicional según el estado de la máquina: */}

      {/* Estado A: Cargando */}
      {loading && <div className="state-loading">Cargando catálogo artístico...</div>}

      {/* Estado B: Error de comunicación */}
      {error && <div className="state-error">{error}</div>}

      {!loading && !error && artworks.length === 0 && (
        <div className="state-loading">No se encontraron resultados para "{debouncedQuery}"</div>
      )}

      {/* Estado C: Éxito (solo renderiza la lista si no hay carga ni error) */}
      {!loading && !error && (
        <>
          <section className="art-grid" aria-label="Catálogo de obras">
            {artworks.map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </section>

          {/* Barra de paginación */}
          <nav className="pagination" aria-label="Navegación de páginas">
            <button
              type="button"
              className="pagination__button"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Anterior
            </button>

            <span className="pagination__current">Página {page}</span>

            <button
              type="button"
              className="pagination__button"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Siguiente
            </button>
          </nav>
        </>
      )}
    </main>
  );
}
