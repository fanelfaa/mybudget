import { deleteTransaction } from "@/libs/data-access/api/transaction";
import { formatIdr } from "@/libs/utils/formatIdr";
import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
   Grid,
   Heading,
   IconButton,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Text,
   useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiDelete, FiEdit, FiMoreVertical } from "react-icons/fi";

export type TransactionItemProps = {
   id: string;
   budgetId?: string;
   note: string;
   amount: number;
   date: number;
   month: number;
   year: number;
   currentTotalExpense: number;
   onClickEdit?: () => void;
   onSuccessDelete?: () => void;
};

export const TransactionItem = (props: TransactionItemProps) => {
   const [isLoadingDelete, setLoadingDelete] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = React.useRef<HTMLButtonElement>(null);

   const onDelete = () => {
      if (!props.budgetId) return;
      setLoadingDelete(true);
      deleteTransaction({
         id: props.id,
         amountDeleted: props.amount,
         budgetId: props.budgetId,
         currentBudgetExpense: props.currentTotalExpense,
      })
         .then((val) => {
            if (!val.error) {
               props.onSuccessDelete?.();
               onClose();
            }
         })
         .finally(() => setLoadingDelete(false));
   };

   return (
      <>
         <Grid
            templateRows="auto"
            templateColumns="1fr auto"
            alignItems="center"
            gap="2"
            px="3"
            py="2"
            className="transaction-item"
         >
            <Grid alignItems="center" templateColumns="1fr auto" gap="3">
               <Heading
                  noOfLines={2}
                  as="h4"
                  fontSize="1rem"
                  color="MGrayText"
                  fontWeight="medium"
               >
                  {props.note}
               </Heading>
               <Text color="MGrayText" fontSize="1rem">
                  {formatIdr(props.amount)}
               </Text>
            </Grid>

            <Menu>
               <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMoreVertical />}
                  // variant="ghost"
                  isDisabled={isLoadingDelete}
                  size="sm"
                  fontSize="1.2rem"
                  mr="-2"
                  color="MGrayText"
               />
               <MenuList>
                  <MenuItem icon={<FiEdit />} onClick={props.onClickEdit}>
                     Ubah
                  </MenuItem>
                  <MenuItem
                     icon={<FiDelete />}
                     onClick={onOpen}
                     color="MRedText"
                  >
                     Hapus
                  </MenuItem>
               </MenuList>
            </Menu>
         </Grid>
         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            closeOnOverlayClick={false}
            closeOnEsc={false}
            isCentered
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                     Hapus Pengeluaran
                  </AlertDialogHeader>

                  <AlertDialogBody>Yakin? Data akan hilang.</AlertDialogBody>

                  <AlertDialogFooter>
                     <Button
                        ref={cancelRef}
                        onClick={onClose}
                        isDisabled={isLoadingDelete}
                     >
                        Batal
                     </Button>
                     <Button
                        colorScheme="red"
                        onClick={onDelete}
                        ml={3}
                        isDisabled={isLoadingDelete}
                     >
                        {isLoadingDelete ? "Menghapus..." : "Hapus"}
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
};
