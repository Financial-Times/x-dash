import '@financial-times/x-increment';
import {hydrate} from '@financial-times/x-interaction';

document.addEventListener('DOMContentLoaded', () => {
	hydrate();

	const external = document.getElementById('external-button');
	const increment = document.querySelector('[data-x-dash-id="x-ssr-increment-1"]');

	external.addEventListener('click', () => {
		increment.dispatchEvent(new CustomEvent('x-interaction.trigger-action', {
			detail: {
				action: 'increment',
				args: [ { amount: 5 } ]
			},
		}));
	});
});

import 'preact/devtools';
