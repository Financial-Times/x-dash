const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

const { withActions } = require('../');

describe('x-interaction', () => {
	describe('withActions', () => {
		it('should pass props through', () => {
			const originalProps = {
				className: 'foo',
				bax: Math.random(),
				[Math.random()]: 'baz',
			};

			const Base = () => null;
			const Wrapped = withActions({})(Base);
			const target = mount(<Wrapped {...originalProps} />);

			expect(target.find(Base).props()).toMatchObject(originalProps);
		});

		it('should add actions', () => {
			const Base = () => null;
			const Wrapped = withActions({
				foo() {},
			})(Base);

			const target = mount(<Wrapped />);
			const props = target.find(Base).props();

			expect(props).toHaveProperty('actions');
			expect(props.actions.foo).toBeInstanceOf(Function);
		});

		it('should call underlying function when action is called, passing through args', () => {
			const foo = jest.fn();

			const Base = () => null;
			const Wrapped = withActions({
				foo,
			})(Base);

			const target = mount(<Wrapped />);
			const props = target.find(Base).props();

			const args = ['bar', 'baz'].concat(
				// random length args to verify they're all passed through
				Array(Math.floor(10 * Math.random())).fill('quux')
			);

			props.actions.foo(...args);

			expect(foo).toHaveBeenLastCalledWith(...args);
		});

		it('should return promise from action even when synchronous', () => {
			const Base = () => null;
			const Wrapped = withActions({
				foo() {},
			})(Base);

			const target = mount(<Wrapped />);
			const props = target.find(Base).props();

			expect(
				props.actions.foo()
			).toBeInstanceOf(Promise);
		});

		it('should update props of base with return value of action', async () => {
			const Base = () => null;
			const Wrapped = withActions({
				foo: () => ({ bar: 10 }),
			})(Base);

			const target = mount(<Wrapped bar={5} />);

			await target.find(Base).prop('actions').foo();
			target.update(); // tell enzyme things have changed

			expect(
				target.find(Base).prop('bar')
			).toBe(10);
		});
	});
});
