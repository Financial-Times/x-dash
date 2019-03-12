# x-topic-search

This module allows a user to search for topics by name, and follow them. If an already-followed topic is returned in the search results, then those topics are indicated as such.

The search results are fetched from the api whose url is passed as a property.
[next-myft-page](https://github.com/Financial-Times/next-myft-page/blob/master/client/components/topic-search/TopicSearchContainer.jsx#L9)
uses [next-tag-facets-api](https://github.com/Financial-Times/next-tag-facets-api).


## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-topic-search
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { TopicSearch } from '@financial-times/x-topic-search';

// A == B == C
const a = TopicSearch(props);
const b = <TopicSearch {...props} />;
const c = React.createElement(TopicSearch, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/


The consumer of this component needs to update `followedTopicIds` every time when users follow or unfollow topics.


### Properties

Property             | Type     | Required | Note
---------------------|----------|----------|------------------
`minSearchLength`    | Number   | No       | Minimum chars to start search. Default is 2
`maxSuggestions`     | Number   | No       | Maximum number to display suggestions. Default is 5
`apiUrl`             | String   | Yes      | The url to use when making requests to get topics
`followedTopicIds`   | Array    | Yes      | Array of followed topic `id`s.
`csrfToken`          | String   | Yes      | Value included in a hidden form field for x-follow-button
`renderFollowButton` | Function | No       | Optional render prop for the follow button
