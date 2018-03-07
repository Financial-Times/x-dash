import {Command, Context, command, metadata} from 'clime';
import compile from '../compile';

@command({
	description: 'compile all x-dash dependencies of this app',
})
export default class Compile extends Command {
	@metadata
	async execute(context: Context) {
		try {
			console.log(
				await compile(context.cwd)
			);
		} catch(e) {
			console.error(e.stack);
			process.exit(1);
		}
	}
};
