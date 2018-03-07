import {Command, Context, command, metadata} from 'clime';
import compile from '../compile';

@command({
	description: 'compile all x-dash dependencies of this app',
})
export default class Compile extends Command {
	@metadata
	async execute(context: Context) {
		console.log(
			await compile(context.cwd)
		);
	}
};
