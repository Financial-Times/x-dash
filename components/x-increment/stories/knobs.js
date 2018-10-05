module.exports = (data, { number }) => {
	return {
		count() {
			return number('Count', data.count, {});
		}
	};
};
