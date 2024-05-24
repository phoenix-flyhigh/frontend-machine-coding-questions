import { useState, useCallback, useEffect } from "react";
import PaginationTile from "./PaginationTile";
import Table from "./Table";

export interface Product {
    id: number;
    title: string;
    price: number;
    rating: number;
    brand: string;
  }
  
  const ProductsWrapper = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / limit);
  
    const fetchProducts = useCallback(async (limit: number, skip: number) => {
      const data = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      ).then((res) => res.json());
      if (total === 0) {
        setTotal(data.total);
      }
      return data;
    }, []);
  
    useEffect(() => {
      if (currentPage * limit > total + limit && products.length > 0) {
        setCurrentPage(1);
        return;
      }
      if (
        (currentPage - 1) * limit > products.length ||
        products.length - (currentPage - 1) * limit === 5
      ) {
        (async () => {
          const data = await fetchProducts(currentPage * limit, 0);
          setProducts(data.products);
        })();
      } else if (currentPage * limit > products.length) {
        (async () => {
          const data = await fetchProducts(limit, (currentPage - 1) * limit);
          setProducts((prev) => [...prev, ...data.products]);
        })();
      }
    }, [currentPage, limit]);
  
    return (
      <div className="flex flex-col gap-6 w-4/5 items-center">
        <Table
          products={products.slice(
            (currentPage - 1) * limit,
            currentPage * limit
          )}
        />
        <PaginationTile
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          setLimit={setLimit}
          totalPages={totalPages}
        />
      </div>
    );
  };

  export default ProductsWrapper;