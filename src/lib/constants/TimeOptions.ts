export const precision = {
	seconds: 0,
	minutes: 0,
	hours: 4,
	days: 2,
	weeks: 7
} as const;

export const timeUnits = Object.keys(precision);

export type TimeUnit = keyof typeof precision;
