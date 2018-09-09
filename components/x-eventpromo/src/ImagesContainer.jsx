import { h, Component } from '@financial-times/x-engine';
import Image from './Image';
import styles from './ImagesContainer.scss';

class ImagesContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			paused: false
		}
	}

	handleClick() {
		this.setState((state) => {
			return {paused: !state.paused};
		});
	}

	render()  {
		let classNames = styles['pause-button']
		if (this.state.paused) {
			classNames = classNames+' '+styles['pause-button--paused'];
		}
		return (
			<div className={styles['img-block']}>
				<button className={classNames}
								aria-label="control animation"
								onClick={() => this.handleClick()}
				/>
				{this.props.images.map((image, index) =>
					<Image key={index} linkUrl={this.props.link} imageUrl={image} fadeIndex={index} isPaused={this.state.paused}/>
				)}
			</div>
		);
	}
}

export default ImagesContainer;
