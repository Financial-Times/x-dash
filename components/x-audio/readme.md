# x-audio

This module has these features and scope.

## Requirements

Origami components:
* `o-loading`
* `o-typography`

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-audio
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { Audio } from '@financial-times/x-audio';

// A == B == C
const a = Audio(props);
const b = <Audio {...props} />;
const c = React.createElement(Audio, props);
```

```scss
// within your app's sass file
@import "x-audio/dist/Audio";
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Feature          | Type   | Notes
-----------------|--------|----------------------------
`propertyName1`  | String |
`propertyName2`  | String |
`propertyName2`  | String |
