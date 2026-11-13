/**
 * @file Navbar.tsx
 * @description Barra de navegación superior que permite alternar entre el mapa mundi y el catálogo.
 * @module components/Navbar
 */

import React from 'react';
import './Navbar.css';

/**
 * Tipo que restringe las vistas de la aplicación
 */
export type ViewMode = 'map' | 'catalog';

interface NavbarProps {
  /* Vista activa actualmente */
  activeView: ViewMode;
  /* Funcion callback que notifica al componente padre (App) el cambio de pestaña */
  onSelectView: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onSelectView }) => {
  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Identidad de la aplicación */}
        <div className="navbar__brand">
          <h1 className="navbar__title">Art Discovery</h1>
          <span className="navbar__subtitle">Explorador del patrimonio artístico</span>
        </div>

        {/* Selector de vistas */}
        <nav className="navbar__nav" aria-label="Navegación principal">
          <button
            type="button"
            className={`navbar__tab ${activeView === 'map' ? 'navbar__tab--active' : ''}`}
            onClick={() => onSelectView('map')}
            aria-current={activeView === 'map' ? 'page' : undefined}
          >
            Mapa Mundi
          </button>

          <button
            type="button"
            className={`navbar__tab ${activeView === 'catalog' ? 'navbar__tab--active' : ''}`}
            onClick={() => onSelectView('catalog')}
            aria-current={activeView === 'catalog' ? 'page' : undefined}
          >
            Catálogo de obras
          </button>
        </nav>
      </div>
    </header>
  );
};
