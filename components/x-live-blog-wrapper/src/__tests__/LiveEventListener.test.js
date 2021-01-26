import { listenToLiveBlogEvents } from '../LiveEventListener'

const addEventListenerMock = jest.fn()
const EventSourceMock = jest.fn(() => {
	return {
		addEventListener: addEventListenerMock
	}
})
global.EventSource = EventSourceMock

const dispatchEventMock = jest.fn()
jest.spyOn(document, 'querySelector').mockImplementation(() => {
	return {
		dispatchEvent: dispatchEventMock
	}
})

describe('liveEventListener', () => {
	describe('EventSource', () => {
		it('should default to the live URL', () => {
			listenToLiveBlogEvents({})
			expect(EventSourceMock).toHaveBeenCalledWith('https://next-live-event.ft.com/v2/liveblog/undefined', {
				withCredentials: true
			})
		})

		it('should allow baseUrl to be overriden for testing', () => {
			global.LIVE_EVENT_API_URL = 'http://localhost:5000'
			listenToLiveBlogEvents({})
			expect(EventSourceMock).toHaveBeenCalledWith('http://localhost:5000/v2/liveblog/undefined', {
				withCredentials: true
			})
			delete global.LIVE_EVENT_API_URL
		})

		it('should use the liveBlogPackageUuid as a source', () => {
			listenToLiveBlogEvents({ liveBlogPackageUuid: 1234 })
			expect(EventSourceMock).toHaveBeenCalledWith('https://next-live-event.ft.com/v2/liveblog/1234', {
				withCredentials: true
			})
		})
	})

	describe('listening to events', () => {
		afterAll(() => {
			addEventListenerMock.mockReset()
			dispatchEventMock.mockReset()
		})
		it('throws exception if no stringified data', () => {
			addEventListenerMock.mockImplementation((event, handler) => {
				handler({})
			})
			expect(() => {
				listenToLiveBlogEvents({})
			}).toThrow('Unexpected token')
		})
		it('if actions are supplied, they should be called', () => {
			addEventListenerMock.mockImplementation((event, handler) => {
				handler({
					data: JSON.stringify({
						id: 1234
					})
				})
			})
			listenToLiveBlogEvents({
				actions: {
					insertPost: (event, wrapper) => {
						expect(wrapper).toEqual({
							dispatchEvent: dispatchEventMock
						})
						expect(event).toEqual({
							id: 1234
						})
					}
				}
			})
		})
		it('if no actions supplied, then an event should be dispatched', () => {
			addEventListenerMock.mockImplementation((event, handler) => {
				handler({
					data: JSON.stringify({
						id: 1234
					})
				})
			})
			listenToLiveBlogEvents({})
			expect(dispatchEventMock).toHaveBeenCalled()
		})
	})
})
