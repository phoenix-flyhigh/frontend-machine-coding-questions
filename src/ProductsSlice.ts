import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
}

export interface ProductsState {
  data: Product[] | null;
  loading: boolean;
  error: boolean;
}

const initialState: ProductsState = {
  data: null,
  loading: false,
  error: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchDataRequested: (state: ProductsState) => ({
      ...state,
      loading: true,
    }),
    fetchDataSuccess: (
      state: ProductsState,
      action: { payload: Product[] }
    ) => ({
      ...state,
      loading: false,
      error: false,
      data: action.payload,
    }),
    fetchDataFailed: (state: ProductsState) => ({
      ...state,
      loading: false,
      error: true,
    }),
  },
});

export const { fetchDataRequested, fetchDataFailed, fetchDataSuccess } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
