import { LinkButton } from "./LinkButton";

interface Props {
  className?: string;
}

export function NavLinks({ className }: Props) {
  return (
    <div
      className={`flex gap-8 text-white text-subtitle uppercase tracking-subtitle ${className}`}
    >
      <LinkButton to={"/home"}>
        <p className="hover:text-accent-light">Home</p>
      </LinkButton>
      <LinkButton to={"/headphones"}>
        <p className="hover:text-accent-light">Headphones</p>
      </LinkButton>
      <LinkButton to={"/speakers"}>
        <p className="hover:text-accent-light">Speakers</p>
      </LinkButton>
      <LinkButton to={"/earphones"}>
        <p className="hover:text-accent-light">Earphones</p>
      </LinkButton>
    </div>
  );
}
