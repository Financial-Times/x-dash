export default function mapToObject<V, W>(
	values: V[],
	getValue: (val: V) => W,
	getKey: (val: V) => string = val => val.toString(),
): { [key: string]: W } {
	const results: { [key: string]: W } = {};

	values.forEach(value => {
		results[getKey(value)] = getValue(value);
	});

	return results;
};
