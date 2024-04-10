import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductsState } from "../ProductsSlice";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Breadcrumbs from "../components/Breadcrumbs";

const ProductDetails = () => {
  const { id } = useParams();

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
  const productId = parseInt(id ?? "0");

  const product = productState.data?.find((p) => p.id == productId);

  if (!product) {
    return <div>No product found</div>;
  }
  return (
    <div className="flex flex-col gap-4 items-center">
      <Breadcrumbs />
      <p className="text-xl font-bold">{product.title}</p>
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-96 h-96 object-contain"
      />
      <p className="text-lg font-bold">${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
