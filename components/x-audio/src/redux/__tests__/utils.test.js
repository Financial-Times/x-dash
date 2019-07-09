import { shallowEquals } from '../utils';

describe('shallowEquals', () => {
	test('returns true if objects are equal to each other', () => {
		const first = { key: 'value', anotherKey: 'anotherValue' };
		const second = { key: 'value', anotherKey: 'anotherValue' };

		expect(shallowEquals(first, second)).toBe(true);
	});

	test('returns false if object values differ', () => {
		const first = { key: 'value' };
		const second = { key: 'another value' };

		expect(shallowEquals(first, second)).toBe(false);
	});

	test('returns false if object keys differ', () => {
		const first = { key: 'value' };
		const second = { anotherKey: 'value' };

		expect(shallowEquals(first, second)).toBe(false);
	});

	test('returns false if comparing objects with a depth greater than one', () => {
		const first = { key: { deep: 'value' } };
		const second = { key: { deep: 'value' } };

		expect(shallowEquals(first, second)).toBe(false);
	});

	test('returns false if comparing objects containing arrays', () => {
		const first = { key: [1, 2, 3] };
		const second = { key: [1, 2, 3] };

		expect(shallowEquals(first, second)).toBe(false);
	});
});
