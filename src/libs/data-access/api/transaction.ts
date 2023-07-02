import { supabase } from '../supabase';
import { putTotalExpenseBudget } from './budget';

export type GetTransactionsParams = {
	budgetId: string;
	month: number;
	year: number;
};

export const getTransactions = async (params: GetTransactionsParams) =>
	supabase
		.from('transactions')
		.select('*, categories(name)')
		.eq('budget_id', params.budgetId)
		.eq('month', params.month)
		.eq('year', params.year)
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
		.from('transactions')
		.insert({
			room_id: roomId,
			budget_id: budgetId,
			...otherParams,
		})
		.then(async () => {
			return putTotalExpenseBudget(
				budgetId,
				currentBudgetExpense + otherParams.amount
			);
		});
