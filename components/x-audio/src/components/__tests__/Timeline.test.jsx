import { h } from '@financial-times/x-engine';
import { mount } from '@financial-times/x-test-utils/enzyme';

jest.mock('../classnames-helper', () => jest.fn());

const MockScrubBar = () => <div className='scrub-bar'/>
jest.mock('../ScrubBar', () => ({
	ScrubBar: props => <MockScrubBar {...props} />
}));

const MockTimeRemaining = () => <div className='time-remaining'/>
jest.mock('../TimeRemaining', () => ({
	TimeRemaining: props => <MockTimeRemaining {...props} />
}));

const MockLoading = () => <div className='loading'/>
jest.mock('../Loading', () => (props => <MockLoading {...props} />));

const MockErrorMessage = () => <div className='error-message'/>
jest.mock('../ErrorMessage', () => (props => <MockErrorMessage {...props} />));

import { Timeline } from '../Timeline';

const render = (overrides = {}) => {
	const props = {
		duration: 10,
		currentTime: 0,
		seeking: false,
		onScrub: jest.fn(),
		updateCurrentTime: jest.fn(),
		loading: false,
		error: false,
		...overrides,
	}
	return {
		component: mount(<Timeline {...props}/>),
		props
	}
}

describe('Timeline', () => {

	it('should render scrub bar', () => {
		const { component } = render();
		expect(component.find(MockScrubBar)).toExist();
	});

	it('should render loading component if loading is true', () => {
		const { component } = render({ loading: true });
		expect(component.find(MockLoading)).toExist();
	});

	it('should render error message if error is true', () => {
		const { component } = render({ error: true });
		expect(component.find(MockErrorMessage)).toExist();
	});

	it('should render current time based on the playing audio', () => {
		const { component } = render({ currentTime: 10 });
		const { currentTime } = component.find(MockTimeRemaining).props()
		expect(currentTime).toEqual(10);
	});

	describe('when scrubbing', () => {

		it('should call onScrub when scrubbing starts', () => {
			const { component, props } = render();
			const { onStartScrub } = component.find(MockScrubBar).props();
			onStartScrub();
			expect(props.onScrub).toHaveBeenCalledWith({ isScrubbing: true });

		});

		it('should call updateCurrentTime when scrubbing finishes', () => {
			const { component, props } = render();
			const { onStartScrub, onChange, onFinishScrub } = component.find(MockScrubBar).props();

			onStartScrub();
			onChange(20);
			onFinishScrub();

			expect(props.updateCurrentTime).toHaveBeenCalledWith({ currentTime: 20 });

		});

		it('should render current time based on the position of the scrub bar head', () => {
			const { component } = render();
			const { onChange, onStartScrub } = component.find(MockScrubBar).props();

			onStartScrub();
			onChange(20);

			component.update();

			const { currentTime } = component.find(MockTimeRemaining).props()
			expect(currentTime).toEqual(20);
		});

		it('should not render current time from the audio element whilst it is seeking', () => {
			const { component } = render();
			const { onStartScrub } = component.find(MockScrubBar).props();

			onStartScrub();
			component.setProps({ seeking: true, currentTime: 5 });

			component.update();

			const { currentTime } = component.find(MockTimeRemaining).props()
			expect(currentTime).toEqual(0);
		});
	});
});
