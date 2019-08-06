# x-podcastlaunchers

This module has these features and scope.


## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-podcastlaunchers
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

## Styling

To get correct styling, Your app should have origami components below.  
[o-fonts](https://registry.origami.ft.com/components/o-fonts)  
[o-buttons](https://registry.origami.ft.com/components/o-buttons) v5  
[o-forms](https://registry.origami.ft.com/components/o-forms)  v6 (v7 above breaks the styling)

## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { PodcastLaunchers } from '@financial-times/x-podcastlaunchers';

// A == B == C
const a = PodcastLaunchers(props);
const b = <PodcastLaunchers {...props} />;
const c = React.createElement(PodcastLaunchers, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Feature          | Type   | Notes
-----------------|--------|----------------------------
`propertyName1`  | String |
`propertyName2`  | String |
`propertyName2`  | String |
