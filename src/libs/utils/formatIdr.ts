export const formatIdr = (number: number | string) => {
	return number.toLocaleString("id-ID", {
		useGrouping: true,
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	});
};
