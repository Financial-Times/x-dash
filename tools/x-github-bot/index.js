/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */

const colour = require('@quarterto/pretty-color-gen')

const botCreatedComment = '<!-- created and managed by x-github-bot. DO NOT EDIT -->'

const projectsPreview = {
	mediaType: {
		previews: ['inertia']
	}
}

async function createOrGetLabelForBranch(context, allLabels, branch) {
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

async function maybeAddCardToBoard(context, {project, columns, card, isSameCard}) {
	const cardsInColumns = await Promise.all(
		columns.map(column => context.github.projects.listCards(context.repo({
			project_id: project.id,
			column_id: column.id,
			archived_state: 'not_archived',
			...projectsPreview,
		})).then(res => res.data))
	)

	const cards = [].concat(...cardsInColumns)
	const projectCard = cards.find(isSameCard)

	if(projectCard) {
		return projectCard
	} else {
		return context.github.projects.createCard(context.repo({
			project_id: project.id,
			column_id: columns[0].id,
			...card,
			...projectsPreview,
		}))
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

	await maybeAddCardToBoard(context, {
		project: componentsProject,
		columns,
		card: {
			note: project.html_url
		},
		isSameCard: card => card.note === project.html_url
	})

	return componentsProject
}

async function createOrUpdateComment(context, allComments, {id, body, replace = true}) {
	const botCreatedWithId = botCreatedComment.replace('-->', `${id} -->`)
	const myComment = allComments.find(comment => comment.body.startsWith(botCreatedWithId))

	if(myComment) {
		if(replace) {
			return context.github.issues.updateComment(context.issue({
				comment_id: myComment.id,
				body: `${botCreatedWithId}
${body}`
			}))
		} else {
			await context.github.issues.deleteComment(context.issue({
				comment_id: myComment.id,
			}))
		}
	}

	await context.github.issues.createComment(context.issue({
		body: `${botCreatedWithId}
${body}`
	}))
}

module.exports = app => {
	app.on(['pull_request.opened', 'pull_request.labeled', 'pull_request.unlabeled'], async context => {
		const branch = context.payload.pull_request.head.ref

		const [allLabels, allProjects, allComments] = (await Promise.all([
			context.github.issues.listLabelsForRepo(context.repo()),
			context.github.projects.listForRepo(context.repo(projectsPreview)),
			context.github.issues.listComments(context.issue()),
		])).map(res => res.data);

		const labelNames = new Set(context.payload.pull_request.labels.map(label => label.name))

		const projectsForPR = allProjects.filter(
			project => labelNames.has(project.name)
				&& project.body.startsWith(botCreatedComment)
				&& project.state === 'open'
		)

		const projectForPR = projectsForPR[0]
		const [, componentPRUrl] = (projectForPR && projectForPR.body.match(/\((.+)\)$/)) || []

		const hasComponentLabel = labelNames.has('Component')

		if(projectsForPR.length > 1) {
			await createOrUpdateComment(context, allComments, {
				id: 'too-many-labels',
				replace: false,
				body: `This pull request has multiple component labels (${projectsForPR.map(project => '`' + project.name + '`').join(', ')}). Please remove all but one of these labels.`
			})
		} else if(projectForPR && hasComponentLabel) {
			await createOrUpdateComment(context, allComments, {
				id: 'inconsistent-labels',
				replace: false,
				body: `This pull request is labelled with \`Component\`, implying it's a PR for a new component, and \`${projectForPR.name}\`, implying it's a PR for development of the [${projectForPR.name} component](${componentPRUrl}). Please remove one of these labels.`
			})
		} else if(projectForPR) {
			if(context.payload.pull_request.base.ref !== projectForPR.name) {
				await createOrUpdateComment(context, allComments, {
					id: 'wrong-base',
					replace: false,
					body: `This pull request is labelled with \`${projectForPR.name}\`, implying it's a PR for development of the [${projectForPR.name} component](${componentPRUrl}), but it's not targeting the component's branch. Please change the base branch of the PR to \`${projectForPR.name}\`.`
				})
			} else {
				const {data: columns} = await context.github.projects.listColumns(context.repo({
					project_id: projectForPR.id,
					...projectsPreview
				}))

				const card = await maybeAddCardToBoard(context, {
					project: projectForPR,
					columns,
					card: {
						content_id: context.payload.pull_request.id,
						content_type: 'PullRequest'
					},
					isSameCard: card => card.content_id === context.payload.pull_request.id
				})

				await createOrUpdateComment(context, allComments, {
					id: 'everything-good',
					body: `This pull request has been added to the [${projectForPR.name} board](${projectForPR.html_url}#card-${card.id}).`
				})
			}
		} else if(hasComponentLabel) {
			const [label, project] = await Promise.all([
				createOrGetLabelForBranch(context, allLabels, branch),
				createOrGetProjectForBranch(context, allProjects, branch),
			])

			const componentsProject = await maybeAddComponentToBoard(context, allProjects, project)

			const body = `Thanks for opening a component pull request! I've created for you:

- the label \`${label.name}\`
- the project ${project.html_url}

If you create any development PRs for this component, please label them with \`${label.name}\` and they'll be automatically tracked by the project.

I've also added your component to the [components project board](${componentsProject.html_url}) so maintainers can keep an eye on its progress.
`
			await createOrUpdateComment(context, allComments, {
				id: 'everything-good',
				body,
			})
		}
	})
}
