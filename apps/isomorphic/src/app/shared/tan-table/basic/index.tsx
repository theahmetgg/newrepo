'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@core/components/cards/widget-card';
import { Person } from '@/data/tan-table-data';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';

export default function TableBasic() {
  const defaultData = [
    {
      id: '62447',
      name: 'Francis Sanford MD',
      userName: 'George33',
      avatar:
        'https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-01.webp',
      email: 'Maryam.Barrows@yahoo.com',
      dueDate: '2023-10-18T13:24:00.760Z',
      amount: '544.00',
      status: 'Paid',
      createdAt: '2023-01-14T20:37:08.482Z',
      products: [
        {
          id: '0o02051402',
          name: 'Tasty Metal Shirt',
          category: 'Shoes',
          image:
            'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp',
          price: '410.00',
          quantity: 2,
        },
      ],
    },
  ];

  const { table } = useTanStackTable<Person>({
    tableData: defaultData as any,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-6">
      <WidgetCard title={'Classic Table'} className="flex flex-col gap-4">
        <MainTable
          table={table}
          variant={'classic'}
          classNames={{
            container: 'border-x border-muted/70',
          }}
        />
      </WidgetCard>
      <WidgetCard title={'Modern Table'} className="flex flex-col gap-4">
        <MainTable table={table} variant={'modern'} />
      </WidgetCard>
      <WidgetCard title={'Minimal Table'} className="flex flex-col gap-4">
        <MainTable table={table} variant={'minimal'} />
      </WidgetCard>
      <WidgetCard title={'Elegant Table'} className="flex flex-col gap-4">
        <MainTable table={table} variant={'elegant'} />
      </WidgetCard>
      <WidgetCard title={'Retro Table'} className="flex flex-col gap-4">
        <MainTable table={table} variant={'retro'} />
      </WidgetCard>
    </div>
  );
}
