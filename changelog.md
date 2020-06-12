# Changelog

## v1


### v1.0.5

- Fix article loading upon click issue when image is unavailable (#438)

### v1.0.4

- Latest News changes to x-teaser-timeline: allows specification of cut-off period (#435)

### v1.0.3

- Adds `x-teaser-timeline` which takes an array of content items and presents them as `x-teasers` in time/date-based groups according to the user's local time (#223)

### v1.0.2

- Revert accidental breaking change that required Node v10 (#425)

### v1.0.1

- Output 2x images at lower lossy quality (#424)

### v1.0.0

- First major, stable release
- Adds `x-follow-button` on the betas (#59)

### v1.0.0-beta.24

- Back port video tag fix to pre origami cascade (merged directly to `pre-origami-cascade` branch)

### v1.0.0-beta.23

- Add a showGuidance data-attribute to the Video.jsx template (#421)

### v1.0.0-beta.22

- Bump Origami components (#420)

### v1.0.0-beta.21

- Add detection for data URLs in x-teasers (#407)

### v1.0.0-beta.20

- Remove x-teaser markup not defined within o-teaser (#406)

### v1.0.0-beta.19

- Allows the `relatedLinks` x-teaser component to use either the `relatedUrl` or the `url` property if available (#405)

### v1.0.0-beta.18

- Removed `root` context check from x-handlebars (#396)

### v1.0.0-beta.17

- Aria label tweaks for video x-teasers (#397)
- Layout and content tweaks for podcast launchers (#395)

### v1.0.0-beta.16

- Adds 'Category:' aria labels to x-teasers (#394)

### v1.0.0-beta.15

- Adds x-podcast-launchers (#378)(#392)

### v1.0.0-beta.14

- Adds missing optimum video size configuration to x-teaser (#351)

### v1.0.0-beta.13

- Fixes incorrect `tab-index` attribute definition in x-teaser (#335)

### v1.0.0-beta.12

- Refactors x-teaser to add a space between the title and premium label (#304)

### v1.0.0-beta.11

- Added x-gift article (#78)

### v1.0.0-beta.10

- Refactors x-teaser to remove an extra space after the title text (#282)

### v1.0.0-beta.9

- Refactors x-teaser to make the teaser standfirst a link (#268)

### v1.0.0-beta.8

- Updates x-teaser for cross-compatibility with o-teaser v2 and v3 (#256)

### v1.0.0-beta.7

- Added new x-node-jsx package to enable direct usage of .jsx files (#217)

### v1.0.0-beta.6

- Refactors wrapping logic to enable re-wrapping a component with x-interaction (#214)

### v1.0.0-beta.5

- Adds audio to ContentTypes type in TypeScript declaration file in x-teaser (#209)

### v1.0.0-beta.4

- Add support for an isPodcast identifier to x-teaser (#211)

### v1.0.0-beta.3

- Removes whitespace output around text output in x-teaser (#146)
- Refactors headshot prop to accept a string value in x-teaser (#153)
- Refactors theme indicator and theme rule to enable explicit overrides in x-teaser (#154)
- Adds parentTheme prop to x-teaser (#154)


### v1.0.0-beta.2

- Adds support for fragments to x-engine (#134)
- Removes obsolete syndication props from x-teaser (#137)
- Adds support for configurable image lazy loading to x-teaser (#135)
- Refactors rendering of title prop to avoid stringification in x-teaser (#139)
- Updates presets to enable relative time by default in x-teaser (#142)
- Adds XXL image size prop to x-teaser (#143)
- Refactors teaser rulesets to avoid minification issues in x-teaser (#144)

### v1.0.0-beta.1

- Initial public release of x-engine, x-interaction, x-handlebars, and x-teaser
