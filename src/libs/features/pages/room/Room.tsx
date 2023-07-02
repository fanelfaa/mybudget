import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { logout } from '@/libs/data-access/api/logout';
import { useGetRooms } from '@/libs/data-access/hooks/query/useGetRooms';

const RoomPage = () => {
	const roomsQuery = useGetRooms();

	return (
		<>
			<Flex justify="space-between" align="center">
				<Heading>Select Room</Heading>
				<Button variant="ghost" onClick={() => logout()}>
					Logout
				</Button>
			</Flex>
			<Box h="8" />
			<VStack align="stretch" gap="2">
				{roomsQuery.data?.map((room) => (
					<Button
						as={Link}
						to={`/room/${room.room_id}/budget`}
						key={room.id}
						rel="noreferrer"
						variant="solid"
					>
						{room.rooms?.name}
					</Button>
				))}
			</VStack>
		</>
	);
};

export default RoomPage;
