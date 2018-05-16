import {h, render} from 'preact';
import {Increment} from '@financial-times/x-increment';

render(
	<Increment count={0} />,
	document.getElementById('root'),
	document.getElementById('root').children[0],
);
