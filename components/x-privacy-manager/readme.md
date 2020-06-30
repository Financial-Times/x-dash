# x-privacy-manager

This module creates an interface giving users the ability to give or withhold consent to the sale of their data under the provisions of the CCPA (California Consumer Protection Act), as a first step towards the FT's journey towards a Unified Privacy solution.

It is rendered with Page Kit on FT.com at https://www.ft.com/preferences/privacy-ccpa as part of [`next-control-centre`](https://github.com/Financial-Times/next-control-centre) and rendered directly by the FT App. Additionally, it is intended to be embedded on pages curated by Specialist Titles

![Privacy Manager UI](docs/ccpa.png)

## Installation

This module is compatible with Node 10.x and is distributed on npm.

```bash
npm install --save @financial-times/x-privacy-manager
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

### Properties

```ts
type ConsentProxyKeys = Record<'core' | 'enhanced' | 'createOrUpdateRecord', string>
```

Feature                   | Type                                      | Notes
--------------------------|-------------------------------------------|------
`consentSource`           | string                                    | Name of the consuming app to be included in requests to Consent Proxy (e.g. "next-control-centre")
`consentProxyEndpoints`   | {[key in keyof ConsentProxyKeys]: string} | Dictionary of endpoints for the Consent Proxy. Suggested helper: `utils.getConsentProxyEndpoints`
`consent`                 | boolean                                   | (optional) Any existing preference expressed by the user. Suggested helper: `utils.isOptedIn`
`referrer`                | string                                    | (optional) Used to provide a link back to the referring app's home page
`legislation`             | string[]                                  | (optional) An array of the applicable legislation IDs
`onConsentSavedCallbacks` | function[]                                | (optional) An array of callbacks to invoken after a successful request to Consent Proxy
`loginPrompt`             | string                                    | (optional) An HTML-enabled message to display to logged-out users. Suggested helper: `utils.getLoginPrompt`

A callback registered with `onConsentSavedCallbacks` will be executed with the following signature:

```ts
customCallback(
  err: null | Error, 
  {
    consent: boolean,
    payload: {
      formOfWordsId: string,
      consentSource: string,
      data: {
        ['behaviouralAds' | 'demographicAds' | 'programmaticAds']: {
          onsite: {
            status: boolean;
            lbi: boolean;
            source: string;
            fow: string;
          }
        }
      }
    }
  }
)
```

Callbacks are executed on regardless of the success (200 status) or failure of the call to the server, 
so we encourage returning early if the value of the error is anything but `null`:

```js
function setCookie(err, {consent, payload}) {
  if(err) return;

  // Store the value of `consent`
  const uspString = `1Y${consent ? "N" : "Y"}N`;
  document.cookie = `usprivacy=${uspString}; max-age=${60 * 60 * 24 * 365}`;
}
```

## Helpers

Alongside the `PrivacyManager` component, this package exports a `utils` object that wraps a number of helper methods that consuming apps can use. 

They are completely optional, but offer some guarantees about the shape of the data the component requires.


### `getLoginPrompt`

For maximum flexibility the `loginPrompt` prop accepts any string; this method is provided for easier consistency 

```ts
function getLoginPrompt(args: { 
  userId?: string,   // if supplied no prompt will be displayed 
  loginUrl?: string  // if supplied the embedded "sign into your account" CTA becomes a link
}) => string | undefined
```

Example usage:
```ts
getLoginPrompt({
  userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 
  loginUrl: "/login?location=/preferences/privacy-ccpa"
})
// => `undefined` since userId is provided

getLoginPrompt({
  userId: undefined, 
  loginUrl: "/login?location=/preferences/privacy-ccpa"
})
// => <p>Please <a href="/login?location=/preferences/privacy-ccpa">sign in</a> to your account ...</p>

getLoginPrompt({userId: undefined})
// => <p>Please sign into your account ...</p>
```

### `getConsentProxyEndpoints`

The `consentProxyEndpoints` prop requires an object with predefined keys; this helper switches values depending on whether the user's choice can be saved to the Consent Proxy or as a cookie

Example usage:
```ts
getConsentProxyEndpoints({ 
  consentProxyApiHost: "https://consent.ft.com",
  userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}) 
// => {
//  core: 'https://consent.ft.com/__consent/consent-record/FTPINK/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
//  enhanced: 'https://consent.ft.com/__consent/consent/FTPINK/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
//  createOrUpdateRecord: 'https://consent.ft.com/__consent/consent-record/FTPINK/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
// }

// `cookieOnly: true` and `userId: undefined` yield the same result:
getConsentProxyEndpoints({ 
  consentProxyApiHost: "https://consent.ft.com",
  userId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  cookiesOnly: true
})
// => {
//  core: 'https://consent.ft.com/__consent/consent-record-cookie',
//  enhanced: 'https://consent.ft.com/__consent/consent-record-cookie',
//  createOrUpdateRecord: 'https://consent.ft.com/__consent/consent-record-cookie',
// }
```

### `isOptedIn`

To determine a value for the `consent` prop, this helper can determine the user's previous choice from cookie values.

It will also infer whether users who have never made an explicit choice should be presumed to have opted out based on previous choices re targeted advertising

```ts
function isOptedIn(FTConsent: string, USPrivacy: string) => boolean
```