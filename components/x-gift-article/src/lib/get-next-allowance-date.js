export default () => {
	const now = new Date();
	const startOfNextMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	return {
		year: String(startOfNextMonth.getFullYear()),
		month: String(startOfNextMonth.getMonth() + 1),
		monthName: monthNames[startOfNextMonth.getMonth()],
		day: String(startOfNextMonth.getDate())
	};
}
