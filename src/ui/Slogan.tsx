import sloganImage from "/shared/desktop/image-best-gear.jpg";

export function Slogan() {
  return (
    <article className="grid grid-cols-2 gap-8 place-items-center mb-[12.5rem] max-md:grid-cols-1">
      <div className="max-w-[30rem] max-md:order-2 max-md:text-center">
        <h2 className="text-h2 uppercase font-bold leading-subtitle max-w-[23rem] mb-8 max-md:max-w-full">
          Bringing you the <span className="text-accent-dark">best</span> audio
          gear
        </h2>
        <p className="text-black/50 max-x-sm:px-6">
          Located at the heart of New York City, Audiophile is the premier store
          for high end headphones, earphones, speakers, and audio accessories.
          We have a large showroom and luxury demonstration rooms available for
          you to browse and experience a wide range of our products. Stop by our
          store to meet some of the fantastic people who make Audiophile the
          best place to buy your portable audio equipment.
        </p>
      </div>
      <img
        src={sloganImage}
        alt="Person listening on headphones image rounded-md"
        className="rounded-md"
      />
    </article>
  );
}
