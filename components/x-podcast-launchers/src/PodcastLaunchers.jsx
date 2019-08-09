import { h, Component } from '@financial-times/x-engine';
import generateAppLinks from './generate-app-links';
import generateRSSUrl from './generate-rss-url';
import mapConceptToAcastSeries from './map-concept-to-acast-series';
import styles from './PodcastLaunchers.css';
import copyToClipboard from './copy-to-clipboard';

const basicButtonStyles = [
	'o-buttons',
	'o-buttons--primary',
	'o-buttons--big'
].join(' ');

const podcastAppLinkStyles = [
	basicButtonStyles,
	styles['podcast-app-link']
].join(' ');

const rssUrlWrapperStyles = [
	'o-forms__affix-wrapper',
	styles['rss-url__wrapper']
].join(' ');

const rssUrlInputStyles = [
	'o-forms__text',
	styles['rss-url__input']
].join(' ');

const rssUrlCopyButtonWrapperStyles = [
	'o-forms__suffix',
	styles['rss-url__copy-button']
].join(' ');


class PodcastLaunchers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rssUrl: ''
		}
	}

	componentDidMount() {
		const { seriesConceptId, acastRSSHost, acastAccessToken } = this.props;
		const acastSeries = mapConceptToAcastSeries(seriesConceptId);
		if (acastSeries) {
			this.setState({
				rssUrl: generateRSSUrl(acastRSSHost, acastSeries, acastAccessToken)
			});
		}

	}

	render() {
		const { rssUrl } = this.state;
		return (
			<div className={styles['container']}>
				{rssUrl && (
					<div>
						<ul className={styles['podcast-app-links__wrapper']}>
						{generateAppLinks(rssUrl).map(({ name, url }) => (
							<li key={name}>
								<a href={url} className={podcastAppLinkStyles}>{name}</a>
							</li>
						))}
						</ul>
						<div className={rssUrlWrapperStyles}>
							<input className={rssUrlInputStyles} value={rssUrl} type='text' readOnly/>
							<div className={rssUrlCopyButtonWrapperStyles}>
								<button
									className={basicButtonStyles}
									onClick={copyToClipboard}
									data-url={rssUrl}>
									Copy RSS
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export { PodcastLaunchers };
