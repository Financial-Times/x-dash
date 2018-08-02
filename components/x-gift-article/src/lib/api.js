const REDEMPTION_LIMIT = 3;

module.exports = {
	getGiftArticleAllowance: async () => {
		try {
			const response = await fetch('/article-email/credits', { credentials: 'same-origin' });
			const json = await response.json();

			return {
				monthlyAllowance: json.credits.allowance,
				giftCredits: json.credits.remainingCredits
			};

		} catch (e) {
			return { monthlyAllowance: undefined, giftCredits: undefined };
		}

	},

	getGiftUrl: async (articleId, sessionId) => {
		try {
			const response = await fetch('/article-email/gift-link', {
				credentials: 'same-origin',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contentUUID: articleId,
					ftSessionSecure: sessionId
				})
			});

			const body = response.ok ? await response.json() : {};
			if (body.errors) {
				throw new Error(`Failed to get gift article link: ${body.errors.join(', ')}`);
			}

			return Object.assign({}, body, { redemptionLimit: REDEMPTION_LIMIT });

		} catch (e) {
			return { redemptionUrl: undefined, redemptionLimit: undefined };
		}
	},

	getShorterUrl: async (originalUrl) => {
		let url = originalUrl;
		let isShortened = false;

		try {
			const fetchUrl = '/article/shorten-url/' + encodeURIComponent(originalUrl);
			const response = await fetch(fetchUrl, { credentials: 'same-origin' });
			const json = await response.json();

			if (json.shortenedUrl) {
				isShortened = true;
				url = json.shortenedUrl;
			}
		} catch (e) {}

		return { url, isShortened };
	},
}
