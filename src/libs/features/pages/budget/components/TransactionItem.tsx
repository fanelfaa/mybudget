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
import { formatIdr } from '@/libs/utils/formatIdr';

export type TransactionItemProps = {
	id: string;
	note: string;
	amount: number;
};

export const TransactionItem = (props: TransactionItemProps) => {
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
					/>
					<MenuList>
						<MenuItem icon={<FiEdit />}>Edit</MenuItem>
						<MenuItem icon={<FiDelete />}>Delete</MenuItem>
					</MenuList>
				</Menu>
			</Grid>
		</Grid>
	);
};
