# Migrating from n-teaser to x-teaser

This component replaces the existing `@financial-times/n-teaser` package. The design decisions behind x-teaser are different to n-teaser and so the available options and data structures required are also different. However, great care has been taken to ensure that migrating an app to use x-teaser can be done quickly and in most cases you can end up with less code than before.


## Major differences

The n-teaser package provides a set of [Handlebars] templates for use by FT.com within the Handlebars setup provided by [n-ui] and several [GraphQL] fragments to fetch a range of data from [Next API]. Presenter classes are loaded on application startup and called from inside the templates, provising the logic to select and format data. The n-teaser package contains 78kb of source code.

The x-teaser package provides a single configurable component written in [JSX] which may be rendered in The App or FT.com by any compatible runtime. The component expects the data it receives to be preformatted and therefore contains very little logic. The x-teaser package contains 18kb of source code.

[Handlebars]: https://handlebarsjs.com/
[n-ui]: https://github.com/Financial-Times/n-ui
[GraphQL]: https://graphql.org/
[Next API]: https://github.com/Financial-Times/next-api
[JSX]: https://jasonformat.com/wtf-is-jsx/


## Guide

### 1. Install dependencies

In addition to the x-teaser package you will also need to install the [x-handlebars] package which enables x-dash compatible components to be rendered inside your existing templates.

```diff
  "dependencies" {
-     "@financial-times/n-teaser": "^4.10.0",
+     "@financial-times/x-handlebars": "^1.0.0",
+     "@financial-times/x-teaser": "^1.0.0",
  },
```

[x-handlebars]: /packages/x-handlebars

### 2. Install and configure a runtime

There are a number of frameworks and libraries which can render components written with JSX. If you are already using a framework in your application then you should continue to use that where possible, otherwise it is recommend installing the [Hyperons] package which is small and very fast.

The x-handlebars and x-teaser packages depend on a library called [x-engine]. This is a consolidation library that provides your chosen runtime to x-dash compatible components. The configuration for x-engine needs to be added to your package manifest now to instruct it how to load your runtime.

```diff
  "dependencies" {
+     "hyperons": "^0.4.0",
  },
+  "x-dash": {
+    "engine": {
+      "server": "hyperons"
+    }
+  }
```

[x-engine]: /packages/x-engine
[Hyperons]: https://www.npmjs.com/package/hyperons

### 3. Load Handlebars helpers

User facing FT.com applications use an Express server provided by n-ui. As part of the server initialisation any Handlebars helpers can be loaded and made available to your templates.

The n-teaser package uses this functionality to load its internal helper functions and the x-handlebars helpers are loaded in the same way.

```diff
  helpers: {
-    nTeaserPresenter: require('@financial-times/n-teaser').presenter
+    x: require('@financial-times/x-handlebars')()
  }
```

### 4. Fetching the right data

The data required to render teasers can now be fetched in a format ready for immediate use. Whether your application fetches its data from Next API (using GraphQL queries) or directly from [Elasticsearch] the number of fields required and size of the payload to be transferred has been reduced dramatically.

[Elasticsearch]: https://github.com/Financial-Times/next-es-interface/

#### Changes to GraphQL queries

With GraphQL every field and sub-field to be retrieved must be explicitly specified. For convenience the n-teaser package provides a range of GraphQL fragments to generate this list of fields for each teaser type.

To avoid maintaining such a list the teaser data has been made available as a single JSON field named `teaser`.

```diff
- const { fragments } = require('@financial-times/n-teaser');

module.exports = `
-  ${fragments.teaserExtraLight}
-  ${fragments.teaserLight}
-  ${fragments.teaserStandard}
-  ${fragments.teaserHeavy}
-  ${fragments.teaserTopStory}
+  teaser
`;
```

#### Changes to Elasticsearch queries

Wherever you specify a list, or include a list, of source fields to retrieve you may now replace this with a single entry of `teaser.*`.

```diff
fields: [
-   'id',
-   'url',
-   'relativeUrl',
-   'type',
-
-   'title',
-   'alternativeTitles.promotionalTitle',
-   'alternativeTitles.promotionalTitleVariant',
-
-   'standfirst',
-   'alternativeStandfirsts.promotionalStandfirst',
-   'alternativeStandfirsts.promotionalStandfirstVariant',
-
-   'publishedDate',
-   'firstPublishedDate',
-
-   'mainImage.*',
-   'alternativeImages.promotionalImage.*',

-   'displayConcept.*',
-   'brandConcept.*',
-   'genreConcept.*',
-   'authorConcepts.*',
-
+   'teaser.*'
];
```

### 5. Update template includes

The n-teaser package provides separate templates for each teaser layout. In contrast the x-handlebars package is generic and allows you to render any installed x-dash packages or local components in your Handlebars template.

Teasers may be configured by providing attributes. Common use cases are provided via [presets] and may be used by specifying the `preset` attribute.

```diff
- {{>n-teaser/templates/heavy mods=(array 'small') widths="[160]" }}
+ {{{x package="x-teaser" component="Teaser" preset="SmallHeavy"}}}
```

[presets]: /components/x-teaser#presets

### 6. Image lazy loading (optional)

If you have implemented image lazy loading on your pages using [n-image] or [o-lazy-load] you can continue to use this functionality with x-teaser. Setting the `imageLazyload` property to `true` will instruct the component to render the image with a `data-src` property instead of a `src` property. If you need to set a specific class name to identify these images you can set the `imageLazyload` property to a string, which will be appended to list of image class names.

```handlebars
<!-- if using o-lazy-load -->
{{{x package="x-teaser" component="Teaser" preset="SmallHeavy" imageLazyLoad="o-lazy-load"}}}

<!-- if using n-image -->
{{{x package="x-teaser" component="Teaser" preset="SmallHeavy" imageLazyLoad="n-image--lazy-loading"}}}
```

[n-image]: https://github.com/Financial-Times/n-image
[o-lazy-load]: https://github.com/Financial-Times/o-lazy-load/
