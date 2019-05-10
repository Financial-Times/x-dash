import { middleware, actions, initialState, reducer } from '../player-logic';
const runActions = (initialState, ...actions) => actions.reduce(reducer, initialState);

test('Play action sets playing to true', () => {
  const updatedState = runActions(initialState, actions.play());

  expect(updatedState).toMatchSnapshot();
});

test('Pause action sets playing to false', () => {
  const updatedState = runActions(initialState, actions.play(), actions.pause());

  expect(updatedState).toMatchSnapshot();
});

test('Loading action sets loading to true', () => {
  const updatedState = runActions(initialState, actions.loading());

  expect(updatedState).toMatchSnapshot();
});

test('Loaded action sets loading to false', () => {
  const updatedState = runActions(initialState, actions.loading(), actions.loaded());

  expect(updatedState).toMatchSnapshot();
});

test('Update current time action updates currentTime', () => {
  const currentTime = 10;
  const updatedState = runActions(initialState, actions.updateCurrentTime({currentTime}));

  expect(updatedState).toMatchSnapshot();
});
