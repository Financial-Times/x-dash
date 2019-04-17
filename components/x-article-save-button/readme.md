# Article Save Button

This module provides a template for myFT save article buttons, and is intended to replace the legacy handlebars component in [n-myft-ui](https://github.com/Financial-Times/n-myft-ui/tree/master/components/save-for-later).

## Installation

```bash
npm install --save @financial-times/x-article-save-button
```

## Props

(Some of the properties don't influence the way button looks or acts, but can be used for e.g. client-side Javascript in the apps).
	
Feature                     | Type    | Required | Default value      | Description
----------------------------|---------|----------|--------------------|----------------------
`contentId`                 | String  | yes      | none               | UUID of the article
`contentTitle`              | String  | yes      | none               | Title of the article
`saved`                     | Boolean | no       | `false`            | Whether the article is saved or not.
`csrfToken`                 | String  | no       | none               | CSRF token (will be included in a hidden form field).
`trackableId`               | String  | no       | `'save-for-later'` | Identifier for tracking purposes

## Client side behaviour

For users with JavaScript enabled, the default form submit action is prevented, and a custom event (named 'x-article-save-button') will be dispatched on the form element.

This custom event will contain the following in its `detail` object:

Property           | Value
-------------------|-----------------
`action`           | `add` or `remove`
`actorType`        | `user`
`relationshipName` | `saved`
`subjectType`      | `content`
`subjectId`        | the value of the `contentId` prop
`token`            | the value of the `csrfToken` prop

It is up to the consumer of this component to listen for the `x-article-save-button` event, and use this data, along with the user's ID, and carry out the appropriate action.

For example, if using `next-myft-client`:
```
import nextMyftClient from 'next-myft-client';

document.body.addEventListener('x-article-save-button', ({ detail }) => {
	nextMyftClient[detail.action](detail.actorType, null, detail.relationshipName, detail.subjectType, detail.subjectId, {
		token: detail.token
	});
});
```
