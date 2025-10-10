import { supabase } from "./SupabaseClient";
//SADECE GOOGLE İÇİN
const checkUserInfo = async (
  google_id: string,
  tableName: string,
  column: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from<any, any>(tableName)   // <any, any> ekledik
    .select(column)
    .eq("google_id", google_id)
    .maybeSingle();

  if (error) {
    console.error("❌ Supabase fetch error:", error.message);
    return false;
  }

  return Boolean(data?.[column as keyof typeof data]) ?? false;
};

export default checkUserInfo;
