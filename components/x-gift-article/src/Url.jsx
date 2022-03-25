import { h } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'

export default ({ shareType, isGiftUrlCreated, url, urlType }) => {
	return (
		<span className="o-forms-input o-forms-input--text">
			<input
				type="text"
				name={urlType}
				value={url}
				className="x-gift-article__url-input"
				disabled={(shareType === ShareType.gift || shareType === ShareType.enterprise) && !isGiftUrlCreated}
				readOnly
				aria-label="Gift article shareable link"
			/>
		</span>
	)
}
