import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "./SupabaseClient";
import { CreateAndUpdateGoogleProfile, UserProfile } from "./UserProfileManager";
import { NavigationProp } from "@react-navigation/native";

export interface GoogleUserProfile {
  fullName: string | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  avatarUrl: string | null;
}

const handleGoogle = async (navigation: NavigationProp<any>): Promise<GoogleUserProfile | null> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const userInfo = await GoogleSignin.signIn();
    console.log("Google user raw info:", userInfo);

    const tokens = await GoogleSignin.getTokens();
    const idToken = tokens.idToken;
    if (!idToken) throw new Error("Google Sign-In'den idToken alınamadı");

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });

    if (error || !data?.user) {
      console.error("❌ Supabase login error:", error?.message);
      return null;
    }

    const authId = data.user.id;           // ✅ Auth ID
    const userMetadata = data.user.user_metadata || {};
    const googleId = userMetadata.sub || authId;
    const fullName =
      userMetadata.full_name || `${userMetadata.name || ""} ${userMetadata.surname || ""}`.trim() || null;
    const name = userMetadata.name || null;
    const surname = userMetadata.surname || null;
    const email = userMetadata.email || data.user.email || null;
    const avatarUrl = userMetadata.avatar_url || null;

    const profile: UserProfile | null = await CreateAndUpdateGoogleProfile(
      authId,
      googleId,
      userMetadata,
      email,
      avatarUrl
    );

    if (!profile) {
      console.error("❌ Profil oluşturulamadı veya alınamadı");
      return null;
    }

    console.log("✅ Profile oluşturuldu/güncellendi:", profile);

    // Navigation: isusergiveinformation kontrolü
    navigation.reset({
      index: 0,
      routes: [
        {
          name: profile.isusergiveinformation ? "Home" : "BasicInformationScreen",
        },
      ],
    });

    return { fullName, name, surname, email, avatarUrl };
  } catch (err) {
    console.error("❌ Google Sign-In error:", err);
    return null;
  }
};

export default handleGoogle;
