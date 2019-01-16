module.exports = (data, { number, select }) => {
	return {
		latestItemsTime() {
			return select(
				'Latest Items Time',
				{
					None: '',
					'2018-10-17T12:10:33.000Z': '2018-10-17T12:10:33.000Z'
				});
		},
		customSlotPosition() {
			return number('Custom Slot Position', data.customSlotPosition);
		},
		customSlotContent() {
			return select(
				'Custom Slot Content',
				{
					None: '',
					Something: '---Custom slot content---'
				});
		}
	};
};

