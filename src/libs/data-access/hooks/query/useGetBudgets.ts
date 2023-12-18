import { useQuery } from "react-query";
import { GetBudgetsParams, getBudgets } from "../../api/budget";

export const useGetBudgets = (
	params: GetBudgetsParams,
	options: { enabled?: boolean },
) => {
	const key = ["get", "budgets", params];
	return useQuery({
		queryKey: key,
		queryFn: () => getBudgets(params),
		...options,
		staleTime: 60000,
	});
};
