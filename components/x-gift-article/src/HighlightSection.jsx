import { h, Component } from '@financial-times/x-engine'
import { ShareType } from './lib/constants'
import HighlightsMessage from './HighlightMessage'
import HighlightSavedMessage from './HighlightSavedMessage'
import HighlightCheckbox from './HighlightCheckbox'
import HighlightsApiClient from './lib/highlightsApi'

const USER_ANNOTATIONS_API = `https://local.ft.com:8010/v1`

class HighlightSection extends Component {
	constructor(props) {
		super(props)

		this.handleSaveAnnotations = this.handleSaveAnnotations.bind(this)
		this.handleCloseSuccessMessage = this.handleCloseSuccessMessage.bind(this)
		this.handleCloseRecipientMessage = this.handleCloseRecipientMessage.bind(this)

		this.state = {
			highlightsToken: new URL(location.href).searchParams.get('highlights'),
			showRecipientMessage: new URL(location.href).searchParams.has('highlights'),
			showSuccessMessage: false,
			showHighlightsCheckbox: !new URL(location.href).searchParams.has('highlights')
		}
	}

	async handleSaveAnnotations() {
		const highlightsAPIClient = new HighlightsApiClient(USER_ANNOTATIONS_API)
		const response = await highlightsAPIClient.copySharedHighlights(this.highlightsToken)

		if (response) {
			this.setState({
				showRecipientMessage: false,
				showSuccessMessage: true,
				showHighlightsCheckbox: true
			})
		}
	}

	handleCloseSuccessMessage() {
		this.setState({
			showSuccessMessage: false
		})
	}

	handleCloseRecipientMessage() {
		this.setState({
			showRecipientMessage: false
		})
	}

	render() {
		const { shareType, includeHighlights, includeHighlightsHandler, isGiftUrlCreated, hasHighlights } =
			this.props
		const { showRecipientMessage, showSuccessMessage, showHighlightsCheckbox } = this.state

		if (shareType === ShareType.enterprise && hasHighlights) {
			if (isGiftUrlCreated && includeHighlights) {
				return (
					<div className="x-gift-article__checkbox">
						<div className="x-gift-article__highlight-shared">highlights visible to recipients</div>
					</div>
				)
			}

			return (
				<div className="o-forms-input o-forms-input--checkbox  o-forms-field x-gift-article__checkbox">
					{showRecipientMessage ? (
						<HighlightsMessage
							handleSaveAnnotations={this.handleSaveAnnotations}
							handleCloseRecipientMessage={this.handleCloseRecipientMessage}
						/>
					) : null}
					{showSuccessMessage ? (
						<HighlightSavedMessage handleCloseSuccessMessage={this.handleCloseSuccessMessage} />
					) : null}
					{showHighlightsCheckbox ? (
						<HighlightCheckbox
							includeHighlights={includeHighlights}
							includeHighlightsHandler={includeHighlightsHandler}
							isGiftUrlCreated={isGiftUrlCreated}
						/>
					) : null}
				</div>
			)
		}
		return null
	}
}

export { HighlightSection }
