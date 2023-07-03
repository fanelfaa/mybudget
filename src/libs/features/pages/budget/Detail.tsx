/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
	Flex,
	VStack,
	Box,
	Text,
	useToast,
	useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useGetBudget } from '@/libs/data-access/hooks/query/useGetBudget';
import { formatIdr } from '@/libs/utils/formatIdr';
import { useGetTransactions } from '@/libs/data-access/hooks/query/useGetTransactions';
import { getCurrentMonthYear } from '@/libs/utils/getCurrentMonthYear';
import { TransactionsProgress } from './components/Progress';
import { TransactionItem } from './components/TransactionItem';
import { ModalAddExpense } from './components/ModalAddExpense';
import { AppBar } from '@/libs/ui/layout/AppBar';

export default function BudgetDetailPage() {
	const { budgetId, roomId } = useParams();
	const toast = useToast();
	const navigate = useNavigate();

	const modalAddExpenseDisclosure = useDisclosure();

	const { month, year } = getCurrentMonthYear();

	const budgetQuery = useGetBudget(budgetId!, {
		enabled: budgetId !== undefined,
	});

	const transactionsQuery = useGetTransactions(
		{ budgetId: budgetId!, month, year },
		{ enabled: budgetId !== undefined }
	);

	const refetchAll = () => {
		budgetQuery.refetch();
		transactionsQuery.refetch();
	};

	const currentTotalExpense = useMemo(
		() =>
			transactionsQuery.data?.map((t) => t.amount).reduce((p, c) => p + c, 0) ??
			0,
		[transactionsQuery.data]
	);

	const onSuccessDelete = () => {
		refetchAll();
		toast({ description: 'Berhasil menghapus data!' });
	};

	const isTransactionNotEmpty =
		transactionsQuery.data && transactionsQuery.data.length > 0;

	return (
		<>
			<AppBar
				title={budgetQuery.data?.name}
				onBack={() => navigate(`/room/${roomId}/budget`, { replace: true })}
				rightActions={[
					{ title: 'Tambah', onClick: modalAddExpenseDisclosure.onOpen },
				]}
			/>
			{isTransactionNotEmpty ? (
				<>
					<Box h="4" />
					<Flex justify="space-between">
						<Text>Budget: {formatIdr(budgetQuery.data?.amount ?? 0)}</Text>
						<Text>
							Pengeluaran: {formatIdr(budgetQuery.data?.expenses ?? 0)}
						</Text>
					</Flex>
					<Box h="2" />
					<TransactionsProgress
						amount={budgetQuery.data?.amount ?? 0}
						expense={budgetQuery.data?.expenses ?? 0}
					/>
				</>
			) : null}
			<Box h="8" />
			<VStack align="stretch" gap="2">
				{isTransactionNotEmpty ? (
					transactionsQuery.data.map((t) => (
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
						/>
					))
				) : (
					<Flex alignItems="center" justify="center" height="50vh">
						<Text>Belum Ada Pengeluaran</Text>
					</Flex>
				)}
			</VStack>
			{roomId && budgetId ? (
				<ModalAddExpense
					roomId={roomId}
					budgetId={budgetId}
					onSuccess={refetchAll}
					currentTotalExpense={currentTotalExpense}
					disclosureProps={modalAddExpenseDisclosure}
				/>
			) : null}
		</>
	);
}
