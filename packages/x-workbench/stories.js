const components = require('./register-components');

// Instead of arrays of arrays this hoists the names and titles of each component
// and associated stories into a more easily traversable map, e.g. map[component][story]
module.exports = components.reduce((map, { name, component, dependencies, stories }) => {
	map[name] = stories.reduce((map, { title, data }) => {
		map[title] = {
			data,
			title,
			component,
			dependencies
		};

		return map;
	}, {});

	return map;
}, {});
