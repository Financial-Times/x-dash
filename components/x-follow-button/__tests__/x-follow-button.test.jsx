const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')

import { FollowButton } from '../src/FollowButton'

describe('x-follow-button', () => {
	describe('concept name', () => {
		it('when conceptNameAsButtonText prop is true, and the topic name is provided, the button is named by this name', () => {
			const subject = mount(
				<FollowButton conceptNameAsButtonText={true} conceptName={'dummy concept name'} />
			)
			expect(subject.find('button').text()).toEqual('dummy concept name')
		})

		it('when conceptNameAsButtonText prop is false, the button has a default name', () => {
			const subject = mount(
				<FollowButton conceptNameAsButtonText={false} conceptName={'dummy concept name'} />
			)
			expect(subject.find('button').text()).toEqual('Add to myFT')
		})

		it('when conceptNameAsButtonText prop is true, and the topic name is not provided, the button has a default name', () => {
			const subject = mount(<FollowButton conceptNameAsButtonText={true} />)
			expect(subject.find('button').text()).toEqual('Add to myFT')
		})

		it('when conceptNameAsButtonText prop is not provided, the button has a default name', () => {
			const subject = mount(<FollowButton />)
			expect(subject.find('button').text()).toEqual('Add to myFT')
		})
	})
	describe('conceptId prop', () => {
		it('assigns conceptId prop to data-concept-id attribute of the button', async () => {
			const subject = mount(<FollowButton conceptId={'dummy-id'} />)
			expect(subject.find('button').prop('data-concept-id')).toEqual('dummy-id')
		})

		it('assigns conceptId prop to data-concept-id attribute of the form', async () => {
			const subject = mount(<FollowButton conceptId={'dummy-id'} />)
			expect(subject.find('form').prop('data-concept-id')).toEqual('dummy-id')
		})
	})

	describe('form action', () => {
		it('assigns follow-plus-digest-email put action if followPlusDigestEmail is true', async () => {
			const subject = mount(<FollowButton followPlusDigestEmail={true} conceptId={'dummy-id'} />)
			expect(subject.find('form').prop('action')).toEqual(
				'/__myft/api/core/follow-plus-digest-email/dummy-id?method=put'
			)
		})

		it('assigns followed/concept delete action if isFollowed is true', async () => {
			const subject = mount(<FollowButton isFollowed={true} conceptId={'dummy-id'} />)
			expect(subject.find('form').prop('action')).toEqual(
				'/__myft/api/core/followed/concept/dummy-id?method=delete'
			)
		})

		it('assigns followed/concept put action if isFollowed and followPlusDigestEmail are not passed', async () => {
			const subject = mount(<FollowButton conceptId={'dummy-id'} />)
			expect(subject.find('form').prop('action')).toEqual(
				'/__myft/api/core/followed/concept/dummy-id?method=put'
			)
		})
	})

	describe('isFollowed', () => {
		describe('when true', () => {
			it('button text is "Added"', () => {
				const subject = mount(<FollowButton isFollowed={true} />)
				expect(subject.find('button').text()).toEqual('Added')
			})

			it('button aria-pressed is "true"', () => {
				const subject = mount(<FollowButton isFollowed={true} />)
				expect(subject.find('button').prop('aria-pressed')).toEqual('true')
			})

			it('button title is "Remove ConceptName from myFT"', () => {
				const subject = mount(<FollowButton isFollowed={true} conceptName={'ConceptName'} />)
				expect(subject.find('button').prop('title')).toEqual('Remove ConceptName from myFT')
			})

			it('button aria-label is "Remove conceptName from myFT"', () => {
				const subject = mount(<FollowButton isFollowed={true} conceptName={'ConceptName'} />)
				expect(subject.find('button').prop('aria-label')).toEqual('Remove ConceptName from myFT')
			})
		})

		describe('when false', () => {
			it('button text is "Add to myFT"', () => {
				const subject = mount(<FollowButton isFollowed={false} />)
				expect(subject.find('button').text()).toEqual('Add to myFT')
			})

			it('button aria-pressed is "false"', () => {
				const subject = mount(<FollowButton isFollowed={false} />)
				expect(subject.find('button').prop('aria-pressed')).toEqual('false')
			})

			it('button title is "Add ConceptName to myFT"', () => {
				const subject = mount(<FollowButton isFollowed={false} conceptName={'ConceptName'} />)
				expect(subject.find('button').prop('title')).toEqual('Add ConceptName to myFT')
			})

			it('button aria-label is "Add ConceptName to myFT"', () => {
				const subject = mount(<FollowButton isFollowed={false} conceptName={'ConceptName'} />)
				expect(subject.find('button').prop('aria-label')).toEqual('Add ConceptName to myFT')
			})
		})
	})

	describe('followPlusDigestEmail', () => {
		describe('when true', () => {
			it('form has data-myft-ui-variant property which is true', () => {
				const subject = mount(<FollowButton followPlusDigestEmail={true} />)
				expect(subject.find('form').prop('data-myft-ui-variant')).toEqual(true)
			})

			it('button has data-trackable-context-messaging property which is add-to-myft-plus-digest-button', () => {
				const subject = mount(<FollowButton followPlusDigestEmail={true} />)
				expect(subject.find('button').prop('data-trackable-context-messaging')).toEqual(
					'add-to-myft-plus-digest-button'
				)
			})
		})

		describe('when false', () => {
			it('form has data-myft-ui-variant property which is true', () => {
				const subject = mount(<FollowButton followPlusDigestEmail={false} />)
				expect(subject.find('form').prop('data-myft-ui-variant')).toEqual(undefined)
			})

			it('button has data-trackable-context-messaging property which is add-to-myft-plus-digest-button', () => {
				const subject = mount(<FollowButton followPlusDigestEmail={false} />)
				expect(subject.find('button').prop('data-trackable-context-messaging')).toEqual(null)
			})
		})
	})

	describe('form properties', () => {
		it('method = GET', () => {
			const subject = mount(<FollowButton />)
			expect(subject.find('form').prop('method')).toEqual('GET')
		})
	})

	describe('button properties', () => {
		it('data-trackable="follow"', () => {
			const subject = mount(<FollowButton />)
			expect(subject.find('button').prop('data-trackable')).toEqual('follow')
		})

		it('type="submit"', () => {
			const subject = mount(<FollowButton />)
			expect(subject.find('button').prop('type')).toEqual('submit')
		})
	})

	describe('csrf token', () => {
		it('if passed creates an invisible input field', () => {
			const subject = mount(<FollowButton csrfToken={'dummyToken'} />)
			expect(subject.find('input').prop('value')).toEqual('dummyToken')
			expect(subject.find('input').prop('type')).toEqual('hidden')
			expect(subject.find('input').prop('name')).toEqual('token')
			expect(subject.find('input').prop('data-myft-csrf-token')).toEqual(true)
		})

		it('if not passed an invisible input field is not created', () => {
			const subject = mount(<FollowButton csrf={'dummyToken'} />)
			expect(subject.find('input')).toEqual({})
		})
	})
})
