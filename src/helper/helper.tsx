import { TCartItem } from "../slice/cartSlice";
import { SHIPPING_RATE, VAT_RATE } from "./config";

export function getResponsiveImageFrom(
  type: string,
  images: {
    desktop: string;
    largeTablet?: string;
    tablet?: string;
    mobile?: string;
  }
) {
  switch (type) {
    case "mobile":
      return images["mobile"] || images["tablet"] || images["desktop"];
    case "largeTablet":
      return images["largeTablet"] || images["tablet"] || images["desktop"];
    case "tablet":
      return images["tablet"] || images["desktop"];
    default:
      return images["desktop"];
  }
}
1;
export function extractRouteNameFrom(pathname: string) {
  if (pathname.includes("/product/"))
    return pathname.replace("/product/", "").replace("-", " ");
  return pathname.replace("/", "");
}

export function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 1,
    useGrouping: true,
  });

  return formatter.format(price);
}

export function calculatePrices(cartItems: TCartItem[]) {
  const totalPrice = cartItems.reduce((total, item) => {
    return (total += item.price);
  }, 0);
  const shippingPrice = totalPrice * SHIPPING_RATE;
  const VATPrice = totalPrice * VAT_RATE;
  const grandTotalPrice = totalPrice + shippingPrice + VATPrice;

  return { totalPrice, shippingPrice, VATPrice, grandTotalPrice };
}
