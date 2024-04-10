import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ProductsState } from "../ProductsSlice";
import ProductCard from "../components/ProductCard";
import { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";

const Products = () => {
  const productState: ProductsState = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => window.scrollTo(0, 0), []);

  if (productState.loading) {
    return <div>Loading</div>;
  }
  if (productState.error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <Breadcrumbs />
      <h1 className="text-2xl font-semibold">Products List</h1>
      <div className="grid grid-cols-3 gap-5">
        {productState.data?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
