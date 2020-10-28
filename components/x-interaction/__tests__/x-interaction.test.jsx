const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

const { withActions } = require('../')

describe('x-interaction', () => {
	describe('withActions', () => {
		it('should pass props through', () => {
			const originalProps = {
				className: 'foo',
				bax: Math.random(),
				[Math.random()]: 'baz'
			}

			const Base = () => null
			const Wrapped = withActions({})(Base)
			const target = mount(<Wrapped {...originalProps} />)

			expect(target.find(Base).props()).toMatchObject(originalProps)
		})

		it('should add actions', () => {
			const Base = () => null
			const Wrapped = withActions({
				foo() {}
			})(Base)

			const target = mount(<Wrapped />)
			const props = target.find(Base).props()

			expect(props).toHaveProperty('actions')
			expect(props.actions.foo).toBeInstanceOf(Function)
		})

		it('should call underlying function when action is called, passing through args', () => {
			const foo = jest.fn()

			const Base = () => null
			const Wrapped = withActions({
				foo
			})(Base)

			const target = mount(<Wrapped />)
			const props = target.find(Base).props()

			const args = ['bar', 'baz'].concat(
				// random length args to verify they're all passed through
				Array(Math.floor(10 * Math.random())).fill('quux')
			)

			props.actions.foo(...args)

			expect(foo).toHaveBeenLastCalledWith(...args)
		})

		it('should return promise from action even when synchronous', () => {
			const Base = () => null
			const Wrapped = withActions({
				foo() {}
			})(Base)

			const target = mount(<Wrapped />)
			const props = target.find(Base).props()

			expect(props.actions.foo()).toBeInstanceOf(Promise)
		})

		it('should update props of base with return value of action', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => ({ bar: 10 })
			})(Base)

			const target = mount(<Wrapped bar={5} />)

			await target.find(Base).prop('actions').foo()
			target.update() // tell enzyme things have changed

			expect(target.find(Base).prop('bar')).toBe(10)
		})

		it('should update props of base using updater function from action', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => ({ bar }) => ({ bar: bar + 5 })
			})(Base)

			const target = mount(<Wrapped bar={5} />)

			await target.find(Base).prop('actions').foo()
			target.update()

			expect(target.find(Base).prop('bar')).toBe(10)
		})

		it('should update props of base using async updater function from action', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => async ({ bar }) => ({ bar: bar + 5 })
			})(Base)

			const target = mount(<Wrapped bar={5} />)

			await target.find(Base).prop('actions').foo()
			target.update()

			expect(target.find(Base).prop('bar')).toBe(10)
		})

		it('should wait for promises and apply resolved state updates', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => Promise.resolve({ bar: 10 })
			})(Base)

			const target = mount(<Wrapped bar={5} />)

			await target.find(Base).prop('actions').foo()
			target.update() // tell enzyme things have changed

			expect(target.find(Base).prop('bar')).toBe(10)
		})

		it('should set isLoading to true while waiting for promises', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () =>
					new Promise((resolve) => {
						setTimeout(resolve, 200, { bar: 10 })
					})
			})(Base)

			const target = mount(<Wrapped bar={5} />)
			const promise = target.find(Base).prop('actions').foo()

			await Promise.resolve() // wait one microtask
			target.update()

			expect(target.find(Base).prop('isLoading')).toBe(true)

			await promise
			target.update()

			expect(target.find(Base).prop('isLoading')).toBe(false)
		})

		it(`shouldn't set isLoading back to false until everything is finished`, async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () =>
					new Promise((resolve) => {
						setTimeout(resolve, 200, { bar: 10 })
					})
			})(Base)

			const target = mount(<Wrapped bar={5} />)
			const promise1 = target.find(Base).prop('actions').foo()

			await new Promise((resolve) => {
				setTimeout(resolve, 100)
			})

			const promise2 = target.find(Base).prop('actions').foo()
			target.update()

			expect(target.find(Base).prop('isLoading')).toBe(true)

			await promise1
			target.update()

			expect(target.find(Base).prop('isLoading')).toBe(true)

			await promise2
			target.update()

			expect(target.find(Base).prop('isLoading')).toBe(false)
		})

		it('should update when outside props change but prefer state changes', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => ({ bar: 15 })
			})(Base)

			const target = mount(<Wrapped bar={5} />)

			target.setProps({ bar: 10 })
			target.update()

			expect(target.find(Base).prop('bar')).toBe(10)

			await target.find(Base).prop('actions').foo()
			target.update()

			expect(target.find(Base).prop('bar')).toBe(15)
		})

		it('should pass changed outside props to state updaters', async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => ({ bar }) => ({ bar: bar + 5 })
			})(Base)

			const target = mount(<Wrapped bar={5} />)

			target.setProps({ bar: 10 })
			target.update()

			await target.find(Base).prop('actions').foo()
			target.update()

			expect(target.find(Base).prop('bar')).toBe(15)
		})

		describe('actionsRef', () => {
			it('should pass actions to actionsRef on mount and null on unmount', async () => {
				const actionsRef = jest.fn()

				const Base = () => null
				const Wrapped = withActions({
					foo() {}
				})(Base)

				const target = mount(<Wrapped actionsRef={actionsRef} />)

				expect(actionsRef).toHaveBeenCalled()
				expect(actionsRef.mock.calls[0][0]).toHaveProperty('foo')

				target.unmount()

				expect(actionsRef).toHaveBeenLastCalledWith(null)
			})

			it('should pass all actions for rewrapped components', async () => {
				const actionsRef = jest.fn()

				const Base = () => null
				const Wrapped = withActions({
					bar() {}
				})(
					withActions({
						foo() {}
					})(Base)
				)

				mount(<Wrapped actionsRef={actionsRef} />)

				expect(actionsRef).toHaveBeenCalled()
				expect(actionsRef.mock.calls[0][0]).toHaveProperty('foo')
				expect(actionsRef.mock.calls[0][0]).toHaveProperty('bar')
			})
		})

		it(`shouldn't reset props when others change`, async () => {
			const Base = () => null
			const Wrapped = withActions({
				foo: () => ({ bar: 10 }),
				baz: () => ({ quux: 10 })
			})(Base)

			const target = mount(<Wrapped bar={5} quux={5} />)

			await target.find(Base).prop('actions').foo()
			await target.find(Base).prop('actions').baz()
			target.update() // tell enzyme things have changed

			expect(target.find(Base).prop('bar')).toBe(10)

			expect(target.find(Base).prop('quux')).toBe(10)
		})

		it('should get default state from second argument', async () => {
			const Base = () => null
			const Wrapped = withActions(
				{},
				{
					foo: 5
				}
			)(Base)

			const target = mount(<Wrapped />)

			expect(target.find(Base).prop('foo')).toBe(5)
		})
	})
})
