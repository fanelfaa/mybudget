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

export const getRoom = async (id: string) => {
	return supabase
		.from('user_room')
		.select('*, rooms(id, name)')
		.eq('room_id', id)
		.single()
		.then((res) => {
			if (res.error) throw new Error(res.error.message);
			return res.data;
		});
};

export type PostRoomParams = {
	name: string;
};

export const postRoom = async ({ name }: PostRoomParams) =>
	supabase.from('rooms').insert({ name });

export type PutRoomParams = { id: string } & PostRoomParams;

export const putRoom = async ({ id, name }: PutRoomParams) =>
	supabase.from('rooms').update({ name }).eq('id', id);
