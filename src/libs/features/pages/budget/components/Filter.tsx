import { Box, Grid, IconButton } from '@chakra-ui/react';
import { FiFilter } from 'react-icons/fi';
import { FilterMonthYear } from './FilterMonthYear';
import { Search, SearchProps } from './Search';
import { useMonthYearStore } from '@/libs/data-access/store/monthYearStore';

export type FilterProps = SearchProps;

export const Filter = ({ onSearch }: SearchProps) => {
	const { show, toggleShow } = useMonthYearStore();

	return (
		<Box>
			<Grid templateColumns="1fr auto" gap="2">
				<Search onSearch={onSearch} />
				<IconButton
					icon={<FiFilter />}
					aria-label="Previous Month"
					onClick={toggleShow}
					variant="solid"
					colorScheme="gray"
					size="sm"
				/>
			</Grid>
			<Box
				position="relative"
				h={show ? '12' : '0'}
				transition="all .2s ease-in-out"
				transitionDelay=".1s"
			>
				<Box
					pt="4"
					h={show ? '12' : '0'}
					overflow="hidden"
					transition="all .2s ease-in-out"
					position="absolute"
					inset="0"
				>
					<FilterMonthYear />
				</Box>
			</Box>
		</Box>
	);
};
