import * as React from 'react'
import { trackingKeys } from '../src/utils'

export type ConsentProxyEndpoint = Record<'core' | 'enhanced' | 'createOrUpdateRecord', string>
export type ConsentProxyEndpoints = Partial<{ [key in keyof ConsentProxyEndpoint]: string }>

export type TrackingKey = typeof trackingKeys[number]
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

export type ConsentSavedCallback = (
  err: Error | null,
  data: { consent: boolean; payload: ConsentPayload | null }
) => void

export interface ConsentSavedProps {
  consent: boolean
  payload: ConsentPayload | null
  err: Error | null
  ok: boolean
}

export interface SendConsentProps {
  consentApiUrl: string
  consentSource: string
  cookieDomain: string
  fow: FoWConfig
  setConsentCookie: boolean
  onConsentSaved: (props: ConsentSavedProps) => _Response
}

interface ConsentResponseProps {
  isLoading: boolean
  consent: boolean
}

export type SendConsentResponse = (props: ConsentResponseProps) => Promise<{ _response: _Response }>

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
