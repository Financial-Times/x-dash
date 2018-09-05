const GraphQlJson = require('graphql-type-json');

// This allows us to fetch the entire manifest without specifying every field \0/
module.exports = ({ type }) => {
	if (type.name === 'NpmPackage') {
		return {
			manifest: {
				type: GraphQlJson,
				resolve: (node) => node.manifest
			}
		};
	}
};
