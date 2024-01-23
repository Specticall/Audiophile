import { useState } from "react";
import { ITEM_DISPLAYED_ON_CART_MODAL } from "../helper/config";
import { formatCurrency, getResponsiveImageFrom } from "../helper/helper";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useViewportWidth } from "../hooks/useViewportWidth";
import {
  TCartItem,
  addQuantity,
  clearItem,
  substractQuantity,
} from "../slice/cartSlice";
import { Button } from "./Button";
import { LinkButton } from "./LinkButton";
import UpdateQuantityButton from "./UpdateQuantityButton";

// const fakeCart: TCartItem[] = [
//   {
//     id: 1,
//     name: "XX59 Headphones",
//     image: {
//       mobile: "/product-xx59-headphones/mobile/image-product.jpg",
//       tablet: "/product-xx59-headphones/tablet/image-product.jpg",
//       desktop: "/product-xx59-headphones/desktop/image-product.jpg",
//     },
//     quantity: 2,
//     price: 899,
//   },
//   {
//     id: 4,
//     name: "XX99 Mark II Headphones",
//     image: {
//       mobile: "/product-xx99-mark-two-headphones/mobile/image-product.jpg",
//       tablet: "/product-xx99-mark-two-headphones/tablet/image-product.jpg",
//       desktop: "/product-xx99-mark-two-headphones/desktop/image-product.jpg",
//     },
//     quantity: 1,
//     price: 2999,
//   },
//   {
//     id: 4,
//     name: "XX99 Mark II Headphones",
//     image: {
//       mobile: "/product-xx99-mark-two-headphones/mobile/image-product.jpg",
//       tablet: "/product-xx99-mark-two-headphones/tablet/image-product.jpg",
//       desktop: "/product-xx99-mark-two-headphones/desktop/image-product.jpg",
//     },
//     quantity: 1,
//     price: 2999,
//   },
// ];
export function CartModal() {
  const cart = useAppSelector((state) => state.cart.cart);
  const dispatch = useAppDispatch();

  const totalPrice = cart.reduce((total, item) => {
    return (total += item.price * item.quantity);
  }, 0);
  const handleRemoveAll = () => dispatch(clearItem());

  return (
    <div className="w-full max-w-[70rem] min-h-screen flex justify-end items-start mt-[6rem] pt-[2rem] px-8 max-x-sm:px-4 max-sm:pt-4">
      <article className="relative z-10 w-[24rem] bg-white p-8 rounded-lg max-x-sm:w-full max-x-sm:p-6 overflow-auto max-h-[calc(100vh-8rem)]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-h6 font-bold">CART ({cart.length})</h2>
          <p
            className="text-black/50 hover:text-accent-light hover:underline cursor-pointer"
            onClick={handleRemoveAll}
          >
            Remove all
          </p>
        </div>
        {cart.length > 0 ? (
          <CartItemList cartItems={cart} totalPrice={totalPrice} />
        ) : (
          <CartEmpty />
        )}
      </article>
    </div>
  );
}

function CartEmpty() {
  return (
    <div className="text-center text-black/50 py-8">Your cart is empty</div>
  );
}

function CartItemList({
  cartItems,
  totalPrice,
}: {
  cartItems: TCartItem[];
  totalPrice: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const remainingItemCount = cartItems.length - ITEM_DISPLAYED_ON_CART_MODAL;
  const handleShowAll = () => setShowAll((current) => !current);

  return (
    <>
      <ul className="grid gap-6">
        {/* Only show first 3 elements */}
        {cartItems.slice(0, showAll ? cartItems.length : 3).map((item) => {
          return <CartItem item={item} />;
        })}
      </ul>
      {remainingItemCount > 0 && (
        <button
          className="text-black/50 text-center mt-8 hover:underline hover:text-accent-dark cursor-pointer w-full border-t-[1px] border-black/25 pt-4"
          onClick={handleShowAll}
        >
          {showAll
            ? "View Less"
            : `View ${remainingItemCount} More Item
          ${remainingItemCount > 1 ? "s" : ""}`}
        </button>
      )}
      <div className="flex justify-between items-center mt-8">
        <p className="text-black/50 text-body">TOTAL</p>
        <p className="text-black text-h6 font-bold tracking-very-small">
          ${formatCurrency(totalPrice)}
        </p>
      </div>
      <LinkButton to="/checkout">
        <Button type="primary" className="w-full mt-6">
          Checkout
        </Button>
      </LinkButton>
    </>
  );
}

function CartItem({ item }: { item: TCartItem }) {
  const { type } = useViewportWidth();
  const { name, price, quantity, image, id } = item;
  const dispatch = useAppDispatch();

  const handleIncrement = () => dispatch(addQuantity(id));
  const handleDecrement = () => dispatch(substractQuantity(id));
  return (
    <li className="flex items-center justify-between">
      <div className="flex-1 flex gap-x-4 items-center">
        <img
          src={getResponsiveImageFrom(type, image)}
          alt="product image"
          className="w-[4rem] aspect-square object-cover rounded-md"
        />
        <div className="max-w-[6rem] flex flex-col gap-y-1">
          <h5 className="truncate font-bold">{name}</h5>
          <p className="text-black/75 font-bold tracking-very-small">
            $ {formatCurrency(price)}
          </p>
        </div>
      </div>
      <UpdateQuantityButton
        type="small"
        initialCount={quantity}
        value={quantity}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </li>
  );
}
