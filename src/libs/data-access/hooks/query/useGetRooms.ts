import { useQuery } from 'react-query';
import { getRooms } from '../../api/room';

export const useGetRooms = () => {
	const key = ['get', 'rooms'];
	return useQuery({ queryKey: key, queryFn: () => getRooms(), staleTime: 60000 });
};
