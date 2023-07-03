import { supabase } from '../supabase';

export type GetBudgetsParams = {
	roomId: string;
	month: number;
	year: number;
};
export const getBudgets = async (params: GetBudgetsParams) =>
	supabase
		.from('budgets')
		.select('*, rooms(name)')
		.eq('room_id', params.roomId)
		.eq('month', params.month)
		.eq('year', params.year)
		.then((res) => {
			if (res.error) throw new Error(res.error.message);
			return res.data;
		});

export const getBudget = async (id: string) =>
	supabase
		.from('budgets')
		.select()
		.eq('id', id)
		.single()
		.then((res) => {
			if (res.error) throw new Error(res.error.message);
			return res.data;
		});

export type PostBudgetParams = {
	roomId: string;
	name: string;
	amount: number;
	month: number;
	year: number;
};
export const postBudget = async ({
	roomId,
	...otherParams
}: PostBudgetParams) =>
	supabase.from('budgets').insert({ room_id: roomId, ...otherParams });

export const putTotalExpenseBudget = async (id: string, newExpense: number) =>
	supabase.from('budgets').update({ expenses: newExpense }).eq('id', id);

export const deleteBudget = async (id: string) =>
	supabase.from('budgets').delete().eq('id', id);
