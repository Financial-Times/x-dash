# x-eventpromo

This module provides templates for use with [n-eventpromo](https://github.com/Financial-Times/n-eventpromo). 
Eventpromo is used to promote content from [live.ft.com](http://live.ft.com).

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-eventpromo @financial-times/x-engine
```

This module also requires [`x-engine`][engine] as a peer dependency. The Engine module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine

## Usage

This module is used by [n-eventpromo](https://github.com/Financial-Times/n-eventpromo).

Usage example can be found here (uses preact):
https://github.com/Financial-Times/n-eventpromo/blob/x-eventpromo/src/index.js

With react
```jsx
import React from 'react';
import { Eventpromo } from '@financial-times/x-eventpromo';

// A == B == C
const a = Eventpromo(props);
const b = <Eventpromo {...props} />;
const c = React.createElement(Eventpromo, props);
```
All `x-` components are designed to be compatible with a variety of runtimes, not just React. 
Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

## Properties

**If not marked optional, fields are require non-empty values.** 

Property             | Type                | Notes
---------------------|---------------------|--------------------------------
`dates`              | String              | Free text, can be either a specific date or a date range
`id`                 | String              | Eventpromo id, 32 chars
`images`             | String[]            | 3 image urls, will be passed to origami image service 
`link`               | String              | Eventpromo url, should include segmentId
`location`           | String              | No set format: "London", "New York", "ExCeL London", etc
`title`              | String              | 
