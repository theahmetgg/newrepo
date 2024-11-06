'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';

const initialValues: LoginSchema = {
  email: 'gokhan.bahadir.36@gmail.com',
  password: 'Gb136110*',
  rememberMe: true,
};

export default function SignInForm() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    signIn('credentials', {
      ...data,
    });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="E-Posta"
              placeholder="E-Posta Adresiniz"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Şifre"
              placeholder="Şifrenizi Giriniz"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Beni Hatırla"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                Şifremi Unuttum?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Giriş Yap</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Henüz bir hesabınız yok mu?{' '}
        <Link
          href={routes.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Kayıt Ol
        </Link>
      </Text>
    </>
  );
}
