import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
	session: Session | null;
	isAuthenticated: boolean;
};

type AuthAction = {
	setValues: (values: Partial<NonNullable<AuthState>>) => void;
};

export const useAuthStore = create<AuthState & AuthAction>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			session: null,
			setValues: (values) => set(() => values),
		}),
		{
			name: "user-auth",
			partialize: (state) => ({
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
);

export default useAuthStore;
