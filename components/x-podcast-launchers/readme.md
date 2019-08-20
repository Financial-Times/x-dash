# x-podcastlaunchers

This module allows users to open a podcast series in various podcast apps. The subscribe urls for each podcast app are generated from rss url with config (`/src/app-links.js`). 

No elements are returned when the `conceptId` does not map to a known podcast series, as defined in `src/map-concept-to-acast-series.js`. 

This component also renders a myFT follow button (x-follow-button) for the conceptId provided. This is acts as an onsite way to follow the series should the user's podcast app not be listed.

![screenshot of x-podcast-launchers](https://user-images.githubusercontent.com/21194161/63341610-86996080-c341-11e9-8a21-04da9c8bb6cc.png)

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-podcastlaunchers
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

## Styling

To get correct styling, Your app should have origami components below.  
[o-typography](https://registry.origami.ft.com/components/o-typography)  
[o-buttons](https://registry.origami.ft.com/components/o-buttons) v5  
[o-forms](https://registry.origami.ft.com/components/o-forms)  v6 (v7 above breaks the styling)

## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { PodcastLaunchers } from '@financial-times/x-podcast-launchers';

// A == B == C
const a = PodcastLaunchers(props);
const b = <PodcastLaunchers {...props} />;
const c = React.createElement(PodcastLaunchers, props);
```

```scss
// within your app's sass file
@import "x-podcast-launchers/dist/PodcastLaunchers";
```
:warning: This component depends on styles provided by o-forms and o-buttons, and therefore o-forms and o-buttons needs to be imported before x-podcast-launchers.

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

Feature              | Type     | Required | Notes
---------------------|----------|----------|------------------
`acastRSSHost`       | String   | Yes      | e.g. 'https://acast.access.com'
`conceptId`          | String   | Yes      |
`conceptName`        | String   | Yes      | x-follow-button prop.
`isFollowed`         | Boolean  | Yes      | x-follow-button prop. Whether the podcast concept id is followed or not.
`csrfToken`          | String   | Yes      | x-follow-button prop. Value included in a hidden form field.
`renderFollowButton` | Function | No       | x-follow-button prop. Optional render prop.
