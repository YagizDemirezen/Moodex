import { supabase } from "./SupabaseClient";

export interface UserProfile {
  id: string;            // Supabase Auth ID
  googleid: string;      // Google ID
  fullname?: string | null;
  name?: string | null;
  surname?: string | null;
  age?: number | null;
  country?: string | null;
  city?: string | null;
  hobbies?: string[] | null;
  profession?: string | null;
  pet?: { type: string; name: string }[] | null;
  email?: string | null;
  avatarurl?: string | null;
  isusergiveinformation: boolean;
}

const splitFullName = (fullName?: string) => {
  if (!fullName) return { name: null, surname: null };
  const parts = fullName.trim().split(" ");
  const name = parts.shift() || null;
  const surname = parts.join(" ") || null;
  return { name, surname };
};

/**
 * Google ID ile profil oluşturur veya eksik alanları günceller.
 * Auth ID ile eşleşmeyi garanti eder.
 */
export const CreateAndUpdateGoogleProfile = async (
  authId: string,
  googleId: string,
  userMetadata: Record<string, any>,
  email?: string,
  avatarUrl?: string
): Promise<UserProfile | null> => {
  const fullName =
    userMetadata.full_name ||
    `${userMetadata.name || ""} ${userMetadata.surname || ""}`.trim() ||
    null;
  const { name, surname } = splitFullName(fullName);

  try {
    // Auth ID ile mevcut kullanıcı var mı kontrol
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authId)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError.message);
      return null;
    }

    const updates: Partial<UserProfile> = {
      fullname: fullName,
      name,
      surname,
      email: email || userMetadata.email || null,
      avatarurl: avatarUrl || userMetadata.avatar_url || null,
      age: userMetadata.age ?? null,
      country: userMetadata.country ?? null,
      city: userMetadata.city ?? null,
      hobbies: userMetadata.hobbies ?? null,
      profession: userMetadata.profession ?? null,
      pet: userMetadata.pet ?? null,
      googleid: googleId,
    };

    if (!existingUser) {
      // Yeni kullanıcı insert
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          id: authId,        // ✅ Auth ID
          ...updates,
          isusergiveinformation: false,
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error("❌ Supabase insert error:", error.message);
        return null;
      }

      return data ?? null;
    }

    // Mevcut kullanıcı varsa eksik alanları güncelle
    const fieldsToUpdate: Partial<UserProfile> = {};
    for (const key in updates) {
      if ((existingUser as any)[key] === null || (existingUser as any)[key] === undefined) {
        (fieldsToUpdate as any)[key] = (updates as any)[key];
      }
    }

    if (Object.keys(fieldsToUpdate).length > 0) {
      const { data, error } = await supabase
        .from("profiles")
        .update(fieldsToUpdate)
        .eq("id", authId)
        .select()
        .maybeSingle();

      if (error) {
        console.error("❌ Supabase update error:", error.message);
        return existingUser;
      }

      return data ?? existingUser;
    }

    return existingUser;
  } catch (err) {
    console.error("❌ CreateAndUpdateGoogleProfile error:", err);
    return null;
  }
};

/**
 * Belirli bir kullanıcının boolean kolonu kontrolü
 */
export const CheckUserInfo = async (
  tableName: string,
  id: string,
  columnName: string
): Promise<boolean | null> => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select(columnName)
      .eq("id", id)
      .maybeSingle<Record<string, boolean | null>>();

    if (error) {
      console.error(`❌ Supabase fetch error from ${tableName}:`, error.message);
      return null;
    }

    const value = data ? (data[columnName] as boolean | null | undefined) : null;

    if (value === true) return true;
    if (value === false) return false;
    return null;
  } catch (err) {
    console.error("❌ CheckUserInfo error:", err);
    return null;
  }
};
