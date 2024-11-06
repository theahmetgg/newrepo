import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Checkbox, Text, Tooltip } from 'rizzui';
import { ProductMain } from '@/types';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiPushPin,
  PiPushPinSlash,
} from 'react-icons/pi';
import { EditText } from 'react-edit-text';
import axios from 'axios';

const columnHelper = createColumnHelper<ProductMain>();

const validateNumber = (value: string) => {
  const numValue = parseFloat(value);
  return !isNaN(numValue) && numValue >= 0.0;
};

const onSaveField = async (
  key: string,
  value: string,
  productCode: number,
  session: any
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/entegra/product`,
      {
        list: [
          {
            productCode: productCode,
            prices: [{ priceCode: key, priceValue: value, store_id: 0 }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${session?.user.token_type} ${session?.user.access_token}`,
        },
      }
    );
    console.log('Price updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating price:', error);
  }
};

export const getDefaultColumns = (session: any) => [
  columnHelper.accessor('pictures.picture', {
    id: 'expandedHandler',
    size: 60,
    header: '',
    cell: ({ row }) => (
      <>
        {row.getCanExpand() && (
          <ActionIcon
            size="sm"
            rounded="full"
            aria-label="Expand row"
            variant={row.getIsExpanded() ? 'solid' : 'outline'}
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? (
              <PiCaretUpBold className="size-4" />
            ) : (
              <PiCaretDownBold className="size-4" />
            )}
          </ActionIcon>
        )}
      </>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('id', {
    id: 'id',
    size: 70,
    header: ({ table }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-2"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
    enableSorting: false,
  }),
  columnHelper.accessor('product_name', {
    id: 'product_name',
    size: 300,
    header: 'Ürün',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.pictures?.[0]?.picture}
        name={row.original.product_name}
        description={`Ürün Kodu: ${row.original.product_code_entegra} (${row.original.product_id_entegra})`}
      />
    ),
    enableSorting: true,
  }),
  ...[
    { key: 'eptt_price', header: 'E-Ptt Fiyatı' },
    { key: 'eptt_iskonto', header: 'E-Ptt İskonto' },
    { key: 'hb_price', header: 'Hepsiburada Fiyatı' },
    { key: 'alisgidis_sale_price', header: 'Alış Gidiş Fiyatı' },
    { key: 'price1', header: '1. Fiyat' },
    { key: 'price2', header: '2. Fiyat' },
    { key: 'price4', header: '4. Fiyat' },
    { key: 'trendyol_listPrice', header: 'Trendyol Liste Fiyatı' },
    { key: 'trendyol_salePrice', header: 'Trendyol Satış Fiyatı' },
  ].map(({ key, header }) => ({
    id: key,
    header: header,
    accessorKey: key,
    cell: ({ row }: { row: any }) =>
      row.original.buybox === '1' ? (
        <Tooltip size="sm" content={'Değiştirilemez'} placement="top">
          <div style={{ display: 'inline-block', cursor: 'pointer' }}>
            <Text>{row.original[key]}</Text>
          </div>
        </Tooltip>
      ) : (
        <EditText
          defaultValue={`${row.original[key]}`}
          onSave={({ value }) => {
            if (validateNumber(value)) {
              onSaveField(
                key,
                value,
                row.original.product_code_entegra,
                session
              );
            } else {
              console.error('Invalid price: Must be 1.00 or greater.');
            }
          }}
          formatDisplayText={(value) => `${parseFloat(value).toFixed(2)} ₺`}
        />
      ),
  })),
  columnHelper.accessor('product_name', {
    id: 'userName',
    size: 160,
    header: '',
    enablePinning: true,
    enableSorting: false,
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <>
        <div
          className={`flex items-center justify-end gap-3 pe-3 ${row.getIsPinned() ? 'sticky top-0 z-20 bg-white' : ''}`}
        >
          <Tooltip size="sm" content={'Düzenle'} placement="top" color="invert">
            <Link
              href={routes.invoice.edit(row.original.product_code_entegra)}
              aria-label="go to invoice edit"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip size="sm" content={'İncele'} placement="top" color="invert">
            <Link
              href={routes.invoice.details(row.original.product_code_entegra)}
              aria-label="go to invoice details"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <EyeIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          {row.getIsPinned() ? (
            <Tooltip
              size="sm"
              content={'Kaldır'}
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
                onClick={() => row.pin(false)}
                aria-label="Remove the row pin"
              >
                <PiPushPinSlash className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          ) : (
            <Tooltip
              size="sm"
              content={'Sabitle'}
              placement="top"
              color="invert"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
                onClick={() => row.pin('top')}
                aria-label="Pin the row to top"
              >
                <PiPushPin className="h-4 w-4 rotate-180" />
              </ActionIcon>
            </Tooltip>
          )}
          <DeletePopover
            title={`Silme Onayı`}
            description={`${row.original.product_name + 1} adlı ürünü silmek istediğinize emin misiniz?`}
            onDelete={() =>
              meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
            }
          />
        </div>
      </>
    ),
  }),
];
