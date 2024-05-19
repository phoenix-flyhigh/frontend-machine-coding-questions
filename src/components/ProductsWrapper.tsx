import { useEffect, useState } from "react";
import { Product, SortOrder } from "../Interfaces";
import Pager from "./Pager";
import { textComparator } from "../utils";
import HeaderCell from "./HeaderCell";
import "../App.css";

const ProductsWrapper = () => {
  const PRODUCTS_PER_PAGE = 10;

  const [products, setProducts] = useState<Product[]>([]);
  const [currPage, setCurrPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortParameter, setSortParameter] = useState<string | null>(null);
  const [sortingOrder, setSortingOrder] = useState<SortOrder | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const noResults =
    searchText.length > 0 && !searching && filteredProducts.length < 1;
  const isFiltered = !searching && filteredProducts.length > 0;
  const productsToDisplay = isFiltered ? filteredProducts : products;
  const pageIndices =
    filteredProducts.length > 0
      ? filteredProducts.length > PRODUCTS_PER_PAGE
        ? Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
        : 1
      : totalPages;

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=0`)
      .then((res) => res.json())
      .then((data) => {
        setProducts((prev) => [...prev, ...data.products]);

        setTotalPages(data.total / PRODUCTS_PER_PAGE);
      });
  }, []);

  useEffect(() => {
    currPage > 1 &&
      fetch(
        `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${
          currPage * 10 - 10
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts((prev) => [...prev, ...data.products]);
        });
  }, [currPage]);

  const searchProducts = (inputText: string) => {
    setSearching(true);

    const updatedProducts = products.filter((x) => {
      if (
        textComparator(x.title, inputText) ||
        textComparator(x.brand, inputText) ||
        textComparator(x.category, inputText)
      ) {
        return x;
      }
    });

    setFilteredProducts(updatedProducts);
    setCurrPage(1);
    setSearching(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    if (text.length > 0) {
      searchProducts(text);
    } else {
      setFilteredProducts([]);
    }
    setSearchText(e.target.value);
  };

  const sortProducts = (sortParam: keyof Product, sortOrder: SortOrder) => {
    setSortParameter(sortParam);
    setSortingOrder(sortOrder);

    const data = [...productsToDisplay].sort((a, b) => {
      if (a[sortParam] < b[sortParam]) {
        return sortOrder === SortOrder.ASC ? -1 : 1;
      }
      if (a[sortParam] > b[sortParam]) {
        return sortOrder === SortOrder.ASC ? 1 : -1;
      }
      return 0;
    });
    isFiltered ? setFilteredProducts(data) : setProducts(data);
  };

  const getSortOrder = (param: string) => {
    if (sortParameter === param) {
      if (sortingOrder === SortOrder.ASC) {
        return SortOrder.DESC;
      } else {
        return SortOrder.ASC;
      }
    } else return SortOrder.ASC;
  };

  const currentPageProducts = (products: Product[], pageNumber: number) => {
    return products.length > PRODUCTS_PER_PAGE
      ? products.slice(
          pageNumber * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE,
          pageNumber * PRODUCTS_PER_PAGE
        )
      : products;
  };

  const selectPage = (pageNumber: number) => {
    setSortParameter(null);
    setSortingOrder(null);
    setCurrPage(pageNumber);
  };

  return (
    <div className="w-5/6">
      {products.length > 0 && (
        <div className="flex flex-col gap-6">
          <form className="flex items-center justify-end gap-4">
            <label htmlFor="search-input" className="text-lg">
              Search:
            </label>
            <input
              id="search-input"
              type="text"
              value={searchText}
              onChange={(e) => handleSearch(e)}
              className="border-2 border-black rounded-md px-3 py-1 w-56"
            />
          </form>
          <table className="w-full  rounded-lg p-3 border-collapse">
            <thead>
              <tr key={"header"}>
                <HeaderCell
                  title="Title"
                  onSort={() => sortProducts("title", getSortOrder("title"))}
                  sortParameter={sortParameter}
                  sortingOrder={sortingOrder}
                />
                <HeaderCell
                  title="Price"
                  onSort={() => sortProducts("price", getSortOrder("price"))}
                  sortParameter={sortParameter}
                  sortingOrder={sortingOrder}
                />
                <HeaderCell
                  title="Rating"
                  onSort={() => sortProducts("rating", getSortOrder("rating"))}
                  sortParameter={sortParameter}
                  sortingOrder={sortingOrder}
                />
                <HeaderCell
                  title="Brand"
                  onSort={() => sortProducts("brand", getSortOrder("brand"))}
                  sortParameter={sortParameter}
                  sortingOrder={sortingOrder}
                />
                <HeaderCell
                  title="Category"
                  onSort={() =>
                    sortProducts("category", getSortOrder("category"))
                  }
                  sortParameter={sortParameter}
                  sortingOrder={sortingOrder}
                />
              </tr>
            </thead>
            <tbody>
              {noResults ? (
                <tr>
                  <td className="cell text-center">No results</td>
                </tr>
              ) : (
                !searching &&
                currentPageProducts(productsToDisplay, currPage).map(
                  ({ id, title, rating, brand, category, price }) => {
                    return (
                      <tr key={id}>
                        <td className="cell">{title}</td>
                        <td className="cell">{price}</td>
                        <td className="cell">{rating}</td>
                        <td className="cell">{brand}</td>
                        <td className="cell">{category}</td>
                      </tr>
                    );
                  }
                )
              )}
            </tbody>
          </table>
          {!searching && !noResults && (
            <Pager
              showPreviousBtn={pageIndices > 1 && currPage > 1}
              showNextBtn={pageIndices > 1 && currPage < pageIndices}
              pageCount={pageIndices}
              onSelect={(val) => selectPage(val)}
              selectedPage={currPage}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsWrapper;
