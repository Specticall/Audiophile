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
      return images["mobile"] || images["desktop"];
    case "largeTablet":
      return images["largeTablet"] || images["tablet"] || images["desktop"];
    case "tablet":
      return images["tablet"] || images["desktop"];
    default:
      return images["desktop"];
  }
}
