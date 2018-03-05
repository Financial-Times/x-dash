import {Command, command, metadata} from 'clime';

@command({
	description: 'compile a component for publication',
})
export default class Compile extends Command {
	@metadata
	execute() {
	}
};
