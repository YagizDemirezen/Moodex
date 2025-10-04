import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './SupabaseClient';
import { WEB_CLIENT_ID_FROM_GOOGLE } from '@env';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID_FROM_GOOGLE,
  offlineAccess: true,
});

const handleGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Önceki oturumu temizle (hesap seçimi için)
    await GoogleSignin.signOut();

    // Kullanıcı giriş yapar
    const userInfo = await GoogleSignin.signIn();
    console.log("Google user:", userInfo);


    // Tokenleri al
    const tokens = await GoogleSignin.getTokens();
    const idToken = tokens.idToken;

    if (!idToken) throw new Error("Google Sign-In'den idToken alınamadı");

    // Supabase login
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });

    if (error) {
      console.error('❌ Supabase login error:', error.message);
      return null;
    }

    console.log('✅ Login success:', data);
    return data;
  } catch (err) {
    console.error('❌ Google Sign-In error: User didnt select any acc ', err);
    return null;
  }
};

export default handleGoogle;
