import { Box, Button, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { Link, useLoaderData, useRevalidator } from 'react-router-dom';
import { AppBar } from '@/libs/ui/layout/AppBar';
import { ModalAddRoom } from './components/ModalRoom';
import { logout } from '@/libs/data-access/api/logout';
import { getRooms } from '@/libs/data-access/api/room';

const RoomPage = () => {
	const modalAddRoom = useDisclosure();
	const toast = useToast();

   const rooms = useLoaderData() as Awaited<ReturnType<typeof getRooms>>;

   const revalidator = useRevalidator();

	return (
		<>
			<AppBar
				leftAction={{ title: 'Logout', onClick: logout }}
				title="Pilih Periode"
				rightActions={[{ title: 'Tambah', onClick: modalAddRoom.onOpen }]}
			/>
			<Box h="8" />
			<VStack align="stretch" gap="4">
				{rooms.map((room) => (
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
               revalidator.revalidate();
					toast({ description: 'Berhasil menambahkan periode!' });
				}}
				disclosureProps={modalAddRoom}
			/>
		</>
	);
};

export default RoomPage;
