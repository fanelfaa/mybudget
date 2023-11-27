/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Flex,
  VStack,
  Box,
  Text,
  useToast,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import format from "date-fns/format";
import { FiRefreshCw } from "react-icons/fi";
import { useGetBudget } from "@/libs/data-access/hooks/query/useGetBudget";
import { formatIdr } from "@/libs/utils/formatIdr";
import {
  ReturnUseGetTransactions,
  useGetTransactions,
} from "@/libs/data-access/hooks/query/useGetTransactions";
import { TransactionsProgress } from "./components/Progress";
import { AppBar } from "@/libs/ui/layout/AppBar";
import { ModalAddExpense, ModalEditExpense } from "./components/ModalExpense";
import { FormExpenseValue } from "./components/type";
import { PrimaryButton } from "@/libs/ui/button/PrimaryButton";
import { Search } from "./components/Search";
import { GroupExpenses } from "./components/GroupExpenses";
import { env } from "@/libs/env";
import { putBudget } from "@/libs/data-access/api/budget";

export default function BudgetDetailPage() {
  const [dataToEdit, setDataToEdit] = useState<
    (FormExpenseValue & { id: string }) | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { budgetId, roomId } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const location = useLocation();

  const modalAddExpense = useDisclosure();
  const modalEditExpense = useDisclosure();

  const budgetQuery = useGetBudget(budgetId!, {
    enabled: budgetId !== undefined,
  });

  const transactionsQuery = useGetTransactions(
    { budgetId: budgetId! },
    { enabled: budgetId !== undefined }
  );

  const refetchAll = () => {
    budgetQuery.refetch();
    transactionsQuery.refetch();
  };

  const currentTotalExpense = useMemo(
    () =>
      transactionsQuery.data?.map((t) => t.amount).reduce((p, c) => p + c, 0) ??
      0,
    [transactionsQuery.data]
  );

  const groupExpenseDaily = useMemo(() => {
    if (!transactionsQuery.data) return null;
    const group = new Map<number, ReturnUseGetTransactions>();

    const getSortableDate = (date: number, month: number, year: number) => {
      return year + month * 100 + date;
    };

    let filteredData = transactionsQuery.data.sort(
      (a, b) =>
        getSortableDate(b.date, b.month, b.year) -
        getSortableDate(a.date, a.month, a.year)
    );

    if (searchQuery.length > 0) {
      filteredData = [...filteredData].filter((it) =>
        it.note.toLowerCase().includes(searchQuery)
      );
    }

    filteredData.forEach((t) => {
      const date = t.date + t.month * 100;
      const prevGroup = group.get(date);
      if (!prevGroup) {
        group.set(date, [t]);
      } else {
        group.set(date, [...prevGroup, t]);
      }
    });
    return group;
  }, [transactionsQuery, searchQuery]);

  const onSuccessDelete = () => {
    refetchAll();
    toast({ description: "Berhasil menghapus data!" });
  };

  const resyncBudget = useCallback(() => {
    if (!budgetQuery.data || !budgetId) return;
    const { expenses, amount, name } = budgetQuery.data;
    if (expenses !== currentTotalExpense) {
      putBudget({
        id: budgetId,
        expenses: currentTotalExpense,
        amount,
        name,
      }).then(() => budgetQuery.refetch());
    }
  }, [budgetId, budgetQuery, currentTotalExpense]);

  const isTransactionNotEmpty =
    transactionsQuery.data && transactionsQuery.data.length > 0;

  return (
    <>
      <AppBar
        title={budgetQuery.data?.name ?? location.state?.budgetName}
        onBack={() => navigate(`/room/${roomId}/budget`, { replace: true })}
        rightActions={[
          env.appEnv === "dev"
            ? {
                icon: <FiRefreshCw />,
                style: { fontSize: 20 },
                onClick: resyncBudget,
              }
            : {},
          { title: "Tambah", onClick: modalAddExpense.onOpen },
        ]}
      />
      <Box h="4" />
      <Search onSearch={setSearchQuery} />
      {isTransactionNotEmpty ? (
        <>
          <Box h="4" />
          <Box
            borderColor="MBorder"
            borderWidth="1px"
            rounded="lg"
            bg="MBackground"
            px="3"
            py="2"
          >
            <Flex justify="space-between">
              <Text>Budget: {formatIdr(budgetQuery.data?.amount ?? 0)}</Text>
              <Text>
                Pengeluaran:{" "}
                <Text as="span" color="MRedText">
                  {formatIdr(budgetQuery.data?.expenses ?? 0)}
                </Text>
              </Text>
            </Flex>
            <Box h="2" />
            <TransactionsProgress
              amount={budgetQuery.data?.amount ?? 0}
              expense={budgetQuery.data?.expenses ?? 0}
            />
            <Box h="2" />
            <Flex justify="flex-end">
              <Text>
                Sisa:{" "}
                {formatIdr(
                  (budgetQuery.data?.amount ?? 0) -
                    (budgetQuery.data?.expenses ?? 0)
                )}
              </Text>
            </Flex>
          </Box>
        </>
      ) : null}
      <Box h="8" />
      <VStack align="stretch" gap="10" pb="12">
        {groupExpenseDaily?.size ? (
          [...groupExpenseDaily.keys()].map((dateKey) => {
            const transactions = groupExpenseDaily.get(dateKey)!;
            return (
              <GroupExpenses
                key={dateKey}
                transactions={transactions}
                budgetId={budgetId}
                currentTotalExpense={currentTotalExpense}
                onClickEdit={(t) => {
                  setDataToEdit({
                    id: t.id,
                    note: t.note,
                    amount: t.amount,
                    date: format(
                      new Date(t.year, t.month - 1, t.date),
                      "yyyy-MM-dd"
                    ),
                  });
                  modalEditExpense.onOpen();
                }}
                onSuccessDelete={onSuccessDelete}
              />
            );
          })
        ) : (
          <Flex
            alignItems="center"
            justify="center"
            direction="column"
            gap="4"
            height="60vh"
          >
            {transactionsQuery.isLoading ? (
              <Spinner />
            ) : (
              <>
                <Text>Belum Ada Pengeluaran</Text>
                <PrimaryButton onClick={modalAddExpense.onOpen} w="50%">
                  Tambah Baru
                </PrimaryButton>
              </>
            )}
          </Flex>
        )}
      </VStack>
      {roomId && budgetId ? (
        <ModalAddExpense
          roomId={roomId}
          budgetId={budgetId}
          onSuccess={() => {
            refetchAll();
            toast({ description: "Berhasil menambahkan pengeluaran!" });
          }}
          currentTotalExpense={currentTotalExpense}
          disclosureProps={modalAddExpense}
        />
      ) : null}
      {roomId && budgetId && dataToEdit ? (
        <ModalEditExpense
          id={dataToEdit?.id}
          initialValues={dataToEdit}
          budgetId={budgetId}
          onSuccess={() => {
            refetchAll();
            toast({ description: "Berhasil mengubah pengeluaran!" });
            setDataToEdit(null);
          }}
          currentTotalExpense={currentTotalExpense}
          disclosureProps={modalEditExpense}
        />
      ) : null}
    </>
  );
}
