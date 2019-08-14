
import generateAppLinks from '../generate-app-links';

describe('generate-app-links', () => {
	it('should generate each app link with the urlencoded RSS url', () => {
		const rssUrl = 'https://acast.access/rss/ft-news/&£@1234';
		expect(
			generateAppLinks(rssUrl)
		).toMatchSnapshot();
	})
})
