import { h } from '@financial-times/x-engine'
import { FooterMessage } from './FooterMessage'

export const Footer = (props) => {
	return (
		<footer className="share-article-dialog__footer">
			<FooterMessage {...props} />
		</footer>
	)
}
