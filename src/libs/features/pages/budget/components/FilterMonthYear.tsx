import { Box, FormLabel, Input } from '@chakra-ui/react';
import {
	useMonthYearStore,
	useGetStringYearMonth,
} from '@/libs/data-access/store/monthYearStore';

export const FilterMonthYear = () => {
	const { setValues } = useMonthYearStore();
	const stringYearMonth = useGetStringYearMonth();

	const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!(e.target.value.length > 0)) {
			setValues({ date: new Date() });
		} else {
			const [year, month] = e.target.value.split('-').map((it) => +it);
			setValues({ date: new Date(year, month - 1) });
		}
	};

	return (
		<Box>
			<FormLabel>Pilih Bulan</FormLabel>
			<Input
				type="month"
				defaultValue={stringYearMonth}
				onChange={onChange}
				required
			/>
		</Box>
	);
};
