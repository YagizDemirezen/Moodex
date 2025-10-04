import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("❌ Logout error:", error.message);
  } else {
    console.log("✅ Logout successful");
  }
};