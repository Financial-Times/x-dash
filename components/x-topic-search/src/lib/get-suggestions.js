const addQueryParamToUrl = (name, value, url, append = true) => {
	const queryParam = `${name}=${value}`;
	return append === true ? `${url}&${queryParam}` : `${url}?${queryParam}`;
};

const separateFollowedAndNot = (suggestions, followedTopics) => {
	const matchingFollowedTopics = [];
	const matchingNotFollowedTopics = [];

	followedTopics.forEach(followedTopic => suggestions.forEach(suggestion => {
		if (suggestion.id === followedTopic.uuid) {
			matchingFollowedTopics.push(suggestion);
		} else {
			matchingNotFollowedTopics.push(suggestion)
		}
	}));

	return { matchingFollowedTopics, matchingNotFollowedTopics };
}

const suggest = function (suggestions, followedTopics) {

	if (suggestions.length) {
		suggestions.forEach((suggestion) => {
			if (suggestion && !suggestion.url){
				// TODO App needs different url?
				suggestion.url = '/stream/' + suggestion.id;
			}
		});

		const {
			matchingFollowedTopics,
			matchingNotFollowedTopics
		} = separateFollowedAndNot(suggestions, followedTopics);

		if (matchingNotFollowedTopics.length) {
			return { status: 'suggestions', suggestions: matchingNotFollowedTopics };
		} else {
			return { status: 'all-followed', matchingFollowedTopics };
		}

	} else {
		return { status: 'no-suggestions' };
	}
};


export default (searchTerm, maxSuggestions, apiUrl, followedTopics) => {

	const dataSrc = addQueryParamToUrl('count', maxSuggestions, apiUrl, false);
	let url = addQueryParamToUrl('partial', searchTerm.replace(' ', '+'), dataSrc);

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		})
		.then(suggestions => {
			return suggest(suggestions, followedTopics)
		})
		.catch(() => {
			throw new Error();
		});

};
