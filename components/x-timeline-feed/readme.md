# x-timeline-feed

This module has these features and scope.


## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-timeline-feed
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { TimelineFeed } from '@financial-times/x-timeline-feed';

// A == B == C
const a = TimelineFeed(props);
const b = <TimelineFeed {...props} />;
const c = React.createElement(TimelineFeed, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Feature              | Type   | Notes
---------------------|--------|----------------------------
`articles`           | Array  | (Mandatory) Array of objects, in Teaser format, representating articles to render
`timezoneOffset`     | Number | (Default = 0) Minutes to offset article publish times in order to display in user's timezone
`localTodayDate`     | String | (Defaults using new Date()) ISO format YYYY-MM-DD representating today's date in the user's timezone.
`latestArticlesTime` | String | Full ISO date-time sharing same date as `localTodayDate`. If provided, will render today's articles into separate "Latest" and "Earlier" groups 

Example:

```jsx
<TimelineFeed
  articles={articles}
  timezoneOffset="-60"
  localTodayDate="2018-10-30"
  latestArticlesTime="2018-10-30T11:52:30.080Z"
/>
```