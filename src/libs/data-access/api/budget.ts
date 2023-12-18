import { supabase } from "../supabase";

export type GetBudgetsParams = {
	roomId: string;
};
export const getBudgets = async (params: GetBudgetsParams) =>
	supabase
		.from("budgets")
		.select("*, rooms(name)")
		.eq("room_id", params.roomId)
		.then((res) => {
			if (res.error) throw new Error(res.error.message);
			return res.data;
		});

export const getBudget = async (id: string) =>
	supabase
		.from("budgets")
		.select()
		.eq("id", id)
		.single()
		.then((res) => {
			if (res.error) throw new Error(res.error.message);
			return res.data;
		});

export type PostBudgetParams = {
	roomId: string;
	name: string;
	amount: number;
};
export const postBudget = async ({
	roomId,
	...otherParams
}: PostBudgetParams) =>
	supabase.from("budgets").insert({ room_id: roomId, ...otherParams });

export const putTotalExpenseBudget = async (id: string, newExpense: number) =>
	supabase.from("budgets").update({ expenses: newExpense }).eq("id", id);

export const deleteBudget = async (id: string) =>
	supabase.from("budgets").delete().eq("id", id);

export type PutBudgetParams = Pick<PostBudgetParams, "name" | "amount"> & {
	id: string;
	expenses?: number;
};

export const putBudget = async ({ id, ...otherParams }: PutBudgetParams) =>
	supabase.from("budgets").update(otherParams).eq("id", id);
