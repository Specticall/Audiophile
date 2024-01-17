import {
  Navigate,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./page/AppLayout";
import Home from "./page/Home";
import Earphones from "./page/Earphones";
import Speakers from "./page/Speakers";
import Headphones from "./page/Headphones";
import PageNotFound from "./page/PageNotFound";
import { useEffect, useState } from "react";
import { useAppSelector } from "./hooks/useAppSelector";
import { AnimatePresence } from "framer-motion";
import { INITIAL_APP_RENDER_DELAY_TIME_SECONDS } from "./helper/config";
import { genericProductLoader } from "./utils/loaderFunction";
import InitialPageLoader from "./page/InitialPageLoader";
import { useDispatch } from "react-redux";
import { initialLoaderIsCompleted } from "./slice/appSlice";
import Product from "./page/Product";
import Checkout from "./page/Checkout";

const HomeRoute: RouteObject = {
  element: <Home />,
  path: "/home",
  loader: genericProductLoader("none"),
};

const EarphonesRoute: RouteObject = {
  element: <Earphones />,
  path: "/earphones",
  loader: genericProductLoader("earphone"),
};

const SpeakersRoute: RouteObject = {
  element: <Speakers />,
  path: "/speakers",
  loader: genericProductLoader("speaker"),
};

const HeadphonesRoute: RouteObject = {
  element: <Headphones />,
  path: "/headphones",
  loader: genericProductLoader("headphone"),
};

const ProductRoute: RouteObject = {
  element: <Product />,
  path: "/product/:paramsProductName",
  loader: genericProductLoader("all"),
};

const CheckoutRoute: RouteObject = {
  element: <Checkout />,
  path: "/checkout",
  loader: genericProductLoader("all"),
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      HomeRoute,
      SpeakersRoute,
      EarphonesRoute,
      HeadphonesRoute,
      ProductRoute,
      CheckoutRoute,
    ],
  },
]);

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const dispatch = useDispatch();
  const initialRenderCompleted = useAppSelector(
    (state) => state.app.initialRenderCompleted
  );

  useEffect(() => {
    const delayPageRender = setTimeout(() => {
      setAppIsReady(true);
      dispatch(initialLoaderIsCompleted());
    }, INITIAL_APP_RENDER_DELAY_TIME_SECONDS);
    return () => clearTimeout(delayPageRender);
  }, [initialRenderCompleted, dispatch]);

  return (
    <div className="h-screen ">
      <AnimatePresence mode="wait" key={"initial-pageload"}>
        {(!appIsReady || !initialRenderCompleted) && <InitialPageLoader />}
      </AnimatePresence>
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
