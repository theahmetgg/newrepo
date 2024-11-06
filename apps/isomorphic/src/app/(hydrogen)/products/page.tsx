
import ImportButton from '@/app/shared/import-button';
import PageHeader from '@/app/shared/page-header';
import EnhancedTanTable from '@/app/shared/tan-table/products-table';
import { routes } from '@/config/routes';

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

export default function TanTableEnhanced() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
          <ImportButton title={'Import File'} />
        </div>
      </PageHeader>

      <EnhancedTanTable />
    </>
  );
}
