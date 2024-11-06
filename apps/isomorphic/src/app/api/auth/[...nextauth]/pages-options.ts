import { routes } from '@/config/routes';
import { PagesOptions } from 'next-auth';

export const pagesOptions: Partial<PagesOptions> = {
  signIn: routes.signIn,        // Giriş yapılmamışsa yönlendirme yapılacak sayfa
  error: routes.signIn,         // Hata oluşursa yönlendirilmesi gereken sayfa
  signOut: routes.signIn,       // Çıkış yapıldıktan sonra yönlendirilmesi gereken sayfa
  verifyRequest: routes.signIn, // E-posta doğrulaması sonrası yönlendirme
};
