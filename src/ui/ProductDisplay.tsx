import { TProduct } from "../data/data";
import { getResponsiveImageFrom } from "../helper/helper";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { Button } from "./Button";
import { LinkButton } from "./LinkButton";

export function ProductDisplay({
  product,
  reverse,
}: {
  product: TProduct;
  reverse: boolean;
}) {
  const { type } = useViewportWidth();
  const {
    name,
    categoryImage: image,
    description,
    new: newProduct,
    slug,
  } = product;
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
        <LinkButton to={`/product/${slug}`}>
          <Button type="primary" className="mt-12 w-fit">
            See Product
          </Button>
        </LinkButton>
      </div>
    </article>
  );
}
