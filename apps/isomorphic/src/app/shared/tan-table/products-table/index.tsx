'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getDefaultColumns } from './column';
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
    let isMounted = true;

    if (session?.user?.access_token && session?.user?.token_type && isMounted) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/iota/getIotaMerchantVariants`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `${session.user.token_type} ${session.user.access_token}`,
              },
            }
          );

          const data: any = await response.json();

          if (Array.isArray(data)) {
            if (data.length > 0 && isMounted) {
              setTableData(data as ProductOmega[]);
            }
          } else if (data && typeof data === 'object') {
            if (isMounted) {
              setTableData([data]);
            }
          } else {
            console.error('Geçersiz veri formatı.');
          }
        } catch (error) {
          console.error('Veri çekerken hata oluştu:', error);
        }
      };

      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [session]);

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
        enableColumnResizing: true,
        columnResizeDirection: 'ltr',
        columnResizeMode: 'onChange',
      },
    });

  useEffect(() => {
    if (tableData.length > 0) {
      setData((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(tableData)) {
          return tableData;
        }
        return prevData;
      });
    }
  }, [tableData, setData]);

  return (
    <WidgetCard title={'Ürünler'} className="flex flex-col gap-4">
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
