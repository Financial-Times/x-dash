const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { Audio } = require('../');

describe('x-audio', () => {
	describe('loader', () => {
		const props = {
			onPlayClick: jest.fn(),
			onPauseClick: jest.fn(),
			onCloseClick: jest.fn(),
			onExpand: jest.fn(),
			onMinimise: jest.fn(),
			expanded: false,
			loading: false,
			error: false,
			playing: false,
			title: 'lorem',
			seriesName: 'ipsum',
			currentTime: 1234,
			duration: 5678
		}
		it('should show the loader when loading is true', () => {
			const subject = shallow(<Audio {...props} loading={true} />);
			expect(subject.find('Loading')).toHaveLength(1);
		});

		it('should not show the loader when loaded event occurs', () => {
			const subject = shallow(<Audio {...props} />);
			expect(subject.find('Loading')).toHaveLength(0);
		});

		it('should show the error message when error is true', () => {
			const subject = shallow(<Audio {...props} error={true} />);
			expect(subject.find('ErrorMessage')).toHaveLength(1);
		});
	});

});
