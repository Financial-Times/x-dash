import { h } from '@financial-times/x-engine'

export default ({ title = '' }) => {
	return (
		<h2 className="x-gift-article__title" id="gift-article-title">
			{title}
		</h2>
	)
}
