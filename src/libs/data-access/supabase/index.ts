import { env } from "@/libs/env";
import { Database } from "@/libs/types/supabase";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
   env.supabaseUrl,
   env.supabaseKey,
);
