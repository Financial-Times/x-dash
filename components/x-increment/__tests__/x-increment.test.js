const { h } = require('@financial-times/x-engine');
const { Increment } = require('../');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

const { mount } = Enzyme;

describe('x-increment', () => {
	it('should increment when clicked', () => {
		const subject = mount(<Increment count={1} />);
		subject.find('button').simulate('click');

		expect(subject.find('span').text()).toEqual('2');
	});
});
