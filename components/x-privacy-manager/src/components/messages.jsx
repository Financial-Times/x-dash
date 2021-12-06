import { h } from '@financial-times/x-engine'
import s from '../privacy-manager.scss'

/**
 * Provide a way to return to the referrer's homepage
 * Potentially a Specialist Title, FT.com or FT App
 *
 * @param {string} href
 */
function renderRedirectLink(url) {
	let href
	let pathname

	try {
		url = new URL(decodeURIComponent(url))
		href = url.href
		pathname = url.pathname
	} catch (error) {
		href = '/'
		pathname = '/'
	}

	const label = pathname === '/' ? 'Return to homepage' : 'Return to the previous page'
	return (
		<a href={href} data-component="redirect-link" className="o-message__actions__secondary">
			{label}
		</a>
	)
}

function Message({ cls, children }) {
	return (
		<div className={cls} data-o-component="o-message">
			<div className="o-message__container">
				<div className="o-message__content ">
					<div className="o-message__content-main">{children}</div>
				</div>
			</div>
		</div>
	)
}

/**
 *
 * @param {{
 *   success: boolean
 *   redirectUrl: string
 * }} props
 */
export function ResponseMessage({ success, redirectUrl }) {
	const statusDict = {
		true: {
			cls: 'o-message--success',
			msg: 'Your settings have been saved on this device. Please apply your preferences to all of the devices you use to access our Sites.'
		},
		false: {
			cls: 'o-message--error',
			msg: 'Your settings could not be saved. Please try again later.'
		}
	}

	const status = statusDict[success]
	const cls = `o-message o-message--alert ${status.cls}`

	return (
		<Message cls={cls}>
			{status.msg}&nbsp;{renderRedirectLink(redirectUrl)}
		</Message>
	)
}

export function LoadingMessage() {
	const cls = 'o-message o-message--neutral'
	const spinnerCls = `o-loading o-loading--dark o-loading--small ${s['v-middle']}`

	return (
		<Message cls={cls}>
			<div className={spinnerCls}></div>
			<span className={s.loading}>Loading...</span>
		</Message>
	)
}

/**
 * @param {boolean} isLoading
 * @param {XPrivacyManager._Response} response
 * @param {string} redirectUrl
 */
export function renderMessage(isLoading, response, redirectUrl) {
	if (isLoading) return <LoadingMessage />
	if (response) return <ResponseMessage success={response.ok} redirectUrl={redirectUrl} />
	return null
}

/**
 * Display a warning to users
 * @param {string} [userId]
 */
export function renderLoggedOutWarning(userId, loginUrl) {
	if (userId) return null

	const cta = loginUrl ? <a href={loginUrl}>sign into your account</a> : 'sign into your account'

	return (
		<p className={`${s.consent__copy} ${s['consent__copy--cta']}`} data-component="login-cta">
			Please {cta} before submitting your preferences to ensure these changes are applied across all of your
			devices
		</p>
	)
}
