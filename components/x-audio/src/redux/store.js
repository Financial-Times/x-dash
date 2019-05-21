import { createStore, applyMiddleware, compose } from 'redux'
import { reducer, middleware } from './player-logic';
import notificationsMiddleware from './middleware/notifications';

const devToolsCompose = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devToolsCompose ? devToolsCompose({}) : compose;

export default (notifier) => createStore(
	reducer,
	composeEnhancers(
		applyMiddleware(middleware, notificationsMiddleware(notifier))
	)
);
