const {
	registerComponent,
	getComponentByName,
	getComponent,
	getComponentName
} = require('../src/concerns/register-component')
const { withActions } = require('../')

describe('registerComponent', () => {
	let name
	let Component
	beforeAll(() => {
		name = 'testComponent'
		Component = withActions({})(() => null)
	})

	it(`should register a component in registerComponent`, () => {
		registerComponent(Component, name)

		const actualComponent = getComponentByName(name)
		expect(actualComponent).toBeTruthy()
	})

	it('should throw an error if the component has already been registered', () => {
		expect(() => registerComponent(Component, name)).toThrow(
			'x-interaction a component has already been registered under that name, please use another name.'
		)
	})

	it('should throw an error if the component is not x-interaction wrapped', () => {
		const unwrappedComponentName = 'unwrappedComponent'
		const unwrappedComponent = { _wraps: null }

		expect(() => registerComponent(unwrappedComponent, unwrappedComponentName)).toThrow(
			'only x-interaction wrapped components (i.e. the component returned from withActions) can be registered'
		)
	})

	it('should get component that is already registered in getComponent', () => {
		expect(getComponent(Component)).toBeTruthy()
	})

	it('should get component by name in getComponentByName', () => {
		const actualComponent = getComponentByName(name)

		expect(actualComponent).toEqual(Component)
	})

	it('should get component name in getComponentName', () => {
		const actualName = getComponentName(Component)

		expect(actualName).toBe(name)
	})

	it('should return Unknown if Component is not registered in getComponentName', () => {
		const unregisteredComponent = withActions({})(() => null)

		const actualName = getComponentName(unregisteredComponent)

		expect(actualName).toBe('Unknown')
	})
})
