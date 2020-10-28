const { Button } = require('../')

exports.component = Button
exports.package = require('../package.json')
exports.stories = [require('./styling')]

exports.knobs = (data, { boolean }) => ({
	danger() {
		return boolean('Danger', data.danger)
	},

	large() {
		return boolean('Large', data.large)
	}
})
