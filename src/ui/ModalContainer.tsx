import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { useViewportWidth } from "../hooks/useViewportWidth";

interface ModalContainerProps {
  children: ReactNode;
  onClickOutside: () => void;
}

export default function ModalContainer({
  children,
  onClickOutside: handleClose = () => {},
}: ModalContainerProps) {
  const { previousType, type } = useViewportWidth();

  useEffect(() => {
    const handleExitByKeypress = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleExitByKeypress);

    () => window.removeEventListener("keydown", handleExitByKeypress);
  }, [handleClose]);

  useEffect(() => {
    if (previousType === "tablet" && type !== "mobile") handleClose();
  }, [previousType, type, handleClose]);

  return (
    <div className="fixed inset-0 z-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="w-full min-h-screen grid place-items-center relative"
      >
        <div
          className=" bg-black/40 absolute z-10 inset-0"
          onClick={handleClose}
        ></div>
        {children}
      </motion.div>
    </div>
  );
}
