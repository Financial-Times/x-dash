const REDEMPTION_LIMIT = 3;

module.exports = {
	getGiftArticleAllowance: () => {
		return fetch('/article-email/credits', { credentials: 'same-origin' })
			.then(response => response.json())
			.then(json => {
				return { monthlyAllowance: json.credits.allowance, credit: json.credits.remainingCredits };
			});
	},
	createGiftUrl: (articleId, sessionId) => {
		return fetch('/article-email/gift-link', {
			credentials: 'same-origin',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contentUUID: articleId,
				ftSessionSecure: sessionId
			})
		})
			.then(response => response.ok ? response.json() : {})
			.then(body => {
				if (body.errors) {
					throw new Error(`Failed to get gift article link: ${body.errors.join(', ')}`);
				}

				return Object.assign({}, body, { redemptionLimit: REDEMPTION_LIMIT });
			});
	}
}