import {
	Grid,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { FiMoreVertical, FiDelete, FiEdit } from 'react-icons/fi';
import { useState } from 'react';
import { formatIdr } from '@/libs/utils/formatIdr';
import { deleteTransaction } from '@/libs/data-access/api/transaction';

export type TransactionItemProps = {
	id: string;
	budgetId?: string;
	note: string;
	amount: number;
	currentTotalExpense: number;
	onClickEdit?: () => void;
	onSuccessDelete?: () => void;
};

export const TransactionItem = (props: TransactionItemProps) => {
	const [isLoadingDelete, setLoadingDelete] = useState(false);

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
				}
			})
			.finally(() => setLoadingDelete(false));
	};

	return (
		<Grid
			templateRows="auto auto"
			gap="2"
			borderBottom="1px"
			borderColor="gray.300"
			py="2"
			textTransform="capitalize"
			transition="all .15s ease-in-out"
			_hover={{
				rounded: 'md',
			}}
		>
			<Grid alignItems="center" templateColumns="1fr auto auto" gap="3">
				<Heading noOfLines={1} as="h4" size="md" color="gray.700">
					{props.note}
				</Heading>
				<Text color="gray.600">{formatIdr(props.amount)}</Text>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FiMoreVertical />}
						variant="outline"
						isDisabled={isLoadingDelete}
					/>
					<MenuList>
						<MenuItem icon={<FiEdit />} onClick={props.onClickEdit}>
							Edit
						</MenuItem>
						<MenuItem icon={<FiDelete />} onClick={() => onDelete()}>
							Delete
						</MenuItem>
					</MenuList>
				</Menu>
			</Grid>
		</Grid>
	);
};
