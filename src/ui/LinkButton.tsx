import { ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
}
export function LinkButton({ children, to }: LinkButtonProps) {
  useEffect(() => {
    // const scrollPageToTop = setTimeout(() => {
    //   window.scrollTo(0, 0);
    // }, 1000);
    // return () => clearTimeout(scrollPageToTop);
  }, []);

  const handleScrollToTop = () => {
    setTimeout(() => window.scrollTo(0, 0), 1000);
  };
  return (
    <Link to={to} onClick={handleScrollToTop}>
      {children}
    </Link>
  );
}
