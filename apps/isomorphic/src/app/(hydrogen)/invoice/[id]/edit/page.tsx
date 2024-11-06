import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import CreateInvoice from '@/app/shared/invoice/create-invoice';
import ImportButton from '@/app/shared/import-button';
import { metaObject } from '@/config/site.config';
import { Metadata } from 'next';
import { Button } from 'rizzui';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  return metaObject(`Edit ${id}`);
}

const pageHeader = {
  title: 'Ürün Düzenle',
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
      name: `Ürün Düzenle`,
    },
  ],
};

export default function InvoiceEditPage({ params }: any) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ImportButton
            buttonLabel="Ürün Yükle"
            title="Ürün Yükle"
            className="mt-0"
          />
        </span>
      </PageHeader>

      <CreateInvoice id={params.id} />
    </>
  );
}
