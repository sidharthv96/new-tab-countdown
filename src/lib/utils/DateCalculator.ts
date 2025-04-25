import dayjs from 'dayjs';
import CustomDateInputHelper from './CustomDateInputHelper';

export default class DateCalculator {
	static getStartOfTomorrow(): Date {
		return dayjs().add(1, 'day').startOf('day').toDate();
	}

	static getStartOfNextWeek(): Date {
		return dayjs().add(1, 'week').startOf('week').toDate();
	}

	static getStartOfNextMonth(): Date {
		return dayjs().add(1, 'month').startOf('month').toDate();
	}

	static getStartOfNextYear(): Date {
		return dayjs().add(1, 'year').startOf('year').toDate();
	}

	static getExampleDateString(): string {
		return dayjs().add(1, 'week').format('M/D/YYYY');
	}

	static getEndDateFromDateOption(dateOption: string): Date {
		switch (dateOption) {
			case 'today':
				return this.getStartOfTomorrow();
			case 'this week':
				return this.getStartOfNextWeek();
			case 'this month':
				return this.getStartOfNextMonth();
			case 'this year':
				return this.getStartOfNextYear();
			default:
				return parseCustomDateInput(dateOption);
		}
	}
}

const parseCustomDateInput = (dateOption: string): Date => {
	return new Date(CustomDateInputHelper.getCustomDate(dateOption)?.endDate ?? '');
};
