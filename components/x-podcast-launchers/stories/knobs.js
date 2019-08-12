module.exports = (data, { text }) => ({
	conceptId: text('Concept', data.conceptId),
	acastRSSHost: text('Acast RSS host', data.acastRSSHost),
	acastAccessToken: text('Acast Access token', data.acastAccessToken),
})
