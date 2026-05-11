const SERIES_COLOR_SATURATION = 62;
const SERIES_COLOR_LIGHTNESS = 46;
const SERIES_COLOR_HUE_STEP = 137;

const seriesColorMap = new Map<string, string>();

function hashSeriesId(seriesId: string): number {
  let hash = 0;

  for (let index = 0; index < seriesId.length; index += 1) {
    hash = Math.imul(31, hash) + seriesId.charCodeAt(index);
    hash >>>= 0;
  }

  return hash;
}

function seriesColorFromHash(hash: number): string {
  const hue = hash % 360;

  return `hsl(${hue} ${SERIES_COLOR_SATURATION}% ${SERIES_COLOR_LIGHTNESS}%)`;
}

export function getLabelColor(seriesId: string): string {
  const cachedColor = seriesColorMap.get(seriesId);

  if (cachedColor) {
    return cachedColor;
  }

  const usedColors = new Set(seriesColorMap.values());
  const baseHash = hashSeriesId(seriesId);

  for (let attempt = 0; attempt < 360; attempt += 1) {
    const color = seriesColorFromHash(
      baseHash + Math.imul(attempt, SERIES_COLOR_HUE_STEP)
    );

    if (!usedColors.has(color)) {
      seriesColorMap.set(seriesId, color);
      return color;
    }
  }

  const fallbackColor = seriesColorFromHash(baseHash);
  seriesColorMap.set(seriesId, fallbackColor);
  return fallbackColor;
}

export const chartTheme = {
  axis: "#64748B",
  grid: "#E2E8F0",
  tooltipBackground: "#0F172A",
  tooltipText: "#F8FAFC",
};
