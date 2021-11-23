import { normalisePost } from '../normalisePost'

describe('normalisePost', () => {
	it('does nothing if no post', () => {
		expect(normalisePost({})).toEqual({})
	})
	it('does not change id property if id property exists', () => {
		expect(
			normalisePost({
				id: 123,
				postId: 456
			})
		).toEqual({
			id: 123,
			postId: 456
		})
	})
	it('adds id property if doesnt it exist but postId property does', () => {
		expect(
			normalisePost({
				postId: 456
			})
		).toEqual({
			id: 456,
			postId: 456
		})
	})
})
