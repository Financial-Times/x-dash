# x-teaser

This module provides templates for use with [o-teaser](https://github.com/Financial-Times/o-teaser). Teasers are used to present content.

## Installation

This module is supported on Node 12 and is distributed on npm.

```bash
npm install --save @financial-times/x-teaser @financial-times/o-teaser
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/HEAD/packages/x-engine

## Concepts

### Features

Because teasers are very complex with thousands of possible permutations the component has been split into logical groups of features. These are:-

- Meta, the element above the title categorising the content
- Title, the title of the content
- Standfirst, a subtitle or description of the content
- Status, the date of, or time since the content was published
- Related links, An additional list of links to related content
- Image, the poster image for the content
- Headshot, an image of the content author when content is published in their column
- Video, for video content able to play videos in-situ
- Custom slot, a free slot to insert custom components or markup

![screenshot of a teaser with features highlighted](https://user-images.githubusercontent.com/271645/38372758-7b55beac-38e7-11e8-9529-6286f384b7ce.png)

### Indicators

Teasers display _content_ but our content items are also decorated with hints and traits which further describe them. Content items may only be available to premium subscribers, excluded from syndication licenses, or selected as an editor's choice. This extra data may not always produce visible output, or be visible to all users. However, they can be used in addition to the content itself to make decisions with.

### Rules

Because there are so many [teaser properties](#properties) some options can conflict. In these cases one option must take precedence over the others. These sitations are resolved by using a _ruleset_. A ruleset is a function which implements a series of conditions in order of precedence. When a condition evaluates to true it must return.

For example to decide which media type to display (a video, headshot, or image) we define the following ruleset:

```js
const media = (props) => {
  if (props.showVideo && props.video && props.video.url) {
    return 'video'
  }

  if (props.showHeadshot && props.headshot && props.headshot.url && props.indicators.isColumn) {
    return 'headshot'
  }

  if (props.showImage && props.image && props.image.url) {
    return 'image'
  }
}
```

## Usage

The components provided by this module are all functions that expect a map of [teaser properties](#properties). They can be used with vanilla JavaScript or JSX (If you are not familiar check out [WTF is JSX][jsx-wtf] first). For example if you were writing your application using React you could use the component like this:

```jsx
import React from 'react'
import { Teaser } from '@financial-times/x-teaser'

// A == B == C
const a = Teaser(props)
const b = <Teaser {...props} />
const c = React.createElement(Teaser, props)
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Child components

All the sub-components used to build a complete teaser may be imported and used individually. Every component can be given the full set of [teaser properties](#properties).

```jsx
import { Title, Standfirst } from '@financial-times/x-teaser'

const TeaserIsh = (title, standfirst) => (
  <div className="teaser-ish">
    <Title title={title} />
    <Standfirst standfirst={standfirst} />
  </div>
)
```

### TypeScript

A TypeScript definitions file is included which covers all of the properties expected by this component. You can use it like this:

```ts
import { TeaserProps } from './Props'

const props: TeaserProps = {}
```

### Properties

As covered in the [features](#features) documentation the teaser properties, or _props_, have also been split into logical groups. No props are mandatory and no defaults are set, but [presets](#presets) are available for common combinations. In cases where props conflict [rules](#rules) should decide which should take precedence. There is a TypeScript definition available for props.

#### Feature Props

| Feature            | Type    | Notes                                   |
| ------------------ | ------- | --------------------------------------- |
| `showMeta`         | Boolean |
| `showTitle`        | Boolean |
| `showStandfirst`   | Boolean |
| `showStatus`       | Boolean |
| `showImage`        | Boolean |
| `showHeadshot`     | Boolean | Takes precedence over image             |
| `showVideo`        | Boolean | Takes precedence over image or headshot |
| `showGuidance`     | Boolean | Show video captions guidance            |
| `showRelatedLinks` | Boolean |
| `showCustomSlot`   | Boolean |

#### General Props

| Property        | Type                           | Notes                                      |
| --------------- | ------------------------------ | ------------------------------------------ |
| `id`            | String                         | Content UUID                               |
| `url`           | String                         | Canonical URL                              |
| `relativeUrl`   | String                         | URL path, will take precendence over `url` |
| `type`          | String                         | Content type (article, video, etc.)        |
| `indicators`    | [indicators](#indicator-props) |
| `dataTrackable` | String                         | Tracking data for the teaser               |

#### Meta Props

| Property             | Type                          | Notes                           |
| -------------------- | ----------------------------- | ------------------------------- |
| `metaPrefixText`     | String                        |
| `metaSuffixText`     | String                        |
| `metaLink`           | [meta link](#meta-link-props) |
| `metaAltLink`        | [meta link](#meta-link-props) |
| `promotedPrefixText` | String                        | Will take precedence over links |
| `promotedSuffixText` | String                        |

#### Title Props

| Property   | Type   | Notes                               |
| ---------- | ------ | ----------------------------------- |
| `title`    | String |
| `altTitle` | String | Used for testing content variations |

#### Standfirst Props

| Property        | Type   | Notes                               |
| --------------- | ------ | ----------------------------------- |
| `standfirst`    | String |
| `altStandfirst` | String | Used for testing content variations |

#### Status Props

| Property             | Type                 | Notes                      |
| -------------------- | -------------------- | -------------------------- |
| `publishedDate`      | String, Number, Date | Last published date        |
| `firstPublishedDate` | String, Number, Date |
| `useRelativeTime`    | Boolean              | Display time since publish |
| `status`             | String               | Live blog status           |

#### Image Props

| Property              | Type                  | Notes                                                                                                         |
| --------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| `image`               | [media](#media-props) |
| `imageSize`           | String                | XS, Small, Medium, Large, XL or XXL                                                                           |
| `imageLazyLoad`       | Boolean, String       | Output image with `data-src` attribute. If this is a string it will be appended to the image as a class name. |
| `imageHighestQuality` | Boolean               | Calls image service with "quality=highest" option, works only with XXL images                                 |

#### Headshot Props

| Property       | Type   | Notes                                                            |
| -------------- | ------ | ---------------------------------------------------------------- |
| `headshot`     | String | Only displayed if `showHeadshot` and columnist indicator is true |
| `headshotTint` | String | See the [image service API][is] for usage                        |

[is]: https://www.ft.com/__origami/service/image/v2/docs/api

#### Video Props

| Property     | Type                                                   | Notes                                           |
| ------------ | ------------------------------------------------------ | ----------------------------------------------- |
| `video`      | [media](#media-props)                                  | Requires [o-video][ov] to create a video player |
| `systemCode` | String                                                 | Required by o-video to pass with requests.      |
|              | Should be the Biz-Ops code for the implementing system |

[ov]: https://github.com/Financial-Times/o-video

#### Related Links Props

| Property       | Type                         | Notes |
| -------------- | ---------------------------- | ----- |
| `relatedLinks` | Array of [link](#link-props) |

#### Context Props

| Property          | Type    | Notes                                                  |
| ----------------- | ------- | ------------------------------------------------------ |
| `headlineTesting` | Boolean | Enables alternative content for headline testing       |
| `parentLabel`     | String  | Shows the alternative meta link when the label matches |
| `parentId`        | String  | Shows the alternative meta link when the ID matches    |

#### Variant Props

| Property      | Type     | Notes                                                          |
| ------------- | -------- | -------------------------------------------------------------- |
| `layout`      | String   | "small", "large", "hero", or "top-story"                       |
| `theme`       | String   | Package theme, setting this will override any other indicators |
| `parentTheme` | String   | Theme inherited from any parent package                        |
| `modifiers`   | String[] | Extra modifier class names to append                           |

#### Meta Link Props

| Property      | Type   | Notes                                     |
| ------------- | ------ | ----------------------------------------- |
| `prefLabel`   | String |
| `url`         | String | Canonical URL                             |
| `relativeUrl` | String | URL path, will take precedence over `url` |

#### Link Props

| Property      | Type   | Notes                                     |
| ------------- | ------ | ----------------------------------------- |
| `id`          | String | Content UUID                              |
| `url`         | String | Canonical URL                             |
| `relativeUrl` | String | URL path, will take precedence over `url` |
| `type`        | String | Content type (article, video, etc.)       |
| `title`       | String |

#### Media Props

| Property | Type   | Notes                                                          |
| -------- | ------ | -------------------------------------------------------------- |
| `url`    | String | Content UUID or, in the case of images, `data:` or `blob:` URL |
| `width`  | Number |
| `height` | Number |

#### Indicator Props

| Property          | Type    | Notes                                            |
| ----------------- | ------- | ------------------------------------------------ |
| `accessLevel`     | String  | "premium", "subscribed", "registered", or "free" |
| `isOpinion`       | Boolean |
| `isColumn`        | Boolean |
| `isPodcast`       | Boolean |
| `isEditorsChoice` | Boolean |
| `isExclusive`     | Boolean |
| `isScoop`         | Boolean |

### Presets

Because there are so many options presets are available for the most commonly used configurations, these are:-

- `Small`
- `SmallHeavy`
- `Large`
- `Hero`
- `HeroNarrow`
- `HeroVideo`
- `HeroOverlay`
- `TopStory`
- `TopStoryLandscape`

To use a preset import the `presets` property along with the teaser component and mix your chosen preset in with your other properties.

```js
import { Teaser, presets } from '@financial-times/x-teaser'

const html = Teaser({ ...props, ...presets.Hero, showStatus: false })
```
