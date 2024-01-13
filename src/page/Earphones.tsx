import { products } from "../data/data";
import { Slogan } from "../ui/Slogan";
import { ProductDisplay } from "../ui/ProductDisplay";

const eardphoneProducts = products.filter((product) =>
  product.name.toLowerCase().includes("earphone")
);
// Sort so that the new items will come first.
eardphoneProducts.sort((a, b) => {
  if (a.new === true) return -1;
  if (a.new === b.new) return 0;
  return 1;
});

export default function Earphones() {
  console.log(eardphoneProducts);
  return (
    <div className="mt-[6rem]">
      <div className="bg-black text-center w-full h-[15rem] grid place-content-center">
        <h1 className="text-h2 text-white uppercase font-bold tracking-subtitle">
          Headphones
        </h1>
      </div>
      <div className="max-w-[70rem] mx-auto mt-[10rem] grid gap-[10rem] max-md:gap-[7.5rem] px-8 max-x-sm:px-4 max-md:mt-[5rem]">
        {eardphoneProducts.map((product, i) => (
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
