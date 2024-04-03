import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import React from "react";
import App, { Product } from "../src/App";
import axios from "axios";

describe("App tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render products table ", async () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        title: "shirt",
        description: "new cottom t-shirt",
        price: 799,
      },
      {
        id: 2,
        title: "pants",
        description: "denim jeans",
        price: 997,
      },
    ];
    jest.spyOn(axios, "get").mockResolvedValue({ data: mockProducts });

    render(<App />);
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading products")
    );
    const rows: HTMLElement[] = screen.getAllByTestId("tid-table-row");

    expect(rows.length).toBe(2);
  });

  test("Should render loading msg until products are loaded", () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });

    render(<App />);

    expect(screen.getByText("Loading products")).toBeInTheDocument();
  });

  test("Should render error msg when products api request fails", async () => {
    jest.spyOn(axios, "get").mockRejectedValue("internal error");

    render(<App />);
    await waitForElementToBeRemoved(() =>
      screen.queryByText("Loading products")
    );

    expect(screen.getByText("Error in fetching products")).toBeInTheDocument();
  });
});
