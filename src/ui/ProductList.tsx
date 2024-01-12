import speakerImage from "/public/shared/desktop/image-category-thumbnail-speakers.png";
import headphoneImage from "/public/shared/desktop/image-category-thumbnail-headphones.png";
import earphoneImage from "/public/shared/desktop/image-category-thumbnail-earphones.png";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { closeModal } from "../slice/modalSlice";

const productListInfo = [
  {
    title: "headphones",
    route: "/headphones",
    image: headphoneImage,
    style: "bottom-[6rem]",
  },
  {
    title: "speakers",
    route: "/speakers",
    image: speakerImage,
    style: "bottom-[5.5rem]",
  },
  {
    title: "earphones",
    route: "/earphones",
    image: earphoneImage,
    style: "bottom-[5.25rem]",
  },
];
export function ProductList({ className }: { className?: string }) {
  return (
    <ul
      className={`grid grid-cols-3 gap-6 place-items-center mt-[10rem] mb-[10.5rem] max-md:grid-cols-1 max-md:gap-20 ${className}`}
    >
      {productListInfo.map((product, i) => (
        <ProductLink product={product} key={`${product.title}-${i}`} />
      ))}
    </ul>
  );
}
function ProductLink({ product }: { product: Record<string, string> }) {
  const { title, route, image, style } = product;

  // Only used when the user is on mobile. Basically closes the modal after the user presses the link.
  const dispatch = useAppDispatch();
  return (
    <Link
      to={route}
      className="flex flex-col items-center justify-center relative w-full group "
      onClick={() => dispatch(closeModal())}
    >
      <img
        src={image}
        alt="product image"
        className={`h-[12rem] absolute left-[50%] translate-x-[-50%] object-cover ${style} group-hover:scale-[1.1] transition-all`}
      />
      <div className="bg-gray text-center w-full rounded-md pt-[7.5rem] pb-[1.75rem] grid place-items-center">
        <h2 className="uppercase text-h6 font-bold tracking-subtitle">
          {title}
        </h2>
        <Button type="tertiary">Shop</Button>
      </div>
    </Link>
  );
}
