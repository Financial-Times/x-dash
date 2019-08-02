import { h, Component } from '@financial-times/x-engine';
import generateAppLinks from './generate-app-links';
import generateRSSUrl from './generate-rss-url';

function mapConceptToAcastSeries (/** concept */) {
	return 'ft-test';
}

class PodcastLaunchers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rssUrl: null
		}
	}

	componentDidMount() {
		const { seriesConcept, acastRSSHost } = this.props;
		const acastSeries = mapConceptToAcastSeries(seriesConcept);
		if (acastSeries) {
			this.setState({
				rssUrl: generateRSSUrl(acastSeries, acastRSSHost)
			});
		}

	}

	render() {
		const { rssUrl } = this.state;
		return (
			<div className='x-podcast-launchers'>
				{rssUrl && (
					<ul>
					{generateAppLinks(rssUrl).map(({ name, url }) => (
						<li key={name}>
							<a href={url}>{name}</a>
						</li>
					))}
					<li>
						<input value={rssUrl}/>
						<button>Copy RSS</button>
					</li>
					</ul>
				)}
			</div>
		)
	}
}

export { PodcastLaunchers };
