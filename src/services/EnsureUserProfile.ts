import { supabase } from "./SupabaseClient";

const ensureUserProfile = async (userId: string) => {
  const { data: existingUser, error: fetchError } = await supabase
    .from("profiles")
    .select("id, isUserGiveInformation")
    .eq("userId", userId)
    .maybeSingle();

  if (fetchError) {
    console.error("❌ Supabase fetch error:", fetchError.message);
    return null;
  }

  // Eğer kullanıcı yoksa yeni kayıt ekle
  if (!existingUser) {
    const { data, error } = await supabase
      .from("profiles")
      .insert({
        userId: userId,
        isUserGiveInformation: false, // sadece ilk defa ekleniyor
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return null;
    }

    return data;
  }

  // Kullanıcı zaten varsa mevcut veriyi döndür
  return existingUser;
};

export default ensureUserProfile;
