import sameLabel from '../src/concerns/same-label'

describe('same-label', () => {
	describe('when label matches context.parentLabel', () => {
		it('returns true', () => {
			const context = { parentLabel: 'Opinion' }
			const label = 'Opinion'
			expect(sameLabel(context, label)).toBe(true)
		})
	})

	describe('when label does not match context.parentLabel', () => {
		it('returns false', () => {
			const context = { parentLabel: 'Opinion' }
			const label = 'News'
			expect(sameLabel(context, label)).toBe(false)
		})
	})
})
