# x-follow-button

This module provides a template for myFT follow button component.

(and will potentially replace `{{> n-myft-ui/components/follow-button/follow-button}}`)

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-follow-button @financial-times/x-engine
```

This module also requires [`x-engine`][engine] as a peer dependency. The Engine module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

## Knobs

- Text (allows to play with the text on the button, and text inside of accompanied HTML);
- Extra Classes (they won't change anything in the storybook, but you can explore how your component's structure would be affected);
- Flags (what would change if you change the flag)
- Status (is the button selected or not)

## Usage

The components provided by this module are all functions that expect a map of [follow button properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { FollowButton } from '@financial-times/x-follow-button';

// A == B == C
const a = FollowButton(props);
const b = <FollowButton {...props} />;
const c = React.createElement(FollowButton, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties (props)

Feature                   | Type    | Default value             | Knob   
--------------------------|---------|---------------------------|------
`alternateText`           | String  | 'Add to myFT'             | yes
`buttonText`              | String  | 'Added'                   | yes
`conceptId`               | String  | '00000-0000-00000-00000'  |
`csrfToken`               | String  | 'testTokenValue'          |
`extraButtonClasses`      | String  | null                      | yes
`followPlusDigestEmail`   | Boolean | true                      | yes
`isSelected`              | Boolean | false                     | yes
`name`                    | String  | 'Test Name'               | yes
`switchFollowDigestEmail` | Boolean | false                     |
`variant`                 | String  | null                      | yes
