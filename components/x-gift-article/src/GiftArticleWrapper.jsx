import { h } from '@financial-times/x-engine';
import { GiftArticlePropsComposer } from './lib/props-composer';
import { GiftArticle } from './GiftArticle';

const GiftArticleWrapper = (props) => {
	const isCopySupported = document.queryCommandSupported && document.queryCommandSupported('copy');
	const propsComposer = new GiftArticlePropsComposer(props, isCopySupported);
	const composedProps = propsComposer.getDefault();
	composedProps.composer = propsComposer;

	return <GiftArticle {...composedProps}/>;
};;

export { GiftArticleWrapper };
