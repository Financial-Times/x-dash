import { createStore, applyMiddleware, compose } from 'redux'
import { initialState, reducer, middleware } from './player-logic';

const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devToolsCompose ? devToolsCompose({}) : compose;

export default () => createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(middleware)
	)
);
