import { Button, Flex, Heading } from '@chakra-ui/react';
import { logout } from '@/libs/data-access/api/logout';

const HomePage = () => {
	return (
		<Flex
			p="4"
			shadow="md"
			rounded="md"
			minH="100vh"
			w="md"
			maxW="100%"
			bgColor="white"
			mx="auto"
			direction="column"
		>
			<Flex justify="space-between" align="center">
				<Heading>Select Room</Heading>
				<Button variant="ghost" onClick={() => logout()}>
					Logout
				</Button>
			</Flex>
		</Flex>
	);
};

export default HomePage;
