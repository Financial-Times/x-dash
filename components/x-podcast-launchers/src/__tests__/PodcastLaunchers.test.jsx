import { h } from '@financial-times/x-engine';
import { brand } from '@financial-times/n-concept-ids';
import renderer from 'react-test-renderer';
jest.mock('../PodcastLaunchers.scss', () => ({}));
import { PodcastLaunchers } from '../PodcastLaunchers';


const acastRSSHost = 'https://acast.access';
const acastAccessToken = '123-abc';

describe('PodcastLaunchers', () => {
	it('should hide itself if an RSS URL could not be generated', () => {
		expect(
			renderer.create(<PodcastLaunchers conceptId='123-abc' {...{acastRSSHost, acastAccessToken}} />).toJSON()
		).toMatchSnapshot();
	});

	it('should render the app links based on concept Id', () => {
		expect(
			renderer.create(<PodcastLaunchers conceptId={brand.rachmanReviewPodcast} {...{acastRSSHost, acastAccessToken}} />).toJSON()
		).toMatchSnapshot();
	});
})
