import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Flex,
	Grid,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { FiMoreVertical, FiDelete, FiEdit } from 'react-icons/fi';
import React, { useState } from 'react';
import format from 'date-fns/format';
import { formatIdr } from '@/libs/utils/formatIdr';
import { deleteTransaction } from '@/libs/data-access/api/transaction';

export type TransactionItemProps = {
	id: string;
	budgetId?: string;
	note: string;
	amount: number;
	date: number;
	month: number;
	year: number;
	currentTotalExpense: number;
	onClickEdit?: () => void;
	onSuccessDelete?: () => void;
};

export const TransactionItem = (props: TransactionItemProps) => {
	const [isLoadingDelete, setLoadingDelete] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	const onDelete = () => {
		if (!props.budgetId) return;
		setLoadingDelete(true);
		deleteTransaction({
			id: props.id,
			amountDeleted: props.amount,
			budgetId: props.budgetId,
			currentBudgetExpense: props.currentTotalExpense,
		})
			.then((val) => {
				if (!val.error) {
					props.onSuccessDelete?.();
					onClose();
				}
			})
			.finally(() => setLoadingDelete(false));
	};

	return (
		<>
			<Grid
				templateRows="auto"
				templateColumns="1fr auto"
				alignItems="start"
				gap="4"
				py="2"
				borderBottom="1px"
				borderColor="gray.300"
				transition="all .15s ease-in-out"
				_hover={{
					rounded: 'md',
				}}
			>
				<Flex direction="column" gap="2">
					<Grid alignItems="center" templateColumns="1fr auto" gap="3">
						<Heading noOfLines={1} as="h4" size="md" color="gray.700">
							{props.note}
						</Heading>
						<Text color="gray.600">{formatIdr(props.amount)}</Text>
					</Grid>
					<Text color="gray.600" fontSize="sm">
						{format(
							new Date(props.year, props.month - 1, props.date),
							'dd-MM-yyyy'
						)}
					</Text>
				</Flex>

				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FiMoreVertical />}
						variant="outline"
						isDisabled={isLoadingDelete}
						size="sm"
					/>
					<MenuList>
						<MenuItem icon={<FiEdit />} onClick={props.onClickEdit}>
							Ubah
						</MenuItem>
						<MenuItem icon={<FiDelete />} onClick={onOpen}>
							Hapus
						</MenuItem>
					</MenuList>
				</Menu>
			</Grid>
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				closeOnOverlayClick={false}
				closeOnEsc={false}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Pengeluaran
						</AlertDialogHeader>

						<AlertDialogBody>Yakin? Data akan hilang.</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}
								isDisabled={isLoadingDelete}
							>
								Batal
							</Button>
							<Button
								colorScheme="red"
								onClick={onDelete}
								ml={3}
								isDisabled={isLoadingDelete}
							>
								{isLoadingDelete ? 'Menghapus...' : 'Hapus'}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};
