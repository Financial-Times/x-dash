const { h } = require('@financial-times/x-engine')
const { mount } = require('@financial-times/x-test-utils/enzyme')
const renderer = require('react-test-renderer')
const { Teaser } = require('../')
const article = require('../__fixtures__/article.json')

describe('x-teaser / CustomSlotTop', () => {
	let props

	beforeEach(() => {
		props = {
			...article,
			showTitle: true
		}
	})

	it('should not render a custom slot top as default', () => {
		const tree = renderer.create(h(Teaser, props)).toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('render a custom slot top with a string', () => {
		const customSlotTopHTML = '<p>Some HTML</p>'
		props.showCustomSlotTop = true
		props.customSlotTop = customSlotTopHTML
		const subject = mount(<Teaser {...props} />)
		expect(subject.find('.x-teaser-custom-slot-top').html()).toBe(
			`<div class="x-teaser-custom-slot-top">${customSlotTopHTML}</div>`
		)
	})

	it('render a custom slot top with a React element', () => {
		props.showCustomSlotTop = true
		props.customSlotTop = <div className="custom-slot-top--with-react-element">Custom slot top content</div>
		const subject = mount(<Teaser {...props} />)
		expect(subject.find('.custom-slot-top--with-react-element')).toBeTruthy()
	})
})
