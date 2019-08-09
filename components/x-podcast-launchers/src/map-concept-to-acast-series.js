import { brand } from '@financial-times/n-concept-ids';

export default function mapConceptToAcastSeries(conceptId) {
	switch(conceptId) {
		case brand.rachmanReviewPodcast:
			return 'ft-test';
		default:
			return null;
	}
}
