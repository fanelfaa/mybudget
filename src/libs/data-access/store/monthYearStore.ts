import { create } from 'zustand';
import format from 'date-fns/format';
import { useMemo } from 'react';

type MonthYearState = {
	date: Date;
};

type MonthYearAction = {
	setValues: (values: Partial<NonNullable<MonthYearState>>) => void;
};

export const useMonthYearStore = create<MonthYearState & MonthYearAction>()(
	(set) => ({
		date: new Date(),
		setValues: (values) => set(() => values),
	})
);

export const useGetStringYearMonth = () => {
	const { date } = useMonthYearStore();
	const stringYearMonth = useMemo(() => {
		return format(date, 'yyyy-MM');
	}, [date]);

	return stringYearMonth;
};

export const useMonthYear = () => {
	const { date } = useMonthYearStore();

	return { month: date.getMonth() + 1, year: date.getFullYear() };
};
