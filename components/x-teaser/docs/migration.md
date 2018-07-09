# Migration from n-teaser

This component replaces the existing `@financial-times/n-teaser` module. The design decisions behind `x-teaser` are quite different to `n-teaser` and so the available options and data structures required are different too. However, we have taken great care to ensure that migrating an app to `x-teaser` can be done quickly.

## Differences

The `n-teaser` module provides a set of [Handlebars](https://handlebarsjs.com/) templates to be loaded by the existing Handlebars setup. It includes several [GraphQL](https://graphql.org/) fragments to fetch a range of data from [Next API](https://github.com/Financial-Times/next-api). Presenter classes called from inside the templates include logic to provide and formay this data.

The `x-teaser` module provides a single configurable component written in [JSX](https://jasonformat.com/wtf-is-jsx/) which may be rendered by any runtime. The component contains very little logic and expects the data provided to be directly consumable.

## Guide

### 1. Install dependencies

In addition to the `x-teaser` package you will also need to install the `x-handlebars` package which enables `x-` components to be rendered inside your existing templates. Both of these modules have a peer dependency on the `x-engine` package so this should be installed too.

```diff
  "dependencies" {
-     "@financial-times/n-teaser": "^4.10.0",
+     "@financial-times/x-engine": "^1.0.0",
+     "@financial-times/x-handlebars": "^1.0.0",
+     "@financial-times/x-teaser": "^1.0.0",
  },
```

### 2. Install and configure a runtime

There are many different frameworks and libraries able to render components written with JSX. If you are already using a framework in your application then you should continue to use that where possible, otherwise we recommend installing the [Hyperons](https://www.npmjs.com/package/hyperons) module which is very small and fast.

The `x-engine` module installed in the previous step is a consolidation library that provides your chosen runtime to `x-` components. The configuration for `x-engine` must be added to your package manifest.

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

### 3. Load Handlebars helpers

User facing applications on FT.com use an Express server provided by [n-ui](https://github.com/Financial-Times/n-ui). As part of the server initialisation any Handlebars helpers to be made available to your templates must be included.

The `n-teaser` module uses this functionality to load its internal helper functions and the `x-handlebars` helper must be loaded in the same way.

```diff
  helpers: {
-    nTeaserPresenter: require('@financial-times/n-teaser').presenter
+    ...require('@financial-times/x-handlebars')
  }
```

### 4. Fetching the right data

The data required to render teasers can now be fetched in a format ready for use. Whether your application fetches its data from Next API (with GraphQL queries) or directly from [Elasticsearch](https://github.com/Financial-Times/next-es-interface/) we have greatly reduced the number of fields required and size of the payload to be transferred.

#### Changes to GraphQL queries

With GraphQL every field to be retrieved must be explicitly specified. For convenience the `n-teaser` package provides a range of GraphQL fragments to generate a list of fields for each teaser type. This package provides a single, generic, fragment for use with all teasers.

```diff
- const { fragments } = require('@financial-times/n-teaser');
+ const teaser = require('@financial-times/x-teaser/fragment');

module.exports = `
-  ${fragments.teaserExtraLight}
-  ${fragments.teaserLight}
-  ${fragments.teaserStandard}
-  ${fragments.teaserHeavy}
-  ${fragments.teaserTopStory}
+  ${teaser}
`;
```

#### Changes to Elasticsearch queries

Wherever you specify a list of source fields to retrieve you may replace this with a single entry.

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

The `n-teaser` package provides different templates to include for each teaser layout. In contrast the `x-handlebars` package is generic and allows you to render any installed `x-` component in your view using the `package` attribute.

Teaser layouts and options may be configured by providing further attributes. Common use cases are provided via [presets](../readme.md#presets) and may be implemented using the `preset` attribute.

```diff
- {{>n-teaser/templates/heavy mods=(array 'small') widths="[160]" }}
+ {{{x package="x-teaser" component="Teaser" preset="SmallHeavy"}}}
```
