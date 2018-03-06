export default function mapValues<V, W>(obj: { [key: string]: V }, fn: (val: V, key: string) => W): { [key: string]: W } {
	const results: { [key: string]: W } = {};

	Object.keys(obj).forEach(key => {
		results[key] = fn(obj[key], key);
	});

	return results;
};
