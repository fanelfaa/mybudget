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
