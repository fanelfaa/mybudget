import {
	Box,
	Flex,
	VStack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetBudgets } from '@/libs/data-access/hooks/query/useGetBudgets';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { BudgetItem } from './components/BudgetItem';
import { ModalAddBudget } from './components/ModalAddBudget';
import { AppBar } from '@/libs/ui/layout/AppBar';

export default function BudgetListPage() {
	const { roomId } = useParams();

	const modalAddBudgetDisclosure = useDisclosure();
	const toast = useToast();

	const { month, year } = getCurrentMonthYear();

	const budgetsQuery = useGetBudgets(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		{ roomId: roomId!, month, year },
		{ enabled: roomId !== undefined }
	);

	const onSuccessDelete = () => {
		budgetsQuery.refetch();
		toast({ description: 'Berhasil menghapus data!' });
	};

	if (!roomId) {
		return <Navigate to="/room" />;
	}

	return (
		<>
			<AppBar
				title="Budgets"
				rightActions={[
					{ title: 'Tambah', onClick: modalAddBudgetDisclosure.onOpen },
				]}
			/>
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
							onSuccessDelete={onSuccessDelete}
						/>
					))
				) : (
					<Flex alignItems="center" justify="center" height="50vh">
						<Text>Belum Ada Budget</Text>
					</Flex>
				)}
			</VStack>
			{roomId ? (
				<ModalAddBudget
					roomId={roomId}
					onSuccess={budgetsQuery.refetch}
					disclosureProps={modalAddBudgetDisclosure}
				/>
			) : null}
		</>
	);
}
