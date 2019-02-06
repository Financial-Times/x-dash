module.exports = (data, { boolean }) => {
	return {
		showSaveButtons() {
			return boolean('Show save buttons', data.showSaveButtons);
		}
	};
};
