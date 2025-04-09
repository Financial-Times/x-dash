import * as React from 'react'

export type ConsentProxyEndpoint = Record<'core' | 'enhanced' | 'createOrUpdateRecord', string>
export type ConsentProxyEndpoints = Partial<{ [key in keyof ConsentProxyEndpoint]: string }>

export type TrackingKey =
  | 'advertising-toggle-allow'
  | 'advertising-toggle-block'
  | 'consent-allow'
  | 'consent-block'

export type TrackingKeys = Record<TrackingKey, string>

export interface CategoryPayload {
  onsite: {
    status: boolean
    lbi: boolean
    source: string
    fow: string
  }
}

type ConsentType = 'behaviouralAds' | 'demographicAds' | 'programmaticAds'
type ConsentData = Record<ConsentType, CategoryPayload>

interface ConsentPayload {
  formOfWordsId: string
  consentSource: string
  data: ConsentData
}

export type OnSaveCallback = (err: null | Error, data: { consent: boolean; payload: ConsentPayload }) => void

export interface SendConsentProps {
  setConsentCookie: boolean
  consentApiUrl: string
  onConsentSavedCallbacks: OnSaveCallback[]
  consentSource: string
  cookieDomain: string
  fow: FoWConfig
}

export interface _Response {
  ok: boolean
  status?: number
}

export interface Actions {
  onConsentChange: () => void
  sendConsent: (payload: SendConsentProps) => Promise<{ _response: _Response }>
}

export interface FoWConfig {
  id: string
  version: string
}

export interface ButtonLabel {
  label: string
  text?: string
}

export interface ButtonText {
  allow: ButtonLabel
  block: ButtonLabel
  submit: ButtonLabel
}

export interface PrivacyManagerProps {
  redirectUrl?: string
  consent?: boolean
  cookiesOnly?: boolean
  cookieDomain?: string
  buttonText?: ButtonText
  loginUrl?: string
  userId: string
  legislationId: string
  fow: FoWConfig
  consentSource: string
  consentProxyApiHost: string
  onConsentSavedCallbacks?: OnSaveCallback[]
}

export interface BasePrivacyManagerProps extends PrivacyManagerProps {
  actions: Actions
  isLoading?: boolean
  _response: _Response
}

export interface FormProps {
  consent: boolean
  consentApiUrl: string
  sendConsent: Actions['sendConsent']
  trackingKeys: TrackingKeys
  buttonText: ButtonText
  children: React.ReactElement
}

export { PrivacyManager } from '../src/privacy-manager'

export as namespace XPrivacyManager
