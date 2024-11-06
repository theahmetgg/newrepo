'use client';

import React from 'react';
import { defaultColumns } from './column';
import TableToolbar from '@/app/shared/tan-table/table-toolbar';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@core/components/cards/widget-card';
import { Person } from '@/data/tan-table-data';
import TablePagination from '@/app/shared/table/table-pagination';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';

export default function EnhancedTanTable() {
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

  const { table, setData } = useTanStackTable<Person>({
    tableData: defaultData as any,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 5,
        },
      },
      filterFns: {
        statusFilter: (row, columnId, value) => {
          if (!value) return false;
          let status =
            row.original[columnId].toLowerCase() === value.toLowerCase()
              ? true
              : false;
          return status;
        },
        priceFilter: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
        createdDate: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
        dueDate: (row, columnId, value) => {
          if (!value) return false;
          // console.log('custom filter conditions', row, columnId, value);
          return true;
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r.id)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <WidgetCard title={'Enhanced Table'} className="flex flex-col gap-4">
        <TableToolbar table={table} />
        <MainTable table={table} variant={'modern'} />
        <TablePagination table={table} />
      </WidgetCard>
    </>
  );
}
