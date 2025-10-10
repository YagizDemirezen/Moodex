import { supabase } from './SupabaseClient';
import { CALLBACK_URL } from '@env';
import { ensureFacebookProfile } from './EnsureUserProfile';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

const handleFacebook = async (): Promise<void> => {
  try {
    // 1️⃣ OAuth login başlat
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: CALLBACK_URL, // app scheme
      },
    });

    if (error) {
      console.error('❌ Supabase OAuth login error:', error.message);
      return;
    }

    console.log('✅ OAuth login initiated:', data);

    // 2️⃣ Kullanıcıyı tarayıcıda yönlendir
    if (data?.url) {
      // React Native Linking ile aç
      import('react-native').then(({ Linking }) => {
        Linking.openURL(data.url).catch(err => console.error('❌ Linking error:', err));
      });
    }

    // 3️⃣ Auth state değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('✅ User signed in:', session.user);

          // Profile oluştur / güncelle
          ensureFacebookProfile(
            session.user.id,
            session.user.user_metadata?.full_name || session.user.user_metadata?.name || undefined,
            session.user.user_metadata?.email,
            session.user.user_metadata?.avatar_url
          )
            .then(profile => {
              if (!profile) console.error('❌ Profil oluşturulamadı veya alınamadı');
              else console.log('✅ Profile oluşturuldu/güncellendi:', profile);
            })
            .catch(profileErr => console.error('❌ ensureFacebookProfile error:', profileErr));
        }
      }
    );

    // Listener cleanup için, component unmount’ta kullan
    // listener.subscription.unsubscribe();

  } catch (err) {
    console.error('❌ OAuth login exception:', err);
  }
};

export default handleFacebook;
