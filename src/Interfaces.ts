export enum SortOrder {
  ASC,
  DESC,
}

export interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  description: string;
}
