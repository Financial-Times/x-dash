const ONE_HOUR = 1000 * 60 * 60;

const FOUR_HOURS = ONE_HOUR * 4;

export type DateLike = Date | string | number;

export function toDate(date: DateLike): Date {
	if (typeof date === 'string') {
		return new Date(date);
	}

	if (typeof date === 'number') {
		return new Date(date);
	}

	return date;
}

export function getRelativeDate(date: DateLike): number {
	return Date.now() - toDate(date).getTime();
}

export function getStatus(publishedDate: DateLike, firstPublishedDate: DateLike): string {
	if (getRelativeDate(publishedDate) < ONE_HOUR) {
		if (publishedDate === firstPublishedDate) {
			return 'new';
		} else {
			return 'updated';
		}
	}

	return '';
}

export function isRecent(relativeDate: number): boolean {
	return relativeDate < FOUR_HOURS;
}
