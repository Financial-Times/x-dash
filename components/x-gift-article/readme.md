# x-gift-article

This module provides a gift article form.

## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install --save @financial-times/x-gift-article
```

## Styling

To get correct styling, Your app should have:
[o-fonts](https://registry.origami.ft.com/components/o-fonts)

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

Your app should trigger the `activate` action to activate the gift article form when your app actually displays the form. For example, if your app is client-side rendered, you can use `actionsRef` to trigger this action:

```jsx
import { h, Component } from '@financial-times/x-engine';
import { GiftArticle } from '@financial-times/x-gift-article';

class Container extends Component {
  showGiftArticle() {
    if(this.giftArticleActions) {
      this.setState({ showGiftArticle: true });

      // trigger the action
      this.giftArticleActions.activate();
    }
  }

  render() {
    return <div>
      <button onClick={() => this.showGiftArticle()}>
        Share
      </button>

      <div style={{display: this.state.showGiftArticle ? 'block' : 'none'}}>
        <GiftArticle {...this.props} actionsRef={actions => this.giftArticleActions = actions} />
      </div>
    </div>
  }
}
```

For more information about triggering actions, see the [x-interaction documentation][interaction].

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/
[interaction]: /components/x-interaction#triggering-actions-externally
[engine]: https://github.com/Financial-Times/x-dash/tree/HEAD/packages/x-engine

### Properties

Property                  | Type    | Required | Note
--------------------------|---------|----------|----
`isFreeArticle`           | Boolean | yes      | Only non gift form is displayed when this value is `true`.
`article`                 | Object  | yes      | Must contain `id`, `title` and `url` properties
`showMobileShareLinks`    | Boolean | no       | For ft.com on mobile sharing.
`nativeShare`             | Boolean | no       | This is a property for App to display Native Sharing.
`apiProtocol`             | String  | no       | The protocol to use when making requests to the gift article and URL shortening services. Ignored if `apiDomain` is not set.
`apiDomain`               | String  | no       | The domain to use when making requests to the gift article and URL shortening services.
`enterpriseApiBaseUrl`    | String  | no       | The base URL to use when making requests to the enterprise sharing service.

###
`isArticleSharingUxUpdates` boolean has been added as part of ACC-749 to enable AB testing of the impact of minor UX improvements to x-gift-article. Once AB testing is done, and decision to keep / remove has been made, the changes made in https://github.com/Financial-Times/x-dash/pull/579 need to be ditched or baked in as default. 
