import {
	Flex,
	Grid,
	Heading,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiEdit, FiDelete } from 'react-icons/fi';
import { formatIdr } from '@/libs/utils/formatIdr';
import { TransactionsProgress } from './Progress';

export type BudgetItemProps = {
	id: string;
	name: string;
	amount: number;
	expense: number;
};

export const BudgetItem = (props: BudgetItemProps) => {
	return (
		<Grid
			templateRows="auto auto auto"
			gap="2"
			borderBottom="1px"
			borderColor="gray.300"
			pt="1"
			pb="2"
			transition="all .15s ease-in-out"
			_hover={{
				rounded: 'md',
			}}
		>
			<Grid templateColumns="1fr auto" alignItems="center">
				<Heading
					noOfLines={1}
					as={Link}
					to={`${props.id}`}
					size="md"
					color="gray.700"
				>
					{props.name}
				</Heading>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<FiMoreVertical />}
						variant="outline"
						// isDisabled={isLoadingDelete}
						size="sm"
						onClick={(e) => e.stopPropagation()}
					/>
					<MenuList>
						<MenuItem icon={<FiEdit />}>Ubah</MenuItem>
						<MenuItem icon={<FiDelete />}>Hapus</MenuItem>
					</MenuList>
				</Menu>
			</Grid>
			<TransactionsProgress
				amount={props.amount}
				expense={props.expense}
				size="sm"
			/>
			<Flex alignItems="center" wrap="wrap" fontSize={14}>
				<Text color="gray.600">
					Budget: <strong>{formatIdr(props.amount)}</strong>
				</Text>
				<Text color="gray.600" ml="auto">
					Pengeluaran: <strong>{formatIdr(props.expense)}</strong>
				</Text>
			</Flex>
		</Grid>
	);
};
