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
