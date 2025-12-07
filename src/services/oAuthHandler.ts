import { supabase } from "./SupabaseClient";
import { UserProfile } from "./UserProfileManager";

export interface OAuthUserProfile {
  fullName: string | null;
  name: string | null;
  surname: string | null;
  email: string;
  avatarUrl?: string | null;
  providerId: string; // Google veya Apple gibi provider ID
  providerName: "google" | "apple"; 
}
//YAĞIZ SEN Bİ YİNE DÜŞÜN HATALI KOD AŞAMASI OLABİLİR welcome->kayıt ol->eposta & şifre->kayıt ol->linking kontrolü->linkleme ya da yeni hesap açma->home ya da basicInfo
/**
 * Account linking işlemi.
 * Yeni kullanıcı oluşturulmaz, sadece mevcut kullanıcıya provider eklenir.
 */
export const handleOAuthLogin = async (user: OAuthUserProfile): Promise<UserProfile | null> => {
  try {
    // 1️⃣ Aynı e-posta ile mevcut kullanıcı var mı kontrol et
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError.message);
      return null;
    }

    if (!existingUser) {
      // HandleEmail.ts import edilip kullanılcak
      console.warn(`⚠️ Kullanıcı bulunamadı, yeni kullanıcı oluşturulmuyor: ${user.email}`);
    } else {
      // 2️⃣ Mevcut kullanıcı varsa, provider ID ekle / güncelle
      const providerField = user.providerName === "google" ? "googleid" : "appleid";

      if (!(existingUser as any)[providerField]) {
        const { data, error } = await supabase
          .from("profiles")
          .update({ [providerField]: user.providerId })
          .eq("id", existingUser.id)
          .select()
          .maybeSingle();

        if (error) {
          console.error("❌ Supabase update error:", error.message);
          return existingUser;
        }

        return data ?? existingUser;
      }

      // Provider zaten eklenmiş, kullanıcıyı geri döndür
      return existingUser;
    }

    // Kullanıcı bulunamadıysa null döndür
    return null;
  } catch (err) {
    console.error("❌ handleOAuthLogin error:", err);
    return null;
  }
};
