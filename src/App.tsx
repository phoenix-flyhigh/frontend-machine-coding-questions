import { useEffect, useState } from "react";
import "./App.css";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const ProductsPage = () => {
  const ITEMS_PER_PAGE = 10;
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
          page * 10 - 10
        }`
      );
      const data = await res.json();
      setProducts(data.products);
      if (!totalPages) setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    };
    fetchProducts();
  }, [page, totalPages]);

  const handlePageSelect = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="w-2/3 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-center items-center gap-2 bg-gray-200 rounded-md p-3"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-24 h-24 object-contain"
            />
            <p>{p.title}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full text-lg justify-between">
        {page > 1 && (
          <button onClick={() => handlePageSelect(page - 1)}>Prev</button>
        )}
        {[...Array(totalPages)].map((_, i) => (
          <button
            className={`${
              page === i + 1 &&
              "text-violet-800 bg-violet-300 px-3 py-1 rounded-full"
            }`}
            onClick={() => handlePageSelect(i + 1)}
            key={i + 1}
          >
            {i + 1}
          </button>
        ))}
        {page < totalPages && (
          <button onClick={() => handlePageSelect(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ProductsPage />
    </div>
  );
}

export default App;
