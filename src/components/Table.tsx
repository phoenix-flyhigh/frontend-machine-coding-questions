import { Product } from "./ProductsWrapper";

const Table = ({ products }: { products: Product[] }) => {
  return (
    <table className="w-full border-2 border-gray-500 p-3">
      <thead>
        <tr>
          <th className="text-left">ID</th>
          <th className="text-left">Title</th>
          <th className="text-left">Price</th>
          <th className="text-left">Rating</th>
          <th className="text-left">Brand</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({ id, title, brand, price, rating }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{price}</td>
            <td>{rating}</td>
            <td>{brand}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
