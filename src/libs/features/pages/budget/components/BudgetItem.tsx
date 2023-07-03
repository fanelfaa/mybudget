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
			<Flex justify="space-between" alignItems="center">
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
			</Flex>
			<TransactionsProgress amount={props.amount} expense={props.expense} />
			<Flex alignItems="center" wrap="wrap">
				<Text color="gray.600">Budget: {formatIdr(props.amount)}</Text>
				<Text color="gray.600" ml="auto">
					Pengeluaran: {formatIdr(props.expense)}
				</Text>
			</Flex>
		</Grid>
	);
};
