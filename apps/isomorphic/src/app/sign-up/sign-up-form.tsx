'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';

const initialValues = {
  firstName: 'Gökhan',
  lastName: 'Bahadır',
  email: 'gokhan.bahadir.36@gmail.com',
  password: 'Gb136110*',
  password_confirmation: 'Gb136110*',
  isAgreed: true,
};

// Define the type for errorData
type ErrorData = {
  errors: {
    [key: string]: string[];
  };
};

export default function SignUpForm() {
  const [reset, setReset] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        const errorData = responseData as ErrorData;
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors)
            .flat()
            .join(' ');
          setMessage(errorMessages);
          setMessageType('error');
        }
        return;
      }

      setMessage('Kayıt oluşturuldu.');
      setMessageType('success');
      setReset({ ...initialValues, isAgreed: false });
    } catch (error) {
      setMessage(
        'Kayıt sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edin.'
      );
      setMessageType('error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
          {message && (
            <div
              className={`col-span-2 mb-4 rounded p-4 ${
                messageType === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {message.charAt(0).toUpperCase() + message.slice(1)}
            </div>
          )}
          <Input
            type="text"
            size="lg"
            label="Adınız"
            placeholder="Adınızı giriniz"
            className="[&>label>span]:font-medium"
            inputClassName="text-sm"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            type="text"
            size="lg"
            label="Soyadınız"
            placeholder="Soyadınızı giriniz"
            className="[&>label>span]:font-medium"
            inputClassName="text-sm"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
          <Input
            type="email"
            size="lg"
            label="E-Postanız"
            className="col-span-2 [&>label>span]:font-medium"
            inputClassName="text-sm"
            placeholder="E-posta adresinizi giriniz"
            {...register('email')}
            error={errors.email?.message}
          />
          <Password
            label="Şifre"
            placeholder="Şifrenizi belirleyin"
            size="lg"
            className="[&>label>span]:font-medium"
            inputClassName="text-sm"
            {...register('password')}
            error={errors.password?.message}
          />
          <Password
            label="Şifre (Tekrar)"
            placeholder="Şifrenizi tekrar girin"
            size="lg"
            className="[&>label>span]:font-medium"
            inputClassName="text-sm"
            {...register('password_confirmation')}
            error={errors.password_confirmation?.message}
          />
          <div className="col-span-2 flex items-start">
            <Checkbox
              {...register('isAgreed')}
              error={errors.isAgreed?.message}
              className="[&>label>span]:font-medium [&>label]:items-start"
              label={
                <>
                  Kaydolduğunuzda, bizimle ilgili şartları kabul etmiş
                  olursunuz.{' '}
                  <Link
                    href="#"
                    className="font-medium text-blue transition-colors hover:underline"
                  >
                    Şartlar
                  </Link>{' '}
                  &{' '}
                  <Link
                    href="#"
                    className="font-medium text-blue transition-colors hover:underline"
                  >
                    Gizlilik Politikası
                  </Link>
                </>
              }
            />
          </div>
          <Button size="lg" type="submit" className="col-span-2 mt-2">
            <span>Kayıt Ol</span>{' '}
            <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
          </Button>
        </div>
      </form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
        Zaten bir hesabın var mı?{' '}
        <Link
          href={routes.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Giriş Yap
        </Link>
      </Text>
    </>
  );
}
