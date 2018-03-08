import {Command, Context, command, metadata} from 'clime';
import compileComponent from '../compile-component';
import * as path from 'path';
import * as fs from 'fs-extra';

@command({
	description: 'compile a component for publication',
})
export default class Precompile extends Command {
	@metadata
	async execute(context: Context) {
		const mappings = await compileComponent({root: context.cwd});

		const mappingsFile = path.resolve(
			context.cwd,
			'x-build-mappings.json'
		);

		await fs.writeFile(
			mappingsFile,
			JSON.stringify(mappings, null, 2)
		);
	}
};
