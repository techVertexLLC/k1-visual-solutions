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
});
