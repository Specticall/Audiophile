import { LoaderFunction } from "react-router-dom";
import { TProduct } from "../data/data";
import { fetchProducts } from "./fetchServices";

export const genericProductLoader = (
  productName:
    | "headphone"
    | "earphone"
    | "speaker"
    | "none"
    | "all" = "headphone"
) =>
  (async () => {
    const data = (await fetchProducts()) as TProduct[];

    //Filter only headphone products
    const filtered = data.filter((product) =>
      product.name.toLowerCase().includes(productName)
    );

    // Sort so that new procuts go to the top
    filtered.sort((a, b) => {
      if (a.new === true) return -1;
      if (a.new === b.new) return 0;
      return 1;
    });
    if (productName === "none") return [];
    if (productName === "all") return data;
    return filtered;
  }) satisfies LoaderFunction;
