# x-teaser

This module provides templates for use with [o-teaser](https://github.com/Financial-Times/o-teaser). Teasers are used to present content.

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-teaser @financial-times/x-engine
```

This module also requires [`x-engine`](https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine) as a peer dependency. The Engine module is used to provide a runtime able to render the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

## Concepts

### Features

Because teasers are very complex with thousands of possible permutations the component has been split into logical groups of features. These are:-

- Meta, the element above the title categorising the content
- Title, the title of the content
- Standfirst, a subtitle or description of the content
- Status, the date of, or time since the content was published
- Image, the poster image for the content
- Video, for video content able to play videos in-situ
- Headshot, an image of the author when content is published in their column
- Related links, related content to also display links to
- Custom slot, a free slot to insert custom components or markup

![screenshot of a teaser with features highlighted](https://user-images.githubusercontent.com/271645/38372758-7b55beac-38e7-11e8-9529-6286f384b7ce.png)

### Indicators

Teasers display _content_ but our content items are also decorated with hints and traits which further describe them. Content items may only be available to premium subscribers, it could be excluded from syndication licenses, or it may be selected as an editor's choice. This extra data may not always produce visible output, or be visible to all users. However, they can be used in addition to the content itself to make decisions with.

### Rules

Because there are so many [teaser properties](#properties) some options can conflict. In these cases one option must take precedence over the others. These are defined in the _rules_ module as arrays of functions. The first function in the array to return a truthy value wins and the name of the matching function will be returned.

## Usage

The components provided by this module are all functions that expect a map of [teaser properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] fist). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react';
import { Teaser } from '@financial-times/x-teaser';

// A == B == C
const a = Teaser(props);
const b = <Teaser {...props} />;
const c = React.createElement(Teaser, props);
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the `x-engine` documenation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Higher-order components

All sub-components used to build a complete teaser may be imported and used individually. Every component may be given the full set of [teaser properties](#properties).

```jsx
import { Title, Standfirst } from '@financial-times/x-teaser';

const TeaserIsh = (title, standfirst) => (
	<div className="teaser-ish">
		<Title title={title} />
		<Standfirst standfirst={standfirst} />
	</div>
);
```

### Properties

As covered in the [features](#features) documentation the teaser properties, or _props_, have also been split into logical groups. No props are mandatory and no defaults are set, but [presets](#presets) are available for common combinations. In cases where props conflict the [rules engine](#rules) will decide which should take precedence. There is TypeScript definition available for props.

#### Feature Props

Feature            | Type    | Notes
-------------------|---------|----------------------------
`showMeta`         | Boolean |
`showTitle`        | Boolean |
`showStandfirst`   | Boolean |
`showStatus`       | Boolean |
`showImage`        | Boolean |
`showVideo`        | Boolean | Takes precedence over image
`showHeadshot`     | Boolean | Takes precedence over image
`showRelatedLinks` | Boolean |
`showCustomSlot`   | Boolean |

#### General Props

Property      | Type                           | Notes
--------------|--------------------------------|-------------------------------------------
`id`          | String                         | Content UUID
`url`         | String                         | Canonical URL
`relativeUrl` | String                         | URL path, will take precendence over `url`
`type`        | String                         | Content type (article, video, etc.)
`indicators`  | [indicators](#indicator-props) |

#### Meta Props

Property         | Type                          | Notes
-----------------|-------------------------------|----------------------------------
`metaPrefixText` | String                        |
`metaSuffixText` | String                        |
`metaLink`       | [meta link](#meta-link-props) |
`metaAltLink`    | [meta link](#meta-link-props) |
`promotedPrefix` | String                        | Will take precedence over links
`promotedSuffix` | String                        |

#### Title Props

Property      | Type    | Notes
--------------|---------|------------------------------------
`title`       | String  |
`altTitle`    | String  | Used for testing content variations

#### Standfirst Props

Property           | Type    | Notes
-------------------|---------|------------------------------------
`standfirst`       | String  |
`altStandfirst`    | String  | Used for testing content variations

#### Status Props

Property             | Type                 | Notes
---------------------|----------------------|---------------------------
`publishedDate`      | String, Number, Date | Last published date
`firstPublishedDate` | String, Number, Date |
`useRelativeTime`    | Boolean              | Display time since publish
`status`             | String               | Live blog status

#### Image Props

Property        | Type                  | Notes
----------------|-----------------------|--------------------------------
`image`         | [media](#media-props) |
`imageSize`     | String                | XS, Small, Medium, Large, or XL
`imageLazyload` | Boolean               | Compatible with [n-image][nimg]

[nimg]: https://github.com/Financial-Times/n-image/

#### Video Props

Property | Type                  | Notes
---------|-----------------------|------------------------------------------------
`video`  | [media](#media-props) | Requires [o-video][ov] to create a video player

[ov]: https://github.com/Financial-Times/o-video

#### Headshot Props

Property       | Type                  | Notes
---------------|-----------------------|-------------------------------------------
`headshot`     | [media](#media-props) | Only displayed if column indicator is true
`headshotTint` | String                | See the [image service API][is] for usage

[is]: https://www.ft.com/__origami/service/image/v2/docs/api

#### Related Links Props

Property       | Type                         | Notes
---------------|------------------------------|------
`relatedLinks` | Array of [link](#link-props) |

#### Meta Link Props

Property      | Type   | Notes
--------------|--------|--------------
`prefLabel`   | String |
`relativeUrl` | String | URL path
`url`         | String | Canonical URL

#### Media Props

Property | Type   | Notes
---------|--------|--------------
`url`    | String | Content UUID
`width`  | Number |
`height` | Number |

#### Link Props

Property      | Type   | Notes
--------------|--------|-------------------------------------------
`id`          | String | Content UUID
`url`         | String | Canonical URL
`relativeUrl` | String | URL path, will take precendence over `url`
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
`isEditorsChoice`  | Boolean |
`isExclusive`      | Boolean |
`isScoop`          | Boolean |

#### Context

Property          | Type    | Notes
------------------|---------|------
`headlineTesting` | Boolean |
`parentLabel`     | String  |
`parentId`        | String  |

### Presets

Because there are so many options presets are available for the most commonly used configurations, these are:-

- `Small`
- `SmallHeavy`
- `Large`
- `LargeOpinion`
- `Hero`
- `HeroNarrow`
- `HeroVideo`
- `HeroOverlay`
- `TopStory`
- `TopStoryLandscape`

To use a preset import the `presets` property along with the teaser component and mix your chosen preset in with your other properties.

```js
import { Teaser, presets } from '@financial-times/x-teaser';

const html = Teaser({...props, ...presets.Hero, showStatus: false });
```
