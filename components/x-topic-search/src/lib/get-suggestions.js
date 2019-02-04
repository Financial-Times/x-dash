const addQueryParamToUrl = (name, value, url, append = true) => {
	const queryParam = `${name}=${value}`;

	return append === true ? `${url}&${queryParam}` : `${url}?${queryParam}`;
};

export default (searchTerm, maxSuggestions, apiUrl) => {
	const dataSrc = addQueryParamToUrl('count', maxSuggestions, apiUrl, false);
	const url = addQueryParamToUrl('partial', searchTerm.replace(' ', '+'), dataSrc);

	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return response.json();
		})
		.then(suggestions => ({ suggestions }));
};
