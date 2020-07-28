import { h, Fragment } from '@financial-times/x-engine';
import { LiveBlogWrapper } from "./LiveBlogWrapper";
import { Serialiser, HydrationData } from '@financial-times/x-interaction';

const HydratedLiveBlogWrapper = (props) => {
	const serialiser = new Serialiser();

	return (
		<Fragment>
			<LiveBlogWrapper {...props} serialiser={serialiser} />
			<HydrationData serialiser={serialiser} />
		</Fragment>
	)
};

export { HydratedLiveBlogWrapper };
