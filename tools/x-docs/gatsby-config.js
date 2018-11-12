module.exports = {
	// The GitHub Pages deployment will be in this sub-folder
	pathPrefix: '/x-dash',
	polyfill: false,
	siteMetadata: {
		title: 'x-dash',
		siteUrl: 'https://financial-times.github.io/x-dash/',
		description: 'Shared front-end for FT.com and The App.'
	},
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'docs',
				path: './src/data'
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'docs',
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
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-prismjs',
					'gatsby-remark-autolink-headers',
					'gatsby-remark-external-links'
				]
			}
		},
		// Handles package manifest files (creates "NpmPackage" nodes)
		'gatsby-transformer-npm-package',
		// Handles YAML files (creates "YourFileNameYaml" nodes)
		'gatsby-transformer-yaml'
	]
};
