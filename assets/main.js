// K1 demo build — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  // scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // counters: real value rendered in HTML; animate the number part only
  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; cio.unobserve(e.target);
    const el = e.target, final = el.dataset.count, suffix = el.dataset.suffix || '';
    const num = parseFloat(final.replace(/,/g, ''));
    if (isNaN(num)) return;
    const dec = (final.split('.')[1] || '').length, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / 900, 1), v = num * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: .4 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  // tabs
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const btns = group.querySelectorAll('.tabs button');
    const panes = group.querySelectorAll('.tabpane');
    btns.forEach((b, i) => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('active'));
      panes.forEach(x => x.classList.remove('active'));
      b.classList.add('active'); panes[i].classList.add('active');
    }));
  });

  // hover-play videos
  document.querySelectorAll('.vcard video').forEach(v => {
    v.muted = true; v.loop = true; v.playsInline = true;
    const card = v.closest('.vcard');
    card.addEventListener('mouseenter', () => v.play().catch(()=>{}));
    card.addEventListener('mouseleave', () => v.pause());
    card.addEventListener('click', () => v.paused ? v.play().catch(()=>{}) : v.pause());
  });

  // lightbox
  const lb = document.querySelector('.lightbox');
  if (lb) {
    const im = lb.querySelector('img');
    document.querySelectorAll('.gallery a').forEach(a => a.addEventListener('click', ev => {
      ev.preventDefault(); im.src = a.getAttribute('href'); lb.classList.add('open');
    }));
    lb.addEventListener('click', () => lb.classList.remove('open'));
  }

  // pitch / viewing-distance selector
  const ps = document.querySelector('.pitchsel[data-models]');
  if (ps) {
    const range = ps.querySelector('input'), dist = ps.querySelector('.dist'), rec = ps.querySelector('.rec');
    const models = JSON.parse(ps.dataset.models); // [[maxDist, label, note], ...]
    const update = () => {
      const d = +range.value; dist.textContent = d + ' m';
      let m = models[models.length - 1];
      for (const x of models) { if (d <= x[0]) { m = x; break; } }
      rec.innerHTML = 'Recommended: <b>' + m[1] + '</b> — ' + m[2];
    };
    range.addEventListener('input', update); update();
  }

  // mobile menu (panel markup injected here so all pages stay in sync)
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    const here = location.pathname.split('/').pop() || 'index.html';
    const NAV = [
      ['index.html', 'Home'],
      ['products.html', 'Products'],
      ['solutions.html', 'Solutions'],
      ['cases.html', 'Cases'],
      ['about.html', 'About'],
      ['contact.html', 'Contact']
    ];
    const SUB = [
      ['product-crystal-film.html', 'Crystal Film LED Screen'],
      ['product-holographic.html', 'Holographic Invisible Screen'],
      ['product-soft-led.html', 'Soft LED Display'],
      ['selector.html', 'Find Your Product →']
    ];
    const act = (href, isProducts) => (href === here || (isProducts && /^(product|selector)/.test(here))) ? ' class="active"' : '';
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.id = 'mobile-menu';
    menu.innerHTML =
      '<div class="mm-bar">' +
        '<a class="brand" href="index.html"><span class="k1">K1</span><span class="rest">Visual Solutions</span></a>' +
        '<button class="mm-close" type="button" aria-label="Close menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></button>' +
      '</div>' +
      '<nav class="mm-links">' +
        NAV.map(([href, label]) => {
          const sub = label === 'Products'
            ? '<div class="mm-sub">' + SUB.map(([sh, sl]) => '<a href="' + sh + '"' + act(sh) + '>' + sl + '</a>').join('') + '</div>'
            : '';
          return '<a href="' + href + '"' + act(href, label === 'Products') + '>' + label + '</a>' + sub;
        }).join('') +
        '<a class="btn mm-cta" href="contact.html">Request a Quote</a>' +
      '</nav>';
    document.body.appendChild(menu);

    const setOpen = open => {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open);
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    menu.querySelector('.mm-close').addEventListener('click', () => setOpen(false));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) setOpen(false); });
  }
});
