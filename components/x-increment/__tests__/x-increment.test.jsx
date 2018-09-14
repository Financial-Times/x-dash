const { h } = require('@financial-times/x-engine');
const { Increment } = require('../');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const { mount } = Enzyme;

describe('x-increment', () => {
	it('should increment when clicked', async () => {
		const subject = mount(<Increment count={1} />);
		await subject.find('button').prop('onClick')();

		expect(subject.find('span').text()).toEqual('2');
	});

	it('should increment when clicked, waiting for timeout', async () => {
		const subject = mount(<Increment count={1} timeout={1000} />);
		const start = Date.now();
		await subject.find('button').prop('onClick')();
		const end = Date.now();

		expect(end - start).toBeCloseTo(1000, -2); // negative precision ⇒ left of decimal point
		expect(subject.find('span').text()).toEqual('2');
	});
});
