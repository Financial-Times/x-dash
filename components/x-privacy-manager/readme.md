# x-privacy-manager

This module creates an interface giving users the ability to give or withhold consent to the sale of their data under the provisions of the CCPA (California Consumer Protection Act), as a first step towards the FT's journey towards a Unified Privacy solution.

It is intended for use with Page Kit on FT.com, as a component within FT App, and as a brandable page linked to by Specialist Titles.

![Privacy Manager UI](docs/ccpa.png)

## Installation

This module is compatible with Node 8+ and is distributed on npm.

```bash
npm install --save @financial-times/x-privacy-manager
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { PrivacyManager } from '@financial-times/x-privacy-manager';

// A == B == C
const a = PrivacyManager(props);
const b = <PrivacyManager {...props} />;
const c = React.createElement(PrivacyManager, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Feature                     | Type       | Notes
----------------------------|------------|-----------------------------------------------
`consent`                   | boolean    | Any existing preference expressed by the user
`referrer`                  | string     | Used to provide a link back to the referring app's home page
`legislation`               | string[]   | An array of the applicable legislation IDs
`onConsentSavedCallbacks`   | function[] | An array callbacks to invoken after a successful request to Consent Proxy
`consentSource`             | string     | Name of the consuming app to be included in requests to Consent Proxy (e.g. "next-control-centre")
 `consentProxyEndpoints`    | object     | Dictionary containing already-formed Consent Proxy Endpoints to use (including userId). It must include, at least, `consentProxyEndpoints.createOrUpdateRecord`
 `isLoading`                | boolean    | Indicates whether the component is wait for a response from a fetch request to the Consent Proxy
