# x-teaser

This module provides templates for use with [o-teaser](https://github.com/Financial-Times/o-teaser). Teasers are used to link to content.

## Installation

```sh
$ npm install @financial-times/x-teaser
```

This module will install [`x-engine`](https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine) as a peer dependency. The Engine module is used to provide a runtime able to render the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

## Concepts

### Features

Because this is a very complex component with thousands of possible permutations it has been split into logical groups of features. These are:-

- Meta, the element above the title categorising the content
- Title, the title of the content
- Standfirst, a subtitle or description of the content
- Status, the date of, or time since the content was published
- Video, for video content able to play videos in-situ
- Headshot, an image of the author when content published in their column
- Image, the poster image for the content
- Related links, related content to also display links to
<!-- - Actions, a free slot to insert custom components or markup -->

### Indicators

### Rules

## Usage

The components provided by this module are all functions that expect a map of [properties](#properties). They can be used in vanilla JavaScript or with JSX. For example if you were writing your application using React you could use the component like this:

```js
const React = require('react');
const { Teaser } = require('@financial-times/x-teaser');

// A == B == C
const a = Teaser(props);
const b = <Teaser {...props} />;
const c = React.createElement(Teaser, props);
```

All `x-` components are compatible with a variety of runtimes so consult your chosen runtime documentation to see

### Higher-order components

All sub-components used to build a complete teaser may be imported and used individually. In normal usage every component is passed the full set of [properties](#properties).

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

As discussed in the [features](#features) documentation the list of properties, or _props_, has also been split into logical groups. No props are mandatory and no defaults are set, but [presets](#presets) are available for common combinations. In cases where props conflict the [rules engine](#rules) will decide which should take precedence. There is also a TypeScript definition for all props available.

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

Property | Type | Notes
---|---|---
`conceptPrefix` | String |
`conceptSuffix` | String |
`concept` | [concept](#concept-props) |
`altConcept` | [concept](#concept-props) |
`useAltConcept` | Boolean |
`promotedPrefix`\* | String | Will take precedence over concept
`promotedSuffix`† | String |

\* Used to highlight promoted or paid content

† Used to highlight who sponsored for the promoted or paid content

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
