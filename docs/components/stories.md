# Component stories

## Setup

TODO

## Component configuration

The Storybook configuration is a module which exports properties about the component to be rendered.

Property       | Description                                               | Required
---------------|-----------------------------------------------------------|----------
`component`    | A reference to the top-level function to render           | Yes
`package`      | The component's package manifest                          | Yes
`dependencies` | An object containing the Origami dependencies to load     | No
`stories`      | An array of story configuration modules                   | Yes
`knobs`        | A module generating dynamically editable knobs            | No

### Example

```js
const { Denshiba } = require('../');

// Reference to top-level function to render
exports.component = Denshiba;

// The component's package manifest
exports.package = require('../package.json');

// Origami dependencies to load (from the Build Service)
exports.dependencies = {
	'o-normalise': '^1.6.0',
	'o-typography': '^5.5.0'
};

// Story configuration modules
exports.stories = [
	require('./food')
];

// A module generating dynamically editable knobs
exports.knobs = require('./knobs');
```


## Story configuration

Story modules export the configuration required for each component demo.

Property | Description                                      | Required
---------|--------------------------------------------------|----------
`name`   | The name of the story                            | Yes
`data`   | The data to pass as props to the component       | Yes
`knobs`  | An array of data properties to convert to knobs  | No


### Example

```js
// Name of the story
exports.name = 'Favourite food';

// Data to pass as props to the component
exports.data = {
	title: 'My favourite food',
	food: 'sushi',
	reason: 'Like news, I like my food fresh'
};

// Data properties to convert to knobs
exports.knobs = [
	'food'
	'reason'
];
```


## Knobs configuration

Knobs wrap the data properties for a story and allow users to dynamically edit them in the UI. It is a function which receives the story data and functions to create different types of knob. See the [Storybook knobs add-on] for more information.


### Example

```js
module.exports = (data, knobs) => {
	return {
		food() {
			return knobs.text('Food', data.food);
		},
		reason() {
			return knobs.text('Reason', data.reason);
		}
	};
};
```

[Storybook knobs add-on]: https://github.com/storybooks/storybook/tree/master/addons/knobs
