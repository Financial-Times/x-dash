const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');
const { Audio } = require('../');

describe('x-audio', () => {
	describe('loader', () => {
		const props = {
			onPlayClick: jest.fn(),
			onPauseClick: jest.fn(),
			onCloseClick: jest.fn(),
			expanded: false,
			loading: false,
			playing: false,
			title: 'lorem',
			seriesName: 'ipsum'
		}
		it('should show the loader when loading is true', () => {
			const subject = mount(<Audio {...props} loading={true} />);
			expect(subject.exists('Loading')).toEqual(true);
		});

		it('should not show the loader when loaded event occurs', () => {
			const subject = mount(<Audio {...props} />);
			expect(subject.exists('Loading')).toEqual(false);
		});
	});

});
