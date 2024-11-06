import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Checkbox, Text, Tooltip } from 'rizzui';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiPushPin,
  PiPushPinSlash,
} from 'react-icons/pi';
import { EditText } from 'react-edit-text';
import axios from 'axios';

const columnHelper = createColumnHelper<any>();

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
  columnHelper.accessor('variant_code', {
    id: 'variant_code',
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
  columnHelper.accessor('variant_title', {
    id: 'variant_title',
    size: 300,
    header: 'Ürün',
    cell: ({ row }) => (
      <AvatarCard
        src={row.original.pictures?.[0]?.picture}
        name={row.original.variant_title}
        description={`Varyant Kodu: ${row.original.variant_code} (${row.original.color})`}
      />
    ),
    enableSorting: true,
  }),
  // Individual price columns
  columnHelper.accessor('hb_code', {
    id: 'hb_code',
    header: 'Hepsiburada Kodu',
    cell: ({ row }) => (
      <EditText
        defaultValue={`${row.original.hb_code ? row.original.hb_code : '-'}`}
        onSave={({ value }) => {
          onSaveField('hb_code', value, row.original.hb_code, session);
        }}
      />
    ),
  }),
  columnHelper.accessor('ty_code', {
    id: 'ty_code',
    header: 'Trendyol Kodu',
    cell: ({ row }) => (
      <EditText
        defaultValue={`${row.original.ty_code ? row.original.ty_code : '-'}`}
        onSave={({ value }) => {
          onSaveField('ty_code', value, row.original.ty_code, session);
        }}
      />
    ),
  }),
  columnHelper.accessor('tk_code', {
    id: 'tk_code',
    header: 'Teknosa Kodu',
    cell: ({ row }) => (
      <EditText
        defaultValue={`${row.original.tk_code ? row.original.tk_code : '-'}`}
        onSave={({ value }) => {
          onSaveField('hb_code', value, row.original.tk_code, session);
        }}
      />
    ),
  }),

  columnHelper.accessor('id', {
    id: 'id',
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
          <Tooltip size="sm" content={'Kaldır'} placement="top" color="invert">
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
          <Tooltip size="sm" content={'Sabitle'} placement="top" color="invert">
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
    ),
  }),
];
