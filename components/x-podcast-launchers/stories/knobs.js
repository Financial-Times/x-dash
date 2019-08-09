module.exports = (data, { text }) => ({
	seriesConceptId: text('Concept', data.seriesConceptId),
	acastRSSHost: text('Acast RSS host', data.acastRSSHost),
	acastAccessToken: text('Acast Access token', data.acastAccessToken),
})
