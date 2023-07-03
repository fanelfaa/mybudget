import { Button, Grid, HStack, Heading, IconButton } from '@chakra-ui/react';
import { ReactElement, useEffect, useId, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

export type AppBarAction = {
	title?: string;
	icon?: ReactElement;
	onClick?: () => void;
};

export const Action = ({ icon, title, onClick }: AppBarAction) => {
	if (icon && !title) {
		return (
			<IconButton
				icon={icon}
				aria-label=""
				onClick={onClick}
				variant="ghost"
				colorScheme="blue"
				size="sm"
			/>
		);
	}
	return (
		<Button
			leftIcon={icon}
			onClick={onClick}
			variant="ghost"
			colorScheme="blue"
			size="sm"
		>
			{title}
		</Button>
	);
};

export type AppBarProps = {
	leftAction?: AppBarAction;
	title?: string;
	onBack?: () => void;
	rightActions?: AppBarAction[];
};

export const AppBar = ({ title, onBack, rightActions }: AppBarProps) => {
	const [showSmallTitle, setShowSmallTitle] = useState(false);
	const uniqId = useId();

	const handleScroll = () => {
		const position = window.scrollY;
		setShowSmallTitle(position >= 30);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<Grid
				templateColumns="1fr 3fr 1fr"
				position="sticky"
				top="0"
				bg="Background"
				alignItems="center"
				borderBottom={showSmallTitle ? '1px solid' : undefined}
				borderColor={showSmallTitle ? 'gray.200' : undefined}
				mx="-4"
				px="2"
				h="10"
				justifyContent="space-between"
				transition="all .2s ease-in-out"
			>
				<HStack>
					{onBack ? (
						<IconButton
							icon={<FiChevronLeft />}
							variant="ghost"
							aria-label="Back"
							onClick={onBack}
							colorScheme="blue"
							size="sm"
							fontSize={25}
						/>
					) : null}
				</HStack>
				<Heading
					size="md"
					noOfLines={1}
					textAlign="center"
					color={showSmallTitle ? undefined : 'transparent'}
					transition="all .2s ease-in-out"
				>
					{title}
				</Heading>
				{rightActions && rightActions.length > 0 ? (
					rightActions.map((action, i) => (
						<Action key={uniqId + i} {...action} />
					))
				) : (
					<span />
				)}
			</Grid>
			<Heading noOfLines={1}>{title}</Heading>
		</>
	);
};
