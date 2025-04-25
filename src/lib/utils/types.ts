import type { TimeUnit } from '$lib/constants/TimeOptions';

export interface DateOption {
	timeUnit?: string;
	endDate?: string | Date;
}

export interface CustomDateResult {
	displayName: string;
	endDate: string;
}

export interface StoredCountdown {
	id: number;
	timeOption: TimeUnit;
	dateOption: 'today' | 'this week' | 'this month' | 'this year' | string;
}
