import { h } from '@financial-times/x-engine';
import styles from './ContentBlock.scss';

const ContentBlock = (props) => {
	/**
	 * Notes:
	 *
	 * * textrendered, authordisplayname and keytext properties are temporary for testing purposes.
	 * 		Eventually, we would like to get rid of them.
	 * * Currently, we don't use content property. We need to replace textrendered with content.
	 * * At the moment article page does not pass articleUrl, therefore sharing links don't work.
	 * * At the moment, title is rendered twice (once in this component and once in the post body).
	 * 		This should be resolved when the data is cleaned in next-article.
	 */
	const {
		mid,
		title,
		content,
		time,
		isBreakingNews,
		articleUrl,
		keytext,
		textrendered,
		authordisplayname
	} = props;

	const shareUrl = articleUrl ? new URL(articleUrl) : null;
	if (shareUrl) {
		shareUrl.hash = `post-${mid}`;
	}

	const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&amp;text=${encodeURIComponent(title)}&amp;via=financialtimes`;
	const facebookUrl = `http://www.facebook.com/sharer.php?u=${encodeURIComponent(shareUrl)}&amp;t=${encodeURIComponent(title)}`;
	const linkedInUrl = `http://www.linkedin.com/shareArticle?mini=true&amp;url=${encodeURIComponent(shareUrl)}&amp;title=${encodeURIComponent(title)}&amp;source=Financial+Times`;

	return (
		<article className="live-post" id={`post-${mid}`} data-trackable="live-post">
			<div className="live-post__meta">
				<span className="live-post__author">{authordisplayname}</span>
				<time
					data-o-component="o-date"
					className="o-date article-info__timestamp"
					itemProp="datePublished"
					data-o-date-format={time.format}
					dateTime={time.iso}>{time.formatted}
				</time>
			</div>
			<strong className="live-post__key-event">{keytext}</strong>
			<h1 className={styles['live-post__title']}>{title}</h1>
			{isBreakingNews && <span>Breaking news!</span>}
			<div className="live-post__contents" dangerouslySetInnerHTML={{ __html: textrendered }} />

			<div
				data-o-component="o-share"
				data-o-share-location={`live-blog-post-${mid}`}
				className="o-share o-share--small">
				<ul data-toolbar="share">
					<li className="o-share__action" data-share="twitter">
						<a
							className="o-share__icon o-share__icon--twitter"
							rel="noopener"
							href={twitterUrl}
							data-trackable="twitter">
							<span className="o-share__text">Share on Twitter (opens new window)</span>
						</a>
					</li>
					<li className="o-share__action" data-share="facebook">
						<a
							className="o-share__icon o-share__icon--facebook"
							rel="noopener"
							href={facebookUrl}
							data-trackable="facebook">
							<span className="o-share__text">Share on Facebook (opens new window)</span>
						</a>
					</li>
					<li className="o-share__action" data-share="linkedin">
						<a
							className="o-share__icon o-share__icon--linkedin"
							rel="noopener"
							href={linkedInUrl}
							data-trackable="linkedin">
							<span className="o-share__text">Share on LinkedIn (opens new window)</span>
						</a>
					</li>
				</ul>
			</div>
		</article>
	);
};

export { ContentBlock };
