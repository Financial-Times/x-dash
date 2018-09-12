import { h } from '@financial-times/x-engine';
import Image from './Image';
import styles from './ImagesContainer.scss';
import { withActions } from '@financial-times/x-interaction';

const withPauseActions = withActions(() => ({
	togglePause() {
		return ({isPaused}) => ({
			isPaused: !isPaused
		});
	},
}));

const BaseImagesContainer = ({isPaused, actions: {togglePause}, images, link}) => {
	let classNames = styles['pause-button'];

	if (isPaused) {
		classNames = classNames + ' ' + styles['pause-button--paused'];
	}
	return (
		<div className={styles['img-block']}>
			<button className={classNames}
							aria-label="control animation"
							onClick={togglePause}
			/>
			{images.map((image, index) =>
				<Image key={index} linkUrl={link} imageUrl={image} fadeIndex={index} isPaused={isPaused}/>
			)}
		</div>
	);
}

const ImagesContainer = withPauseActions(BaseImagesContainer);

export default ImagesContainer;
