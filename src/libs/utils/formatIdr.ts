export const formatIdr = (number: number | string) => {
	return number.toLocaleString('id-ID', {
		style: 'currency',
		currency: 'IDR',
		currencyDisplay: 'symbol',
		useGrouping: true,
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	});
};
