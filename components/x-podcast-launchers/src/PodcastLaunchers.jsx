import { h, Component } from '@financial-times/x-engine';
import { FollowButton } from '@financial-times/x-follow-button';
import generateAppLinks from './generate-app-links';
import generateRSSUrl from './generate-rss-url';
import acastSeriesIds from './config/series-ids';
import styles from './PodcastLaunchers.scss';
import copyToClipboard from './copy-to-clipboard';

const rssUrlWrapperInner = [
	styles["o-forms-input--suffix"],
	styles["o-forms-input--text"],
	styles["o-forms-input"]
].join(' ');

const noAppWrapperStyles = [
	'podcast-launchers__no-app-wrapper',
	styles.noAppWrapper
].join(' ');

function defaultFollowButtonRender (conceptId, conceptName, csrfToken, isFollowed) {
	return (
		<FollowButton
			conceptId={conceptId}
			conceptName={conceptName}
			csrfToken={csrfToken}
			isFollowed={isFollowed}
		/>);
}

class PodcastLaunchers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rssUrl: ''
		}
	}

	componentDidMount() {
		const { conceptId, acastRSSHost, acastAccessToken } = this.props;
		const acastSeries = acastSeriesIds.get(conceptId);
		if (acastSeries) {
			this.setState({
				rssUrl: generateRSSUrl(acastRSSHost, acastSeries, acastAccessToken)
			});
		}

	}

	render() {
		const { rssUrl } = this.state;
		const { conceptId, conceptName, csrfToken, isFollowed, renderFollowButton, showLinksOnAllBreakpoints = true } = this.props
		const followButton = typeof renderFollowButton === 'function' ? renderFollowButton : defaultFollowButtonRender;

		return rssUrl && (
			<div className={styles.container} data-trackable='podcast-launchers'>
				<h2 className={styles.headingChooseApp}>Subscribe via your installed podcast app</h2>
					<ul className={styles.podcastAppLinksWrapper}>
						{generateAppLinks(rssUrl).map(({ name, url, trackingId }) => (
							<li key={name} className={showLinksOnAllBreakpoints ? "" : styles.hidePodcastLinkAtWide}>
								<a
									href={url}
									className={styles.podcastAppLink}
									data-trackable={trackingId}>
									{name}
								</a>
							</li>
						))}

						<li key='Rss Url' className={styles.rssUrlWrapper}>
							<span className={rssUrlWrapperInner}>
								<input value={rssUrl} type='text' readOnly/>
									<button
										className={styles.rssUrlCopyButton}
										onClick={copyToClipboard}
										data-url={rssUrl}
										data-trackable='copy-rss'
										type='button'>
										Copy RSS
									</button>
							</span>
						</li>
					</ul>
				<div className={noAppWrapperStyles}>
					<h2 className={styles.headingNoApp}>Can’t see your podcast app?</h2>
					<p className={styles.textNoApp}>Get updates for new episodes</p>
					{followButton(conceptId, conceptName, csrfToken, isFollowed)}
				</div>
			</div>
		)
	}
}

export { PodcastLaunchers };
