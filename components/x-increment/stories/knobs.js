export default (data, { number }) => {
	return {
		count() {
			return number('Count', data.count, {});
		}
	};
};
