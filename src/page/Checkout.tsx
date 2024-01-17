import { useEffect, useState } from "react";
import Icon from "../ui/Icon";
import { Button } from "../ui/Button";
import { formatCurrency, getResponsiveImageFrom } from "../helper/helper";
import { useAppSelector } from "../hooks/useAppSelector";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { TCartItem } from "../slice/cartSlice";

const fakeCart: TCartItem[] = [
  {
    id: 1,
    name: "XX59 Headphones",
    image: {
      mobile: "/product-xx59-headphones/mobile/image-product.jpg",
      tablet: "/product-xx59-headphones/tablet/image-product.jpg",
      desktop: "/product-xx59-headphones/desktop/image-product.jpg",
    },
    quantity: 2,
    price: 899,
  },
  {
    id: 4,
    name: "XX99 Mark II Headphones",
    image: {
      mobile: "/product-xx99-mark-two-headphones/mobile/image-product.jpg",
      tablet: "/product-xx99-mark-two-headphones/tablet/image-product.jpg",
      desktop: "/product-xx99-mark-two-headphones/desktop/image-product.jpg",
    },
    quantity: 1,
    price: 2999,
  },
  {
    id: 4,
    name: "XX99 Mark II Headphones",
    image: {
      mobile: "/product-xx99-mark-two-headphones/mobile/image-product.jpg",
      tablet: "/product-xx99-mark-two-headphones/tablet/image-product.jpg",
      desktop: "/product-xx99-mark-two-headphones/desktop/image-product.jpg",
    },
    quantity: 1,
    price: 2999,
  },
];

export default function Checkout() {
  return (
    <div className="bg-gray h-full pt-[6rem]">
      <div className="max-w-[70rem] mx-auto grid grid-cols-[1fr_22rem] px-8 my-[8.5rem] gap-8">
        <form action="" className="bg-white px-12 py-14 rounded-lg">
          <h3 className="text-h3 font-bold uppercase">Checkout</h3>
          <div className="space-y-[3rem]">
            <BillingDetails />
            <ShippingInfo />
            <PaymentDetails />
          </div>
        </form>
        <CheckoutCart />
      </div>
    </div>
  );
}

function CheckoutCart() {
  // TEMP
  const cartItems = fakeCart;
  // const cartItems = useAppSelector((state) => state.cart.cart);
  const totalPrice = 100;

  return (
    <div className="bg-white px-8 py-14 rounded-lg h-fit max-h-full">
      <h3 className="text-h6 font-bold mb-8 uppercase tracking-small">
        Summary
      </h3>
      <ul className="grid gap-6 ">
        {cartItems.map((item) => {
          return <CheckoutCartItem item={item} />;
        })}
      </ul>
      <div className="flex justify-between items-center mt-8">
        <p className="text-black/50 text-body">TOTAL</p>
        <p className="text-black text-h6 font-bold tracking-very-small">
          ${formatCurrency(totalPrice)}
        </p>
      </div>
      <Button type="primary" className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}

function CheckoutCartItem({ item }: { item: TCartItem }) {
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

function BillingDetails() {
  return (
    <div className="mt-8">
      <h4 className="uppercase text-accent-dark font-bold text-subtitle tracking-button mb-4">
        Billing Details
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <InputText label="Name" placeholder="Alexei Ward" />
        <InputText label="Email Address" placeholder="alexei@gmail.com" />
        <InputText label="Phone Number" placeholder="+62 202-555-0136" />
      </div>
    </div>
  );
}

function ShippingInfo() {
  return (
    <div className="mt-8">
      <h4 className="uppercase text-accent-dark font-bold text-subtitle tracking-button mb-4">
        Shipping Info
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <InputText
          label="Address"
          placeholder="1137 Williams Avenua"
          className="col-span-2"
        />
        <InputText label="ZIP Code" placeholder="10001" />
        <InputText label="City" placeholder="Jakarta" />
        <InputText label="Country" placeholder="Indonesia" />
      </div>
    </div>
  );
}

function PaymentDetails() {
  const [paymentType, setPaymentType] = useState<"e-money" | "COD">("e-money");

  return (
    <div className="mt-8">
      <h4 className="uppercase text-accent-dark font-bold text-subtitle tracking-button mb-4">
        Shipping Info
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <label className="mb-2 text-label font-bold">Payment Method</label>
        <div className="space-y-4">
          <InputRadioText
            label="e-Money"
            selected={paymentType === "e-money"}
            onSelect={() => setPaymentType("e-money")}
          />
          <InputRadioText
            label="Cash on Delivery"
            selected={paymentType === "COD"}
            onSelect={() => setPaymentType("COD")}
          />
        </div>
        {paymentType === "e-money" ? (
          <>
            <InputText label="e-Money Number" placeholder="293485834" />
            <InputText label="e-Money PIN" placeholder="492838498" />
          </>
        ) : (
          <div className="col-span-2 flex gap-8 items-center justify-center mt-2">
            <Icon type="COD" color="#D87D4A" />
            <p className="text-black/50 text-body leading-body">
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InputText({
  label,
  placeholder,
  className,
}: {
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className="mb-2 text-label font-bold">{label}</label>
      <input
        placeholder={placeholder}
        className="text-overline py-4 px-6 border-[1px] border-black/10 rounded-md"
      />
    </div>
  );
}

function InputRadioText({
  onSelect = () => {},
  selected,
  label,
}: {
  onSelect?: () => void;
  label: string;
  selected?: boolean;
}) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected((current) => !current);
    onSelect();
  };

  useEffect(() => {
    if (selected === undefined) return;
    setIsSelected(selected);
  }, [selected]);

  return (
    <div
      className={`text-overline py-4 px-6 border-[1px]  rounded-md flex gap-4 cursor-pointer ${
        isSelected ? "border-accent-dark" : "border-black/10"
      }`}
      onClick={handleSelect}
    >
      <div className="border-[1px] border-black/20 w-[1.25rem] h-[1.25rem] rounded-full p-[.3rem]">
        {isSelected && (
          <div className="bg-accent-dark w-full h-full rounded-full "></div>
        )}
      </div>
      {label}
    </div>
  );
}
