import { Box, FormLabel, Grid, IconButton, Input } from '@chakra-ui/react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
	useMonthYearStore,
	useGetStringYearMonth,
} from '@/libs/data-access/store/monthYearStore';

export const FilterMonthYear = () => {
	const { setValues, next, prev } = useMonthYearStore();
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
			<Grid templateColumns="auto 1fr auto" gap="2" alignItems="center">
				<IconButton
					icon={<FiArrowLeft />}
					aria-label="Previous Month"
					onClick={prev}
					fontSize={20}
					variant="solid"
					colorScheme="gray"
					size="sm"
				/>
				<Input
					type="month"
					value={stringYearMonth}
					onChange={onChange}
					variant="filled"
					required
					size="sm"
					rounded="md"
				/>
				<IconButton
					icon={<FiArrowRight />}
					aria-label="Next Month"
					onClick={next}
					fontSize={20}
					variant="solid"
					colorScheme="gray"
					size="sm"
				/>
			</Grid>
		</Box>
	);
};
