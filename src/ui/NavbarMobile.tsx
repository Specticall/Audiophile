import { ProductList } from "./ProductList";

export function NavbarMobile() {
  return (
    <div className="bg-white absolute top-[6rem] left-0 right-0 z-40 px-8 rounded-b-md">
      <ProductList className="[&&]:mt-24 [&&]:mb-12 [&&]:sm:grid-cols-3 [&&]:sm:gap-6" />
    </div>
  );
}
