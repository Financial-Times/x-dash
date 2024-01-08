# x-gift-article

This module provides a gift article form.
A gift article is the possibility of a subscriber to share an article with a non-subscriber using their credits.
If you are B2B, you'll see the Enterprise version of gift article, which gives you a lot more credits, and which is owned by FT Professional.

## Installation

This module is supported on Node 16 and is distributed on npm.

```bash
npm install --save @financial-times/x-gift-article
```

## Styling

To get correct styling, Your app should have:
[o-fonts](https://registry.origami.ft.com/components/o-fonts)

## Usage

Component provided by this module expects a map of [gift article properties](#properties). They can be used with vanilla JavaScript or JSX (if you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react'
import { ShareArticleModal } from '@financial-times/x-gift-article'

// A == B == C
const a = ShareArticleModal(props)
const b = <ShareArticleModal {...props} />
const c = React.createElement(ShareArticleModal, props)
```

Your app should trigger the `activate` action to activate the gift article form when your app actually displays the form. For example, if your app is client-side rendered, you can use `actionsRef` to trigger this action:

```jsx
import { h, Component } from '@financial-times/x-engine'
import { ShareArticleModal } from '@financial-times/x-gift-article'

class Container extends Component {
  showShareArticleModal() {
    if (this.shareArticleModalActions) {
      this.setState({ showShareArticleModal: true })

      // trigger the action
      this.shareArticleModalActions.activate()
    }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.showShareArticleModal()}>Share</button>

        <div style={{ display: this.state.showShareArticleModal ? 'block' : 'none' }}>
          <ShareArticleModal
            {...this.props}
            actionsRef={(actions) => (this.shareArticleModalActions = actions)}
          />
        </div>
      </div>
    )
  }
}
```

For more information about triggering actions, see the [x-interaction documentation][interaction].

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/
[interaction]: /components/x-interaction#triggering-actions-externally
[engine]: https://github.com/Financial-Times/x-dash/tree/HEAD/packages/x-engine

### Properties

| Property               | Type    | Required | Note                                                                                                                         |
| ---------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `isFreeArticle`        | Boolean | yes      | Only non gift form is displayed when this value is `true`.                                                                   |
| `article`              | Object  | yes      | Must contain `id`, `title` and `url` properties                                                                              |
| `nativeShare`          | Boolean | no       | This is a property for App to display Native Sharing.                                                                        |
| `apiProtocol`          | String  | no       | The protocol to use when making requests to the gift article and URL shortening services. Ignored if `apiDomain` is not set. |
| `apiDomain`            | String  | no       | The domain to use when making requests to the gift article and URL shortening services.                                      |
| `enterpriseApiBaseUrl` | String  | no       | The base URL to use when making requests to the enterprise sharing service.                                                  |
