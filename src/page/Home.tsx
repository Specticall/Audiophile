import { Button } from "../ui/Button";
import HeroImage from "/home/desktop/image-hero.jpg";
import { ProductList } from "../ui/ProductList";
import ZX9Image from "/home/desktop/image-speaker-zx9.png";
import CirclePattern from "/home/desktop/pattern-circles.svg";
import ZX7Image from "/home/desktop/image-speaker-zx7.jpg";
import ZX7ImageTablet from "/home/tablet/image-speaker-zx7.jpg";
import ZX7ImagePhone from "/home/mobile/image-speaker-zx7.jpg";
import YX1Image from "/home/desktop/image-earphones-yx1.jpg";
import HeroImageMobile from "/home/tablet/image-header.jpg";
import { Slogan } from "../ui/Slogan";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { getResponsiveImageFrom } from "../helper/helper";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="max-w-[70rem] mx-auto px-4 x-sm:px-8">
        <ProductList />
        <BannerZX9Speaker />
        <BannerZX7Speaker />
        <BannerYX1Earphone />
        <Slogan />
      </div>
    </div>
  );
}

function Hero() {
  const { type } = useViewportWidth();
  return (
    <header className="relative h-[45rem]">
      <img
        src={getResponsiveImageFrom(type, {
          desktop: HeroImage,
          tablet: HeroImageMobile,
          mobile: HeroImageMobile,
        })}
        alt="Hero image"
        className="w-full h-full absolute inset-0 z-[-1] object-cover contrast-light"
      />
      <div className="max-w-[70rem] mx-auto px-8 pt-[12rem] max-sm:pt-[15rem]">
        <div className="max-w-[23.75rem] max-md:[&_>_*]:text-center max-md:grid max-md:place-items-center max-md:max-w-full">
          <p className="uppercase text-white/50 tracking-large mb-6 max-sm:mb-0">
            New Product
          </p>
          <h1 className="text-h1 text-white font-bold leading-title mt-6 max-sm:mt-3 max-sm:text-h2 max-sm:leading-[120%]">
            XX99 MARK II HEADPHONES
          </h1>
          <p className="mt-6 text-white/75 leading-body text-body max-w-[22rem]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Button type="primary" className="mt-12">
            See Product
          </Button>
        </div>
      </div>
    </header>
  );
}

function BannerZX9Speaker() {
  return (
    <div className="h-[35rem] w-full overflow-hidden bg-accent-dark rounded-md flex mb-12 items-center justify-center gap-[8rem] max-x-sm:gap-[6rem] relative max-x-lg:flex-col max-x-lg:h-fit max-x-lg:pb-12">
      <img
        src={ZX9Image}
        alt="ZX9 Speaker"
        className="h-[30rem] object-contain translate-y-[3.5rem] relative z-[1] max-x-lg:[height:_clamp(15rem,50vw,30rem)]"
      />
      <img
        src={CirclePattern}
        alt=""
        className="absolute left-[-8.5rem] top-[-3rem]"
      />
      <div className="max-w-[20rem] relative z-[1] grid">
        <h2 className="text-white text-h1 font-bold x-sm:leading-title max-x-sm:text-h3 max-x-sm:text-center leading-10">
          ZX9 <br /> SPEAKER
        </h2>
        <p className="text-white/75 text-body mt-6 mb-8 max-x-sm:text-center max-x-sm:max-w-[17rem]">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <Button
          type="secondary"
          className="max-x-sm:self-center max-x-sm:place-self-center"
        >
          See Product
        </Button>
      </div>
    </div>
  );
}

function BannerZX7Speaker() {
  const { type } = useViewportWidth();

  return (
    <div className="overflow-hidden h-[20rem] relative rounded-md mb-12">
      <img
        src={getResponsiveImageFrom(type, {
          desktop: ZX7Image,
          tablet: ZX7ImageTablet,
          mobile: ZX7ImagePhone,
        })}
        alt="ZX7 Image"
        className="w-full absolute h-full object-cover"
      />
      <div className="px-16 relative z-[1] flex flex-col h-full items-start justify-center max-x-sm:px-10">
        <h2 className="text-black text-h4 mb-6 font-bold tracking-subtitle">
          ZX7 SPEAKER
        </h2>
        <Button type="secondary">See Product</Button>
      </div>
    </div>
  );
}

function BannerYX1Earphone() {
  return (
    <div className="h-[20rem] mb-[10rem] grid grid-cols-2 gap-8 max-x-lg:gap-4 max-md:flex flex-col max-md:h-[30rem]">
      <img
        src={YX1Image}
        alt="YX1 Earphone"
        className="rounded-md w-full h-full object-cover"
      />
      <div className="bg-gray flex flex-col items-start justify-center px-24 rounded-md max-x-lg:px-12 h-full">
        <h2 className="text-black text-h4 mb-6 font-bold tracking-subtitle">
          YX1 EARPHONES
        </h2>
        <Button type="secondary">See Product</Button>
      </div>
    </div>
  );
}
