import { motion } from "framer-motion";
import LoaderCircle from "../ui/LoaderCircle";
import { ReactNode } from "react";

type TPageLoader = {
  children?: ReactNode;
  forRoute?: string;
  disableInitialAnimation?: boolean;
  duration?: number;
};

export function PageLoader({
  children,
  forRoute = "Home",
  disableInitialAnimation = false,
  duration = 1,
}: TPageLoader) {
  const IS_INITIAL_PAGE_LOADER = children;

  return (
    <div className="fixed z-[1000] inset-0">
      <motion.div
        initial={{
          height: disableInitialAnimation ? "100vh" : "0vh",
        }}
        animate={{
          height: "100vh",
        }}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center w-full h-full bg-black overflow-hidden"
        exit={{
          height: "0vh",
        }}
      >
        <div
          className={`text-center grid place-items-center gap-2 ${
            IS_INITIAL_PAGE_LOADER ? "z-[10000]" : ""
          } `}
        >
          {IS_INITIAL_PAGE_LOADER ? (
            children
          ) : (
            <p className="text-h3 uppercase font-bold tracking-subtitle text-white">
              {forRoute}
            </p>
          )}
          <LoaderCircle />
        </div>
      </motion.div>
    </div>
  );
}

/*
      <motion.div
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
        }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center w-full h-full bg-accent-light scale-[200%] overflow-hidden"
        style={{ originY: 1 }}
        exit={{
          scaleY: 0,
        }}
      >
        <p className="">Headphones</p>
      </motion.div>
*/
