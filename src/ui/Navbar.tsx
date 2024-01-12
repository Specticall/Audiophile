import Logo from "./Logo";
import Icon from "./Icon";
import { NavLinks } from "./NavLinks";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { openModal } from "../slice/modalSlice";

export default function Navbar() {
  // const { type } = useViewportWidth();
  const dispatch = useAppDispatch();

  // For mobile navbar.
  const handleOpen = () => dispatch(openModal("NavbarMobile"));

  return (
    <nav className="fixed left-0 right-0 top-0 grid place-items-center z-50 bg-black">
      <ul className="flex justify-between items-center w-full max-w-[70rem] px-8 border-b border-white/20 h-[6rem]">
        <div className="flex gap-8 items-center">
          <div className="md:hidden">
            <Icon type="hamburger" isHoverable onClick={handleOpen} />
          </div>
          <Logo />
        </div>
        <div className="max-md:hidden">
          <NavLinks />
        </div>
        <Icon type="cart" isHoverable />
      </ul>
    </nav>
  );
}
