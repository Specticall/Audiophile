import { Button } from "../ui/Button";
import { LinkButton } from "../ui/LinkButton";
import { useEffect } from "react";
import { setRouteStateTo } from "../slice/appSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";

export default function PageNotFound() {
  const error = "The page you requested does not exist";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRouteStateTo("invalid"));
    return () => {
      dispatch(setRouteStateTo("valid"));
    };
  }, [dispatch]);
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="text-h1 leading-title font-bold mb-8 max-w-[30rem]">
          Oops! Something Wrong Happened
        </h1>
        <p className="text-h6 text-black/75 mb-8">{error}</p>
        <Button type="primary">
          <LinkButton to="/home">Back</LinkButton>
        </Button>
      </div>
    </div>
  );
}
