import { Box, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { logout } from '@/libs/data-access/api/logout';
import { useGetRooms } from '@/libs/data-access/hooks/query/useGetRooms';
import { AppBar } from '@/libs/ui/layout/AppBar';

const RoomPage = () => {
	const roomsQuery = useGetRooms();

	return (
		<>
			<AppBar
				title="Pilih Room"
				rightActions={[{ title: 'Logout', onClick: logout }]}
			/>
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
