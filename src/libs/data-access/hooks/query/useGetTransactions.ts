import { useQuery } from 'react-query';
import { GetTransactionsParams, getTransactions } from '../../api/transaction';

export const useGetTransactions = (
	params: GetTransactionsParams,
	options: { enabled?: boolean }
) => {
	const key = ['get', 'transactions', params];
	return useQuery({
		queryKey: key,
		queryFn: () => getTransactions(params),
		...options,
	});
};
