import { useEffect, useState } from "react";
import "./App.css";
import { useSessionStorage } from "./useSessionStorage";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

const ProductsPage = () => {
  const ITEMS_PER_PAGE = 12;
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const {getItem, setItem} = useSessionStorage()

  useEffect(() => {
    const productsCache = getItem(`page-${page}`)
    if(productsCache){
      const totalPages = getItem("total-pages")
      setTotalPages(totalPages) // if we had products, total pages would be available too. refer code below
      setProducts(productsCache)
      return
    }
    const fetchProducts = async () => {
      setLoading(true)
      const res = await fetch(
        `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
          page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
        }`
      );
      const data = await res.json();
      setProducts(data.products);
      setItem(`page-${page}`, data.products)
      setLoading(false)
      if (!totalPages) {
        const pages = Math.ceil(data.total / ITEMS_PER_PAGE)
        setTotalPages(pages);
        setItem("total-pages", pages)
      }
    };
    fetchProducts();
  }, [page, totalPages]);

  const handlePageSelect = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className="w-2/3 flex flex-col gap-8 items-center">
      <h1 className="text-2xl font-bold">Products</h1>
      {loading ? <h3>Loading...</h3> : 
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-center items-center gap-2 bg-gray-200 rounded-md p-3 w-40 h-44"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="w-24 h-24 object-cover"
            />
            <p>{p.title}</p>
          </div>
        ))}
      </div>}
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
