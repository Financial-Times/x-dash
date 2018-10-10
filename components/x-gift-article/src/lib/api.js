export default class ApiClient {
	constructor ({ protocol, domain } = {}) {
		this.protocol = protocol;
		this.domain = domain;
		this.redemptionLimit = 3;
	}

	getFetchUrl(path) {
		let base = '';
		if (this.domain) {
			base = `//${this.domain}`;

			if (this.protocol) {
				base = `${this.protocol}:${base}`;
			}
		}

		return `${base}${path}`;
	}

	fetchJson(path, additionalOptions) {
		const url = this.getFetchUrl(path);
		const options = Object.assign({
			credentials: 'include'
		}, additionalOptions);

		return fetch(url, options).then(response => response.json());
	}

	async getGiftArticleAllowance() {
		try {
			const json = await this.fetchJson('/article-email/credits');

			return {
				monthlyAllowance: json.credits.allowance,
				giftCredits: json.credits.remainingCredits,
				nextRenewalDate: json.credits.renewalDate
			};
		} catch (e) {
			return { monthlyAllowance: undefined, giftCredits: undefined, nextRenewalDate: undefined };
		}
	}

	async getGiftUrl(articleId, sessionId) {
		try {
			const json = await this.fetchJson('/article-email/gift-link', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contentUUID: articleId,
					ftSessionSecure: sessionId
				})
			});

			if (json.errors) {
				throw new Error(`Failed to get gift article link: ${json.errors.join(', ')}`);
			}

			return {
				...json,
				redemptionLimit: this.redemptionLimit
			};
		} catch (e) {
			return { redemptionUrl: undefined, redemptionLimit: undefined };
		}
	}

	async getShorterUrl(originalUrl) {
		let url = originalUrl;
		let isShortened = false;

		try {
			const json = await this.fetchJson('/article/shorten-url/' + encodeURIComponent(originalUrl));

			if (json.shortenedUrl) {
				isShortened = true;
				url = json.shortenedUrl;
			}
		} catch (e) {
			// do nothing because it just returns original url at the end
		}

		return { url, isShortened };
	}
}

