import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './SupabaseClient';
import { ensureGoogleProfile } from './EnsureUserProfile';

const handleGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const userInfo = await GoogleSignin.signIn();
    console.log("Google user:", userInfo);

    const tokens = await GoogleSignin.getTokens();
    const idToken = tokens.idToken;

    if (!idToken) throw new Error("Google Sign-In'den idToken alınamadı");

    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      console.error('❌ Supabase login error:', error.message);
      return null;
    }

    console.log('✅ Login success:', data);

    if (data?.user) {
      const profile = await ensureGoogleProfile(
        data.user.id,
        data.user.user_metadata.full_name || data.user.user_metadata.name,
        data.user.user_metadata.email,
        data.user.user_metadata.avatar_url
      );

      if (!profile) {
        console.error('❌ Profil oluşturulamadı veya alınamadı');
      } else {
        console.log('✅ Profile oluşturuldu/güncellendi:', profile);
      }
    }

    return data;
  } catch (err) {
    console.error('❌ Google Sign-In error:', err);
    return null;
  }
};

export default handleGoogle;
