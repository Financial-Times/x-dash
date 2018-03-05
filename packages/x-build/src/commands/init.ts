import {Command, command, metadata} from 'clime';

@command({
	description: 'initialise a component\'s or app\'s x-build boilerplate',
})
export default class Init extends Command {
	@metadata
	execute() {
	}
};
