import { CouponType } from '@/config/enums';

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export type ProductColor = {
  name?: string;
  code?: string;
};

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

export type PosProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
};
export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}

export interface FlightingCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  meta?: {
    model: string;
    hours: string;
    stop: string;
  };
  class: string;
  bucket: {
    luggage?: string;
    bag?: string;
  };
  airlines?: string;
  routes?: {
    arrivalDate: Date | string;
    arrivalTime: Date | string;
    departureDate: Date | string;
    departureTime: Date | string;
    departureCityCode: string;
    departureCity: string;
    departureTerminal: string;
    arrivalCityCode: string;
    arrivalCity: string;
    arrivalTerminal: string;
    layover: {
      layoverCityCode: string;
      layoverCity: string;
      layoverTerminal: string;
      layoverTime: string;
    }[];
  };
  cheapest?: boolean;
  best?: boolean;
  quickest?: boolean;
}

export type Products = {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  quantity: number;
};

export type ProductMain = {
  id: string;
  product_id_entegra: number;
  product_code_entegra: string;
  status: string;
  product_name: string;
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

export type BuyboxVariant = {
  variant_title?: string;
  color_title?: string;
  variant_id_omega?: number;
  variant_id_entegra?: number;
  price1?: string;
  price2?: string;
  trendyol_listPrice?: string;
  eptt_price?: string;
  hb_price?: string;
  teknosa_sale_price?: string;
  trendyol_salePrice?: string;
  eptt_iskonto?: string;
  price4?: string;
  alisgidis_sale_price?: string;
  alisgidis_list_price?: string;
  external?: number;
  mainProductCode?: string;
  productCode?: string;
  action?: any;
};

export type NotExistEntegraProduct = {
  variant_id?: number;
  product_id?: number;
  color_id?: number;
  color_title?: string;
  variant_title?: string;
  critical_stock?: number;
  status?: number;
};

export type ProductOmega = {
  id: number;
  product_id_omega: number;
  product_id_entegra: number;
  product_name: string;
  trendyol_salePrice: string;
  trendyol_listPrice: string;
  teknosa_sale_price: string;
  hb_price: string;
  eptt_price: string;
  eptt_iskonto: string;
  alisgidis_sale_price: string;
  price1: string;
  price2: string;
  price4: string;
  buybox: string;
  external: number;
  created_at: string;
  updated_at: string;
  pictures: Array<{
    picture: string;
  }>;
  product_code_entegra: string;
  variants: Array<{
    variant_id_omega: number;
    variant_id_entegra: number;
    variant_code_entegra: string;
    price_type: any;
    external: number;
    price1: string;
    variant_title: string;
    color_title: string;
    trendyol_listPrice: string;
    eptt_price: string;
    hb_price: string;
    teknosa_sale_price: string;
    price2: string;
    trendyol_salePrice: string;
    eptt_iskonto: string;
    price4: string;
    alisgidis_sale_price: string;
    alisgidis_list_price: string;
    pictures: Array<{
      url: string;
    }>;
    competitivePrices: {
      id: number;
      variant_id: number;
      trendyol: number;
      trendyol_seller: string;
      hepsiburada: number;
      hepsiburada_seller: string;
      teknosa: number;
      teknosa_seller: string;
      created_at: string;
      updated_at: string;
    };
  }>;
};

export type ProductFormInput = {
  name: string;
  brand: string;
  barcode: string;
  group: string;
  description: string;
  price1: string;
  price2: string;
  price4: string;
  quantity: string;
  quantity2: string;
  quantity2_enable: string;
  kdv_id: string;
  trendyol_listPrice: string;
  trendyol_salePrice: string;
  hb_price: string;
  teknosa_sale_price: string;
  eptt_price: string;
  eptt_iskonto: string;
  alisgidis_sale_price: string;
  alisgidis_list_price: string;
};
