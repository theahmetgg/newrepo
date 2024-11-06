import Image from 'next/image';
import UnderlineShape from '@core/components/shape/underline';
import SignUpForm from './sign-up-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Kayıt Ol'),
};

export default function SignUp() {
  return (
    <AuthWrapperOne
      title={
        <>
          <span className="relative inline-block">
            Kayıt Ol!
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
          </span>
        </>
      }
      description="Kayıt formunu doldur yönetici onayı ile giriş yapın."
      bannerTitle="Ürün Yönetim Sistemi"
      bannerDescription="Tüm ürünler tek bir yerde! Ürün özellikleri, kategori, fiyat ve pazar yerleri yönetiminin kolay yolu iota."
      pageImage={
        <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
          <Image
            src={
              'https://isomorphic-furyroad.s3.amazonaws.com/public/auth/sign-up.webp'
            }
            alt="Sign Up Thumbnail"
            fill
            priority
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
        </div>
      }
    >
      <SignUpForm />
    </AuthWrapperOne>
  );
}
