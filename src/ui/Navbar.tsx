import Logo from "./Logo";
import Icon from "./Icon";
import { NavLinks } from "./NavLinks";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { openModal } from "../slice/modalSlice";
import { LinkButton } from "./LinkButton";
import { useAppSelector } from "../hooks/useAppSelector";
import { getTotalItemQuantityInCart } from "../slice/cartSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useViewportWidth } from "../hooks/useViewportWidth";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const cartItemQuantity = useAppSelector(getTotalItemQuantityInCart) || 0;

  // For mobile navbar.
  const handleOpenNavMobile = () => {
    dispatch(openModal("NavbarMobile"));
  };
  const handleOpenCart = () => {
    dispatch(openModal("Cart"));
  };

  return (
    <nav className="fixed left-0 right-0 top-0 grid place-items-center z-50 bg-black">
      <ul className="flex justify-between items-center w-full max-w-[70rem] px-8 border-b border-white/20 h-[6rem]">
        <div className="flex gap-8 items-center">
          <div className="md:hidden">
            <Icon type="hamburger" isHoverable onClick={handleOpenNavMobile} />
          </div>
          <LinkButton to="/home">
            <Logo />
          </LinkButton>
        </div>
        <div className="max-md:hidden">
          <NavLinks />
        </div>
        <div className="relative">
          <Icon type="cart" isHoverable onClick={handleOpenCart} />
          {cartItemQuantity > 0 && (
            <div className="text-white bg-accent-dark absolute min-w-[1rem] h-[1rem] top-[.9rem] right-[-.5rem] grid place-items-center leading-none rounded-full text-x-sm border border-2 border-black px-1">
              {cartItemQuantity}
            </div>
          )}
          <AnimatePresence>
            <ItemNotificationPopup
              key={`${cartItemQuantity}-key-popup-notification`}
            />
          </AnimatePresence>
        </div>
      </ul>
    </nav>
  );
}

const POPUP_BREAKPOINT_VWIDTH_PX = 1165;

function ItemNotificationPopup() {
  const { width: vwidth } = useViewportWidth();
  const message = useAppSelector((state) => state.cart.popupMessage);
  const X_POS = vwidth > POPUP_BREAKPOINT_VWIDTH_PX ? "-50%" : "-75%";
  return (
    <motion.div
      className={`absolute top-[2rem] left-[50%] bg-accent-dark whitespace-nowrap px-4 py-1 rounded-md text-subtitle text-white opacity-0`}
      initial={{
        y: -10,
        x: X_POS,
        opacity: 0,
      }}
      animate={{ y: [0, 15, 15, 15], x: X_POS, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1, times: [0, 0.1, 0.8, 1] }}
    >
      {message}
    </motion.div>
  );
}
