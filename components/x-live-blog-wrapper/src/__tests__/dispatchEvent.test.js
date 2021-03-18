import { dispatchEvent } from '../dispatchEvent'

const CustomEventMock = jest.fn()
global.CustomEvent = CustomEventMock

const dispatchEventMock = jest.fn(() => {})

describe('dispatchEvent', () => {
	beforeAll(() => {
		jest.useFakeTimers()
	})
	afterAll(() => {
		dispatchEventMock.mockReset()
		CustomEventMock.mockReset()
		jest.useRealTimers()
	})
	it('does nothing if ran on the server with no window', () => {
		const originalWindow = global.window
		delete global.window
		dispatchEvent()
		jest.runAllTimers()
		expect(dispatchEventMock).not.toHaveBeenCalled()
		expect(CustomEventMock).not.toHaveBeenCalled()
		global.window = originalWindow
	})
	it('does loads if window', () => {
		const target = {
			dispatchEvent: dispatchEventMock
		}
		dispatchEvent(target, 'test', {
			foo: 'bar'
		})
		jest.runAllTimers()
		expect(dispatchEventMock).toHaveBeenCalled()
		expect(CustomEventMock).toHaveBeenCalledWith('test', {
			detail: {
				foo: 'bar'
			}
		})
	})
})
