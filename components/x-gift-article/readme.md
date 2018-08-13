# x-gift-article

This module provides a gift article form.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-gift-article
```

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

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

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Property                  | Type    | Required | Note
--------------------------|---------|----------|----
`isFreeArticle`           | Boolean | yes      | Only non gift form is displayed when this value is `true`
`articleUrl`              | String  | yes      | Canonical URL
`articleTitle`            | String  | yes      |
`articleId`               | String  | yes      | Content UUID
`sessionId`               | String  | yes      | This is needed to get a gift url
`showMobileShareLinks`    | Boolean | no       | This value will be `false` when `nativeShare` is `true`
`nativeShare`             | Boolean | no       | This is a property for App to display Native Sharing
