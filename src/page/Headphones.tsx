import { TProduct } from "../data/data";
import { Slogan } from "../ui/Slogan";
import { ProductDisplay } from "../ui/ProductDisplay";
import { fetchProducts } from "../utils/fetchServices";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { LoaderData } from "../utils/routerTypes";

export const headphonesLoader = (async () => {
  const data = (await fetchProducts()) as TProduct[];

  //Filter only headphone products
  const filtered = data.filter((product) =>
    product.name.toLowerCase().includes("headphone")
  );

  // Sort so that new procuts go to the top
  filtered.sort((a, b) => {
    if (a.new === true) return -1;
    if (a.new === b.new) return 0;
    return 1;
  });

  return filtered;
}) satisfies LoaderFunction;

// const headphoneProducts = products.filter((product) =>
//   product.name.toLowerCase().includes("headphone")
// );
// // Sort so that the new items will come first.
// headphoneProducts.sort((a, b) => {
//   if (a.new === true) return -1;
//   if (a.new === b.new) return 0;
//   return 1;
// });

export default function Headphones() {
  const headphoneProducts = useLoaderData() as LoaderData<
    typeof headphonesLoader
  >;

  return (
    <div className="mt-[6rem]">
      <div className="bg-black text-center w-full h-[15rem] grid place-content-center">
        <h1 className="text-h2 text-white uppercase font-bold tracking-subtitle">
          Headphones
        </h1>
      </div>
      <div className="max-w-[70rem] mx-auto mt-[10rem] grid gap-[10rem] max-md:gap-[7.5rem] px-8 max-x-sm:px-4 max-md:mt-[5rem]">
        {headphoneProducts &&
          headphoneProducts.map((product, i) => (
            <ProductDisplay
              product={product}
              key={`${product.id}-key-headphones`}
              reverse={i % 2 === 1}
            />
          ))}
        <Slogan />
      </div>
    </div>
  );
}
