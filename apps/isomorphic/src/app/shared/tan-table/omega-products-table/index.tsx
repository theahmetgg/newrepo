'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getDefaultColumns } from './column'; // defaultColumns yerine getDefaultColumns'u alıyoruz
import TableToolbar from '@/app/shared/tan-table/table-toolbar';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@core/components/cards/widget-card';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import TablePagination from '@/app/shared/table/table-pagination';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import { ProductOmega } from '@/types';
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from '../custom-table-components';

export default function EnhancedTanTable() {
  const { data: session } = useSession();
  const [tableData, setTableData] = useState<ProductOmega[]>([]);

  useEffect(() => {
    if (session?.user?.access_token && session?.user?.token_type) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/iota/checkAndAddMissingVariants`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${session.user.token_type} ${session.user.access_token}`,
              },
            }
          );

          const data: any = await response.json();
          if (data.length > 0) {
            setTableData(data);
          } else {
            console.error('Ürün listesi boş veya API başarısız döndü.');
          }
        } catch (error) {
          console.error('Veri çekerken hata oluştu:', error);
        }
      };

      fetchData();
    }
  }, [session]);

  // useTanStackTable hook configuration
  const { table, setData, handleDragEndColumn, sensors, columnOrder } =
    useTanStackTable<any>({
      tableData,
      columnConfig: getDefaultColumns(session),
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 10,
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
        enableColumnResizing: true,
        columnResizeDirection: 'ltr',
        columnResizeMode: 'onChange',
      },
    });

  // useEffect to update table data when tableData changes
  useEffect(() => {
    if (tableData.length > 0) {
      console.log('Table Data Updated:', tableData);
      setData(tableData);
    }
  }, [tableData, setData]);

  return (
    <WidgetCard
      title={'Eşleşme Bekleyen Ürünler'}
      className="flex flex-col gap-4"
    >
      {/* <TableToolbar table={table} /> */}
      {tableData.length > 0 ? (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEndColumn}
          sensors={sensors}
        >
          <MainTable
            table={table}
            variant={'modern'}
            classNames={{
              container: 'h-[500px]',
            }}
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
      ) : (
        <div>Veri Bulunamadı</div>
      )}
      <TablePagination table={table} />
    </WidgetCard>
  );
}
