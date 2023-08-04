const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const APP_ENV = import.meta.env.VITE_APP_ENV;

export const env = {
	supabaseUrl: SUPABASE_URL,
	supabaseKey: SUPABASE_KEY,
	appEnv: APP_ENV,
};
