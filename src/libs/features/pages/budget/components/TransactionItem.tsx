import { Grid, Heading, Text } from '@chakra-ui/react';
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
				px: '1',
			}}
		>
			<Grid alignItems="center" templateColumns="1fr auto">
				<Heading noOfLines={1} as="h4" size="md" color="gray.700">
					{props.note}
				</Heading>
				<Text color="gray.600">{formatIdr(props.amount)}</Text>
			</Grid>
		</Grid>
	);
};
