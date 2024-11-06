'use client';

import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import {
  PiPushPin,
  PiPushPinSlash,
} from 'react-icons/pi';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import MainTable from '@/app/shared/table/main-table';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import AvatarCard from '@core/ui/avatar-card';
import { ProductOmega } from '@/types';
import { EditText } from 'react-edit-text';
import { useSession } from 'next-auth/react';
import { ColumnDef } from '@tanstack/react-table';
import { ActionIcon, Tooltip, Text } from 'rizzui';

interface ExpandedComponentProps {
  row: ProductOmega;
}

export default function CustomExpandedComponent({
  row,
}: ExpandedComponentProps) {
  const { data: session } = useSession();

  const { product_name, variants, buybox } = row;

  const validateNumber = (value: string) => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0.0;
  };

  const onSaveField = async (key: string, value: string, variantId: number) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/entegra/variant`,
        {
          list: [
            {
              variationId: variantId,
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
      console.log('Başarıyla güncellendi:', response.data);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  };

  const renderEditableField = (
    value: string,
    key: string,
    variantId: number
  ) => (
    <EditText
      defaultValue={value}
      onSave={({ value }) => {
        if (validateNumber(value)) {
          onSaveField(key, value, variantId);
        } else {
          console.error('Geçersiz fiyat: 1.00 veya daha büyük olmalı.');
        }
      }}
      formatDisplayText={(value) => `${parseFloat(value).toFixed(2)} ₺`}
    />
  );

  const columnConfig: ColumnDef<ProductOmega['variants'][0]>[] = [
    {
      id: 'variant_title',
      header: 'Varyant',
      accessorKey: 'variant_title',
      size: 340,
      cell: ({ row }) => (
        <AvatarCard
          src={row.original.pictures?.[0]?.url || ''}
          name={row.original.variant_title || ''}
          description={`Renk: ${row.original.color_title}`}
        />
      ),
    },
    {
      id: 'variant_id_omega',
      header: 'Omega No',
      accessorKey: 'variant_id_omega',
      cell: ({ row }) => `${row.original.variant_id_omega}`,
    },
    ...[
      { key: 'eptt_price', header: 'E-Ptt Fiyatı' },
      { key: 'eptt_iskonto', header: 'E-Ptt İskonto' },
      { key: 'hb_price', header: 'Hepsiburada Fiyatı' },
      { key: 'alisgidis_sale_price', header: 'Alış Gidiş Fiyatı' },
      { key: 'alisgidis_list_price', header: 'Alış Gidiş Liste Fiyatı' },
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
        buybox === '0' || row.original.price_type.includes(key) ? (
          <Tooltip size="sm" content={'Değiştirilemez'} placement="top">
            <div style={{ display: 'inline-block', cursor: 'pointer' }}>
              <Text>{row.original[key]}</Text>
            </div>
          </Tooltip>
        ) : (
          renderEditableField(
            `${row.original[key]}`,
            key,
            row.original.variant_id_omega
          )
        ),
    })),
    {
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
            <Tooltip
              size="sm"
              content={'Düzenle'}
              placement="top"
              color="invert"
            >
              <Link
                href={routes.invoice.edit(row.original.variant_code_entegra)}
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
            <Tooltip
              size="sm"
              content={'İncele'}
              placement="top"
              color="invert"
            >
              <Link
                href={routes.invoice.details(row.original.variant_code_entegra)}
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
              description={`${row.original.variant_title + 1} adlı ürünü silmek istediğinize emin misiniz?`}
              onDelete={() =>
                meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
              }
            />
          </div>
        </>
      ),
    },
  ];

  const {
    table: expandedTable,
    handleDragEndColumn,
    sensors,
    columnOrder,
  } = useTanStackTable({
    tableData: variants,
    columnConfig,
    options: { enableSorting: true },
  });

  return (
    <div className="rounded-md border border-gray-200 p-4">
      <h4 className="mb-4 text-sm font-semibold">{product_name} Varyantları</h4>
      {variants && variants.length > 0 ? (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEndColumn}
          sensors={sensors}
        >
          <MainTable
            table={expandedTable}
            variant={'modern'}
            classNames={{ container: 'h-[300px]' }}
            columnOrder={columnOrder}
          />
        </DndContext>
      ) : (
        <div>Gösterilecek Veri Yok</div>
      )}
    </div>
  );
}
