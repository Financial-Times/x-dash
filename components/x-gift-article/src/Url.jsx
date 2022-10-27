import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export default ({ shareType, isGiftUrlCreated, url, urlType, ariaLabel }) => {
	return (
		<span className="o-forms-input o-forms-input--text">
			<label for="share-link">{ariaLabel}</label>
			<input
				id="share-link"
				type="text"
				name={urlType}
				value={url}
				className="x-gift-article__url-input"
				disabled={(shareType === ShareType.gift || shareType === ShareType.enterprise) && !isGiftUrlCreated}
				readOnly
			/>
		</span>
	)
}
