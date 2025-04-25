import DateCalculator from './DateCalculator';

export default class TimeCalculator {
	static computeTimeRemaining(dateOption: string, now: Date) {
		const endDate = DateCalculator.getEndDateFromDateOption(dateOption);
		if (endDate) {
			return this.timeRemainingMill(endDate, now);
		}
	}

	static timeRemainingMill(endDate: Date, now: Date): number {
		return endDate.getTime() - now.getTime();
	}
}
