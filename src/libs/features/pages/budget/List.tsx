import {
	Box,
	Flex,
	VStack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetBudgets } from '@/libs/data-access/hooks/query/useGetBudgets';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { BudgetItem } from './components/BudgetItem';
import { AppBar } from '@/libs/ui/layout/AppBar';
import { ModalAddBudget, ModalEditBudget } from './components/ModalBudget';
import { FormBudgetValue } from './components/type';

export default function BudgetListPage() {
	const [dataToEdit, setDataToEdit] = useState<
		(FormBudgetValue & { id: string }) | null
	>(null);

	const { roomId } = useParams();
	const navigate = useNavigate();

	const modalAddBudget = useDisclosure();
	const modalEditBudget = useDisclosure();

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
				onBack={() => navigate('/room', { replace: true })}
				rightActions={[{ title: 'Tambah', onClick: modalAddBudget.onOpen }]}
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
							onClickEdit={() => {
								setDataToEdit(budget);
								modalEditBudget.onOpen();
							}}
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
					onSuccess={() => {
						budgetsQuery.refetch();
						toast({ description: 'Berhasil menambahkan budget!' });
					}}
					disclosureProps={modalAddBudget}
				/>
			) : null}
			{roomId && dataToEdit ? (
				<ModalEditBudget
					id={dataToEdit.id}
					onSuccess={() => {
						budgetsQuery.refetch();
						toast({ description: 'Berhasil mengubah budget!' });
					}}
					disclosureProps={modalEditBudget}
					initialValues={dataToEdit}
				/>
			) : null}
		</>
	);
}
