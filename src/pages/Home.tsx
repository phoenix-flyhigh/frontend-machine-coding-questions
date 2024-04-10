import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import {
  fetchDataFailed,
  fetchDataRequested,
  fetchDataSuccess,
  ProductsState,
} from "../ProductsSlice";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const Home = () => {
  const productState: ProductsState = useSelector(
    (state: RootState) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataRequested());

    const fetchData = async () =>
      await fetch("https://dummyjson.com/products")
        .then(async (res) => await res.json())
        .then((data) => dispatch(fetchDataSuccess(data.products)))
        .catch(() => dispatch(fetchDataFailed()));

    fetchData();
  }, [dispatch]);

  if (productState.loading) {
    return <div>Loading</div>;
  }
  if (productState.error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <Breadcrumbs />
      <h1 className="text-2xl font-semibold">Trending Products</h1>
      <div className="grid grid-cols-3 gap-5">
        {productState.data?.slice(0, 15).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <Link to="/products" className="text-lg font-semibold underline">
        View all products
      </Link>
    </div>
  );
};

export default Home;
