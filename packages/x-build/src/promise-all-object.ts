type ObjectOf<T> = {
	[key: string]: T
};

export default async function promiseAllObject<T>(obj: ObjectOf<Promise<T>>): Promise<ObjectOf<T>> {
	const results: ObjectOf<T> = {};

	await Promise.all(
		Object.keys(obj).map(
			async key => results[key] = await obj[key]
		)
	);

	return results;
};
