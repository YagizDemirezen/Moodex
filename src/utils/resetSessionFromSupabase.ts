import { supabase } from "../services/SupabaseClient";

const resetSessionFromSupabase = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    console.log("✅ Session sıfırlandı");
  } catch (error) {
    console.error("❌ Session sıfırlama hatası:", error);
  }
};

export default resetSessionFromSupabase;
