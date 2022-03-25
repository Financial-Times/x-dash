import { h } from '@financial-times/x-engine'

export default ({ publishedTimestamp }) => {
	const now = new Date()
	const oneDay = 24 * 60 * 60 * 1000
	const date = new Date(publishedTimestamp)
	const formatted = date.toLocaleString()

	let format
	let showExactTime

	if (now.getTime() - date.getTime() < oneDay) {
		// display published date in 'xx minutes ago' format
		// and render exact time next to it
		format = 'time-ago-no-seconds'
		showExactTime = true
	} else {
		// don't display time string if the post is older than one day
		// because it is already included in the formatted timestamp
		format = 'MMM dd, HH:mm'
		showExactTime = false
	}

	return (
		<div className="x-live-blog-post__timestamp-container">
			<time
				data-o-component="o-date"
				className="o-date x-live-blog-post__timestamp"
				dateTime={publishedTimestamp}
				data-o-date-format={format}
				itemProp="datePublished"
			>
				<span data-o-date-printer>{formatted}</span>
				{showExactTime && (
					<span
						className="o-date x-live-blog-post__timestamp-exact-time"
						data-o-date-printer
						data-o-date-format="HH:mm"
						itemProp="exactTime"
					></span>
				)}
			</time>
		</div>
	)
}
