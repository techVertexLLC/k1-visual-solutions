import Image from "next/image";
import FilmPlaceholder from "@/components/ui/FilmPlaceholder";
import { COLOR, FONT, BLUR } from "@/components/home/tokens";
import { CATEGORY_LABEL } from "@/lib/products";

/**
 * Shared product card — used on the catalog grid and the home featured preview.
 * Photograph (or illustrated stand-in) above; category chip, name, brief, key
 * spec, and a "View Details" link through to the product's detail page.
 *
 * Plain server component; the entrance animation is supplied by the caller's
 * Reveal wrapper, the lift is pure CSS.
 */
export default function ProductCard({ product }) {
  const href = `/k1/products/${product.slug}`;
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_36px_-14px_rgba(26,26,26,0.22)]"
      style={{ border: `1px solid ${COLOR.gray}`, background: "#fff" }}
    >
      <a href={href} className="relative block aspect-[4/3] overflow-hidden">
        {product.cardImage ? (
          <Image
            src={product.cardImage}
            alt={`${product.name} — ${CATEGORY_LABEL[product.category]} display`}
            fill
            quality={78}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <FilmPlaceholder />
        )}
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] backdrop-blur-sm"
          style={{ background: `${COLOR.bg}e6`, color: COLOR.accent }}
        >
          {CATEGORY_LABEL[product.category]}
        </span>
      </a>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3
          className="text-xl leading-snug"
          style={{ fontFamily: FONT.serif, color: COLOR.ink }}
        >
          <a href={href} className="transition-opacity hover:opacity-70">
            {product.name}
          </a>
        </h3>
        <p
          className="mt-3 flex-1 text-sm leading-relaxed"
          style={{ color: COLOR.body }}
        >
          {product.shortDescription}
        </p>

        <div
          className="mt-5 flex items-center justify-between border-t pt-4"
          style={{ borderColor: COLOR.gray }}
        >
          <div>
            <span
              className="block text-[10px] uppercase tracking-[0.16em]"
              style={{ color: COLOR.muted }}
            >
              Pixel pitch
            </span>
            <span className="text-sm font-medium" style={{ color: COLOR.ink }}>
              {product.pixelPitch}
            </span>
          </div>
          <a
            href={href}
            className="group/btn inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: COLOR.accent }}
          >
            View Details
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
