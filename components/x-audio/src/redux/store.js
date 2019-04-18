import { createStore, applyMiddleware, compose } from 'redux'
import { reducer, middleware } from './player-logic';

const devToolsCompose = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devToolsCompose ? devToolsCompose({}) : compose;

export default () => createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(middleware)
	)
);
