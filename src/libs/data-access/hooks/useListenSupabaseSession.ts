import { useEffect } from 'react';
import { supabase } from '../supabase';
import useAuthStore from '../store/authStore';

export const useListenSupabaseSession = () => {
	const setValues = useAuthStore((a) => a.setValues);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setValues({
				session,
				isAuthenticated: session?.access_token !== undefined,
			});
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setValues({
				session,
				isAuthenticated: session?.access_token !== undefined,
			});
		});
	}, [setValues]);
};
