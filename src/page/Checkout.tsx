import { useState } from "react";
import Icon from "../ui/Icon";
import { Button } from "../ui/Button";
import {
  calculatePrices,
  formatCurrency,
  getResponsiveImageFrom,
} from "../helper/helper";
import { useAppSelector } from "../hooks/useAppSelector";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { TCartItem } from "../slice/cartSlice";
import { LinkButton } from "../ui/LinkButton";
import { REGEX_EMAIL, REGEX_PHONE } from "../helper/config";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from "react-hook-form";
import { InputRadioText } from "../ui/formInputs/InputRadioText";
import { InputText } from "../ui/formInputs/InputText";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { openModal } from "../slice/modalSlice";

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

type TFormProps = {
  register: TRegister;
  error: TFieldError;
};

type TPaymentMethods = "e-money" | "COD";

type TFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  zipcode: string;
  city: string;
  country: string;
  paymentMethod: TPaymentMethods;
  eMoneyPin: string;
  eMoneyNumber: string;
};

type TRegister = UseFormRegister<TFormInputs>;
type TFieldError = FieldErrors<TFormInputs>;
type TControl = Control<TFormInputs>;
type TSetValue = UseFormSetValue<TFormInputs>;

export default function Checkout() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TFormInputs>({
    defaultValues: {
      paymentMethod: "e-money",
    },
  });
  const onSubmit: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
    dispatch(openModal("CheckoutComplete"));
  };

  const cartItems = useAppSelector((state) => state.cart.cart);
  return cartItems.length === 0 ? (
    <CheckoutEmpty />
  ) : (
    <div className="bg-gray h-full pt-[6rem] max-x-lg:pt-[3rem]">
      <form
        className="max-w-[70rem] mx-auto grid grid-cols-[1fr_22rem] px-8 my-[8.5rem] gap-8 max-x-lg:grid-cols-1 max-md:px-6 max-sm:px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LinkButton to="previous" className="text-start col-span-2">
          <p className="font-bold text-black/50 text-body hover:text-accent-dark">
            Go Back
          </p>
        </LinkButton>
        <div className="bg-white px-12 py-14 rounded-lg max-md:px-8 max-sm:px-6">
          <h3 className="text-h3 font-bold uppercase">Checkout</h3>
          <div className="space-y-[3rem]">
            <BillingDetails register={register} error={errors} />
            <ShippingInfo register={register} error={errors} />
            <PaymentDetails
              register={register}
              error={errors}
              control={control}
              setValue={setValue}
            />
          </div>
        </div>
        <CheckoutCart cartItems={cartItems} />
      </form>
    </div>
  );
}

function CheckoutEmpty() {
  return (
    <div className=" mt-24  max-w-[70rem] w-full mx-auto text-center grid place-items-center min-h-[calc(100vh-15rem)]">
      <div>
        <h3 className="text-h2 font-bold text-black uppercase tracking-small">
          Your Cart is Empty
        </h3>
        <p className="text-black/50 mb-8">Start adding items to your cart!</p>
        <LinkButton to="/home">
          <Button type="primary">Back</Button>
        </LinkButton>
      </div>
    </div>
  );
}

function CheckoutCart({ cartItems }: { cartItems: TCartItem[] }) {
  const { totalPrice, shippingPrice, VATPrice, grandTotalPrice } =
    calculatePrices(cartItems);

  return (
    <div className="bg-white px-8 py-10 rounded-lg h-fit max-h-full">
      <h3 className="text-h6 font-bold mb-8 uppercase tracking-small">
        Summary
      </h3>
      <ul className="grid gap-6 ">
        {cartItems.map((item) => {
          return <CheckoutCartItem item={item} />;
        })}
      </ul>
      <div className="mt-8 space-y-1">
        <div className="flex justify-between items-center">
          <p className="text-black/50 text-body">TOTAL</p>
          <p className="text-black text-h6 font-bold tracking-very-small">
            ${formatCurrency(totalPrice)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-black/50 text-body">SHIPPING</p>
          <p className="text-black text-h6 font-bold tracking-very-small">
            ${formatCurrency(shippingPrice)}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-black/50 text-body">VAT (INCLUDED)</p>
          <p className="text-black text-h6 font-bold tracking-very-small">
            ${formatCurrency(VATPrice)}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="text-black/50 text-body">GRAND TOTAL</p>
        <p className="text-accent-dark text-h6 font-bold tracking-very-small">
          ${formatCurrency(grandTotalPrice)}
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

function BillingDetails({ register, error }: TFormProps) {
  return (
    <div className="mt-8">
      <h4 className="uppercase text-accent-dark font-bold text-subtitle tracking-button mb-4">
        Billing Details
      </h4>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <InputText
          label="Name"
          placeholder="Alexei Ward"
          register={register("name", { required: "Cannot be empty" })}
          errorMessage={error.name?.message}
        />
        <InputText
          label="Email Address"
          placeholder="alexei@gmail.com"
          register={register("email", {
            required: "Cannot be empty",
            pattern: {
              value: REGEX_EMAIL,
              message: "Invalid Email",
            },
          })}
          errorMessage={error.email?.message}
        />
        <InputText
          label="Phone Number"
          placeholder="+62 202-555-0136"
          register={register("phone", {
            required: "Cannot be empty",
            pattern: {
              value: REGEX_PHONE,
              message: "Invalid Phone Number",
            },
          })}
          errorMessage={error.phone?.message}
        />
      </div>
    </div>
  );
}

function ShippingInfo({ register, error }: TFormProps) {
  return (
    <div className="mt-8">
      <h4 className="uppercase text-accent-dark font-bold text-subtitle tracking-button mb-4">
        Shipping Info
      </h4>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <InputText
          label="Address"
          placeholder="1137 Williams Avenua"
          className="sm:col-span-2"
          register={register("zipcode", { required: "Cannot be empty" })}
          errorMessage={error.address?.message}
        />
        <InputText
          label="ZIP Code"
          placeholder="10001"
          register={register("address", { required: "Cannot be empty" })}
          errorMessage={error.zipcode?.message}
        />
        <InputText
          label="City"
          placeholder="Jakarta"
          register={register("city", { required: "Cannot be empty" })}
          errorMessage={error.city?.message}
        />
        <InputText
          label="Country"
          placeholder="Indonesia"
          register={register("country", { required: "Cannot be empty" })}
          errorMessage={error.country?.message}
        />
      </div>
    </div>
  );
}

function PaymentDetails({
  register,
  error,
  control,
  setValue,
}: TFormProps & { control: TControl; setValue: TSetValue }) {
  const [paymentType, setPaymentType] = useState<"e-money" | "COD">("e-money");

  return (
    <div className="mt-8">
      <h4 className="uppercase text-accent-dark font-bold text-subtitle tracking-button mb-4">
        Shipping Info
      </h4>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className="mb-2 text-label font-bold">Payment Method</label>
        <div className="space-y-4 max-sm:mb-4">
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field: { onChange } }) => {
              return (
                <>
                  <InputRadioText
                    label="e-Money"
                    selected={paymentType === "e-money"}
                    onSelect={() => {
                      setPaymentType("e-money");
                      onChange("e-money");
                    }}
                  />
                  <InputRadioText
                    label="Cash on Delivery"
                    selected={paymentType === "COD"}
                    onSelect={() => {
                      setPaymentType("COD");
                      onChange("COD");
                      setValue("eMoneyNumber", "");
                      setValue("eMoneyPin", "");
                    }}
                  />
                </>
              );
            }}
          />
        </div>
        {paymentType === "e-money" ? (
          <>
            <InputText
              label="e-Money Number"
              placeholder="293485834"
              register={register("eMoneyNumber", {
                required: "Cannot be empty",
              })}
              errorMessage={error.eMoneyNumber?.message}
            />
            <InputText
              label="e-Money PIN"
              placeholder="492838498"
              register={register("eMoneyPin", {
                required: "Cannot be empty",
              })}
              errorMessage={error.eMoneyPin?.message}
            />
          </>
        ) : (
          <div className="sm:col-span-2 flex gap-8 items-center justify-center mt-2">
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
