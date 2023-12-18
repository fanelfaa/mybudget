import { useQuery } from "react-query";
import { getRoom } from "../../api/room";

export const useGetRoom = (id: string, options: { enabled?: boolean }) => {
	const key = ["get", "room", id];
	return useQuery({
		queryKey: key,
		queryFn: () => getRoom(id),
		...options,
		staleTime: 60000,
	});
};
