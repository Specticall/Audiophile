import { useState } from "react";
import {
  calculatePrices,
  formatCurrency,
  getResponsiveImageFrom,
} from "../helper/helper";
import { useAppSelector } from "../hooks/useAppSelector";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { TCartItem } from "../slice/cartSlice";
import { Button } from "./Button";
import { LinkButton } from "./LinkButton";
import Icon from "./Icon";

export function CheckoutCompleteModal() {
  const [showAll, setShowAll] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cart);

  const handleShowAll = () => setShowAll((current) => !current);
  const { grandTotalPrice } = calculatePrices(cartItems);

  return (
    <article className="bg-white relative z-20 p-12 max-w-[35rem] w-full rounded-md max-h-[calc(100vh-8rem)] overflow-auto top-12">
      <Icon type="checkout" />
      <h2 className="text-h3 leading-tight font-bold uppercase mt-8">
        Thank you <br /> for your order
      </h2>
      <p className="text-black/50 my-6">
        You will receive an email confirmation shortly.
      </p>
      <div className="flex bg-gray rounded-md">
        <div className="flex-1 p-6 grid gap-y-4">
          <CartItems item={cartItems[0]} />
          {showAll &&
            cartItems.slice(1).map((item) => {
              return <CartItems item={item}></CartItems>;
            })}
          {cartItems.length > 1 && (
            <button
              className="text-black/50 font-bold border-t-[1px] pt-4 border-black/25 hover:text-accent-dark"
              onClick={handleShowAll}
            >
              {showAll
                ? "View less"
                : `and ${cartItems.length - 1} other item(s)`}
            </button>
          )}
        </div>
        <div className="px-8 bg-black py-6 grid rounded-md">
          <div className="self-end">
            <p className="text-white/50 uppercase tracking-small text-body">
              GRAND TOTAL
            </p>
            <p className="text-white tracking-very-small font-bold text-h6 mt-2">
              $ {formatCurrency(grandTotalPrice)}
            </p>
          </div>
        </div>
      </div>
      <LinkButton to="/home">
        <Button type="primary" className="w-full mt-16">
          BACK TO HOME
        </Button>
      </LinkButton>
    </article>
  );
}

function CartItems({ item }: { item: TCartItem }) {
  const { type } = useViewportWidth();
  const { name, price, quantity, image } = item;
  const totalPrice = price * quantity;

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
            $ {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>
      <p className="text-black/50 font-bold">x{quantity}</p>
    </li>
  );
}
