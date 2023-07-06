import format from 'date-fns/format';

export const getCurrentMonthYear = () => {
	const date = new Date();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const stringYearMonth = format(date, 'yyyy-MM');

	return { month, year, stringYearMonth };
};
