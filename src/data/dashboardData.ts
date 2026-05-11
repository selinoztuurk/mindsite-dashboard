import type {
  BarChartPoint,
  SearchVisibilityTrendPoint,
  TrendSeries,
} from '../types/dashboard';

export const buyboxWinRateByBrand: BarChartPoint[] = [
  { labelKey: 'northwind', value: 72 },
  { labelKey: 'aurora', value: 64 },
  { labelKey: 'summit', value: 58 },
  { labelKey: 'harbor', value: 51 },
];

export const availabilityByRetailer: BarChartPoint[] = [
  { labelKey: 'amazon', value: 91 },
  { labelKey: 'walmart', value: 84 },
  { labelKey: 'target', value: 78 },
  { labelKey: 'bestBuy', value: 69 },
];

export const searchVisibilityTrend: SearchVisibilityTrendPoint[] = [
  { periodKey: 'jan', Amazon: 62, Walmart: 54, Target: 48, Northwind: 41 },
  { periodKey: 'feb', Amazon: 64, Walmart: 55, Target: 49, Northwind: 43 },
  { periodKey: 'mar', Amazon: 67, Walmart: 57, Target: 52, Northwind: 45 },
  { periodKey: 'apr', Amazon: 69, Walmart: 58, Target: 54, Northwind: 47 },
  { periodKey: 'may', Amazon: 71, Walmart: 60, Target: 56, Northwind: 49 },
  { periodKey: 'jun', Amazon: 74, Walmart: 62, Target: 58, Northwind: 52 },
];

export const shareOfVoiceByCategory: BarChartPoint[] = [
  { labelKey: 'beverages', value: 34 },
  { labelKey: 'snacks', value: 28 },
  { labelKey: 'personalCare', value: 22 },
  { labelKey: 'household', value: 16 },
];

export const searchVisibilitySeries: TrendSeries[] = [
  { labelKey: 'amazon', dataKey: 'Amazon' },
  { labelKey: 'walmart', dataKey: 'Walmart' },
  { labelKey: 'target', dataKey: 'Target' },
  { labelKey: 'northwind', dataKey: 'Northwind' },
];
