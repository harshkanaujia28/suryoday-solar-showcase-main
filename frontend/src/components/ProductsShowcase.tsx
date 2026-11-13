import { useState, useEffect, useRef, useMemo } from "react";
import { PRODUCTS } from "@/data/content";
import { SITE } from "@/data/site";

const AUTOPLAY_INTERVAL = 4500;

function getWhatsAppUrl(productName: string) {
  const phone = String(SITE.whatsapp ?? "").replace(/\D/g, "");

  const message = `Hello Suryoday Solar, I am interested in ${productName}. Please share product details and pricing.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function ProductsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef<number | null>(null);

  const totalProducts = PRODUCTS.length;

  const activeProduct = PRODUCTS[activeIndex];

  const whatsappUrl = useMemo(
    () => activeProduct ? getWhatsAppUrl(activeProduct.name) : "#",
    [activeProduct]
  );

  const goTo = (index: number) => {
    if (!totalProducts) return;

    setActiveIndex((index + totalProducts) % totalProducts);
  };

  const next = () => goTo(activeIndex + 1);

  const previous = () => goTo(activeIndex - 1);

  // Automatically change product every 4.5 seconds
  useEffect(() => {
    if (isPaused || totalProducts <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalProducts);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, totalProducts]);

  // Handle empty product data
  if (!activeProduct) {
    return null;
  }

  return (
    <section
      id="products"
      aria-label="Solar products"
      className="scroll-mt-20 overflow-hidden bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-3 sm:mb-12">

          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--color-solar-orange)]">
            Explore Our Range
          </span>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Solar Products &amp; Solutions
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Explore our range of solar panels, inverters, batteries and
                solar lighting solutions for homes and businesses.
                Contact our team for product availability and details.
              </p>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-2 md:flex">

              <button
                type="button"
                onClick={previous}
                aria-label="Previous product"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-xl transition hover:border-[var(--color-solar-orange)] hover:text-[var(--color-solar-orange)]"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next product"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-xl transition hover:border-[var(--color-solar-orange)] hover:text-[var(--color-solar-orange)]"
              >
                ›
              </button>

            </div>
          </div>
        </div>

        {/* Product Showcase */}
        <div
          className="relative grid min-h-[540px] items-center gap-8 overflow-hidden rounded-[2rem] border border-border/70 bg-card p-5 shadow-sm sm:p-8 lg:min-h-[500px] lg:grid-cols-2 lg:gap-12 lg:p-12"

          onMouseEnter={() => setIsPaused(true)}

          onMouseLeave={() => setIsPaused(false)}

          onFocus={() => setIsPaused(true)}

          onBlur={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null
              )
            ) {
              setIsPaused(false);
            }
          }}

          onTouchStart={(event) => {
            touchStartX.current =
              event.touches[0]?.clientX ?? null;
          }}

          onTouchEnd={(event) => {
            if (touchStartX.current === null) return;

            const endX = event.changedTouches[0]?.clientX;

            if (endX === undefined) return;

            const delta = endX - touchStartX.current;

            if (Math.abs(delta) > 45) {
              delta < 0 ? next() : previous();
            }

            touchStartX.current = null;
          }}
        >

          {/* Background Glow */}
          <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--color-solar-yellow)]/15 blur-3xl" />

          {/* Product Image */}
          <div className="relative flex h-[260px] items-center justify-center sm:h-[340px] lg:h-[390px]">

            <img
              key={activeProduct.id}
              src={activeProduct.img}
              alt={activeProduct.imageAlt || activeProduct.name}
              loading="eager"
              draggable={false}
              className="h-full w-full animate-in fade-in slide-in-from-right-3 object-contain p-3 duration-700"
            />

          </div>

          {/* Product Details */}
          <div className="relative z-10 flex flex-col justify-center">

            {/* Category & Counter */}
            <div className="mb-5 flex flex-wrap items-center gap-2">

              <span className="rounded-full bg-[var(--color-solar-orange)]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-solar-orange)]">
                {activeProduct.category}
              </span>

              <span className="text-xs font-medium text-muted-foreground">
                Product {activeIndex + 1} of {totalProducts}
              </span>

            </div>

            {/* Name & Description */}
            <div
              key={activeProduct.id}
              className="animate-in fade-in slide-in-from-right-3 duration-500"
            >

              <h3 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {activeProduct.name}
              </h3>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                {activeProduct.description}
              </p>

            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${activeProduct.name} on WhatsApp`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-solar-orange)] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enquire on WhatsApp

                <span aria-hidden="true">
                  ↗
                </span>
              </a>

              <a
                href={`tel:${SITE.phoneRaw}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:border-[var(--color-solar-orange)] hover:text-[var(--color-solar-orange)]"
              >
                Call for Details
              </a>

            </div>

            {/* Slider Indicators */}
            <div className="mt-9 flex items-center justify-between gap-4">

              <div
                className="flex items-center gap-2"
                aria-label="Choose a product"
              >

                {PRODUCTS.map((product, index) => (

                  <button
                    key={product.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Show ${product.name}`}
                    aria-current={
                      index === activeIndex ? "true" : undefined
                    }
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-[var(--color-solar-orange)]"
                        : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                  />

                ))}

              </div>

              <span className="text-xs text-muted-foreground">
                Auto-rotates every 4.5 seconds
              </span>

            </div>

          </div>

          {/* Mobile Navigation */}
          <div className="absolute bottom-5 right-5 flex gap-2 md:hidden">

            <button
              type="button"
              onClick={previous}
              aria-label="Previous product"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-xl"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next product"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-xl"
            >
              ›
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductsShowcase;