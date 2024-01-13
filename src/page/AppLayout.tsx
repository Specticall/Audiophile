import { Outlet, useLocation, useNavigation } from "react-router-dom";
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
import { PageLoader } from "./PageLoader";
import { useEffect } from "react";
import { initialRenderIsCompleted } from "../slice/appSlice";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const { elementName, state } = useAppSelector(getModalData);
  const { initialLoaderCompleted } = useAppSelector((state) => state.app);
  const service = useNavigation();
  const location = useLocation();

  const handleCloseModal = () => dispatch(closeModal());

  const modalAllowedToRender = state === "open" && elementName;
  const loaderAllowedToRender =
    initialLoaderCompleted && service.state === "loading";

  // Close any modals on route change.
  useEffect(() => {
    dispatch(closeModal());
    dispatch(initialRenderIsCompleted());
  }, [location, dispatch]);

  return (
    <div className="h-full flex flex-col">
      <Navbar />
      <div className=""></div>
      <main className="flex-1">
        <AnimatePresence mode="wait" key={"page-loader"}>
          {loaderAllowedToRender && (
            <PageLoader forRoute={service.location.pathname.replace("/", "")} />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" key={"modal"}>
          {modalAllowedToRender && (
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
