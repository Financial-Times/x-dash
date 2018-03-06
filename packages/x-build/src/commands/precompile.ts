import {Command, Context, command, metadata} from 'clime';
import compile from '../compile-component';

@command({
	description: 'compile a component for publication',
})
export default class Precompile extends Command {
	@metadata
	async execute(context: Context) {
		await compile({root: context.cwd});
	}
};
