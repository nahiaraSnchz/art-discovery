/**
 * @file ArtworkCard.tsx
 * @description Componente atómico para representar individualmente cada obra de arte.
 */

import React, { useState } from 'react';
import type { Artwork } from '@/types/artwork';
import './ArtworkCard.css';

interface ArtworkCardProps {
  artwork: Artwork;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork }) => {
  // Estado local para manejar 'graceful degradation' (degradación elegante):
  // Si la URL de la imagen existe pero falla al descargarse (ej. 404 en el CDN),
  // cambiamos este booleano a true para mostrar el placeholder en lugar de un icono roto.
  const [imgError, setImgError] = useState(false);

  return (
    <article className="art-card">
      <div className="art-card__media">
        {/* Renderizado condicional: si hay URL y no ha fallado, pintamos <img> */}
        {artwork.imageUrl && !imgError ? (
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
            className="art-card__image"
            // loading="lazy" retrasa la descarga hasta que la tarjeta entra en el viewport
            loading="lazy"
            // Si la imagen falla en runtime, activamos el estado de error
            onError={() => setImgError(true)}
          />
        ) : (
          /* Placeholder de sustitución */
          <div className="art-card__placeholder">
            <span>Sin imagen digitalizada</span>
          </div>
        )}
      </div>

      <div className="art-card__body">
        <h3 className="art-card__title" title={artwork.title}>
          {artwork.title}
        </h3>
        <p className="art-card__artist">{artwork.artist}</p>

        <div className="art-card__footer">
          <span className="art-card__date">{artwork.date}</span>
        </div>
      </div>
    </article>
  );
};
