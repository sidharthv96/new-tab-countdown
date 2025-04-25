import { timeUnits } from './TimeOptions';

export const dropdownOptions = {
	timeOptions: {
		defaultValue: 'hours',
		options: timeUnits
	},

	dateOptions: {
		defaultValue: 'today',
		options: ['today', 'this week', 'this month', 'this year']
	}
} as const;

export const defaultCountdown = {
	id: 1,
	timeOption: dropdownOptions.timeOptions.defaultValue,
	dateOption: dropdownOptions.dateOptions.defaultValue
};
