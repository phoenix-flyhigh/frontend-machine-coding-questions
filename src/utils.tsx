import { SortOrder, Product } from "./Interfaces";

export const sortProducts = (sortingOrder: SortOrder, products: Product[]) => {
  return [...products].sort((a, b) => {
    if (a.title < b.title) {
      return sortingOrder === SortOrder.ASC ? -1 : 1;
    }
    if (a.title > b.title) {
      return sortingOrder === SortOrder.ASC ? 1 : -1;
    }
    return 0;
  });
};
