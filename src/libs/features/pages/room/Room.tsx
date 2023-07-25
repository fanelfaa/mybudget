import { Box, Button, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useGetRooms } from '@/libs/data-access/hooks/query/useGetRooms';
import { AppBar } from '@/libs/ui/layout/AppBar';
import { ModalAddRoom } from './components/ModalRoom';
import { logout } from '@/libs/data-access/api/logout';

const RoomPage = () => {
	const modalAddRoom = useDisclosure();
	const toast = useToast();

	const roomsQuery = useGetRooms();

	return (
		<>
			<AppBar
				leftAction={{ title: 'Logout', onClick: logout }}
				title="Pilih Periode"
				rightActions={[{ title: 'Tambah', onClick: modalAddRoom.onOpen }]}
			/>
			<Box h="8" />
			<VStack align="stretch" gap="4">
				{roomsQuery.data?.map((room) => (
					<Button
						as={Link}
						to={`/room/${room.room_id}/budget`}
						state={{ roomName: room.rooms?.name }}
						key={room.id}
						rel="noreferrer"
						variant="solid"
					>
						{room.rooms?.name}
					</Button>
				))}
			</VStack>
			<ModalAddRoom
				onSuccess={() => {
					roomsQuery.refetch();
					toast({ description: 'Berhasil menambahkan periode!' });
				}}
				disclosureProps={modalAddRoom}
			/>
		</>
	);
};

export default RoomPage;
