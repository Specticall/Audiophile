import Icon from "./Icon";
import Logo from "./Logo";
import { NavLinks } from "./NavLinks";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="px-8 pt-[4.5rem] pb-[3rem] w-full max-w-[70rem] mx-auto">
        <div className="flex justify-between max-lg:flex-col max-lg:gap-y-8 max-x-sm:items-center">
          <Logo />
          <NavLinks className="max-x-sm:flex-col text-center" />
        </div>
        <div className="mt-[2.25rem] grid grid-cols-[1fr_1fr]">
          <p className="text-white/50 max-w-[33.5rem] leading-body text-body max-lg:col-span-3 max-x-sm:text-center">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>
          <div className="flex gap-4 place-content-end place-items-end max-lg:order-3 max-x-sm:col-span-3 max-x-sm:place-content-center">
            <Icon type="facebook" isHoverable />
            <Icon type="twitter" isHoverable />
            <Icon type="instagram" isHoverable />
          </div>
          <p className="text-white/50 mt-[3.5rem] text-body font-bold max-x-sm:col-span-3 max-x-sm:text-center max-x-sm:my-[3rem]">
            Copyright 2021. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
