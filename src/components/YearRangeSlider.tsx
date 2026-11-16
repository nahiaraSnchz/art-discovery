import type { CSSProperties } from 'react';
import './YearRangeSlider.css';
import {
  normalizeYearRange,
  type YearBounds,
  type YearRange,
} from '@/utils/yearRange';

export interface YearRangeSliderProps {
  bounds: YearBounds;
  value: YearRange;
  onChange: (range: YearRange) => void;
  idPrefix: string;
}

interface RangeStyle extends CSSProperties {
  '--range-start': string;
  '--range-end': string;
}

export function YearRangeSlider({
  bounds,
  value,
  onChange,
  idPrefix,
}: YearRangeSliderProps) {
  const safeMin = Number.isFinite(bounds.min) ? bounds.min : 0;
  const safeMax = Number.isFinite(bounds.max) ? Math.max(bounds.max, safeMin) : safeMin;
  const safeBounds: YearBounds = { min: safeMin, max: safeMax };
  const safeRange = normalizeYearRange(value, safeBounds);
  const { start: safeStart, end: safeEnd } = safeRange;
  const span = Math.max(safeMax - safeMin, 1);
  const startPosition = ((safeStart - safeMin) / span) * 100;
  const endPosition = ((safeEnd - safeMin) / span) * 100;

  return (
    <div
      className="year-range-slider"
      style={
        {
          '--range-start': `${startPosition}%`,
          '--range-end': `${endPosition}%`,
        } as RangeStyle
      }
    >
      <div className="year-range-slider__heading">
        <span>Filtrar por periodo</span>
        <strong>
          {safeStart} – {safeEnd}
        </strong>
      </div>
      <div className="year-range-slider__labels">
        <label htmlFor={`${idPrefix}-start`}>Inicio: {safeStart}</label>
        <label htmlFor={`${idPrefix}-end`}>Final: {safeEnd}</label>
      </div>
      <div className="year-range-slider__track" aria-hidden="true" />
      <input
        id={`${idPrefix}-start`}
        type="range"
        min={safeMin}
        max={safeMax}
        value={safeStart}
        onChange={(event) =>
          onChange(
            normalizeYearRange(
              { start: Number(event.target.value), end: safeEnd },
              safeBounds
            )
          )
        }
        aria-label="Año de inicio del periodo"
      />
      <input
        id={`${idPrefix}-end`}
        type="range"
        min={safeMin}
        max={safeMax}
        value={safeEnd}
        onChange={(event) =>
          onChange(
            normalizeYearRange(
              { start: safeStart, end: Number(event.target.value) },
              safeBounds
            )
          )
        }
        aria-label="Año final del periodo"
      />
    </div>
  );
}
