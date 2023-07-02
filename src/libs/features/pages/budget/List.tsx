import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetBudgets } from '@/libs/data-access/hooks/query/useGetBudgets';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { BudgetItem } from './components/BudgetItem';

export default function BudgetListPage() {
	const { roomId } = useParams();
	const { month, year } = getCurrentMonthYear();

	const budgetsQuery = useGetBudgets(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		{ roomId: roomId!, month, year },
		{ enabled: roomId !== undefined }
	);

	if (!roomId) {
		return <Navigate to="/room" />;
	}

	return (
		<>
			<Flex justify="space-between" align="center">
				<Heading>Budgets</Heading>
				<Button variant="ghost">Tambah</Button>
			</Flex>
			<Box h="8" />
			<VStack align="stretch" gap="2">
				{budgetsQuery.data?.map((budget) => (
					<BudgetItem
						key={budget.id}
						id={budget.id}
						name={budget.name}
						amount={budget.amount}
						expense={budget.expenses}
					/>
				))}
			</VStack>
		</>
	);
}
