/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Flex, Heading, Button, VStack, Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useGetBudget } from '@/libs/data-access/hooks/query/useGetBudget';
import { formatIdr } from '@/libs/utils/formatIdr';
import { useGetTransactions } from '@/libs/data-access/hooks/query/useGetTransactions';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { TransactionsProgress } from './components/Progress';
import { TransactionItem } from './components/TransactionItem';

export default function BudgetDetailPage() {
	const { budgetId } = useParams();
	const { month, year } = getCurrentMonthYear();

	const budgetQuery = useGetBudget(budgetId!, {
		enabled: budgetId !== undefined,
	});

	const transactionsQuery = useGetTransactions(
		{ budgetId: budgetId!, month, year },
		{ enabled: budgetId !== undefined }
	);

	return (
		<>
			<Flex justify="space-between" align="center">
				<Heading noOfLines={1}>Budget Detail</Heading>
				<Button variant="ghost">Tambah</Button>
			</Flex>
			<Box h="4" />
			<Text>Total expenses: {formatIdr(budgetQuery.data?.expenses ?? 0)}</Text>
			<Box h="2" />
			<TransactionsProgress
				amount={budgetQuery.data?.amount ?? 0}
				expense={budgetQuery.data?.expenses ?? 0}
			/>
			<Box h="8" />
			<VStack align="stretch" gap="2">
				{transactionsQuery.data?.map((t) => (
					<TransactionItem
						key={t.id}
						id={t.id}
						note={t.note}
						amount={t.amount}
					/>
				))}
			</VStack>
		</>
	);
}
