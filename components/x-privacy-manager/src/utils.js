/// <reference path="./types.d.ts" />

/**
 * Determine whether to display a prompt to the user to log in
 *
 * Specifying the loginUrl will make the Call To Action clickable
 *
 * @param   {Object}  [args]
 * @param   {string}  [args.userId]    Used as a proxy for whether the user is logged in
 * @param   {string}  [args.loginUrl]  The URL of the app's login page
 *
 * @return  {string | undefined}
 */
export function getLoginPrompt({ userId, loginUrl } = {}) {
	// User is logged in: return `undefined`
	if (userId && userId.length > 0) return undefined;

	// Add a link to the signin page if one is provided
	const callToAction =
		loginUrl && loginUrl.length > 0
			? `<a href="${loginUrl}">sign into your account</a>`
			: `sign into your account`;

	return `<p>Please ${callToAction} before submitting your preferences to ensure these changes are applied across all of your devices</p>`;
}

/**
 * Create a dictionary of URLs to send the user's choice to
 * Consumed by the component's `consentProxyEndpoints` prop
 * 
 * @param {Object} args
 * @param {string} args.userId
 * @param {string} args.consentProxyApiHost
 * @param {boolean} args.cookiesOnly
 * 
 * @return {ConsentProxyEndpoints}
 */
export function getConsentProxyEndpoints({
	userId,
	consentProxyApiHost,
	cookiesOnly = false
}) {
	const endpointDefault = `${consentProxyApiHost}/__consent/consent-record-cookie`;

	if (userId && !cookiesOnly) {
		const endpointCore = `${consentProxyApiHost}/__consent/consent-record/FTPINK/${userId}`;
		const endpointEnhanced = `${consentProxyApiHost}/__consent/consent/FTPINK/${userId}`;

		return {
			core: endpointCore,
			enhanced: endpointEnhanced,
			createOrUpdateRecord: endpointCore
		};
	}

	return {
		core: endpointDefault,
		enhanced: endpointDefault,
		createOrUpdateRecord: endpointDefault,
	};
}

/**
 * Test whether a cookie contains all the required choices set to "on" (or is undefined)
 *
 * @param   {string}  cookieVal
 *
 * @return  {boolean}
 */
export function hasRequiredFTConsent(cookieVal) {
	if (cookieVal === undefined) {
		return true;
	}

	const optIns = ['behaviouraladsOnsite:on', 'demographicadsOnsite:on', 'programmaticadsOnsite:on'];
	const consentArr = decodeURIComponent(cookieVal).split(',');
	return optIns.every(optIn => consentArr.includes(optIn));
}

/**
 * Test whether a user has opted in under USPrivacy legislation (or has never made a choice)
 *
 * @param   {string}  cookieVal
 *
 * @return  {boolean}
 */
function hasUSPrivacyConsent(cookieVal) {
	return cookieVal === undefined || cookieVal === '1YNN';
}

/**
 * Aggregate a user's choice re USPrivacy to produce a synthetic result
 *
 * @param   {string}  FTConsent
 * @param   {string}  USPrivacy
 *
 * @return  {boolean}
 */
export function isOptedIn(FTConsent, USPrivacy) {
	return hasRequiredFTConsent(FTConsent) && hasUSPrivacyConsent(USPrivacy);
}