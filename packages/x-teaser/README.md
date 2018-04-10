# x-teaser

This module provides templates for use with [o-teaser](https://github.com/Financial-Times/o-teaser). Teasers are used to link to content.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```sh
$ npm install -S @financial-times/x-teaser
```

This module will also install [`x-engine`](https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine) as a peer dependency. The Engine module is used to provide a runtime able to render the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

## Concepts

### Features

Because teasers are very complex with thousands of possible permutations the component has been split into logical groups of features. These are:-

- Meta, the element above the title categorising the content
- Title, the title of the content
- Standfirst, a subtitle or description of the content
- Status, the date of, or time since the content was published
- Video, for video content able to play videos in-situ
- Headshot, an image of the author when content published in their column
- Image, the poster image for the content
- Related links, related content to also display links to
<!-- - Actions, a free slot to insert custom components or markup -->

![screenshot of a teaser with features highlighted](https://user-images.githubusercontent.com/271645/38372758-7b55beac-38e7-11e8-9529-6286f384b7ce.png)

### Indicators

Teasers display _content_ but our content items are also decorated with hints and traits which further describe them. Content items may only be available to premium subscribers, it could be excluded from syndication licenses, or it may be selected as an editor's choice. This extra data may not always produce visible output, or be visible to all users. However, they can be used in addition to the content itself to make decisions with.

### Rules

Because there are so many [teaser properties](#properties) some options can conflict. In these cases one option must take precedence over the others. These are defined in the _rules_ module as arrays of functions. The first function in the array to return true wins and the name of the matching function is returned.

## Usage

The components provided by this module are all functions that expect a map of [teaser properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] fist). For example if you were writing your application using React you could use the component like this:

```js
const React = require('react');
const { Teaser } = require('@financial-times/x-teaser');

// A == B == C
const a = Teaser(props);
const b = <Teaser {...props} />;
const c = React.createElement(Teaser, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the `x-engine` documenation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Higher-order components

All sub-components used to build a complete teaser may be imported and used individually. Every component may be given the full set of [teaser properties](#properties).

```js
const { Title, Standfirst } = require('@financial-times/x-teaser');

const TeaserIsh = (title, standfirst) => (
	<div className="teaser-ish">
		<Title title={title} />
		<Standfirst standfirst={standfirst} />
	</div>
);
```

### Properties

As discussed in the [features](#features) documentation the list of teaser properties, or _props_, has also been split into logical groups. No props are mandatory and no defaults are set, but [presets](#presets) are available for common combinations. In cases where props conflict the [rules engine](#rules) will decide which should take precedence. There is also a TypeScript definition for props.

#### Feature Props

Feature          | Type
-----------------|---------
`showMeta`       | Boolean
`showTitle`      | Boolean
`showStandfirst` | Boolean
`showStatus`     | Boolean
`showVideo`      | Boolean
`showHeadshot`   | Boolean
`showImage`      | Boolean
`showRelated`    | Boolean
<!-- `showActions` | Boolean -->

#### General Props

Property     | Type                           | Notes
-------------|--------------------------------|-------------------------------------
`id`         | String                         | Content UUID
`url`        | String                         | Content URL
`type`       | String                         | Content type (article, video, etc.)
`indicators` | [indicators](#indicator-props) |

#### Meta Props

Property         | Type                      | Notes
-----------------|---------------------------|----------------------------------
`conceptPrefix`  | String                    |
`conceptSuffix`  | String                    |
`concept`        | [concept](#concept-props) |
`altConcept`     | [concept](#concept-props) |
`useAltConcept`  | Boolean                   |
`promotedPrefix` | String                    | Will take precedence over concept
`promotedSuffix` | String                    |

#### Title Props

Property      | Type    | Notes
--------------|---------|------------------------------------
`title`       | String  |
`altTitle`    | String  | Used for testing content variations
`useAltTitle` | Boolean |

#### Standfirst Props

Property           | Type    | Notes
-------------------|---------|------------------------------------
`standfirst`       | String  |
`altStandfirst`    | String  | Used for testing content variations
`useAltStandfirst` | Boolean |

#### Status Props

Property             | Type                 | Notes
---------------------|----------------------|---------------------------
`publishedDate`      | String, Number, Date | Last published date
`firstPublishedDate` | String, Number, Date |
`useRelativeTime`    | Boolean              | Display time since publish
`status`             | String               | Live blog status

#### Video Props

Property | Type                  | Notes
---------|-----------------------|-------------------------------------------------
`video`  | [media](#media-props) | Requires [o-video][ov] to create a video player

[ov]: https://github.com/Financial-Times/o-video

#### Headshot Props

Property       | Type                  | Notes
---------------|-----------------------|-------------------------------------------
`headshot`     | [media](#media-props) | Only displayed if column indicator is true
`headshotTint` | String                | See the [image service API][is] for usage

[is]: https://www.ft.com/__origami/service/image/v2/docs/api

#### Image Props

Property    | Type                  | Notes
------------|-----------------------|--------------------------------
`image`     | [media](#media-props) |
`imageSize` | String                | XS, Small, Medium, Large, or XL

#### Related Links Props

Property  | Type                         | Notes
----------|------------------------------|-------------------
`related` | Array of [link](#link-props) | An array of links

#### Concept Props

Property      | Type   | Notes
--------------|--------|---------------
`id`          | String | Concept UUID
`url`         | String | Canonical URL
`relativeUrl` | String | URL path
`prefLabel`   | String |

#### Media Props

Property | Type   | Notes
---------|--------|--------------
`id`     | String | Content UUID

#### Link Props

Property      | Type   | Notes
--------------|--------|-------------------------------------
`id`          | String | Content UUID
`url`         | String | Canonical URL
`relativeUrl` | String | URL path
`type`        | String | Content type (article, video, etc.)
`title`       | String |

#### Indicators

Property           | Type    | Notes
-------------------|---------|--------------------------------------------------
`canBeDistributed` | String  | "yes", "no", or "verify"
`canBeSyndicated`  | String  | "yes", "no", or "verify"
`accessLevel`      | String  | "premium", "subscribed", "registered", or "free"
`isOpinion`        | Boolean |
`isColumn`         | Boolean |
`isLive`           | Boolean |
`isEditorsChoice`  | Boolean |
`isExclusive`      | Boolean |
`isScoop`          | Boolean |

### Presets

Because there are so many options presets are available for the most commonly used configurations, these are:-

- `Small`
- `SmallHeavy`
- `Large`
- `LargeOpinion`
- `Hero`
- `HeroNarrow`
- `HeroCentred`
- `HeroVideo`
- `HeroOverlay`
- `TopStory`
- `TopStoryLandscape`

To use a preset import the `presets` property along with the teaser component and mix your chosen preset in with your other properties.

```js
import { Teaser, presets } from '@financial-times/x-teaser';

const html = Teaser({...props, ...presets.Hero});
```
