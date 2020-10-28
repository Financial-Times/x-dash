export default [
	{
		name: 'Apple Podcasts',
		template: 'podcast://{url}',
		includeProtocol: false,
		trackingId: 'apple-podcasts'
	},
	{
		name: 'Overcast',
		template: 'overcast://x-callback-url/add?url={url}',
		includeProtocol: true,
		trackingId: 'overcast'
	},
	{
		name: 'Pocket Casts',
		template: 'pktc://subscribe/{url}',
		includeProtocol: false,
		trackingId: 'pocket-casts'
	},
	{
		name: 'Podcast Addict',
		template: 'podcastaddict://{url}',
		includeProtocol: false,
		trackingId: 'podcast-addict'
	},
	{
		name: 'Acast',
		template: 'acast://subscribe/{url}',
		includeProtocol: true,
		trackingId: 'acast'
	}
]
