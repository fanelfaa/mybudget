import { supabase } from "../supabase";
import { putTotalExpenseBudget } from "./budget";

export type GetTransactionsParams = {
   budgetId: string;
};

export const getTransactions = async (params: GetTransactionsParams) =>
   supabase
      .from("transactions")
      .select("*, categories(name)")
      .eq("budget_id", params.budgetId)
      .then((res) => {
         if (res.error) throw new Error(res.error.message);
         return res.data;
      });

export type PostExpenseParams = {
   roomId: string;
   budgetId: string;
   note: string;
   amount: number;
   date: number;
   month: number;
   year: number;
   currentBudgetExpense: number;
};
export const postExpense = async ({
   roomId,
   budgetId,
   currentBudgetExpense,
   ...otherParams
}: PostExpenseParams) =>
   supabase
      .from("transactions")
      .insert({
         room_id: roomId,
         budget_id: budgetId,
         ...otherParams,
      })
      .then(async () => {
         return putTotalExpenseBudget(
            budgetId,
            currentBudgetExpense + otherParams.amount,
         );
      });

export type DeleteTransactionParams = {
   id: string;
   amountDeleted: number;
   budgetId: string;
   currentBudgetExpense: number;
};
export const deleteTransaction = async (params: DeleteTransactionParams) =>
   supabase
      .from("transactions")
      .delete()
      .eq("id", params.id)
      .then(async () => {
         return putTotalExpenseBudget(
            params.budgetId,
            params.currentBudgetExpense - params.amountDeleted,
         );
      });

export type PutExpenseParams = Omit<PostExpenseParams, "roomId"> & {
   id: string;
   prevAmount: number;
};

export const putExpense = async ({
   id,
   budgetId,
   currentBudgetExpense,
   prevAmount,
   ...otherParams
}: PutExpenseParams) =>
   supabase
      .from("transactions")
      .update(otherParams)
      .eq("id", id)
      .then(async () => {
         return putTotalExpenseBudget(
            budgetId,
            currentBudgetExpense - prevAmount + otherParams.amount,
         );
      });
