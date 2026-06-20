import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gfnpncaworrnvllulfqq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmbnBuY2F3b3JybnZsbHVsZnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNDgxNDMsImV4cCI6MjA3NTYyNDE0M30.j4pEXnyEpnyck2HBt4Pz9hHCOeaO7aOx5SmaVP0UNvg';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
