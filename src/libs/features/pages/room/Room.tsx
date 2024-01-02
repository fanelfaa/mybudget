import { logout } from "@/libs/data-access/api/logout";
import { getRooms } from "@/libs/data-access/api/room";
import { AppBar } from "@/libs/ui/layout/AppBar";
import { formatIdr } from "@/libs/utils/formatIdr";
import {
   Box,
   Grid,
   Heading,
   Text,
   VStack,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";

const ModalAddRoom = lazy(() => import("./components/ModalAddRoom"));

const RoomPage = () => {
   const modalAddRoom = useDisclosure();
   const toast = useToast();

   const rooms = useLoaderData() as Awaited<ReturnType<typeof getRooms>>;

   const revalidator = useRevalidator();

   return (
      <>
         <AppBar
            leftAction={{ title: "Logout", onClick: logout }}
            title="Pilih Periode"
            rightActions={[{ title: "Tambah", onClick: modalAddRoom.onOpen }]}
         />
         <Box h="8" />
         <VStack align="stretch" gap="4">
            {rooms.map((room) => (
               <Grid
                  templateColumns="1fr auto"
                  gap="2"
                  rounded="lg"
                  bg="MBackground"
                  p="3"
                  borderWidth="1px"
                  borderColor="MBorder"
                  as={Link}
                  to={`/room/${room.room_id}/budget`}
                  state={{ roomName: room.rooms?.name }}
                  key={room.id}
                  alignItems="baseline"
                  className="box-shadow"
               >
                  <Heading
                     noOfLines={1}
                     fontSize="1rem"
                     color="MGrayText"
                     fontWeight="medium"
                  >
                     {room.rooms.name}
                  </Heading>
                  <Text fontSize="1rem" color="MRedText">
                     {formatIdr(room.rooms.expenses)}
                  </Text>
               </Grid>
            ))}
         </VStack>
         {modalAddRoom.isOpen ? (
            <Suspense>
               <ModalAddRoom
                  onSuccess={() => {
                     revalidator.revalidate();
                     toast({
                        description: "Berhasil menambahkan periode!",
                     });
                  }}
                  disclosureProps={modalAddRoom}
               />
            </Suspense>
         ) : null}
      </>
   );
};

export default RoomPage;
