export enum SortOrder {
  ASC,
  DESC,
}

export interface Product {
  id: number;
  images: string;
  title: string;
  category: string;
  rating: number;
}

export type FilterState = {
  sortOrder: SortOrder | null;
  categories: string[];
  rating: number;
};
