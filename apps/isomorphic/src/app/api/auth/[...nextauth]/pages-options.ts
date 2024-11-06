import { routes } from '@/config/routes';
import { PagesOptions } from 'next-auth';

export const pagesOptions: Partial<PagesOptions> = {
  signIn: routes.signIn,        // Giriş sayfası
  error: routes.signIn,         // Hata sayfası
  signOut: routes.signIn,       // Çıkış yaptıktan sonra yönlendirilmesi gereken sayfa
  verifyRequest: routes.signIn, // E-posta doğrulama isteği için yönlendirme
  newAccount: routes.dashboard, // Yeni hesap oluşturulduğunda yönlendirilecek sayfa
};
