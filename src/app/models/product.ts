export interface Product {
  id?:string;
  name?: string;
  price?: number;
  provider?: string;
  quantity?: number;
}

export class ProductDescription {
  id?:string;
  name?: string;
  price?: number;
  provider?: string;
  quantity?: number;
  description?: string;
}
