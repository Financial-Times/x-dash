import { brand } from '@financial-times/n-concept-ids';

export default function mapConceptToAcastSeries(conceptId) {
	switch(conceptId) {
		case brand.rachmanReviewPodcast:
			return 'therachmanreview';
		default:
			return null;
	}
}
