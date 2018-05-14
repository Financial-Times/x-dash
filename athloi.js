const open = require('opn');
const tcpPortUsed = require('tcp-port-used');
const url = require('url');

const openUrls = {
	docs: 'http://local.ft.com:8000',
	storybook: 'http://local.ft.com:9001',
};

module.exports = ({tasks, prompt, addPrompt}) => ({
	start: Object.assign({}, tasks.start, {
		requiredArgs: ['open'],

		choice: addPrompt(
			tasks.start.choice,
			() => prompt([{
				type: 'list',
				name: 'open',
				message: 'What do you want to open in the browser?',
				choices: [
					{value: 'storybook', short: 'Storybook', name: 'The component explorer'},
					{value: 'docs', short: 'Docs', name: 'The documentation website'},
				]
			}])
		),

		run(options) {
			const openUrl = openUrls[options.open];
			const port = parseInt(url.parse(openUrl).port, 10);

			if(port) {
				// wait for whatever (storybook/gatsby) to be listening on the port
				// try every 500ms and give up after 30s
				tcpPortUsed.waitUntilUsed(port, 500, 30000)
					.then(() => open(openUrl))
					.catch(e => console.error(e.stack));
			}

			return tasks.start.run(options);
		},
	}),
});
