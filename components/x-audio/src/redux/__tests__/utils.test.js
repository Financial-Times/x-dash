import { idempotentUpdate } from '../utils';

describe('idempotentUpdate', () => {
	test('returns the same object if the update values match', () => {
		const state = { test: 'object', very: true };
		const output = idempotentUpdate(state, { test: 'object', very: true });

		expect(output).toBe(state);
	});

	test('returns a new object if the update values differ', () => {
		const state = { test: 'object', very: true };
		const output = idempotentUpdate(state, { test: 'object', very: false });

		expect(output).not.toBe(state);
		expect(output).toMatchObject({ test: 'object', very: false });
	});
});
