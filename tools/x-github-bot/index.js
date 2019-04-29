/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const colour = require('@quarterto/pretty-color-gen')

module.exports = app => {
	app.on(['pull_request.opened', 'pull_request.labeled'], async context => {
		const branch = context.payload.pull_request.head.ref

		const hasComponentLabel = context.payload.pull_request.labels.some(
			label => label.name === 'Component'
		)

		if(hasComponentLabel) {
			const {data: allLabels} = await context.github.issues.listLabelsForRepo(context.repo())

			const branchLabelExists = allLabels.some(
				label => label.name === branch
			)

			if(!branchLabelExists) {
				const params = context.repo({
					name: branch,
					color: colour(branch).slice(1),
					description: `Dev PRs for ${context.payload.pull_request.html_url}`,
					mediaType: {
						previews: ['symmetra']
					}
				})

				await context.github.issues.createLabel(params)
			}

			const {data: projects} = await context.github.projects.listForRepo(context.repo({
				mediaType: {
					previews: ['inertia']
				}
			}))

			const branchProjectExists = projects.some(
				project => project.name === branch
			)

			if(!branchProjectExists) {
				const params = context.repo({
					name: branch,
					body: `Development pull requests for ${branch} (${context.payload.pull_request.html_url})`,
					mediaType: {
						previews: ['inertia']
					}
				})

				await context.github.projects.createForRepo(params)
			}
		}
	})
}
