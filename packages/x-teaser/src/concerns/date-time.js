const ONE_HOUR = 1000 * 60 * 60;

const FOUR_HOURS = ONE_HOUR * 4;

/**
 * To Date
 * @param {Date | String | Number} date
 * @returns {Date}
 */
exports.toDate = function(date) {
	if (typeof date === 'string') {
		return new Date(date);
	}

	if (typeof date === 'number') {
		return new Date(date);
	}

	return date;
};

/**
 * Get Relative Date
 * @param {Date | String | Number} date
 * @returns {Number}
 */
exports.getRelativeDate = function(date) {
	return Date.now() - toDate(date).getTime();
};

/**
 * Get Status
 * @param {Date | String | Number} publishedDate
 * @param {Date | String | Number} firstPublishedDate
 * @returns {String}
 */
exports.getStatus = function(publishedDate, firstPublishedDate) {
	if (getRelativeDate(publishedDate) < ONE_HOUR) {
		if (publishedDate === firstPublishedDate) {
			return 'new';
		} else {
			return 'updated';
		}
	}

	return '';
};

/**
 * Is Recent
 * @param {Number} relativeDate
 * @returns {Boolean}
 */
exports.isRecent = function(relativeDate) {
	return relativeDate < FOUR_HOURS;
};
