import { TProduct, products } from "../data/data";
import { getResponsiveImageFrom } from "../helper/helper";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { Button } from "../ui/Button";
import { Slogan } from "../ui/Slogan";

const headphoneProducts = products.filter((product) =>
  product.name.toLowerCase().includes("headphone")
);
// Sort so that the new items will come first.
headphoneProducts.sort((a, b) => {
  if (a.new === true) return -1;
  if (a.new === b.new) return 0;
  return 1;
});

export default function Headphones() {
  console.log(headphoneProducts);

  return (
    <div className="mt-[6rem]">
      <div className="bg-black text-center w-full h-[15rem] grid place-content-center">
        <h1 className="text-h2 text-white uppercase font-bold tracking-subtitle">
          Headphones
        </h1>
      </div>
      <div className="max-w-[70rem] mx-auto mt-[10rem] grid gap-[10rem] max-md:gap-[7.5rem] px-8 max-x-sm:px-4 max-md:mt-[5rem]">
        {headphoneProducts.map((product, i) => (
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

function ProductDisplay({
  product,
  reverse,
}: {
  product: TProduct;
  reverse: boolean;
}) {
  const { type } = useViewportWidth();
  const { name, categoryImage: image, description, new: newProduct } = product;
  console.log(type);
  return (
    <article className="grid grid-cols-2 place-items-center max-lg:grid-cols-1 gap-12">
      <img
        src={getResponsiveImageFrom(type, image)}
        alt=""
        className="h-[35rem] w-full object-cover max-md:mb-12 max-sm:mb-0 max-lg:h-[22rem]"
      />
      <div
        className={`max-w-[23.75rem] max-lg:[&_>_*]:text-center max-lg:grid w-full max-lg:place-items-center max-lg:max-w-[30rem]
          ${reverse && type === "dekstop" ? "order-first" : ""}`}
      >
        {newProduct && (
          <p className="uppercase text-accent-light tracking-large mb-6 max-lg:mb-0 max-sm:mb-0">
            New Product
          </p>
        )}
        <h1 className="text-h1 text-black font-bold leading-title mt-6 max-sm:mt-3 max-sm:text-h2 max-sm:leading-[120%]">
          {name}
        </h1>
        <p className="mt-6 text-black/75 leading-body text-body max-w-[22rem] max-lg:max-w-full">
          {description}
        </p>
        <Button type="primary" className="mt-12 w-fit">
          See Product
        </Button>
      </div>
    </article>
  );
}
