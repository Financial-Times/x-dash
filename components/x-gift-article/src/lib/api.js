export default class ApiClient {
	constructor ({ protocol, domain } = {}) {
		this.protocol = protocol;
		this.domain = domain;
		this.redemptionLimit = 3;
	}

	getFetchUrl(url) {
		if (this.protocol && this.domain) {
			return `${this.protocol}://${this.domain}/${url}`;
		}

		return url;
	}

	async getGiftArticleAllowance() {
		const url = this.getFetchUrl('/article-email/credits');

		try {
			const response = await fetch(url, { credentials: 'same-origin' });
			const json = await response.json();

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
		const url = this.getFetchUrl('/article-email/gift-link');

		try {
			const response = await fetch(url, {
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

			return {
				...body,
				redemptionLimit: this.redemptionLimit
			};
		} catch (e) {
			return { redemptionUrl: undefined, redemptionLimit: undefined };
		}
	}

	async getShorterUrl(originalUrl) {
		const fetchUrl = this.getFetchUrl('/article/shorten-url/' + encodeURIComponent(originalUrl));
		let url = originalUrl;
		let isShortened = false;

		try {
			const response = await fetch(fetchUrl, { credentials: 'same-origin' });
			const json = await response.json();

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

