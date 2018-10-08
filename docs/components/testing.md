# Testing components

Defining [stories] from your components, as well as including them in Storybook, will generate Jest snapshot tests for each story. Your stories should include as many of your component's use cases as possible, so that they're covered by the tests.

Snapshot tests are useful for ensuring that you don't accidentally change the markup that your component outputs, which may inadvertently break the apps consuming your component. They don't cover any kind of interactive behaviour or changing state. For components using `x-interaction`, you should consider adding test cases for the interactivity.

[stories]: /docs/components/stories

## Interactive components

x-dash comes with Jest and Enzyme pre-configured, to help save boilerplate and setup when testing your component.

For an example of Jest and Enzyme in use, and standard patterns for writing tests for a component, see the [x-increment tests](https://github.com/Financial-Times/x-dash/tree/master/components/x-increment/__tests__).

### Setup

Install `x-test-utils` as a `devDependency` of your component:

```
npm install --save-dev ../../packages/x-test-utils
```

This module exports a version of Enzyme pre-configured to work with Jest and the version of React in use. Create a folder called `__tests__` in your component's folder. Test files should be placed in this folder, using the filename extension `.test.jsx`. It's up to you how to structure your tests; for simple tests we recommend a single file named after your component, e.g. `x-increment.test.jsx`.

The standard pattern for testing an interactive component is rendering it using Enzyme's `mount` DOM renderer, using its selector functions to select an element that would trigger an action, and directly calling the event that calls the action. `x-interaction` actions return a promise that resolves once the state changes have taken place, so you should `await` this promise, then use Jest's `expect` to assert that the DOM changes you expect have take place.

For example, the following is an annotated excerpt from `x-increment`'s tests:

```jsx
const { h } = require('@financial-times/x-engine');
const { mount } = require('@financial-times/x-test-utils/enzyme');

const { Increment } = require('../');

describe('x-increment', () => {
	it('should increment when clicked', async () => {
		// render the component with the DOM renderer
		const subject = mount(<Increment count={1} />);
		// find the button that triggers the increment, and call its `onClick` event. `await` state updates
		await subject.find('button').prop('onClick')();
		// has the number in the text incremented?
		expect(subject.find('span').text()).toEqual('2');
	});
});
```
