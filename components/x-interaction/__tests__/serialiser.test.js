import { Serialiser } from '../src/concerns/serialiser'
import * as registerComponent from '../src/concerns/register-component'
const { withActions } = require('../')
const xEngine = require('@financial-times/x-engine')

describe('serialiser', () => {
	let serialiser
	let Component
	let name
	beforeAll(() => {
		serialiser = new Serialiser()
		name = 'testComponent'
		Component = withActions({})(() => null)
	})

	it('pushes Component to data array in addData', () => {
		jest.spyOn(registerComponent, 'getComponent').mockReturnValue(Component)
		jest.spyOn(registerComponent, 'getComponentName').mockReturnValue(name)

		serialiser.addData('id', Component, {})

		expect(serialiser.data.length).toEqual(1)
	})

	it('throws Error if component is not registered in addData', () => {
		jest.spyOn(registerComponent, 'getComponent').mockReturnValue(undefined)

		expect(() => serialiser.addData('id', Component, {})).toThrow(
			`a Serialiser's addData was called for an unregistered component. ensure you're registering your component before attempting to output the hydration data`
		)
	})

	it('throws Error if serialiser is destroyed in addData', () => {
		serialiser.destroyed = true
		jest.spyOn(registerComponent, 'getComponent').mockReturnValue(Component)

		expect(() => serialiser.addData('id', Component, {})).toThrow(
			`an interaction component was rendered after flushHydrationData was called. ensure you're outputting the hydration data after rendering every component`
		)
	})

	it('throws Error if serialiser is destroyed in flushHydrationData', () => {
		serialiser.destroyed = true
		expect(() => serialiser.flushHydrationData()).toThrow(
			`a Serialiser's flushHydrationData was called twice. ensure you're not reusing a Serialiser between requests`
		)
	})

	it('returns data and sets destroyed to true if serialiser is not destroyed in flushHydrationData', () => {
		serialiser.destroyed = false
		serialiser.data = [{ id: 'id', component: Component, props: '' }]

		const data = serialiser.flushHydrationData()

		expect(data).toEqual(serialiser.data)
		expect(serialiser.destroyed).toEqual(true)
	})

	it('renders the hydration data in outputHydrationData', () => {
		const expectedData = {}
		jest.spyOn(xEngine, 'h').mockReturnValue('target')
		jest.spyOn(xEngine, 'render').mockReturnValue(expectedData)

		const data = serialiser.outputHydrationData()

		expect(xEngine.render).toHaveBeenCalled()
		expect(xEngine.h).toHaveBeenCalled()
		expect(data).toEqual(expectedData)
	})
})
