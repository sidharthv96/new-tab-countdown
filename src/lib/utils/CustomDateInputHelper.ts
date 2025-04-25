import nlp from 'compromise';
import type { CustomDateResult } from './types';

export default class CustomDateInputHelper {
	static parseCustomDateInput(customDateInput: string) {
		return nlp(customDateInput, this.getLexicon())
			.normalize()
			.match('#Date')
			.not('#Day')
			.not('#Holiday')
			.normalize();
	}

	static getCustomDate(input: string): CustomDateResult | null {
		const parsedCustomDate = this.parseCustomDateInput(input).out('array') as string[];
		if (parsedCustomDate.length !== 1) {
			return null;
		} else {
			// Remove [st | nd | rd | th ] and commas from string.
			const display = input.replace(/(\d+)(st|nd|rd|th)/, '$1').replace(/,/g, '');
			// Convert input such as 'New Year's Day January 1st' to 'january 1'.
			const dateToConvert = nlp(display, this.getLexicon())
				.normalize()
				.match('#Date')
				.not('#Day')
				.not('#Holiday')
				.normalize()
				.out() as string;
			const date = new Date(dateToConvert);
			if (isNaN(Date.parse(dateToConvert))) {
				return null;
			} else {
				const regExp = new RegExp(dateToConvert, 'i');
				return {
					// Display normalized description + date using mm/dd/yyyy.
					displayName: `until ${display.replace(regExp, '').trim()} (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`,
					endDate: dateToConvert
				};
			}
		}
	}

	static getLexicon(): Record<string, string> {
		// List of words that nlp recognizes as `Date` words which should be ignored for proper parsing.
		return {
			day: 'Day',
			days: 'Day',
			date: 'Day',
			dates: 'Day',
			weekend: 'Day',
			weekday: 'Day',
			monday: 'Day',
			tuesday: 'Day',
			wednesday: 'Day',
			thursday: 'Day',
			friday: 'Day',
			saturday: 'Day',
			sunday: 'Day',
			mon: 'Day',
			tue: 'Day',
			wed: 'Day',
			thurs: 'Day',
			fri: 'Day',
			sat: 'Day',
			sun: 'Day',
			tomorrow: 'Day',
			week: 'Day',
			year: 'Day',
			christmas: 'Holiday',
			thanksgiving: 'Holiday',
			"mother's": 'Holiday',
			easter: 'Holiday',
			independence: 'Holiday',
			"father's": 'Holiday',
			halloween: 'Holiday',
			"saint patrick's": 'Holiday',
			"new year's": 'Holiday',
			'new years': 'Holiday',
			'new year': 'Holiday',
			"new year's eve": 'Holiday',
			'new years eve': 'Holiday',
			'new year eve': 'Holiday'
		};
	}
}
