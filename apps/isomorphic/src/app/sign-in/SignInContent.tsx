"use client";

import { useSearchParams } from 'next/navigation';
import SignInForm from '@/app/sign-in/sign-in-form';
import AuthWrapperOne from '@/app/shared/auth-layout/auth-wrapper-one';
import Image from 'next/image';
import UnderlineShape from '@core/components/shape/underline';

export default function SignInContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <AuthWrapperOne
      title={
        <>
          <span className="relative inline-block">
            Giriş Yap
            <UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
          </span>{' '}  
        </>
      }
      description="Kayıtlı kullanıcı bilgileriniz ile giriş yapın. Ürün yönetiminine başlayın!"
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
      {error === 'CredentialsSignin' && (
        <div className="mb-4 text-center text-red-500">
          Giriş bilgileri hatalı. Lütfen tekrar deneyin.
        </div>
      )}
      <SignInForm />
    </AuthWrapperOne>
  );
}
