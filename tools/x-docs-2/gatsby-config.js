const path = require('path');

module.exports = {
	pathPrefix: '/x-dash',
	siteMetadata: {
		title: 'x-dash'
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: path.resolve('../../docs')
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'components',
				path: path.resolve('../../components')
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'packages',
				path: path.resolve('../../packages')
			},
		},
		// Handles markdown files (creates "MarkdownRemark" nodes)
		'gatsby-transformer-remark',
		// Handles package manifest files (creates "PackageJSON" nodes)
		'gatsby-plugin-package-json'
	]
};
