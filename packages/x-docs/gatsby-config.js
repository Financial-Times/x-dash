const path = require('path');
const findUp = require('find-up');
const fs = require('fs');

const repoBase = path.dirname(findUp.sync('lerna.json'));

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
				]
			}
		},
		'gatsby-plugin-doc-pages'
	].concat(
		// TODO find a nicer, gatsbier way of doing this
		fs.readdirSync(path.resolve(repoBase, 'packages'))
			.map(pkg => {
				const docsPaths = [
					path.resolve(repoBase, 'packages', pkg, 'src/docs'),
					path.resolve(repoBase, 'packages', pkg, 'docs'),
				];

				const docsPath = docsPaths.find(fs.existsSync);

				if(docsPath) {
					return {
						resolve: 'gatsby-source-filesystem',
						options: {
							name: `package-${pkg}`,
							path: docsPath,
						}
					};
				}
			})
			.filter(a => a)
	),
};
