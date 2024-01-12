import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLayout from "./page/AppLayout";
import Home from "./page/Home";
import Earphones from "./page/Earphones";
import Speakers from "./page/Speakers";
import Headphones from "./page/Headphones";

const HomeRoute: RouteObject = {
  element: <Home />,
  path: "/home",
};

const EarphonesRoute: RouteObject = {
  element: <Earphones />,
  path: "/earphones",
};

const SpeakersRoute: RouteObject = {
  element: <Speakers />,
  path: "/speakers",
};

const HeadphonesRoute: RouteObject = {
  element: <Headphones />,
  path: "/headphones",
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    children: [HomeRoute, SpeakersRoute, EarphonesRoute, HeadphonesRoute],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
