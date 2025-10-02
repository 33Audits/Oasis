import Image from "next/image";

export default function Sponsors() {
  const brands = [
    {
      name: "Gaia",
      src: "/images/brands/gaia-logo.svg",
      width: 80,
      height: 40,
    },
    {
      name: "Linear",
      src: "/images/brands/Linear.svg",
      width: 120,
      height: 60,
    },
    {
      name: "Ember AI",
      src: "/images/brands/ember-ai.svg",
      width: 120,
      height: 60,
    },
  ];

  return (
    <section className="pt-0 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-xl font-light text-white/70 mb-1">
            Powered by
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-center"
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className="object-contain filter brightness-90"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
