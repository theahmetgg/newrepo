'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@core/components/cards/widget-card';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { Person } from '@/data/tan-table-data';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DragAbleRowWrapper } from '@/app/shared/tan-table/custom-table-components';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';

export default function TableRowDnd() {
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

  const { table, sensors, dataIds, setData, columnOrder, handleDragEndRow } =
    useTanStackTable<Person>({
      tableData: defaultData as any,
      columnConfig: defaultColumns,
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 8,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setData((prev) => prev.filter((r) => r.id !== row.id));
          },
        },
        getRowId: (row) => row.id,
        enableColumnResizing: false,
      },
    });

  return (
    <>
      <WidgetCard title={'Row DnD'} className="flex flex-col gap-4">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEndRow}
          sensors={sensors}
        >
          <MainTable
            table={table}
            dataIds={dataIds}
            columnOrder={columnOrder}
            variant={'minimal'}
            classNames={{
              container: 'overflow-y-hidden',
            }}
            components={{
              bodyRow: DragAbleRowWrapper,
            }}
          />
        </DndContext>
      </WidgetCard>
    </>
  );
}