import { supabase } from "./SupabaseClient";

// Google için
export const ensureGoogleProfile = async (googleId: string, name?: string, email?: string, avatarUrl?: string) => {
  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("google_id", googleId)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError.message);
      return null;
    }

    if (!existingUser) {
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          google_id: googleId,
          full_name: name || null,
          email: email || null,
          avatar_url: avatarUrl || null,
          isUserGiveInformation: false,
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error("❌ Supabase insert error:", error.message);
        return null;
      }

      return data;
    }

    return existingUser;
  } catch (err) {
    console.error("❌ ensureGoogleProfile error:", err);
    return null;
  }
};

// Facebook için
export const ensureFacebookProfile = async (facebookId: string, name?: string, email?: string, avatarUrl?: string) => {
  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("facebook_id", facebookId)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError.message);
      return null;
    }

    if (!existingUser) {
      const { data, error } = await supabase
        .from("profiles")
        .insert({
          facebook_id: facebookId,
          full_name: name || null,
          email: email || null,
          avatar_url: avatarUrl || null,
          isUserGiveInformation: false,
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error("❌ Supabase insert error:", error.message);
        return null;
      }

      return data;
    }

    return existingUser;
  } catch (err) {
    console.error("❌ ensureFacebookProfile error:", err);
    return null;
  }
};
