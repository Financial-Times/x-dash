const delay = ms => new Promise(r => setTimeout(r, ms));

module.exports = {
	getGiftArticleAllowance: () => {
		return fetch('/article-email/credits', { credentials: 'same-origin' })
			.then(response => response.json())
			.then(json => {
				return { monthlyAllowance: json.credits.allowance, credit: json.credits.remainingCredits };
			});
	},
	createGiftUrl: () => {
		return delay(2000)
			.then(() => ('https://gift-url'))
	}
}
