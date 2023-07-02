import { Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { formatIdr } from '@/libs/utils/formatIdr';
import { TransactionsProgress } from './Progress';

export type BudgetItemProps = {
	id: string;
	name: string;
	amount: number;
	expense: number;
};

export const BudgetItem = (props: BudgetItemProps) => {
	return (
		<Grid
			templateRows="auto auto auto"
			gap="2"
			borderBottom="1px"
			borderColor="gray.300"
			py="2"
			as={Link}
			to={`${props.id}`}
			transition="all .15s ease-in-out"
			_hover={{
				rounded: 'md',
				px: '1',
			}}
		>
			<Heading noOfLines={1} as="h4" size="md" color="gray.700">
				{props.name}
			</Heading>
			<TransactionsProgress amount={props.amount} expense={props.expense} />
			<Flex alignItems="center" wrap="wrap">
				<Text color="gray.600">Budget: {formatIdr(props.amount)}</Text>
				<Text color="gray.600" ml="auto">
					Pengeluaran: {formatIdr(props.expense)}
				</Text>
			</Flex>
		</Grid>
	);
};
