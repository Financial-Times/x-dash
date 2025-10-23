const { presets } = require('../')

exports.args = Object.assign(require('../__fixtures__/article.json'), presets.SmallHeavy, {
	allowLiveTeaserStyling: false
})

// This reference is only required for hot module loading in development
// <https://webpack.js.org/concepts/hot-module-replacement/>
exports.m = module
