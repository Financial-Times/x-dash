import * as React from 'react'

declare module '*.scss' {
  export const content: { [className: string]: string }
}

type ConsentProxyEndpoint = Record<'core' | 'enhanced' | 'createOrUpdateRecord', string>
type ConsentProxyEndpoints = Partial<{ [key in keyof ConsentProxyEndpoint]: string }>

type TrackingKey = 'advertising-toggle-allow' | 'advertising-toggle-block' | 'consent-allow' | 'consent-block'

interface CategoryPayload {
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

type OnSaveCallback = (err: null | Error, data: { consent: boolean; payload: ConsentPayload }) => void

export interface SendConsentProps {
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
  referrer?: string
  consent?: boolean
  cookieDomain?: string
  buttonText?: ButtonText
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
  trackingKeys: Record<TrackingKey, string>
  buttonText: ButtonText
  children: React.ReactElement
}

export { PrivacyManager } from './src/privacy-manager'
