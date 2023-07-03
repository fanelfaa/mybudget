import { Box, BoxProps } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export type BaseLayoutProps = BoxProps;

export const BaseLayout = (props: BaseLayoutProps) => (
	<Box
		p="4"
		pt="0"
		shadow="md"
		rounded="md"
		minH="100vh"
		w="md"
		maxW="100%"
		bgColor="white"
		mx="auto"
		{...props}
	>
		<Outlet />
	</Box>
);
