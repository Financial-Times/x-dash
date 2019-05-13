import { h } from '@financial-times/x-engine';

import HeroBody from '../HeroBody';

const HeroNoImage = ({ className, isCentered = false, hasStandfirst, ...teaserData }) => (
	<HeroBody
		className={className}
		hasStandfirst={hasStandfirst}
		hasMetaBorder
		isCentered={isCentered}
		{...teaserData}
	/>
);

export default HeroNoImage;
