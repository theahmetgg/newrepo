export interface ApiResponse {
  success: boolean;
  data: {
    totalProduct: number;
    productList: Product[];
  };
}

export type Product = {
  id: string;
  productCode: string;
  status: string;
  name: string;
  brand: string;
  price1: string;
  trendyol_listPrice: string;
  teknosa_sale_price: string;
  date_change: string;
  date_add: string;
  quantity: string;
  quantity2: string;
  hb_price: string;
  currencyType: string;
  variatios: Array<{
    id: string;
    productCode: string;
    barcode: string;
    price1: string;
    quantity: string;
    variationSpec: Array<{
      name: string;
      value: string;
    }>;
  }>;
  pictures: Array<{
    picture: string;
  }>;
};

export type Person = {
  id: string;
  name: string;
  userName: string;
  avatar: string;
  email: string;
  dueDate: string;
  amount: string;
  status: string;
  createdAt: string;
  products?: Product[];
};
