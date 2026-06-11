/* K1 Visual Solutions — product catalog data module.
   Ported from the retired Next.js lib/products.js (single source of truth);
   spec figures transcribed from docs/redesign-spec.txt — do not round them.
   Consumed by selector.html; exposed as window.K1_PRODUCTS / K1_PRODUCT_LIST. */
(function () {
  const IMG = 'assets/images';

  const PRODUCTS = {
    'crystal-film': {
      slug: 'crystal-film',
      name: 'Crystal Film LED Screen',
      short: 'Crystal Film',
      type: 'Project product · engineered per m²',
      tagline: 'Self-adhesive transparent LED film — 2.5 mm thin, 90%+ transparency. Stick it on glass and the window becomes a media wall.',
      detailPage: 'product-crystal-film.html',
      pixelPitch: 'P6.25 – P20',
      heroImage: IMG + '/cf-app-retail-window.jpg',
      cardImage: IMG + '/cf-app-glassbox.jpg',
      /* Three headline specs for the recommendation card. Pitch value is
         overridden per-answer by the selector's suggestedConfig(). */
      specs: [
        { label: 'Pixel Pitch', value: 'P6.25 – P20' },
        { label: 'Transparency', value: '90 – 95%' },
        { label: 'Brightness', value: '2,000 / 4,000 nits' }
      ],
      /* Scene-tagged application galleries (2–3 each), keyed by the
         selector's scene answer. */
      gallery: {
        retail: [
          { src: IMG + '/cf-app-retail-window.jpg', label: 'Retail Window' },
          { src: IMG + '/cases/case-sk-retail-p6.jpg', label: 'In-store Display' },
          { src: IMG + '/cf-app-storefront-real.jpg', label: 'Storefront' }
        ],
        corporate: [
          { src: IMG + '/cf-app-corporate.jpg', label: 'Corporate Lobby' },
          { src: IMG + '/cases/case-meeting-room-p8-poster.jpg', label: 'Meeting Room' },
          { src: IMG + '/cases/case-changan-showroom-p625.jpg', label: 'Showroom Pavilion' }
        ],
        outdoor: [
          { src: IMG + '/cf-app-facade-night.jpg', label: 'Media Facade' },
          { src: IMG + '/cf-app-fullbuilding.jpg', label: 'Full Building' },
          { src: IMG + '/applications/app-architecture.jpg', label: 'Architecture' }
        ],
        entertainment: [
          { src: IMG + '/cases/case-immersive-tunnel-02.jpg', label: 'Immersive Tunnel' },
          { src: IMG + '/cases/macau-casino-01.jpg', label: 'Casino & Venue' },
          { src: IMG + '/cases/case-cambodia-lasvegas-sun-01.jpg', label: 'Entertainment Resort' }
        ]
      }
    },

    'holographic': {
      slug: 'holographic',
      name: 'SMD Holographic Invisible Screen',
      short: 'Holographic',
      type: 'Project product · engineered per m²',
      tagline: 'Borderless hollow-mesh PCB under 3 mm thick — up to 93% transparency, 3D playback at 120 fps, bonded straight onto glass.',
      detailPage: 'product-holographic.html',
      pixelPitch: 'P2.5 – P10',
      heroImage: IMG + '/holo-render-dark.jpg',
      cardImage: IMG + '/holo-render-11.jpg',
      specs: [
        { label: 'Pixel Pitch', value: 'P2.5 – P10' },
        { label: 'Transparency', value: 'up to 93%' },
        { label: 'Brightness', value: '≥ 5,000 cd/m²' }
      ],
      gallery: {
        retail: [
          { src: IMG + '/cases/case-holo-boutique-window-poster.jpg', label: 'Boutique Window' },
          { src: IMG + '/cases/case-holo-curved-mall-poster.jpg', label: 'Curved Mall Front' },
          { src: IMG + '/holo-render-dark.jpg', label: 'Luxury Retail' }
        ],
        corporate: [
          { src: IMG + '/cases/case-holo-exhibition-poster.jpg', label: 'Exhibition' },
          { src: IMG + '/cases/case-holo-auto-showroom-poster.jpg', label: 'Auto Showroom' },
          { src: IMG + '/cases/case-holo-lobby-wave-poster.jpg', label: 'Lobby Feature' }
        ],
        outdoor: [
          { src: IMG + '/cases/case-holo-heritage-facade-poster.jpg', label: 'Heritage Facade' },
          { src: IMG + '/holo-case-xinpai.jpg', label: 'Street Front' },
          { src: IMG + '/holo-render-splice.jpg', label: 'Large-format Splice' }
        ],
        entertainment: [
          { src: IMG + '/cases/case-holo-jellyfish-poster.jpg', label: '3D Content' },
          { src: IMG + '/cases/case-holo-aquarium-window-poster.jpg', label: 'Aquarium Window' },
          { src: IMG + '/cases/case-holo-curved-mall-poster.jpg', label: 'Public Attraction' }
        ]
      }
    },

    'soft-led-display': {
      slug: 'soft-led-display',
      name: 'Soft LED Display',
      short: 'Soft LED',
      type: 'Retail product · plug-and-play unit',
      tagline: 'Plug-and-play flexible LED matrix sign — app + remote control over Bluetooth, waterproof, 10 W. Unbox to live in five minutes.',
      detailPage: 'product-soft-led.html',
      pixelPitch: '35″ / 52″ / 70″',
      heroImage: IMG + '/soft-scene-coffee.jpg',
      cardImage: IMG + '/soft-scene-bakery.jpg',
      specs: [
        { label: 'Sizes', value: '35″ / 52″ / 70″' },
        { label: 'Power Draw', value: '10 W · USB / Type-C' },
        { label: 'Setup Time', value: '5 minutes' }
      ],
      gallery: {
        retail: [
          { src: IMG + '/soft-scene-coffee.jpg', label: 'Coffee Shop' },
          { src: IMG + '/soft-scene-bakery.jpg', label: 'Bakery' },
          { src: IMG + '/soft-scene-vape.jpg', label: 'Specialty Store' }
        ],
        corporate: [
          { src: IMG + '/soft-scene-home.jpg', label: 'Studio & Office' },
          { src: IMG + '/soft-52-main.jpg', label: 'L — 52″ Unit' },
          { src: IMG + '/soft-remote.jpg', label: 'Remote + App Control' }
        ],
        outdoor: [
          { src: IMG + '/soft-scene-burger.jpg', label: 'Street-side Window' },
          { src: IMG + '/soft-scene-smoke.jpg', label: 'Storefront' },
          { src: IMG + '/soft-70-main.jpg', label: 'XL — 70″ Unit' }
        ],
        entertainment: [
          { src: IMG + '/soft-scene-bar.jpg', label: 'Bar & Nightlife' },
          { src: IMG + '/soft-scene-smoke.jpg', label: 'Lounge' },
          { src: IMG + '/soft-scene-home.jpg', label: 'Game Room' }
        ]
      }
    }
  };

  window.K1_PRODUCTS = PRODUCTS;
  window.K1_PRODUCT_LIST = Object.values(PRODUCTS);
  window.getAllProducts = function () { return window.K1_PRODUCT_LIST; };
})();
