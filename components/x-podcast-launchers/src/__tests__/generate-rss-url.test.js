import generateRSSUrl from '../generate-rss-url'

jest.mock('nanoid')
import nanoid from 'nanoid'

describe('generate-app-links', () => {
	it('returns the acast access url from showId and token', () => {
		expect(generateRSSUrl('https://access.acast.cloud', 'ft-news-extra', '123-456')).toEqual(
			'https://access.acast.cloud/rss/ft-news-extra/123-456'
		)
	})

	it('generates a random token if one is not provided', () => {
		nanoid.mockImplementation(() => 'abc-123')

		expect(generateRSSUrl('https://access.acast.cloud', 'ft-news-extra')).toMatch(
			'https://access.acast.cloud/rss/ft-news-extra/abc-123'
		)
	})
})
