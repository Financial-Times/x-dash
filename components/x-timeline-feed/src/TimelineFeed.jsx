import { h } from '@financial-times/x-engine';
import { groupArticlesByLocalisedDate } from './lib/transform';

const TimelineFeed = ({ articles, timezoneOffset = 0 }) => {
	const articleGroups = groupArticlesByLocalisedDate(articles, timezoneOffset);

	return (
		<div className='x-timeline-feed'>
			<h1>x-timeline-feed</h1>
			{articleGroups.map(group => (
				<div key={group.date}>
					<h2>{group.title}</h2>
					<ul>
						{group.articles.map(article => (
							<li key={article.id}>{article.title}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export { TimelineFeed };
