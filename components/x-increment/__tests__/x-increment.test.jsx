const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

const { Increment } = require('../');

describe('x-increment', () => {
	it('should increment when action is triggered', async () => {
		const subject = mount(<Increment count={1} />);
		await subject.find('BaseIncrement').prop('actions').increment();

		expect(subject.find('span').text()).toEqual('2');
	});

	it('should increment by amount from action arg', async () => {
		const subject = mount(<Increment count={1} />);
		await subject.find('BaseIncrement').prop('actions').increment({ amount: 2 });

		expect(subject.find('span').text()).toEqual('3');
	});

	it('should increment when clicked, waiting for timeout', async () => {
		const subject = mount(<Increment count={1} timeout={1000} />);
		const start = Date.now();

		await subject.find('button').prop('onClick')();

		expect(Date.now() - start).toBeCloseTo(1000, -2); // negative precision ⇒ left of decimal point
		expect(subject.find('span').text()).toEqual('2');
	});
});
