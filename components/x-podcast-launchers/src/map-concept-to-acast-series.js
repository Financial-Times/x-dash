import { brand } from '@financial-times/n-concept-ids';

const acastSeriesMap = new Map([
	[brand.rachmanReviewPodcast, 'therachmanreview']
]);

export default function mapConceptToAcastSeries(conceptId) {
	return acastSeriesMap.get(conceptId);
}
