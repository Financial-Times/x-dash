import { h, Component } from '@financial-times/x-engine';
import { FollowButton } from '@financial-times/x-follow-button';
import generateAppLinks from './generate-app-links';
import generateRSSUrl from './generate-rss-url';
import acastSeriesIds from './config/series-ids';
import styles from './PodcastLaunchers.scss';
import copyToClipboard from './copy-to-clipboard';

const basicButtonStyles = [
	'o-buttons',
	'o-buttons--primary',
	'o-buttons--big'
].join(' ');

const podcastAppLinkStyles = [
	basicButtonStyles,
	styles.podcastAppLink
].join(' ');

const rssUrlWrapperStyles = [
	'o-forms-input',
	'o-forms-input--suffix',
	'o-forms-input--text',
	styles.rssUrlWrapper
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
		const { conceptId, conceptName, csrfToken, isFollowed, renderFollowButton } = this.props
		const followButton = typeof renderFollowButton === 'function' ? renderFollowButton : defaultFollowButtonRender;

		return rssUrl && (
			<div className={styles.container} data-trackable='podcast-launchers'>
				<h2 className={styles.headingChooseApp}>Subscribe via your installed podcast app</h2>
				<ul className={styles.podcastAppLinksWrapper}>
					{generateAppLinks(rssUrl).map(({ name, url, trackingId }) => (
						<li key={name}>
							<a
								href={url}
								className={podcastAppLinkStyles}
								data-trackable={trackingId}>
								{name}
							</a>
						</li>
					))}

					<li key='Rss Url' className={rssUrlWrapperStyles}>
						<input className={styles.rssUrlInput} value={rssUrl} type='text' readOnly/>
						<div className={styles.rssUrlCopyButton}>
							<button
								className={basicButtonStyles}
								onClick={copyToClipboard}
								data-url={rssUrl}
								data-trackable='copy-rss'
								type='button'>
								Copy RSS
							</button>
						</div>
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
