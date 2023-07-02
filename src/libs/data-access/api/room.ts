import { supabase } from '../supabase';

export const getRooms = async () => {
	return supabase
		.from('user_room')
		.select('*, rooms(id, name)')
		.then((res) => {
			if (res.error) throw new Error(res.error.message);
			return res.data;
		});
};
