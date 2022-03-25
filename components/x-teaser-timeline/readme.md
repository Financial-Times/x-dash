# x-teaser-timeline

This component renders a list of articles in reverse chronological order, grouped by day, according to the user's timezone.
It will optionally group today's articles into "latest" and "earlier" too.

## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install --save @financial-times/x-teaser-timeline
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/HEAD/packages/x-engine

## Other dependencies

[o-teaser](https://registry.origami.ft.com/components/o-teaser) styles will need to be imported by the consumer of this component.

If selectively importing o-teaser's styles via scss, then you will need the following:

```scss
$o-teaser-is-silent: true;
@import '@financial-times/o-teaser/main';
@include oTeaser(('default', 'images', 'timestamp'), ('small'));
```

See the [x-teaser](https://github.com/Financial-Times/x-dash/tree/HEAD/components/x-teaser) documentation.

## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react'
import { TeaserTimeline } from '@financial-times/x-teaser-timeline'

// A == B == C
const a = TeaserTimeline(props)
const b = <TeaserTimeline {...props} />
const c = React.createElement(TeaserTimeline, props)
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

| Feature               | Type            | Notes                                                                                                                                                                                                                                |
| --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `items`               | Array           | (Mandatory) Array of objects, in Teaser format, representating content items to render. The items should be in newest-first order.                                                                                                   |
| `timezoneOffset`      | Number          | (Defaults using runtime clock) Minutes to offset item publish times in order to display in user's timezone. Negative means ahead of UTC.                                                                                             |
| `localTodayDate`      | String          | (Defaults using runtime clock) ISO format YYYY-MM-DD representating today's date in the user's timezone.                                                                                                                             |
| `latestItemsTime`     | String          | ISO time (HH:mm:ss). If provided, will be used in combination with `localTodayDate` to render today's items into separate "Latest" and "Earlier" groups.                                                                             |
| `showSaveButtons`     | Boolean         | (Default to true). Option to hide x-article-save-buttons if they are not needed. Those buttons will get their saved/unsaved state from a `saved` property of the content item.                                                       |
| `customSlotContent`   | String or Array | Content to insert at `customSlotPosition`.                                                                                                                                                                                           |
| `customSlotPosition`  | Number or Array | (Default is 2). Where to insert `customSlotContent`. The custom content will be inserted after the item at this position number. If this position is greater than the number items to render, then it will be inserted last.         |
| `csrfToken`           | String          | A CSRF token that will be used by the save buttons (if shown).                                                                                                                                                                       |
| `latestItemsAgeHours` | Number          | (Optional). If provided, used to calculate a cutoff time before which no article will count as "latest", regardless of the value of `latestItemsTime`. If omitted, articles before midnight this morning will not count as "latest". |

Example:

```jsx
<TeaserTimeline items={items} timezoneOffset="-60" localTodayDate="2018-10-30" latestItemsTime="11:52:30" />
```
