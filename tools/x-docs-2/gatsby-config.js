module.exports = {
	// The GitHub Pages deployment will be in this sub-folder
	pathPrefix: '/x-dash',
	siteMetadata: {
		title: 'x-dash'
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: '../../docs'
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'components',
				path: '../../components'
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'packages',
				path: '../../packages'
			},
		},
		// Handles markdown files (creates "MarkdownRemark" nodes)
		'gatsby-transformer-remark',
		// Handles package manifest files (creates "NpmPackage" nodes)
		'gatsby-transformer-npm-package'
	]
};
