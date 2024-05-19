import { useState, useEffect } from "react";
import { Product } from "../Interfaces";
import Sidebar from "./Sidebar";
import StarRating from "./StarRating";
import { useFilters } from "../hooks/useFilters";

const ProductsPage = () => {
  const initialFilters = {
    sortOrder: null,
    categories: [],
    rating: 0,
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const {
    filters,
    isFiltered,
    filteredProducts,
    clearFilters,
    handleSort,
    selectCategory,
    changeRating,
  } = useFilters(initialFilters, products);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://dummyjson.com/products?limit=30&skip=10"
      );
      const data = await res.json();
      const categories: string[] = [
        ...new Set(data.products.map((x: Product) => x.category) as string[]),
      ];
      setProducts(data.products);
      setAllCategories(categories);
    };

    fetchProducts();
  }, []);

  return (
    <main className="w-full p-6 flex gap-6">
      <Sidebar
        allCategories={allCategories}
        filters={filters}
        handleSort={handleSort}
        selectCategory={selectCategory}
        changeRating={changeRating}
        clearFilters={clearFilters}
      />
      <section className="flex flex-col gap-8">
        <h1 className="text-xl font-bold">Products</h1>
        <div className="grid grid-cols-3 gap-6">
          {(isFiltered ? filteredProducts : products).map(
            ({ id, images, title, rating }) => (
              <div
                key={id}
                className="flex flex-col gap-3 p-3 border-2 border-black items-center"
              >
                <img
                  src={images[0]}
                  alt={title}
                  className="w-32 h-32 object-contain"
                />
                <p>{title}</p>
                <StarRating rating={Math.round(rating)} />
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
