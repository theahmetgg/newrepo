import Image from 'next/image';
import { PiXBold } from 'react-icons/pi';
import { Title, Text } from 'rizzui';

export default function ExpandedOrderRow({ record }: any) {
  if (record?.products?.length === 0) {
    return <Text>No product available</Text>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-gray-50 dark:bg-gray-800">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Variant No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Variant İsmi
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Hepsiburada Fiyatı
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Trendyol Fiyatı
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Teknosa Fiyatı
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
              Maliyet
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-50">
          {record?.products.map((product: any) => (
            <tr key={record.id + product.name}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative aspect-[80/60] w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    fill
                    objectFit='contain'
                    className="object-cover padding-2"
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Title as="h4" className="text-sm font-medium">
                  {product.name}
                </Title>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Text className="font-medium text-gray-900 dark:text-gray-700">
                  {product.hb_price + ' ₺'}
                </Text>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Text className="font-medium text-gray-900 dark:text-gray-700">
                  {product.trendyol_price + ' ₺'}
                </Text>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Text className="font-medium text-gray-900 dark:text-gray-700">
                  {product.teknosa_price + ' ₺'}
                </Text>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Text className="font-medium text-gray-900 dark:text-gray-700">
                  {product.cost + ' ₺'}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
