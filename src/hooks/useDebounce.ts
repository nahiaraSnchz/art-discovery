/**
 * @file useDebounce.ts
 * @description Hook personalizado para retrasar la actualización de un valor
 * hasta que transcurra un tiempo de inactividad (evita peticiones en cada pulsación).
 * @module hooks/useDebounce
 */

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configurar un temporizador para emitir el nuevo valor tras el retraso
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Si el usuario vuelve a teclear antes de terminar el delay, cancela el anterior
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
