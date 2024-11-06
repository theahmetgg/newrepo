import { routes } from '@/config/routes';
import { orderData } from '@/data/order-data-basic';
import OrderTable from '@/app/shared/ecommerce/order/order-list/table';
import TableLayout from '@/app/(hydrogen)/tables/table-layout';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Collapsible Table'),
};

const pageHeader = {
  title: 'Ürünler',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Anasayfa',
    },
    {
      name: 'Ürünler',
    },
  ],
};

export default function CollapsibleTablePage() {
  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={orderData}
      fileName="product_data"
      header="Product No,Product Name,SKF,BF"
    >
      <OrderTable
        data={orderData}
        variant="elegant"
      />
    </TableLayout>
  );
}
