import SignInContent from './SignInContent';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Giriş Yap'),
};

export default function SignIn() {
  return <SignInContent />;
}
