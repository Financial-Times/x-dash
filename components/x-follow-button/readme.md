# x-follow-button

This module provides a template for myFT follow topic button, and is intended to replace the legacy handlebars component in [n-myft-ui](https://github.com/Financial-Times/n-myft-ui/tree/HEAD/components/follow-button).

## Installation

```bash
npm install --save @financial-times/x-follow-button
```

## Props

(Some of the properties don't influence the way button looks or acts, but can be used for e.g. client-side Javascript in the apps).

Feature                     | Type    | Required | Default value  | Description
----------------------------|---------|----------|----------------|---------------
`conceptId`                 | String  | yes      | none           | UUID of the concept
`conceptName`               | String  | yes      | none           | Name of the concept
`conceptNameAsButtonText`   | Boolean | no       | `false`        | If true will use the concept name as the button text, otherwise will default to "Add to MyFT" or "Remove from MyFT" (depending on isFollowed prop).
`isFollowed`                | Boolean | no       | `false`        | Whether the concept is followed or not.
`csrfToken`                 | String  | no       | none           | CSRF token (will be included in a hidden form field).
`variant`                   | String  | no       | `standard`     | One of `standard`, `inverse`, `opinion` or `monochrome`. Other values will be ignored.
`followPlusDigestEmail`     | Boolean | no       | `false`        | Whether following the topic should also subscribe to the digest.

## Client side behaviour

For users with JavaScript enabled, the default form submit action is prevented, and a custom event (named 'x-follow-button') will be dispatched on the form element.

This custom event will contain the following in its `detail` object:

Property           | Value
-------------------|-----------------
`action`           | `add` or `remove`
`actorType`        | `user`
`relationshipName` | `followed`
`subjectType`      | `concept`
`subjectId`        | the value of the `conceptId` prop
`token`            | the value of the `csrfToken` prop

It is up to the consumer of this component to listen for the `x-follow-button` event, and use this data, along with the user's ID, and carry out the appropriate action.

For example, if using `next-myft-client` to carry out the follow/unfollow action, n-myft-ui provides a x-button-interaction component for this:
https://github.com/Financial-Times/n-myft-ui/blob/HEAD/components/x-button-integration/index.js
