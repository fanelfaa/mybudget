import {
	Box,
	Flex,
	VStack,
	Text,
	useDisclosure,
	useToast,
	Spinner,
} from '@chakra-ui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useGetBudgets } from '@/libs/data-access/hooks/query/useGetBudgets';
import { BudgetItem } from './components/BudgetItem';
import { AppBar } from '@/libs/ui/layout/AppBar';
import { ModalAddBudget, ModalEditBudget } from './components/ModalBudget';
import { FormBudgetValue } from './components/type';
import { formatIdr } from '@/libs/utils/formatIdr';
import { PrimaryButton } from '@/libs/ui/button/PrimaryButton';
import {
	useMonthYear,
	useMonthYearStore,
} from '@/libs/data-access/store/monthYearStore';
import { Filter } from './components/Filter';
import { formatDate } from '@/libs/utils/formatDateId';

export default function BudgetListPage() {
	const [dataToEdit, setDataToEdit] = useState<
		(FormBudgetValue & { id: string }) | null
	>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const { roomId } = useParams();
	const navigate = useNavigate();

	const modalAddBudget = useDisclosure();
	const modalEditBudget = useDisclosure();

	const toast = useToast();

	const { month, year } = useMonthYear();
	const dateMonthYear = useMonthYearStore((s) => s.date);

	const budgetsQuery = useGetBudgets(
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		{ roomId: roomId!, month, year },
		{ enabled: roomId !== undefined }
	);

	const onSuccessDelete = () => {
		budgetsQuery.refetch();
		toast({ description: 'Berhasil menghapus data!' });
	};

	const totalBudget = useMemo(() => {
		if (!budgetsQuery.data) return 0;
		return budgetsQuery.data.reduce((p, c) => p + c.amount, 0);
	}, [budgetsQuery.data]);

	if (!roomId) {
		return <Navigate to="/room" />;
	}

	return (
		<>
			<AppBar
				title={`Budget ${formatDate(dateMonthYear, 'MMM, yyyy')}`}
				onBack={() => navigate('/room', { replace: true })}
				rightActions={[{ title: 'Tambah', onClick: modalAddBudget.onOpen }]}
			/>
			<Box h="4" />
			<Filter onSearch={setSearchQuery} />
			<Box h="4" />
			<Box shadow="xs" rounded="lg" bg="white" px="3" py="2">
				<Text color="gray.600">
					Total budget: <strong>{formatIdr(totalBudget)}</strong>
				</Text>
			</Box>
			<Box h="8" />
			<VStack align="stretch" gap="4" pb="8">
				{budgetsQuery.data && budgetsQuery.data.length > 0 ? (
					budgetsQuery.data
						.sort((a, b) => a.name.localeCompare(b.name))
						.filter((it) => it.name.toLowerCase().includes(searchQuery))
						.map((budget) => (
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
					<Flex
						alignItems="center"
						justify="center"
						direction="column"
						gap="4"
						height="60vh"
					>
						{budgetsQuery.isLoading ? (
							<Spinner />
						) : (
							<>
								<Text>Belum Ada Pengeluaran</Text>
								<PrimaryButton onClick={modalAddBudget.onOpen} w="50%">
									Tambah Baru
								</PrimaryButton>
							</>
						)}
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
						setDataToEdit(null);
					}}
					disclosureProps={modalEditBudget}
					initialValues={dataToEdit}
				/>
			) : null}
		</>
	);
}
