import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
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
import { Link } from "react-router-dom";
import { FiMoreVertical, FiEdit, FiDelete } from "react-icons/fi";
import React, { useState } from "react";
import { formatIdr } from "@/libs/utils/formatIdr";
import { TransactionsProgress } from "./Progress";
import { deleteBudget } from "@/libs/data-access/api/budget";

export type BudgetItemProps = {
  id: string;
  name: string;
  amount: number;
  expense: number;
  onClickEdit?: () => void;
  onSuccessDelete?: () => void;
};

export const BudgetItem = (props: BudgetItemProps) => {
  const [isLoadingDelete, setLoadingDelete] = useState(false);
  const alertDialogDelete = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const onDelete = () => {
    setLoadingDelete(true);
    deleteBudget(props.id)
      .then((val) => {
        if (!val.error) {
          props.onSuccessDelete?.();
          alertDialogDelete.onClose();
        }
      })
      .finally(() => setLoadingDelete(false));
  };

  return (
    <>
      <Grid
        templateRows="auto auto auto"
        gap="2"
        rounded="lg"
        bg="MBackground"
        px="3"
        py="2"
        borderWidth="1px"
        borderColor="MBorder"
      >
        <Grid templateColumns="1fr auto" alignItems="center">
          <Heading
            noOfLines={1}
            as={Link}
            to={`${props.id}`}
            state={{ budgetName: props.name }}
            fontSize={18}
            color="MGrayText"
            fontWeight="medium"
          >
            {props.name}
          </Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FiMoreVertical />}
              variant="ghost"
              isDisabled={isLoadingDelete}
              size="sm"
              fontSize={18}
              mr="-2"
              color="MGrayText"
            />
            <MenuList>
              <MenuItem icon={<FiEdit />} onClick={props.onClickEdit}>
                Ubah
              </MenuItem>
              <MenuItem
                icon={<FiDelete />}
                onClick={alertDialogDelete.onOpen}
                color="red"
              >
                Hapus
              </MenuItem>
            </MenuList>
          </Menu>
        </Grid>
        <TransactionsProgress amount={props.amount} expense={props.expense} />
        <Flex alignItems="center" wrap="wrap" fontSize={14} color="MGrayText">
          <Text>Budget: {formatIdr(props.amount)}</Text>
          <Text ml="auto">
            Pengeluaran:{" "}
            <span style={{ color: "#ff4d4d" }}>{formatIdr(props.expense)}</span>
          </Text>
        </Flex>
      </Grid>
      <AlertDialog
        isOpen={alertDialogDelete.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={alertDialogDelete.onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Hapus Budget
            </AlertDialogHeader>

            <AlertDialogBody>
              Yakin? Data transaksi di dalam budget juga akan dihapus.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={alertDialogDelete.onClose}
                isDisabled={isLoadingDelete}
                variant="solid"
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
