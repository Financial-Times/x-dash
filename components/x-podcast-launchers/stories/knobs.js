module.exports = (data, { text }) => ({
	concept: text('Concept', data.concept),
	acastRSSHost: text('Acast RSS host', data.acastRSSHost),
})
