import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LinkButtonProps {
  to: string;
  children: ReactNode;
}
export function LinkButton({ children, to }: LinkButtonProps) {
  return <Link to={to}>{children}</Link>;
}
