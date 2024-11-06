'use client';

import { useEffect, useState } from 'react';
import { Title, Text, ActionIcon } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';

type LastFiveSellProps = {
  id: string;
};

export default function LastFiveSell({ id }: LastFiveSellProps) {
  const { data: session } = useSession();
  const { closeModal } = useModal();
  const [salesData, setSalesData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id && session) {
      setLoading(true);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/omega/lastFiveSale/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${session.user.token_type} ${session.user.access_token}`,
            },
          }
        )
        .then((response) => {
          setSalesData(response.data || []);
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Son satış verileri yüklenemedi.');
          setLoading(false);
          console.error('Error fetching last 5 sales:', error);
        });
    }
  }, [id]);

  if (isLoading) {
    return <div className="py-5 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Son 5 Satış İncele
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      {salesData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Müşteri
                </th>
                <th className="border border-gray-300 p-2 text-left">Tarih</th>
                <th className="border border-gray-300 p-2 text-left">Ürün</th>
                <th className="border border-gray-300 p-2 text-left">Adet</th>
                <th className="border border-gray-300 p-2 text-left">Fiyat</th>
                <th className="border border-gray-300 p-2 text-left">
                  Entegrasyon
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Sipariş ID
                </th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 p-2 capitalize">
                    {sale.customer}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(sale.reg_date).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {sale.variant_title}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {sale.quantity}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {sale.unit_price}
                  </td>
                  <td className="border border-gray-300 p-2 capitalize">
                    {sale.entegration == 'mirakl_teknosa'
                      ? 'Teknosa'
                      : sale.entegration}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {sale.order_id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Text as="p">Son 5 satış bulunamadı.</Text>
      )}
    </div>
  );
}
