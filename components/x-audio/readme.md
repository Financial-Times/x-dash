# x-audio

This module can be used to play an audio file via pluggable engines/players.

It comes bundled with a web audio player (via [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)), but can be used with another engine such as in the native layer. The bundled engine uses a [Redux](https://redux.js.org/) to manage state.

Redux was chosen as it is a well known method for updating state via distinct actions. x-audio implements middleware (found in `src/redux/player-logic.js`) which drives the [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement). 

For example, when redux receives a `REQUEST_PLAY` action, it will trigger `audioElement.play()`.

The module has two display modes, minimised and expanded. To hide the player simply do not render it in your app.

An example integration can be found in ft-app: 
* https://github.com/Financial-Times/ft-app/blob/master/lib/components/audio/index.js
* https://github.com/Financial-Times/ft-app/blob/master/lib/components/audio/persistent-player.js

## Requirements

Origami components:
* `o-loading`
* `o-typography`

## Installation

This module is compatible with Node 6+ and is distributed on npm.

```bash
npm install --save @financial-times/x-audio
```

The [`x-engine`][engine] module is used to inject your chosen runtime into the component. Please read the `x-engine` documentation first if you are consuming `x-` components for the first time in your application.

[engine]: https://github.com/Financial-Times/x-dash/tree/master/packages/x-engine


## Usage

This component exports both the plain UI component and  default is a factory function which returns the working audio player (under the hood this is the plain UI component hooked up to the redux store).

```jsx
import React from 'react';

// Import the plain UI components
import { Audio } from '@financial-times/x-audio';

// Render the UI component as usual
<Audio {...props} />;


// OR, Import a factory function which returns the component initialised with a Redux store
import createAudioPlayer from '@financial-times/x-audio';

// initialise store and create component
const ConnectedPlayer = createAudioPlayer();

// Render the component
<ConnectedPlayer {...props} />;
```

```scss
// within your app's sass file
@import "x-audio/dist/Audio";
```

All `x-` components are designed to be compatible with a variety of runtimes, not just React. Check out the [`x-engine`][engine] documentation for a list of recommended libraries and frameworks.

[jsx-wtf]: https://jasonformat.com/wtf-is-jsx/

### Properties

There are two types of property for x-audio. Ultimately these boil down to meta around the audio to be played, and `notifiers` to allow consumers to respond to state changes. They are detailed below.

#### x-audio props

Feature          | Type   | Notes
-----------------|--------|----------------------------
`title`  | String | The title of the audio, e.g. ‘May 23rd’
`seriesName`  | String | The series name, e.g. ‘News in Brief’
`url` | String | The url of the audio file, e.g. ‘https://acast.com/audio.mp3’
`onCloseClick`  | Function | Callback function for when the close button is clicked

#### x-audio notifiers (note that these are only available on the default 'connected' export)

Feature          | Type   | Notes
-----------------|--------|----------------------------
`notifiers.play`  | Function | Called when the audio state changes to playing
`notifiers.pause`  | Function | Called when the audio state changes to paused
