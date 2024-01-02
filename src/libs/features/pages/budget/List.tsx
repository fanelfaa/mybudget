import { useGetBudgets } from "@/libs/data-access/hooks/query/useGetBudgets";
import { useGetRoom } from "@/libs/data-access/hooks/query/useGetRoom";
import { PrimaryButton } from "@/libs/ui/button/PrimaryButton";
import { AppBar } from "@/libs/ui/layout/AppBar";
import { formatIdr } from "@/libs/utils/formatIdr";
import {
   Box,
   Flex,
   Spinner,
   Text,
   VStack,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
   Navigate,
   useLocation,
   useNavigate,
   useParams,
} from "react-router-dom";
import { BudgetItem } from "./components/BudgetItem";
import { ModalAddBudget, ModalEditBudget } from "./components/ModalBudget";
import { Search } from "./components/Search";
import { FormBudgetValue } from "./components/type";

export default function BudgetListPage() {
   const [dataToEdit, setDataToEdit] = useState<
      (FormBudgetValue & { id: string }) | null
   >(null);
   const [searchQuery, setSearchQuery] = useState("");

   const { roomId } = useParams();
   const navigate = useNavigate();

   const modalAddBudget = useDisclosure();
   const modalEditBudget = useDisclosure();

   const toast = useToast();
   const location = useLocation();

   const roomQuery = useGetRoom(roomId!, {
      enabled: roomId !== undefined,
   });

   const budgetsQuery = useGetBudgets(
      { roomId: roomId! },
      { enabled: roomId !== undefined },
   );

   const onSuccessDelete = () => {
      budgetsQuery.refetch();
      toast({ description: "Berhasil menghapus data!" });
   };

   const totalBudget = useMemo(() => {
      if (!budgetsQuery.data) return 0;
      return budgetsQuery.data.reduce((p, c) => p + c.amount, 0);
   }, [budgetsQuery.data]);

   if (!roomId) {
      return <Navigate to="/room" />;
   }

   const roomName = roomQuery.data?.rooms?.name || location.state?.roomName;

   return (
      <>
         <AppBar
            title={roomName}
            onBack={() => navigate("/room", { replace: true })}
            rightActions={[{ title: "Tambah", onClick: modalAddBudget.onOpen }]}
         />
         <Box h="4" />
         <Search onSearch={setSearchQuery} />
         <Box h="6" />
         <Box
            borderWidth="1px"
            rounded="lg"
            bg="MBackground"
            px="3"
            py="2"
            borderColor="MBorder"
         >
            <Text color="MGrayText">
               Total budget: <strong>{formatIdr(totalBudget)}</strong>
            </Text>
         </Box>
         <Box h="6" />
         <VStack align="stretch" gap="5" pb="12">
            {budgetsQuery.data && budgetsQuery.data.length > 0 ? (
               budgetsQuery.data
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .filter((it) => it.name.toLowerCase().includes(searchQuery))
                  .map((budget) => (
                     <BudgetItem
                        key={budget.id}
                        id={budget.id}
                        name={budget.name}
                        amount={budget.amount}
                        expense={budget.expenses}
                        onSuccessDelete={onSuccessDelete}
                        onClickEdit={() => {
                           setDataToEdit(budget);
                           modalEditBudget.onOpen();
                        }}
                     />
                  ))
            ) : (
               <Flex
                  alignItems="center"
                  justify="center"
                  direction="column"
                  gap="4"
                  height="60vh"
               >
                  {budgetsQuery.isLoading ? (
                     <Spinner />
                  ) : (
                     <>
                        <Text>Belum Ada Pengeluaran</Text>
                        <PrimaryButton onClick={modalAddBudget.onOpen} w="50%">
                           Tambah Baru
                        </PrimaryButton>
                     </>
                  )}
               </Flex>
            )}
         </VStack>
         {roomId ? (
            <ModalAddBudget
               roomId={roomId}
               onSuccess={() => {
                  budgetsQuery.refetch();
                  toast({ description: "Berhasil menambahkan budget!" });
               }}
               disclosureProps={modalAddBudget}
               roomName={roomName}
            />
         ) : null}
         {roomId && dataToEdit ? (
            <ModalEditBudget
               id={dataToEdit.id}
               onSuccess={() => {
                  budgetsQuery.refetch();
                  toast({ description: "Berhasil mengubah budget!" });
                  setDataToEdit(null);
               }}
               disclosureProps={modalEditBudget}
               initialValues={dataToEdit}
            />
         ) : null}
      </>
   );
}
