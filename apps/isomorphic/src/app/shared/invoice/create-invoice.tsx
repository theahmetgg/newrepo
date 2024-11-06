'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import FormFooter from '@core/components/form-footer';
import { FormBlockWrapper } from '@/app/shared/invoice/form-utils';
import { useSession } from 'next-auth/react';
import {
  Button,
  Title,
  ActionIcon,
  Badge,
  Text,
  Input,
  Select,
  Textarea,
} from 'rizzui';
import Image from 'next/image';
import { useModal } from '@/app/shared/modal-views/use-modal';
import LastFiveSell from '@/app/shared/ecommerce/category/last-five-sell'; // Import the actual LastFiveSell component

type ProductFormInput = {
  name: string;
  brand: string;
  barcode: string;
  group: string;
  description: string;
  price1: string;
  price2: string;
  price4: string;
  quantity: string;
  quantity2: string;
  quantity2_enable: string;
  kdv_id: string;
  trendyol_listPrice: string;
  trendyol_salePrice: string;
  hb_price: string;
  teknosa_sale_price: string;
  eptt_price: string;
  eptt_iskonto: string;
  alisgidis_sale_price: string;
  alisgidis_list_price: string;
};

export default function CreateProductForm({ id }: { id?: string }) {
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);
  const [productData, setProductData] = useState<any | null>(null);
  const [productDescription, setProductDescription] = useState<string>('');

  const { openModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    watch,
  } = useForm<ProductFormInput>({
    defaultValues: {
      name: '',
      brand: '',
      barcode: '',
      group: '',
      description: '',
      price1: '',
      price2: '',
      price4: '',
      quantity: '',
      quantity2: '',
      quantity2_enable: '0',
      kdv_id: '1',
      trendyol_listPrice: '',
      trendyol_salePrice: '',
      hb_price: '',
      teknosa_sale_price: '',
      eptt_price: '',
      eptt_iskonto: '',
      alisgidis_sale_price: '',
      alisgidis_list_price: '',
    },
  });

  const descriptionValue = watch('description');

  useEffect(() => {
    setProductDescription(descriptionValue);
  }, [descriptionValue]);

  useEffect(() => {
    if (id && session) {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/entegra/products`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${session.user.token_type} ${session.user.access_token}`,
          },
          params: {
            productCode: id,
          },
        })
        .then((response) => {
          const fetchedData = response.data?.data?.productList[0];
          if (fetchedData) {
            setProductData(fetchedData);
            resetForm({
              name: fetchedData.name,
              brand: fetchedData.brand,
              barcode: fetchedData.barcode,
              group: fetchedData.group,
              description: fetchedData.description,
              price1: fetchedData.price1,
              price2: fetchedData.price2,
              price4: fetchedData.price4,
              quantity: fetchedData.quantity,
              quantity2: fetchedData.quantity2,
              quantity2_enable: fetchedData.quantity2_enable,
              kdv_id: fetchedData.kdv_id || '1',
              trendyol_listPrice: fetchedData.trendyol_listPrice,
              trendyol_salePrice: fetchedData.trendyol_salePrice,
              hb_price: fetchedData.hb_price,
              teknosa_sale_price: fetchedData.teknosa_sale_price,
              eptt_price: fetchedData.eptt_price,
              eptt_iskonto: fetchedData.eptt_iskonto,
              alisgidis_sale_price: fetchedData.alisgidis_sale_price,
              alisgidis_list_price: fetchedData.alisgidis_list_price,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          toast.error('Ürün bilgileri yüklenemedi.');
          setLoading(false);
        });
    }
  }, [id, resetForm]);

  const onSubmit: SubmitHandler<ProductFormInput> = async (data) => {
    setLoading(true);
    try {
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/entegra/products/update/${id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/entegra/products/create`;

      await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${session?.user.token_type} ${session?.user.access_token}`,
        },
      });

      toast.success(
        <Text as="b">{id ? 'Ürün Güncellendi.' : 'Ürün Oluşturuldu.'}</Text>
      );

      resetForm({
        name: '',
        brand: '',
        description: '',
        barcode: '',
        price1: '',
        price2: '',
        price4: '',
        quantity: '',
        quantity2: '',
        quantity2_enable: '0',
        kdv_id: '1',
        trendyol_listPrice: '',
        trendyol_salePrice: '',
        hb_price: '',
        teknosa_sale_price: '',
        eptt_price: '',
        eptt_iskonto: '',
        alisgidis_sale_price: '',
        alisgidis_list_price: '',
      });
    } catch (error) {
      toast.error('Ürün bilgileri gönderilirken bir hata oluştu.');
      console.error('Error submitting product data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Ürün bilgisi getiriliyor...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-grow flex-col @container [&_label]:font-medium"
    >
      <div className="flex-grow pb-10">
        <div className="grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200">
          {/* Ürün Bilgileri Bölümü */}
          <FormBlockWrapper
            title="Ürün Bilgileri:"
            description=""
            subItem={
              <>
                <div className="mt-2">
                  Türü:{' '}
                  <span className="font-semibold">
                    {productData?.buybox ? 'BuyBox' : 'Normal'}
                  </span>
                </div>
                <div className="mt-2">
                  Kodu:{' '}
                  <span className="font-semibold">
                    {productData?.productCode}
                  </span>
                </div>
                <div className="mt-2">
                  Barkodu:{' '}
                  <span className="font-semibold">
                    {productData?.barcode ? productData?.barcode : 'Barkod Yok'}
                  </span>
                </div>
                <div className="mt-2">
                  Durumu:{' '}
                  <span className="font-semibold">
                    {productData?.status ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div className="mt-2">
                  Robot Durumu:{' '}
                  <span className="font-semibold">
                    {productData?.external ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div className="mt-2">Varyant Renkleri:</div>
                {productData?.variatios?.map((variant: any, index: number) => (
                  <Badge key={index} color="primary" className="ml-1 mt-1">
                    {variant?.variationSpec.find(
                      (spec: any) => spec.name === 'Renk'
                    )?.value || 'Varyant Rengi Yok'}
                  </Badge>
                ))}
                <div className="mt-2">
                  Ürün Oluşturma Tarihi: {productData?.date_add}
                </div>
                <div className="mt-2">
                  Ürün Güncellenme Tarihi: {productData?.date_change}
                </div>
                <div className="mt-2">Ürün Görselleri:</div>
                <div className="d-flex">
                  {productData?.pictures?.map((item: any, index: number) => (
                    <Image
                      key={index}
                      src={item?.picture}
                      alt="Urun resmi"
                      width={100}
                      height={100}
                      className="thumbnail-with-border mt-2"
                    />
                  ))}
                </div>
              </>
            }
          >
            <Input
              label="Ürün Adı"
              placeholder="Ürün adı giriniz"
              {...register('name', { required: 'Ürün adı zorunludur' })}
              error={errors.name?.message}
            />

            <Input
              label="Marka"
              placeholder="Marka giriniz"
              {...register('brand', { required: 'Marka zorunludur' })}
              error={errors.brand?.message}
            />

            <Textarea
              label="Ürün Açıklaması"
              className="col-span-2"
              placeholder="Ürün açıklamasını giriniz"
              {...register('description')}
              error={errors.description?.message}
              textareaClassName="h-20"
            />

            <div className="col-span-2 mt-4">
              <h5 className="font-gray-700">Ürün Açıklaması Önizleme:</h5>
              <div
                className="mt-2 overflow-y-auto rounded border bg-gray-100 p-4"
                style={{ maxHeight: '300px' }}
                dangerouslySetInnerHTML={{ __html: productDescription }}
              />
            </div>

            <Input
              label="Barkod"
              placeholder="Barkod giriniz"
              {...register('barcode')}
              error={errors.barcode?.message}
            />
            <Input
              label="Grup"
              placeholder="Grup giriniz"
              {...register('group')}
              error={errors.group?.message}
            />
            <Input
              label="Adet"
              placeholder="Adet giriniz"
              {...register('quantity', { required: 'Adet zorunludur' })}
              error={errors.quantity?.message}
            />
            <Input
              label="2. Adet"
              placeholder="2. Adet giriniz"
              {...register('quantity2')}
              error={errors.quantity2?.message}
            />
            <Input
              label="2. Adet Etkinleştirilsin mi?"
              placeholder="Evet"
              {...register('quantity2_enable')}
              error={errors.quantity2_enable?.message}
            />
          </FormBlockWrapper>

          {/* Fiyat Yönetimi Bölümü */}
          <FormBlockWrapper
            title="Fiyat Yönetimi:"
            description="Fiyat bilgilerini giriniz"
            className="pt-7"
            subItem={
              <div className="mt-2">Kodu: {productData?.productCode}</div>
            }
          >
            <Input
              label="1. Fiyat"
              placeholder="1. Fiyatı giriniz"
              {...register('price1', { required: 'Fiyat zorunludur' })}
              error={errors.price1?.message}
            />
            <Input
              label="2. Fiyat"
              placeholder="2. Fiyatı giriniz"
              {...register('price2')}
              error={errors.price2?.message}
            />
            <Input
              label="4. Fiyat"
              placeholder="4. Fiyatı giriniz"
              {...register('price4')}
              error={errors.price4?.message}
            />

            <Select
              label="Kdv Dahil mi?"
              placeholder="Seçiniz"
              {...register('kdv_id')}
              options={[
                { label: 'Evet', value: '1' },
                { label: 'Hayır', value: '0' },
              ]}
              error={errors.kdv_id?.message}
            />
          </FormBlockWrapper>

          {/* Pazar Yeri Fiyat Yönetimi Bölümü */}
          <FormBlockWrapper
            title="Pazar Yeri Fiyat Yönetimi:"
            description="Trendyol, Hepsiburada, Teknosa gibi pazaryeri fiyat bilgileri"
            className="pt-7"
          >
            <Input
              label="Trendyol Liste Fiyatı"
              placeholder="Trendyol Liste Fiyatı giriniz"
              {...register('trendyol_listPrice')}
              error={errors.trendyol_listPrice?.message}
            />
            <Input
              label="Trendyol Satış Fiyatı"
              placeholder="Trendyol Satış Fiyatı giriniz"
              {...register('trendyol_salePrice')}
              error={errors.trendyol_salePrice?.message}
            />
            <Input
              label="Hepsiburada Fiyatı"
              placeholder="Hepsiburada Fiyatı giriniz"
              {...register('hb_price')}
              error={errors.hb_price?.message}
            />
            <Input
              label="Teknosa Satış Fiyatı"
              placeholder="Teknosa Satış Fiyatı giriniz"
              {...register('teknosa_sale_price')}
              error={errors.teknosa_sale_price?.message}
            />
            <Input
              label="Eptt Satış Fiyatı"
              placeholder="Eptt Satış Fiyatı giriniz"
              {...register('eptt_price')}
              error={errors.eptt_price?.message}
            />
            <Input
              label="Eptt İndirimli Satış Fiyatı"
              placeholder="Eptt İndirimli Satış Fiyatı giriniz"
              {...register('eptt_iskonto')}
              error={errors.eptt_iskonto?.message}
            />
            <Input
              label="Alış Gidiş Satış Fiyatı"
              placeholder="Alış Gidiş Satış Fiyatı giriniz"
              {...register('alisgidis_sale_price')}
              error={errors.alisgidis_sale_price?.message}
            />
            <Input
              label="Alış Gidiş Liste Fiyatı"
              placeholder="Alış Gidiş Liste Fiyatı giriniz"
              {...register('alisgidis_list_price')}
              error={errors.alisgidis_list_price?.message}
            />
          </FormBlockWrapper>
        </div>
      </div>

      <FormFooter
        isLoading={isLoading}
        submitBtnText={id ? 'Ürün Güncelle' : 'Ürün Oluştur'}
        subItem={
          <Button
            size="md"
            color="secondary"
            onClick={() =>
              openModal({ size: 'full', view: <LastFiveSell id={id ?? ''} /> })
            }
          >
            Son 5 Satış
          </Button>
        }
      />
    </form>
  );
}
