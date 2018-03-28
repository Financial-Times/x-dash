const path = require('path');

module.exports = {
	siteMetadata: {
		title: 'Gatsby Default Starter',
	},
	plugins: [
		'gatsby-plugin-react-next',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-packages',
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				includePaths: path.resolve(__dirname, 'bower_components')
			}
		},
		'gatsby-plugin-home-layout',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-prismjs',
					'gatsby-remark-autolink-headers',
					'gatsby-remark-external-links',
					'gatsby-remark-emoji',
				],
			},
		},
		'gatsby-plugin-doc-pages'
	]
};
