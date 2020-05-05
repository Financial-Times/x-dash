import { h } from '@financial-times/x-engine';

const LiveblogPost = (props) => (
	<div className='x-liveblogpost'>
		<h1>{props.title}</h1>
		{props.isBreakingNews && <span>Breaking News!!!</span> }
		<p dangerouslySetInnerHTML={{__html: props.content}} />
	</div>
);

export { LiveblogPost };
