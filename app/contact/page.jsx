import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import { MailIcon, PinIcon } from "@/components/ui/icons";
import { SOCIAL_LINKS } from "@/components/ui/social";
import { COLOR, FONT } from "@/components/home/tokens";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Request a Quote",
  ogTitle: "Contact K1 Visual Solutions — Request a Quote",
  description:
    "Tell us about your space and the effect you're after. K1 Visual Solutions will come back with the right product, a spec, and an indicative price. Based in Elmhurst, IL.",
  path: "/contact",
  image: "/assets/images/applications/app-storefront.jpg",
  imageAlt: "Storefront window with a transparent LED display",
});

const INFO = [
  { Icon: PinIcon, label: "Office", value: "525 W Wrightwood Avenue, Elmhurst, IL" },
  { Icon: MailIcon, label: "Email", value: "Andrewxu@vertexdistributor.com", href: "mailto:Andrewxu@vertexdistributor.com" },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="page-enter min-h-screen" style={{ background: "#FAF8F5" }}>
      <PageBanner
        eyebrow="Contact"
        title="Request an LED display quote"
        description="Tell us about the space and the effect you're after. We'll come back with the right product, a clear spec, and an indicative price — start a commercial LED inquiry below."
        image="/assets/images/applications/app-storefront.jpg"
        imageAlt="Storefront window with a transparent LED display"
        breadcrumb={
          <>
            <a href="/" className="hover:opacity-70">Home</a>
            <span aria-hidden>/</span>
            <span>Contact</span>
          </>
        }
      />

      <section
        aria-label="Contact form and details"
        className="py-16 md:py-24"
        style={{ background: COLOR.bg }}
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <h2
              className="text-2xl leading-snug sm:text-3xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Send us the details
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: COLOR.body }}>
              The more you can share about dimensions, environment, and content,
              the sharper our first response will be.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>

          {/* Info + map */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <h2
              className="text-2xl leading-snug sm:text-3xl"
              style={{ fontFamily: FONT.serif, color: COLOR.ink }}
            >
              Get in touch
            </h2>

            <ul className="mt-8 space-y-6">
              {INFO.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl p-2.5"
                    style={{ background: COLOR.gray, color: COLOR.accent }}
                  >
                    <Icon />
                  </span>
                  <div>
                    <span
                      className="block text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: COLOR.muted }}
                    >
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="text-[15px] font-medium transition-opacity hover:opacity-70"
                        style={{ color: COLOR.ink }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-[15px] font-medium" style={{ color: COLOR.ink }}>
                        {value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Social — only when real handles are configured */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-8">
                <span
                  className="block text-[11px] uppercase tracking-[0.16em]"
                  style={{ color: COLOR.muted }}
                >
                  Follow
                </span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border p-2.5 transition-colors"
                      style={{ borderColor: COLOR.gray, color: COLOR.muted }}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            )}


          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
