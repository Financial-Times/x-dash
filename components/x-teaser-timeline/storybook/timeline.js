exports.args = {
	items: require('./content-items.json'),
	timezoneOffset: -60,
	localTodayDate: '2018-10-17',
	latestItemsTime: '2018-10-17T12:10:33.000Z',
	customSlotContent: 'Custom slot content',
	customSlotPosition: 3
}

exports.argTypes = {
	latestItemsTime: {
		control: { type: 'select', options: { None: '', '2018-10-17T12:10:33.000Z': '2018-10-17T12:10:33.000Z' } }
	},
	customSlotContent: {
		control: { type: 'select', options: { None: '', Something: '---Custom slot content---' } }
	}
}

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module
