import { supabase } from '../supabase';

export const logout = async () => supabase.auth.signOut();
