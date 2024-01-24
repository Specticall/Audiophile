import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { wait } from "../utils/fetchServices";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
}
export function LinkButton({ children, to, className }: LinkButtonProps) {
  const navigate = useNavigate();
  const handleScrollToTop = () => {
    setTimeout(() => window.scrollTo(0, 0), 1000);
  };
  return to === "previous" ? (
    <button
      onClick={async (e) => {
        e.preventDefault();

        // Wait for animation
        navigate(-1);
        await wait(1000);
        handleScrollToTop();
      }}
      className={className}
    >
      {children}
    </button>
  ) : (
    <Link to={to} onClick={handleScrollToTop} className={className}>
      {children}
    </Link>
  );
}
