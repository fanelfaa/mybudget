import { useQuery } from 'react-query';
import { getBudget } from '../../api/budget';

export const useGetBudget = (id: string, options: { enabled?: boolean }) => {
	const key = ['get', 'budget', id];
	return useQuery({
		queryKey: key,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		queryFn: () => getBudget(id),
		...options,
	});
};
