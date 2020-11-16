import { configure } from '@storybook/react'

configure(() => {
	require('../components/x-increment/storybook/index.jsx')
	require('../components/x-follow-button/storybook/index.jsx')
	require('../components/x-live-blog-post/storybook/index.jsx')
	require('../components/x-live-blog-wrapper/storybook/index.jsx')
	require('../components/x-teaser/storybook/index.jsx')
	require('../components/x-styling-demo/storybook/index.jsx')
	require('../components/x-gift-article/storybook/index.jsx')
	require('../components/x-podcast-launchers/storybook/index.jsx')
	require('../components/x-teaser-timeline/storybook/index.jsx')
	require('../components/x-privacy-manager/storybook/index.jsx')
}, module)
