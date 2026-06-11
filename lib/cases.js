/**
 * Case studies — real K1 installations. Shared so the home preview and any
 * future case index draw from one source. Image src values are site-root relative.
 *
 * `video` is optional: cards play it on hover (muted, looped) with the first
 * image as the poster. Clips live in /assets/videos as web-encoded H.264 MP4s.
 * Where a hand-picked frame was exported from the clip (case-*-poster.jpg) it
 * leads the images array, so the cover matches the footage exactly; the
 * original photos follow as the thumbnail strip.
 */

const IMG = "/assets/images/cases";
const VID = "/assets/videos";

export const CASES = [
  {
    images: [
      { src: `${IMG}/changchun-01.jpg`, alt: "Changchun Tech Park transparent LED media facade at dusk" },
      { src: `${IMG}/changchun-02.jpg`, alt: "Interior atrium of Changchun Tech Park with transparent LED screens" },
      { src: `${IMG}/changchun-03.jpg`, alt: "Changchun Tech Park transparent LED facade detail" },
    ],
    location: "Changchun · China",
    title: "Changchun Tech Park",
    product: "Holographic Invisible Screen · Crystal Screen",
    description:
      "A transparent media facade wrapping the campus atrium — daylight passes through by day, motion graphics read clearly after dark, and the concourse glazing carries live content without ever blocking the view.",
    video: `${VID}/case-changchun.mp4`,
  },
  {
    images: [
      { src: `${IMG}/mashan-01.jpg`, alt: "Mashan Resort curved flexible LED film installation" },
      { src: `${IMG}/mashan-02.jpg`, alt: "Mashan Resort flexible LED film, second view" },
    ],
    location: "Mashan · China",
    title: "Mashan Resort",
    product: "Holographic Invisible Screen",
    description:
      "Curved flexible film follows the resort's organic architecture, turning a sculpted wall into a calm, ambient light surface that bends where a rigid panel never could.",
  },
  {
    images: [
      { src: `${IMG}/case-baiyun-airport-poster.jpg`, alt: "Dream Blue store at Guangzhou Baiyun Airport wrapped in deep-blue holographic LED content" },
      { src: `${IMG}/case-guangzhou-baiyun-airport-01.jpg`, alt: "Holographic LED mesh across the Dream Blue storefront glazing" },
      { src: `${IMG}/case-guangzhou-baiyun-airport-02.jpg`, alt: "Full-height holographic LED columns around the Dream Blue bottle display" },
      { src: `${IMG}/case-guangzhou-baiyun-airport-03.jpg`, alt: "Dream Blue airport store holographic display, second full-height view" },
    ],
    location: "Guangzhou · China",
    title: "Baiyun Airport — Dream Blue",
    product: "Holographic Invisible Screen · P6.25",
    description:
      "Holographic panels wrap the Dream Blue store at Guangzhou Baiyun Airport in deep-blue brand content that reads far down the concourse — while the bottle displays stay clearly visible straight through the mesh.",
    video: `${VID}/case-baiyun-airport.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-estee-lauder-poster.jpg`, alt: "Estée Lauder counter in Shanghai with holographic LED panels flanking the gilded entrance" },
      { src: `${IMG}/case-shanghai-estee-lauder-01.jpg`, alt: "Transparent LED panels at the Estée Lauder counter entrance" },
      { src: `${IMG}/case-shanghai-estee-lauder-02.jpg`, alt: "Estée Lauder storefront with holographic LED displays, second view" },
    ],
    location: "Shanghai · China",
    title: "Estée Lauder Counter",
    product: "Holographic Invisible Screen · P6.25",
    description:
      "Holographic panels flank the gilded entrance of an Estée Lauder counter in Shanghai — brand films play at eye level as shoppers pass, while the counter and the consultation space behind stay in full view.",
    video: `${VID}/case-estee-lauder.mp4`,
  },
  {
    images: [
      { src: `${IMG}/macau-casino-01.jpg`, alt: "Macau Star World Casino P6.0 transparent LED display" },
      { src: `${IMG}/macau-casino-02.jpg`, alt: "Macau Star World Casino LED display, second view" },
    ],
    location: "Macau · China",
    title: "Star World Casino",
    product: "Holographic Invisible Screen · P6.0 Crystal Screen",
    description:
      "A P6.0 transparent installation at Macau's Star World — high-brightness content that holds its own against a dense, lit interior while keeping sightlines open across the floor.",
    video: `${VID}/case-macau.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-cambodia-casino-poster.jpg`, alt: "Curved holographic LED wall on the gaming floor of the Las Vegas Sun casino in Cambodia" },
      { src: `${IMG}/case-cambodia-lasvegas-sun-01.jpg`, alt: "Curved holographic LED wall across the casino gaming floor" },
      { src: `${IMG}/case-cambodia-lasvegas-sun-02.jpg`, alt: "Las Vegas Sun casino curved LED wall, second panorama view" },
    ],
    location: "Phnom Penh · Cambodia",
    title: "Las Vegas Sun Casino",
    product: "Holographic Invisible Screen",
    description:
      "A sweeping curved holographic LED wall anchors the gaming floor of the Las Vegas Sun — resort and entertainment content carries across the room at a brightness that holds up against a fully lit casino interior.",
    video: `${VID}/case-cambodia-casino.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-nanning-poster.jpg`, alt: "Koi and water content flowing across curved corner glazing at Zhongguangshi's Nanning offices at night" },
      { src: `${IMG}/case-nanning-zhongguangshi-02.jpg`, alt: "Water imagery across the curved corner glazing at dusk" },
      { src: `${IMG}/case-nanning-zhongguangshi-01.jpg`, alt: "Zhongguangshi Nanning building by day with the front-mounted holographic screen on the facade" },
    ],
    location: "Nanning · China",
    title: "Zhongguangshi Media",
    product: "Holographic Invisible Screen · P6.25",
    description:
      "A front-mounted holographic screen follows the curved corner glazing of Zhongguangshi's Nanning offices — koi and water imagery swim across the facade at dusk, added to the existing glass without rebuilding it.",
    video: `${VID}/case-nanning.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-xian-saga-mall-p625.jpg`, alt: "Helly Hansen store at Xi'an SAGA Mall with a transparent LED window display showing a landscape" },
    ],
    location: "Xi'an · China",
    title: "SAGA Mall — Helly Hansen",
    product: "Crystal Film LED Screen · P6.25",
    description:
      "A storefront-wide transparent screen wraps the Helly Hansen window at Xi'an's SAGA Mall, running full-motion landscape content while shoppers still read straight through to the merchandise and the store beyond.",
  },
  {
    images: [
      { src: `${IMG}/case-xinpai-poster.jpg`, alt: "Holographic content floating on the transparent mesh screen at the Xinpai showroom in Xi'an" },
      { src: `${IMG}/case-xian-xinpai-01.jpg`, alt: "Life-size holographic presenter on a transparent LED screen at the Xinpai showroom entrance in Xi'an" },
    ],
    location: "Xi'an · China",
    title: "Xinpai Showroom",
    product: "Holographic Invisible Screen · P6.25",
    description:
      "A floor-height holographic screen fronts the Xinpai showroom — a life-size presenter floats on the transparent mesh to greet visitors, while the showroom behind reads straight through the glass.",
    video: `${VID}/case-xinpai.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-hefei-bank-poster.jpg`, alt: "Postal Savings Bank branch at Hefei Wanda with crystal-screen LED displays behind the glazing" },
      { src: `${IMG}/case-hefei-postal-bank-04.jpg`, alt: "Bank branch glazing carrying blue crystal-screen LED brand content" },
      { src: `${IMG}/case-hefei-postal-bank-02.jpg`, alt: "Blue animated content on a crystal-screen LED display inside the bank entrance" },
      { src: `${IMG}/case-hefei-postal-bank-03.jpg`, alt: "Crystal-screen LED display at the Hefei Wanda bank branch, third view" },
    ],
    location: "Hefei · China",
    title: "Postal Savings Bank",
    product: "Holographic Invisible Screen · Crystal Screen",
    description:
      "Crystal-screen LED panels sit just behind the glazing of a Postal Savings Bank branch at Hefei Wanda — saturated blue brand animation visible from the street, with the banking hall kept bright and open behind it.",
    video: `${VID}/case-hefei-bank.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-uzbekistan-mall-p8.jpg`, alt: "Transparent LED storefront in Uzbekistan with a floating sneaker hologram and blue smoke" },
    ],
    location: "Uzbekistan",
    title: "Flagship Storefront",
    product: "Crystal Film LED Screen · P8",
    description:
      "A transparent LED storefront in Uzbekistan floats a product hero in mid-air — a sneaker suspended in blue smoke across the glass — pulling the concourse in while the shop behind stays fully visible.",
  },
  /* Beijing Daxing was removed: both its photo and its clip (case-airport.mp4)
     show an Envato watermark on the screen content. The airport story is
     carried by the Baiyun Airport — Dream Blue case above. */
  {
    images: [
      { src: `${IMG}/case-immersive-tunnel-poster.jpg`, alt: "LED-lined corridor playing a colourful bubble animation across walls and ceiling" },
      { src: `${IMG}/case-immersive-tunnel-02.jpg`, alt: "Blue bubble animation across the LED tunnel walls and ceiling" },
      { src: `${IMG}/case-immersive-tunnel-01.jpg`, alt: "Immersive LED tunnel with colourful bubble content on both walls" },
      { src: `${IMG}/case-immersive-tunnel-03.jpg`, alt: "Warm pink and orange bubble animation inside the LED tunnel" },
    ],
    location: "Exhibition Space",
    title: "Immersive LED Tunnel",
    product: "Holographic Invisible Screen",
    description:
      "An LED-lined corridor turns a simple walkway into an immersive environment — bubble animations drift across both walls and overhead, wrapping visitors in colour from entry to exit.",
    video: `${VID}/case-immersive-tunnel.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-coca-cola-experience-p625.jpg`, alt: "Immersive Coca-Cola experience room wrapped in red transparent LED content" },
    ],
    location: "China",
    title: "Coca-Cola Experience",
    product: "Crystal Film LED Screen · P6.25",
    description:
      "An immersive brand room wrapped corner-to-corner in transparent LED — effervescent red content surrounds the visitor while the glass keeps the space open and bright.",
    video: `${VID}/case-cocacola.mp4`,
  },
  {
    images: [
      { src: `${IMG}/case-honda-dealership-p6.jpg`, alt: "GAC Honda dealership storefront at night with transparent LED content across the glass facade" },
    ],
    location: "China",
    title: "GAC Honda Dealership",
    product: "Crystal Film LED Screen · P6",
    description:
      "A dealership facade carries a welcome message across its full glazed front after dark, drawing the street in while the lit showroom and vehicles stay visible straight through the display.",
  },
  {
    images: [
      { src: `${IMG}/case-japan-storefront-p625.jpg`, alt: "Night storefront in Japan with a transparent LED box display showing an ocean scene" },
    ],
    location: "Japan",
    title: "Waterfront Storefront",
    product: "Crystal Film LED Screen · P6.25",
    description:
      "A wrap-around transparent display brings an ocean scene to a Japanese waterfront storefront at night — luminous content on three faces of glass that still reads as a clear window by day.",
  },
];
