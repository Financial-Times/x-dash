/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const colour = require('@quarterto/pretty-color-gen')

const botCreatedComment = '<!-- created and managed by x-github-bot. DO NOT EDIT -->'

const labelsPreview = {
	mediaType: {
		previews: ['symmetra']
	}
}

const projectsPreview = {
	mediaType: {
		previews: ['inertia']
	}
}

async function createOrGetLabelForBranch(context, branch) {
	const allLabels = await context.github.issues.listLabelsForRepo(context.repo()).then(res => res.data);

	const branchLabel = allLabels.find(
		label => label.name === branch
	)

	if(branchLabel) {
		return branchLabel
	} else {
		const params = context.repo({
			name: branch,
			color: colour(branch).slice(1)
		})

		return context.github.issues.createLabel(params).then(res => res.data)
	}
}

async function createProjectAndKanbanColumns(context, data) {
	const params = context.repo({
		...data,
		...projectsPreview
	})

	const {data: project} = await context.github.projects.createForRepo(params)

	// can't do these in parallel because then they might be out of order on the board
	const columns = [
		await context.github.projects.createColumn({ project_id: project.id, name: 'To do' }),
		await context.github.projects.createColumn({ project_id: project.id, name: 'In progress' }),
		await context.github.projects.createColumn({ project_id: project.id, name: 'Done' }),
	].map(res => res.data)

	return {project, columns}
}

async function createOrGetProjectForBranch(context, allProjects, branch) {
	const branchProject = allProjects.find(
		project => project.name === branch
			&& project.body.startsWith(botCreatedComment)
			&& project.state === 'open'
	)

	if(branchProject) {
		return branchProject
	} else {
		const {project} = await createProjectAndKanbanColumns(context, {
			name: branch,
			body: `${botCreatedComment}
Development pull requests for [${branch}](${context.payload.pull_request.html_url}).`,
		})

		return project
	}
}

async function maybeAddComponentToBoard(context, allProjects, project) {
	const foundProject = allProjects.find(
		project => project.name === 'Components' && project.body.startsWith(botCreatedComment)
	)

	const {project: componentsProject, columns} = foundProject
		? {project: foundProject, columns: await context.github.projects.listColumns(context.repo({
			project_id: foundProject.id
		})).then(res => res.data)}
		: await createProjectAndKanbanColumns(context, {
			name: 'Components',
			body: `${botCreatedComment}`,
		})

	const cardsInColumns = await Promise.all(
		columns.map(column => context.github.projects.listCards(context.repo({
			project_id: componentsProject.id,
			column_id: column.id,
			archived_state: 'not_archived'
		})).then(res => res.data))
	)

	const cards = [].concat(...cardsInColumns)
	const projectCard = cards.find(
		card => card.note === project.html_url
	)

	if(!projectCard) {
		await context.github.projects.createCard(context.repo({
			project_id: componentsProject.id,
			column_id: columns[0].id,
			note: project.html_url
		}))
	}

	return componentsProject
}

module.exports = app => {
	app.on(['pull_request.opened', 'pull_request.labeled'], async context => {
		const branch = context.payload.pull_request.head.ref

		const hasComponentLabel = context.payload.pull_request.labels.some(
			label => label.name === 'Component'
		)

		if(hasComponentLabel) {
			const allProjects = await context.github.projects.listForRepo(
				context.repo(projectsPreview)
			).then(res => res.data)

			const [label, project, comments] = await Promise.all([
				createOrGetLabelForBranch(context, branch),
				createOrGetProjectForBranch(context, allProjects, branch),
				context.github.issues.listComments(context.issue()).then(res => res.data),
			])

			const componentsProject = await maybeAddComponentToBoard(context, allProjects, project)

			const myComment = comments.find(comment => comment.body.startsWith(botCreatedComment))
			const body = `${botCreatedComment}
Thanks for opening a component pull request! I've created for you:

- the label \`${label.name}\`
- the project ${project.html_url}

If you create any development PRs for this component, please label them with \`${label.name}\` and they'll be automatically tracked by the project.

I've also added your component to the [components project board](${componentsProject.html_url}) so maintainers can keep an eye on its progress.
`
			if(myComment) {
				await context.github.issues.updateComment(context.issue({
					comment_id: myComment.id,
					body
				}))
			} else {
				await context.github.issues.createComment(context.issue({
					body
				}))
			}
		}
	})
}
