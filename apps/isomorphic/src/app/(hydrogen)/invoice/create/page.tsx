import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Ürün Oluştur'),
};

const pageHeader = {
  title: 'Ürün Oluştur',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Anasayfa',
    },
    {
      href: routes.invoice.home,
      name: 'Ürünler',
    },
    {
      name: 'Ürün Oluştur',
    },
  ],
};

export default function InvoiceCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ImportButton title="Ürün Yükle" className="mt-4 @lg:mt-0" />
      </PageHeader>

      <CreateInvoice />
    </>
  );
}
