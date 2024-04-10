import { Link } from "react-router-dom";
import { Product } from "../ProductsSlice";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col items-center justify-center border-2 border-black rounded-md p-3"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-80 h-72 object-contain"
      />
      <p>{product.title}</p>
      <p>${product.price}</p>
    </Link>
  );
};

export default ProductCard;
