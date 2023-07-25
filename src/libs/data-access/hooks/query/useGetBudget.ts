import { useQuery } from 'react-query';
import { getBudget } from '../../api/budget';

export const useGetBudget = (id: string, options: { enabled?: boolean }) => {
	const key = ['get', 'budget', id];
	return useQuery({
		queryKey: key,

		queryFn: () => getBudget(id),
		...options,
	});
};
