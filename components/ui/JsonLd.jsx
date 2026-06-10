/**
 * JsonLd — renders a Schema.org block as a <script type="application/ld+json">.
 *
 * A plain (server) component so the structured data is emitted in the initial
 * HTML for crawlers. Pass a single object or an array of objects; arrays are
 * rendered as separate script tags. Build the data with the helpers in
 * lib/structured-data.js.
 *
 *   <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, …])} />
 */
export default function JsonLd({ data }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
