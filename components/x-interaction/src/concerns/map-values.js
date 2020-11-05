const mapValues = (obj, fn) =>
	Object.keys(obj).reduce(
		(mapped, key) =>
			Object.assign(mapped, {
				[key]: fn(obj[key], key, obj)
			}),
		{}
	)

export default mapValues
