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
export function getLoginPrompt({ userId, loginUrl }) {
	if (userId && userId.length > 0) return undefined;

	const callToAction =
		loginUrl && loginUrl.length > 0
			? `<a href="${loginUrl}">sign into your account</a>`
			: `sign into your account`;

	return `<p>Please ${callToAction} before submitting your preferences to ensure these changes are applied across all of your devices</p>`;
}
