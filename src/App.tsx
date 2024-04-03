import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

enum FetchStatus {
  INITIAL = "INITIAL",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

function App() {
  const [currentSortOrder, setCurrentSortOrder] = useState<SortOrder>(
    SortOrder.ASC
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.INITIAL);

  useEffect(() => {
    setStatus(FetchStatus.LOADING);
    axios
      .get(`https://fakestoreapi.com/products?sort=${currentSortOrder}`)
      .then(async (response) => {
        const data: Product[] = await response.data;
        setProducts(data);
        console.log(data);
        
        setStatus(FetchStatus.SUCCESS);
      })
      .catch(() => {
        console.log("error occured in api fetch");
        setStatus(FetchStatus.ERROR);
      });
  }, [currentSortOrder]);

  return (
    <div className="bg-gray-200 p-4 flex flex-col gap-4 items-center">
      <div className="pr-2 bg-white w-fit rounded-lg">
        <select
          data-testid="tid-select-box"
          value={currentSortOrder}
          onChange={(e) => setCurrentSortOrder(e.target.value as SortOrder)}
          className="border-none bg-none px-4 py-2 "
        >
          <option value={SortOrder.ASC}>Ascending</option>
          <option value={SortOrder.DESC}>Descending</option>
        </select>
      </div>
      {status === FetchStatus.SUCCESS && (
        <table className="flex flex-col border-slate-500 border-2 border-collapse">
          <thead className="grid grid-cols-4">
            <th className="text-center border-2 border-slate-500">ID</th>
            <th className="border-2 border-slate-500"> Title</th>
            <th className="border-2 border-slate-500"> Description</th>
            <th className="border-2 border-slate-500"> Price</th>
          </thead>
          <tbody>
            {products.map(({ id, title, description, price }: Product) => (
              <tr
                className="grid grid-cols-4"
                key={id}
                data-testid="tid-table-row"
              >
                <td className="text-center border-2 border-slate-500">{id}</td>
                <td className="flex  border-2 border-slate-500">{title}</td>
                <td className="flex overflow-scroll border-2 border-slate-500">
                  {description}
                </td>
                <td className="text-center border-2 border-slate-500">
                  {price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {status === FetchStatus.LOADING && <div>Loading products</div>}
      {status === FetchStatus.ERROR && <div>Error in fetching products</div>}
    </div>
  );
}

export default App;
