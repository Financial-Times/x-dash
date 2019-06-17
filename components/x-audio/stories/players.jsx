import buildStory from '../../../.storybook/build-story';
import baseConfig from './'
import createAudio from '../';
import { publicKnobs } from './knobs';

baseConfig.component = createAudio();
baseConfig.story = {
	title: 'App player',
	data: {
		title: 'Notre-Dame fire, Goldman slips, Netflix spend',
		seriesName: 'FT News Briefing',
		url: 'https://media.acast.com/ftnewsbriefing/tuesday-may7/media.mp3',
		options: {
			canExpand: true
		}
	}
}
baseConfig.knobs = publicKnobs;

buildStory(baseConfig);
