import { create } from 'zustand';
import format from 'date-fns/format';
import { useMemo } from 'react';
import add from 'date-fns/add';
import sub from 'date-fns/sub';

type MonthYearState = {
	date: Date;
};

type MonthYearAction = {
	setValues: (values: Partial<NonNullable<MonthYearState>>) => void;
	next: () => void;
	prev: () => void;
};

export const useMonthYearStore = create<MonthYearState & MonthYearAction>()(
	(set, get) => ({
		date: new Date(),
		setValues: (values) => set(() => values),
		next: () => set({ date: add(get().date, { months: 1 }) }),
		prev: () => set({ date: sub(get().date, { months: 1 }) }),
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
