export interface YearBounds {
  min: number;
  max: number;
}

export interface YearRange {
  start: number;
  end: number;
}

function normalizeBounds(bounds: YearBounds): YearBounds {
  const min = Number.isFinite(bounds.min) ? bounds.min : 0;
  const max = Number.isFinite(bounds.max) ? Math.max(bounds.max, min) : min;

  return { min, max };
}

export function extractYear(value: string): number | null {
  if (!value) return null;

  const match = value.match(/\b([12]\d{3})\b/);
  if (!match) return null;

  const year = Number(match[1]);
  return Number.isFinite(year) ? year : null;
}

export function getYearBounds(values: string[], fallback: YearBounds): YearBounds {
  const years = values
    .map(extractYear)
    .filter((year): year is number => year !== null);

  if (years.length === 0) return normalizeBounds(fallback);

  return {
    min: Math.min(...years),
    max: Math.max(...years),
  };
}

export function hasValidYears(values: string[]): boolean {
  return values.some((value) => extractYear(value) !== null);
}

export function mergeYearBounds(first: YearBounds, second: YearBounds): YearBounds {
  const firstBounds = normalizeBounds(first);
  const secondBounds = normalizeBounds(second);

  return normalizeBounds({
    min: Math.min(firstBounds.min, secondBounds.min),
    max: Math.max(firstBounds.max, secondBounds.max),
  });
}

export function normalizeYearRange(range: YearRange, bounds: YearBounds): YearRange {
  const safeBounds = normalizeBounds(bounds);
  const start = Number.isFinite(range.start) ? range.start : safeBounds.min;
  const end = Number.isFinite(range.end) ? range.end : safeBounds.max;
  const normalizedStart = Math.max(safeBounds.min, Math.min(start, safeBounds.max));
  const normalizedEnd = Math.max(safeBounds.min, Math.min(end, safeBounds.max));

  return {
    start: Math.min(normalizedStart, normalizedEnd),
    end: Math.max(normalizedStart, normalizedEnd),
  };
}

export function isYearInRange(value: string, range: YearRange): boolean {
  const year = extractYear(value);
  // A range cannot classify textual dates such as "s. XIX"; preserve them
  // instead of hiding an artwork returned by the API.
  return year === null || (year >= range.start && year <= range.end);
}
