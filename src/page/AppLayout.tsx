import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import ModalContainer from "../ui/ModalContainer";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  closeModal,
  getComponentFromString,
  getModalData,
} from "../slice/modalSlice";
import { AnimatePresence } from "framer-motion";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { elementName, state } = useAppSelector(getModalData);

  const handleCloseModal = () => dispatch(closeModal());
  console.log(state);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className=""></div>
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {state === "open" && elementName && (
            <ModalContainer onClickOutside={handleCloseModal}>
              {getComponentFromString(elementName)}
            </ModalContainer>
          )}
        </AnimatePresence>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
