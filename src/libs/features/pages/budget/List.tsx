import { Box, Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetBudgets } from '@/libs/data-access/hooks/query/useGetBudgets';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { BudgetItem } from './components/BudgetItem';
import { ModalAddBudget } from './components/ModalAddBudget';

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
				{roomId ? (
					<ModalAddBudget roomId={roomId} onSuccess={budgetsQuery.refetch} />
				) : null}
			</Flex>
			<Box h="8" />
			<VStack align="stretch" gap="2">
				{budgetsQuery.data && budgetsQuery.data.length > 0 ? (
					budgetsQuery.data.map((budget) => (
						<BudgetItem
							key={budget.id}
							id={budget.id}
							name={budget.name}
							amount={budget.amount}
							expense={budget.expenses}
						/>
					))
				) : (
					<Flex alignItems="center" justify="center" height="50vh">
						<Text>Belum Ada Budget</Text>
					</Flex>
				)}
			</VStack>
		</>
	);
}
