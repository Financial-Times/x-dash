import React from 'react';

class StoryViewer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: 0
		};
	}

	onClick(index) {
		if (this.state.selected !== index) {
			this.setState({ selected: index });
		}
	}

	render() {
		const story = this.props.stories[this.state.selected];
		const queryString = `?selectedKind=${this.props.name}&selectedStory=${story}`;
		const iframeUrl = `../../storybook/iframe.html${queryString}`;
		const linkUrl = `../../storybook/index.html${queryString}`;

		return (
			<div id="component-demos" className="story-viewer">
				<h2 className="story-viewer__heading">Component demos</h2>
				<div className="story-viewer__list" role="tablist">
					{this.props.stories.map((story, i) => (
						<button
							key={`story-${i}`}
							role="tab"
							className="story-viewer__item"
							aria-selected={this.state.selected === i}
							onClick={this.onClick.bind(this, i)}>
							{story}
						</button>
					))}
				</div>
				<div className="story-viewer__panel" role="tabpanel">
					<iframe title={`${story} demo`} src={iframeUrl}></iframe>
				</div>
				<p className="story-viewer__footer">
					<a href={linkUrl}>View in Storybook</a>
				</p>
			</div>
		);
	}
}

export default StoryViewer;
