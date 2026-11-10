/**
 * @file App.tsx
 * @description Componente raíz / vista principal de la galería Art Discovery.
 */

import { useEffect, useState } from 'react';
import type { Artwork } from '@/types/artwork';
import { fetchArtworks } from '@/services/artService';
import { ArtworkCard } from '@/components/ArtworkCard';
import './App.css';

export default function App() {
  // Estados de la vista:
  // Lista de obras recuperadas del backend
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  // Indicador de carga para mostrar retroalimentación al usuario
  const [loading, setLoading] = useState<boolean>(true);
  // Mensaje de error en caso de que la petición HTTP falle
  const [error, setError] = useState<string | null>(null);

  /**
   * Hook de efecto (useEffect):
   * Al pasarle un array de dependencias vacío ([]), se ejecuta exactamente una vez
   * cuando el componente se monta en el navegador por primera vez (fase de montaje).
   */
  useEffect(() => {
    fetchArtworks()
      .then((data) => {
        // Petición exitosa: guardamos los datos en el estado
        setArtworks(data);
      })
      .catch((err: Error) => {
        // En caso de error, guardamos el mensaje en el estado
        setError(err.message);
      })
      .finally(() => {
        // Se ejecuta siempre (tanto en éxito como en fallo) para apagar el spinner/loader
        setLoading(false);
      });
  }, []);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1 className="app-header__title">Art Discovery</h1>
        <p className="app-header__subtitle">Explorador del patrimonio artístico</p>
      </header>

      {/* Renderizado condicional según el estado de la máquina: */}

      {/* Estado A: Cargando */}
      {loading && <div className="state-loading">Cargando catálogo artístico...</div>}

      {/* Estado B: Error de comunicación */}
      {error && <div className="state-error">{error}</div>}

      {/* Estado C: Éxito (solo renderiza la lista si no hay carga ni error) */}
      {!loading && !error && (
        <section className="art-grid" aria-label="Catálogo de obras">
          {artworks.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </section>
      )}
    </main>
  );
}
