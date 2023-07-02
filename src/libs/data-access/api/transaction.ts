import { supabase } from '../supabase';

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
