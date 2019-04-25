const snapshots = require('@financial-times/x-test-utils/snapshots');
const stories = require('../stories');

describe('x-styling-demo', () => {
	snapshots(stories);
});
