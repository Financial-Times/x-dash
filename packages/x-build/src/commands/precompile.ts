import {Command, Context, command, metadata} from 'clime';
import compile from '../compile';

@command({
	description: 'compile a component for publication',
})
export default class Precompile extends Command {
	@metadata
	async execute(context: Context) {
		const component = {root: context.cwd};
		await compile(component);
	}
};
