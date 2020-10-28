module.exports = (data, { text }) => ({
	conceptId: text('Concept id', data.conceptId),
	acastRSSHost: text('Acast RSS host', data.acastRSSHost),
	acastAccessToken: text('Acast Access token', data.acastAccessToken)
})
