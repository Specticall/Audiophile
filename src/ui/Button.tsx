import { ReactNode } from "react";
import Icon from "./Icon";

const base = "uppercase px-7 py-3 text-subtitle tracking-button font-bold";

const buttonStyles = {
  primary: base + " bg-accent-dark text-white hover:bg-accent-light",
  secondary:
    base +
    " bg-transparent text-black border-solid border-black border-[1.25px] hover:text-white hover:bg-black",
  tertiary:
    base +
    " flex gap-3 items-center text-black/50 justify-center hover:text-accent-dark",
};

type ButtonProps = {
  children: ReactNode;
  type: keyof typeof buttonStyles;
  className?: string;
};

export function Button({ children, type = "primary", className }: ButtonProps) {
  return type !== "tertiary" ? (
    <button className={`${buttonStyles[type]} ${className}`}>{children}</button>
  ) : (
    <button className={`${buttonStyles[type]} ${className}`}>
      <p>{children}</p>
      <Icon type="chevron" color={"#D87D4A"} />
    </button>
  );
}
