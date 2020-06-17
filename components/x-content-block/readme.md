# x-content-block

This module has these features and scope.


## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-content-block
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { ContentBlock } from '@financial-times/x-content-block';

// A == B == C
const a = ContentBlock(props);
const b = <ContentBlock {...props} />;
const c = React.createElement(ContentBlock, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Feature             | Type   | Notes
--------------------|--------|----------------------------
`postId`            | String | Unique id to reference the content
`title`             | String | Title of the content
`content`           | String | Body of the content
`isBreakingNews`    | Bool   | When `true` displays "breaking news" tag
`publishedTimestamp`| String | ISO timestamp of publish date
`articleUrl`        | String | Url of the main article that includes this post
