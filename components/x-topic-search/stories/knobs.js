module.exports = (data, { select }) => {
	return {
		followedTopicIds() {
			return select(
				'Followed Topics',
				{
					None: [],
					'World Elephant Water Polo': ['f95d1e16-2307-4feb-b3ff-6f224798aa49'],
					'Brexit, Brexit Briefing, Brexit Unspun Podcast': [
						'19b95057-4614-45fb-9306-4d54049354db',
						'464cc2f2-395e-4c36-bb29-01727fc95558',
						'c4e899ed-157e-4446-86f0-5a65803dc07a'
					]
				},
				[]
			);
		}
	};
};
