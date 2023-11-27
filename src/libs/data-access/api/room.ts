import { supabase } from "../supabase";

export const getRooms = async () => {
  return supabase
    .from("user_room")
    .select("*, rooms(id, name, budgets(expenses))")
    .then((res) => {
      if (res.error) throw new Error(res.error.message);
      return res.data.map((it) => ({
        ...it,
        rooms: {
          ...it.rooms,
          expenses:
            it.rooms?.budgets.reduce((p, c) => {
              return c.expenses + p;
            }, 0) ?? 0,
        },
      }));
    });
};

export const getRoom = async (id: string) => {
  return supabase
    .from("user_room")
    .select("*, rooms(id, name)")
    .eq("room_id", id)
    .single()
    .then((res) => {
      if (res.error) throw new Error(res.error.message);
      return res.data;
    });
};

export type PostRoomParams = {
  name: string;
};

export const postRoom = async ({ name }: PostRoomParams) => {
  const resCreateRoom = await supabase.from("rooms").insert({ name });
  if (!resCreateRoom.error) {
    const room = await supabase
      .from("rooms")
      .select("id")
      .eq("name", name)
      .single();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (room.data && user) {
      return await supabase
        .from("user_room")
        .insert({ room_id: room.data.id, user_id: user.id });
    }
  }

  return resCreateRoom;
};

export type PutRoomParams = { id: string } & PostRoomParams;

export const putRoom = async ({ id, name }: PutRoomParams) =>
  supabase.from("rooms").update({ name }).eq("id", id);
