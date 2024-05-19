import { useState, useEffect } from "react";
import { FilterState, Product, SortOrder } from "../Interfaces";
import { sortProducts } from "../utils";

export const useFilters = (
  initialFilters: FilterState,
  products: Product[]
) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const clearFilters = () => {
    setFilters(initialFilters);
    setIsFiltered(false);
  };

  useEffect(() => {
    const { sortOrder, categories, rating } = filters;
    let updatedProducts = products;

    if (rating) {
      updatedProducts = updatedProducts.filter(
        (x) => Math.round(x.rating) >= rating
      );
    }
    if (categories.length) {
      updatedProducts = updatedProducts.filter((x) =>
        categories.includes(x.category)
      );
    }
    if (sortOrder !== null) {
      updatedProducts = sortProducts(sortOrder, updatedProducts);
    }

    setFilteredProducts(updatedProducts);
    setIsFiltered(true);
  }, [filters, products]);

  const handleSort = (sortType: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortOrder: sortType }));
  };

  const selectCategory = (selectedCategory: string) => {
    if (filters.categories.includes(selectedCategory)) {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== selectedCategory),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: [...prev.categories, selectedCategory],
      }));
    }
  };

  const changeRating = (chosenRating: number) => {
    setFilters((prev) => ({ ...prev, rating: chosenRating }));
  };

  return {
    filters,
    isFiltered,
    filteredProducts,
    clearFilters,
    handleSort,
    selectCategory,
    changeRating,
  };
};
