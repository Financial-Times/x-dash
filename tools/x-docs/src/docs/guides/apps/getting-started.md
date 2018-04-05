---
title: Getting started using components
---

x-dash components only provide markup, i.e. templates. They're generally designed to be styled by their [Origami](https://origami.ft.com) counterparts, i.e. [x-teaser](/components/x-teaser) outputs classes that [o-teaser](https://registry.origami.ft.com/components/o-teaser) uses for styling.

The templates are authored as abstract [JSX](https://reactjs.org/docs/introducing-jsx.html), an extension of Javascript that allows you to use HTML-like markup as a first-class concept (that is, you can define it, pass it around and use it just like strings or objects). Since you can use variables in JSX expressions, we can use them to provide templating functionality, similar to Handlebars.

These components do not contain any state or behaviour, so they don't require any kind of runtime to work. Because of this, they can be used in any React-like library, such as Preact or Inferno, without relying on the React runtime, or without any runtime at all, just outputting static HTML strings. If you're using a library like one of these, x-dash components will work with [minimal setup](#setup). If you're not using one, and you want to use a component without any setup, they can be used as plain functions that output strings, similar to a Handlebars template. They can also be used as Handlebars template partials by installing [x-handlebars](/packages/x-handlebars).

## Installing

Components are installed with [`npm`](https://npmjs.org). See the individual [component's page](/components) for exact instructions, but you'll be running something like:

```
npm install --save @financial-times/x-teaser
```

In this case, you'll get the [Teaser component](/components/x-teaser).

## Setup

If you'll be using a component with a React-like library, you'll need to provide x-dash some information about your environment.
