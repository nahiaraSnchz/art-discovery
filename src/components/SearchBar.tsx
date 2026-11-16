/**
 * @file SearchBar.tsx
 * @description Componente controlado para la entrada de términos de búsqueda.
 * @module components/SearchBar
 */

import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar por artista, título o corriente...',
}) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar obras de arte"
      />
      {value.length > 0 && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange('')}
          aria-label="Limpiar búsqueda"
        >
          X
        </button>
      )}
    </div>
  );
};
