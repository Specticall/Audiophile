import { useLoaderData, useParams } from "react-router-dom";
import { LoaderData } from "../utils/routerTypes";
import { genericProductLoader } from "../utils/loaderFunction";
import { Slogan } from "../ui/Slogan";
import { ProductList } from "../ui/ProductList";
import { getResponsiveImageFrom } from "../helper/helper";
import { TGallery, TOthers, TProduct } from "../data/data";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { Button } from "../ui/Button";
import UpdateQuantityButton from "../ui/UpdateQuantityButton";
import { LinkButton } from "../ui/LinkButton";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { getItemQuantityInCart } from "../slice/appSlice";
import {
  addItem,
  addQuantity,
  substractQuantity,
  updateLoadedProductData,
} from "../slice/cartSlice";
import { useEffect } from "react";
const loader = genericProductLoader("all");

export default function Product() {
  const { paramsProductName } = useParams();
  const productList = useLoaderData() as LoaderData<typeof loader>;

  const selectedProduct = productList.find(
    (product) => product.slug === paramsProductName
  );

  if (!selectedProduct)
    throw new Error(`Product ${paramsProductName} not found`);

  return (
    <div className="mt-[10rem] max-w-[70rem] mx-auto px-6">
      <ProductInfo product={selectedProduct} />
      <ProductList />
      <Slogan />
    </div>
  );
}

function ProductInfo({ product }: { product: TProduct }) {
  const { type } = useViewportWidth();
  const dispatch = useAppDispatch();

  const {
    name,
    categoryImage: image,
    description,
    new: newProduct,
    price,
    features,
    includes,
    gallery,
    others,
    id,
  } = product;
  const quantityInCart =
    useAppSelector((state) => getItemQuantityInCart(state, id)) || 0;

  useEffect(() => {
    dispatch(updateLoadedProductData(product));
  }, [dispatch, product]);

  return (
    <article className="flex flex-col gap-[7.5rem] max-sm:gap-[3.5rem]">
      <div className="grid grid-cols-2 place-items-center max-md:grid-cols-1 gap-12 max-x-lg:min-h-[30rem] max-sm:mb-8 ">
        <img
          src={getResponsiveImageFrom(type, image)}
          alt=""
          className="h-[35rem] w-full object-cover max-x-lg:mb-12 max-md:mb-0 max-md:h-[22rem] max-x-lg:h-full"
        />
        <div
          className={`max-w-[23.75rem] max-x-lg:grid w-full max-x-lg:max-w-[30rem] max-md:max-w-full max-md:place-items-center max-md:[&_>_*]:text-center max-x-sm:[&_>_*]:text-left max-x-sm:place-items-start`}
        >
          {newProduct && (
            <p className="uppercase text-accent-light tracking-large mb-6 max-x-lg:mb-0 max-sm:mb-0">
              New Product
            </p>
          )}
          <h1 className="text-h1 text-black font-bold leading-title mt-6 max-sm:mt-3 max-sm:text-h2 max-sm:leading-[120%] max-x-lg:text-h2 uppercase max-x-lg:max-w-[10rem] max-x-lg:leading-subtitle">
            {name}
          </h1>
          <p className="mt-6 text-black/75 leading-body text-body max-w-[22rem] mb-6 max-x-lg:max-w-[27.5rem]">
            {description}
          </p>
          <p className="text-h6 tracking-small font-bold mb-8">${price}</p>
          <ProductButtons
            quantityInCart={quantityInCart}
            id={id}
            key={`${quantityInCart}-${name}`}
          />
        </div>
      </div>
      <ProductDetails features={features} includes={includes} />
      <ProductImages gallery={gallery} />
      <ProductRecommendation others={others} />
    </article>
  );
}

function ProductButtons({
  quantityInCart,
  id,
}: {
  quantityInCart: number;
  id: number;
}) {
  const dispatch = useAppDispatch();
  const handleIncrement = () => dispatch(addQuantity(id));
  const handleDecrement = () => dispatch(substractQuantity(id));
  const handleAddToCart = () => dispatch(addItem());

  return (
    <div className="flex gap-4 ">
      <UpdateQuantityButton
        type="large"
        initialCount={quantityInCart}
        value={quantityInCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
      {quantityInCart == 0 && (
        <Button type="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>
      )}
    </div>
  );
}

function ProductDetails({
  features,
  includes,
}: {
  features: string;
  includes: { quantity: number; item: string }[];
}) {
  return (
    <div className="flex w-full col-span-2 justify-between max-x-lg:flex-col max-x-lg:gap-y-16 max-sm:gap-12">
      <div className="x-lg:max-w-[40rem]">
        <h3 className="text-h3 font-bold tracking-small mb-8">FEATURES</h3>
        <p
          className="text-body leading-body text-black/50"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {features}
        </p>
      </div>
      <div className="space-y-2 max-x-lg:grid max-x-lg:grid-cols-2 max-md:gap-x-8 max-x-sm:grid-cols-1">
        <h3 className="text-h3 font-bold tracking-small mb-8">IN THE BOX</h3>
        <div className="max-x-lg:place-items-center">
          <div className="flex flex-col gap-2 ">
            {includes.map((item) => {
              return (
                <div className="flex gap-6">
                  <p className="text-accent-dark font-bold text-body">
                    {item.quantity}x
                  </p>
                  <p className="text-black/50 text-body">{item.item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex bg-red-500"></div>
    </div>
  );
}

function ProductImages({ gallery }: { gallery: TGallery }) {
  const { type } = useViewportWidth();
  return (
    <div className="grid grid-cols-[1fr_1fr] col-span-2 gap-8 [&_>_*]:rounded-lg grid-rows-2 mb-8 max-md:gap-4 max-x-lg:gap-6 max-sm:grid-cols-1 max-sm:grid-rows-[11rem_11rem_21rem]">
      <img
        src={getResponsiveImageFrom(type, gallery.first)}
        className="w-full h-full object-cover"
      />
      <img
        src={getResponsiveImageFrom(type, gallery.third)}
        className="row-span-2 object-cover h-full block max-sm:order-3"
      />
      <img
        src={getResponsiveImageFrom(type, gallery.second)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function ProductRecommendation({ others }: { others: TOthers[] }) {
  const { type } = useViewportWidth();
  return (
    <div className="text-center w-full col-span-2 mb-[3rem]">
      <h3 className="uppercase text-h3 font-bold mb-16">You may also like</h3>
      <div className="grid grid-cols-3 gap-7 max-sm:grid-cols-2 max-x-sm:grid-cols-1">
        {others.map((item) => {
          return (
            <div className="max-x-sm:mb-4">
              <img
                src={getResponsiveImageFrom(type, item.image)}
                alt="recommendation image"
                className="rounded-lg"
              />
              <h4 className="text-h5 font-bold mt-10 mb-8 tracking-subtitle max-x-sm:mt-6 max-x-sm:mb-6">
                {item.name}
              </h4>
              <LinkButton to={`/product/${item.slug}`}>
                <Button type="primary">See Product</Button>
              </LinkButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}
