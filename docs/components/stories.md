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

Here is an example component configuration:

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

| Property    | Description                                                                                                                    | Required |
|-------------|--------------------------------------------------------------------------------------------------------------------------------|----------|
| `title`     | The title of the story                                                                                                         | Yes      |
| `data`      | The data to pass as props to the component                                                                                     | Yes      |
| `knobs`     | An array of data properties to convert to interactive knobs                                                                    | No       |
| `fetchMock` | A function expecting an instance of [fetch-mock]. If your story makes HTTP requests, you can use this to mock their behaviour. | No       |

Here is an example story configuration:

```js
// Title of the story
exports.title = 'Favourite food';

// Data to pass as props to the component
exports.data = {
	question: 'What is your favourite food?',
	answer: 'Sushi. Like news, I like my food fresh.'
};

// Data properties to convert to interactive knobs
exports.knobs = [
	'question'
	'answer'
];

// A function expecting a clean instance of fetch-mock
exports.fetchMock = fetchMock => {
    fetchMock.mock('/api/data', { some: 'data' });
}
```

[fetch-mock]: https://www.wheresrhys.co.uk/fetch-mock

## Knobs configuration

Knobs wrap the data properties for a story and allow users to dynamically edit them in the UI. It is a function which receives the story data and functions to create different types of knob. See the [Storybook knobs add-on] for more information.

Here is an example knobs configuration:

```js
module.exports = (data, createKnob) => {
	return {
		question() {
			return createKnob.text('Question', data.question);
		},
		answer() {
			return createKnob.text('Answer', data.answer);
		}
	};
};
```

[Storybook knobs add-on]: https://github.com/storybooks/storybook/tree/master/addons/knobs
