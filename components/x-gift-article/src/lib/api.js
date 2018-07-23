const delay = ms => new Promise(r => setTimeout(r, ms));

module.exports = {
	getGiftArticleAllowance: () => {
		return delay(1000)
			.then(() => ({ monthlyAllowance: 20, credit: 0 }))
	},
	createGiftUrl: () => {
		return delay(2000)
			.then(() => ('https://gift-url'))
	}
}
