const addQueryParamToUrl = (name, value, url, append = true) => {
	const queryParam = `${name}=${value}`;
	return append === true ? `${url}&${queryParam}` : `${url}?${queryParam}`;
};

const separateFollowedAndNot = (suggestions, followedTopics) => {
	const matchingFollowedTopics = [];
	const matchingUnfollowedTopics = [];

	if (!followedTopic.length) {
		return { matchingFollowedTopics, matchingUnfollowedTopics: suggestions }
	}

	followedTopics.forEach(followedTopic => suggestions.forEach(suggestion => {
		if (suggestion.id === followedTopic.uuid) {
			matchingFollowedTopics.push(suggestion);
		} else {
			matchingUnfollowedTopics.push(suggestion)
		}
	}));

	return { matchingFollowedTopics, matchingUnfollowedTopics };
}

const suggest = function (suggestions, followedTopics) {

	if (suggestions.length) {
		suggestions.forEach((suggestion) => {
			if (suggestion && !suggestion.url){
				// TODO App needs different url?
				suggestion.url = '/stream/' + suggestion.id;
			}
		});

		return separateFollowedAndNot(suggestions, followedTopics);

	} else {
		return { matchingFollowedTopics: [], matchingUnfollowedTopics: [] };
	}
};


export default (searchTerm, maxSuggestions, apiUrl, followedTopics) => {

	const dataSrc = addQueryParamToUrl('count', maxSuggestions, apiUrl, false);
	const url = addQueryParamToUrl('partial', searchTerm.replace(' ', '+'), dataSrc);

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
