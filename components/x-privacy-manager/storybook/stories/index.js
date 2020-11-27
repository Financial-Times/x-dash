import { default as legislationCCPA } from './legislation-ccpa'
import { default as legislationGDPR } from './legislation-gdpr'

import { default as consentIndeterminate } from './consent-indeterminate'
import { default as consentAccepted } from './consent-accepted'
import { default as consentBlocked } from './consent-blocked'

import { default as saveFailed } from './save-failed'

export const stories = [
	legislationCCPA,
	legislationGDPR,
	consentIndeterminate,
	consentAccepted,
	consentBlocked,
	saveFailed
]
