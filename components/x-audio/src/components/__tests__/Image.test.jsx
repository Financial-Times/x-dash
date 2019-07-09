const { h } = require('@financial-times/x-engine');
const { shallow } = require('@financial-times/x-test-utils/enzyme');
const { Image } = require('../Image');

jest.mock('../classnames-helper', () => {
	const { classnamesHelperMock } = require('../../../__tests__/test-helper');
	return classnamesHelperMock;
});

describe('Image', () => {
	test('should have necessary elements', () => {
		const props = {
			imageDataSet: {
				url: 'image-url',
				resolutions: []
			}
		};
		const subject = shallow(<Image {...props}/>);

		expect(subject).toMatchSnapshot();
	});

	test('should set resolutions into srcSet correctly', () => {
		const props = {
			imageDataSet: {
				url: 'image-url',
				resolutions: [
					{ url: 'resolution-url-300px', resolution: '300px' },
					{ url: 'resolution-url-500px', resolution: '500px' }
				]
			}
		};
		const subject = shallow(<Image {...props}/>);

		expect(subject).toMatchSnapshot();
	});
});
