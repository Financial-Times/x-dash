# x-gift-article

This module provides a gift article form.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-gift-article
```

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

## Styling

To get correct styling, Your app should have origami components below.  
[o-fonts](https://registry.origami.ft.com/components/o-fonts)  
[o-buttons](https://registry.origami.ft.com/components/o-buttons)  
[o-forms](https://registry.origami.ft.com/components/o-forms)  
[o-loading](https://registry.origami.ft.com/components/o-loading)  
[o-share](https://registry.origami.ft.com/components/o-share)  
[o-message](https://registry.origami.ft.com/components/o-message)

## Usage

Component provided by this module expects a map of [gift article properties](#properties). They can be used with vanilla JavaScript or JSX (if you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { GiftArticle } from '@financial-times/x-gift-article';

// A == B == C
const a = GiftArticle(props);
const b = <GiftArticle {...props} />;
const c = React.createElement(GiftArticle, props);
```

Your app should dispatch a custom event (`xDash.giftArticle.activate`) to activate the gift article form when your app actually displays the form.  
`document.body.dispatchEvent(new CustomEvent('xDash.giftArticle.activate'));`

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/


### Properties

Property                  | Type    | Required | Note
--------------------------|---------|----------|----
`isFreeArticle`           | Boolean | yes      | Only non gift form is displayed when this value is `true`.
`articleUrl`              | String  | yes      | Canonical URL
`articleTitle`            | String  | yes      |
`articleId`               | String  | yes      | Content UUID
`sessionId`               | String  | yes      | This is needed to get a gift url.
`showMobileShareLinks`    | Boolean | no       |
`nativeShare`             | Boolean | no       | This is a property for App to display Native Sharing.
`apiProtocol`             | String  | no       | The protocol to use when making requests to the gift article and URL shortening services. Ignored if `apiDomain` is not set.
`apiDomain`               | String  | no       | The domain to use when making requests to the gift article and URL shortening services.
