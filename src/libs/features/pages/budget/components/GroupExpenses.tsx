import { Flex, Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { memo, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { formatIdr } from '@/libs/utils/formatIdr';
import { TransactionItem } from './TransactionItem';
import { ReturnUseGetTransactions } from '@/libs/data-access/hooks/query/useGetTransactions';

export type GroupExpensesProps = {
	budgetId?: string;
	transactions: ReturnUseGetTransactions;
	currentTotalExpense: number;
	onSuccessDelete: () => void;
	onClickEdit: (t: ReturnUseGetTransactions[0]) => void;
};

export const GroupExpenses = ({
	budgetId,
	transactions,
	currentTotalExpense,
	onSuccessDelete,
	onClickEdit,
}: GroupExpensesProps) => {
	const { date, month, year } = transactions[0];
	const groupDate = new Date(year, month - 1, date);
	const stringDate = format(groupDate, 'dd-MM-yyyy');

	const totalExpense = useMemo(() => {
		return transactions.reduce((p, c) => p + c.amount, 0);
	}, [transactions]);

	const sortedTransactions = useMemo(() => {
		return transactions.sort((a, b) => a.note.localeCompare(b.note));
	}, [transactions]);

	return (
		<Box>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				h="12"
				bg="white"
				px="3"
				rounded="lg"
			>
				<Text fontSize={16} color="gray.600">
					{stringDate}
				</Text>
				<Text fontSize={16} color="gray.600" fontWeight="medium">
					{formatIdr(totalExpense)}
				</Text>
			</Flex>
			<Box background="white" rounded="xl" shadow="xs" overflow="hidden">
				{sortedTransactions.map((t) => (
					<TransactionItem
						key={t.id}
						id={t.id}
						note={t.note}
						amount={t.amount}
						onSuccessDelete={onSuccessDelete}
						budgetId={budgetId}
						currentTotalExpense={currentTotalExpense}
						date={t.date}
						month={t.month}
						year={t.year}
						onClickEdit={() => onClickEdit(t)}
					/>
				))}
			</Box>
		</Box>
	);
};

export const GroupExpensesMemo = memo(
	GroupExpenses,
	(p, n) =>
		p.budgetId === n.budgetId &&
		p.currentTotalExpense === n.currentTotalExpense &&
		isEqual(p.transactions, n.transactions)
);
