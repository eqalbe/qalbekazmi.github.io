(function () {
  const S = window.SITE;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => Array.from(r.querySelectorAll(q));
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n + 1).padStart(2, '0');
  const projects = S.projects.map((p, i) => ({ ...p, index: i }));

  /* ---------- count-up + reveal ---------- */
  function countUp(n) {
    const target = +n.dataset.count, prefix = n.dataset.prefix || '', t0 = performance.now(), dur = 1400;
    const step = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); n.textContent = prefix + Math.round(target * e).toLocaleString('en-US'); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  const io = 'IntersectionObserver' in window && !reduce ? new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const t = e.target; io.unobserve(t);
    if (t.dataset.count) countUp(t); else t.classList.add('in');
  }), { threshold: 0.15 }) : null;
  function observeReveal(items) {
    items.forEach(i => { if (io) { i.classList.add('reveal'); io.observe(i); } else i.classList.add('in'); });
  }
  /* ---------- stats ---------- */
  const statsBox = $('#stats');
  if (statsBox) S.stats.forEach(s => {
    const d = el('div', 'stat');
    const n = el('span', 'stat-num', s.value);
    if (s.count && !reduce) { n.dataset.count = s.count; n.dataset.prefix = s.prefix || ''; }
    d.append(n, el('span', 'stat-label', s.label));
    statsBox.append(d);
  });

  /* ---------- featured ---------- */
  const feat = $('#featured');
  if (feat) projects.filter(p => p.featured).forEach(p => {
    const b = el('button', 'fcard');
    b.type = 'button';
    b.setAttribute('aria-label', 'Read project: ' + p.title);
    b.dataset.tags = [...p.tags, p.category, p.title].join('|');
    const top = el('span', 'fcard-top');
    top.append(el('span', 'fcard-idx', pad(p.index)), el('span', 'fcard-cat', p.category));
    const m = el('span', 'fcard-metric', p.metric);
    const ml = el('span', 'fcard-metric-label', p.metricLabel);
    const h = el('h3', 'fcard-title', p.title);
    const s = el('p', 'fcard-summary', p.summary);
    const chips = el('span', 'chips');
    p.tags.slice(0, 3).forEach(t => chips.append(el('span', 'chip', t)));
    const more = el('span', 'fcard-more', 'Read the case ↗');
    b.append(top, m, ml, h, s, chips, more);
    b.addEventListener('click', () => openProject(p, b));
    feat.append(b);
  });

  /* ---------- project list ---------- */
  const list = $('#projects'), search = $('#search'), filters = $('#filters'), showAll = $('#show-all'), empty = $('#empty');
  const LIMIT = 8;
  let filter = 'All', expanded = false;
  if (filters) {
    const cats = ['All', ...new Set(projects.map(p => p.category))];
    cats.forEach(c => {
      const b = el('button', 'filter', c === 'All' ? 'All work' : c);
      b.type = 'button'; b.dataset.filter = c; b.setAttribute('aria-pressed', String(c === 'All'));
      b.addEventListener('click', () => { filter = c; $$('.filter', filters).forEach(x => x.setAttribute('aria-pressed', String(x === b))); render(); });
      filters.append(b);
    });
  }
  function row(p) {
    const b = el('button', 'prow');
    b.type = 'button';
    b.setAttribute('aria-label', 'Read project: ' + p.title);
    b.dataset.tags = [...p.tags, p.category, p.title].join('|');
    const main = el('span', 'prow-main');
    main.append(el('span', 'prow-cat', p.category), el('span', 'prow-title', p.title));
    const met = el('span', 'prow-metric');
    met.append(el('strong', null, p.metric), el('small', null, p.metricLabel));
    const chips = el('span', 'chips prow-tags');
    p.tags.slice(0, 3).forEach(t => chips.append(el('span', 'chip', t)));
    b.append(el('span', 'prow-idx', pad(p.index)), main, met, chips, el('span', 'prow-arrow', '↗'));
    b.addEventListener('click', () => openProject(p, b));
    return b;
  }
  function render() {
    if (!list) return;
    const q = (search?.value || '').trim().toLowerCase();
    const sel = projects.filter(p => (filter === 'All' || p.category === filter) &&
      [p.title, p.summary, p.tags.join(' '), p.metric, p.metricLabel].join(' ').toLowerCase().includes(q));
    const limited = !expanded && !q && filter === 'All';
    const shown = limited ? sel.slice(0, LIMIT) : sel;
    list.replaceChildren(...shown.map(row));
    if (empty) empty.hidden = sel.length > 0;
    if (showAll) {
      showAll.hidden = !(limited && sel.length > LIMIT);
      showAll.textContent = 'Show all ' + sel.length + ' projects';
    }
    const c = $('#count'); if (c) c.textContent = sel.length + ' projects shown';
    observeReveal($$('.prow', list));
  }
  search?.addEventListener('input', render);
  showAll?.addEventListener('click', () => { expanded = true; render(); });
  render();

  /* ---------- expertise ---------- */
  const xp = $('#expertise-list');
  if (xp) S.expertise.forEach(([h, t], i) => {
    const d = el('div', 'xp-row reveal');
    const head = el('div', 'xp-head');
    head.append(el('span', 'xp-idx', pad(i)), el('h3', null, h));
    d.append(head, el('p', null, t));
    xp.append(d);
  });

  /* ---------- certs ---------- */
  const certs = $('#cert-list');
  if (certs) S.certs.forEach(c => {
    const a = el('article', 'cert reveal');
    const link = el('a', 'cert-badge');
    link.href = c.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Verify ' + c.name + ' on Credly (opens in a new tab)');
    const img = el('img'); img.src = c.img; img.alt = 'ServiceNow ' + c.name + ' badge'; img.width = 112; img.height = 112; img.loading = 'lazy';
    link.append(img);
    const body = el('div', 'cert-body');
    const h = el('h3', null, c.name + ' '); h.append(el('span', null, '(' + c.abbr + ')'));
    const v = el('a', 'cert-link', 'Verify on Credly ↗'); v.href = c.url; v.target = '_blank'; v.rel = 'noopener noreferrer';
    body.append(el('p', 'cert-issuer', 'ServiceNow'), h, v);
    a.append(link, body);
    certs.append(a);
  });

  /* ---------- experience ---------- */
  const exp = $('#jobs');
  if (exp) S.experience.forEach(j => {
    const a = el('article', 'job reveal');
    const body = el('div', 'job-body');
    const ul = el('ul');
    j.bullets.forEach(t => ul.append(el('li', null, t)));
    body.append(el('div', 'job-org', j.org), el('h3', null, j.title), el('p', null, j.summary), ul);
    a.append(el('div', 'job-when', j.when), body);
    exp.append(a);
  });

  /* ---------- dialog ---------- */
  const dlg = el('dialog', 'dlg');
  dlg.setAttribute('aria-labelledby', 'dlg-title');
  dlg.innerHTML = '<button class="dlg-close" type="button" aria-label="Close project details">×</button><p class="dlg-cat"></p><h2 id="dlg-title" class="dlg-title"></h2><div class="dlg-metric"><strong></strong><span></span></div><p class="dlg-summary"></p><div class="dlg-body"></div><p class="dlg-note">Professional project overview. Employer identifiers and sensitive configurations are omitted; figures are approximate.</p>';
  document.body.append(dlg);
  let lastTrigger = null;
  function openProject(p, trigger) {
    lastTrigger = trigger;
    $('.dlg-cat', dlg).textContent = p.category + ' / Project ' + pad(p.index);
    $('.dlg-title', dlg).textContent = p.title;
    $('.dlg-metric strong', dlg).textContent = p.metric;
    $('.dlg-metric span', dlg).textContent = p.metricLabel;
    $('.dlg-summary', dlg).textContent = p.summary;
    const body = $('.dlg-body', dlg); body.replaceChildren();
    [['The challenge', p.challenge], ['My contribution', p.approach], ['The result', p.outcome]].forEach(([h, t]) => body.append(el('h3', null, h), el('p', null, t)));
    body.append(el('h3', null, 'Tools'));
    const chips = el('div', 'chips'); p.tags.forEach(t => chips.append(el('span', 'chip', t))); body.append(chips);
    dlg.showModal(); document.body.style.overflow = 'hidden'; $('.dlg-close', dlg).focus();
  }
  window.openProjectByTitle = t => { const p = projects.find(x => x.title.startsWith(t)); if (p) openProject(p, document.activeElement); };
  $('.dlg-close', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('close', () => { document.body.style.overflow = ''; lastTrigger?.focus(); });
  dlg.addEventListener('click', e => { if (e.target === dlg) { const r = dlg.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close(); } });

  /* ---------- node map (direction B) ---------- */
  const map = $('#nodemap'), mapInfo = $('#node-info');
  if (map) {
    const nodes = $$('[data-node]', map);
    const match = (p, keys) => keys.some(k => [...p.tags, p.category, p.title].join(' ').toLowerCase().includes(k));
    function activate(n) {
      nodes.forEach(x => x.classList.toggle('on', x === n));
      map.classList.add('focus');
      const keys = n.dataset.node.split('|');
      const hits = projects.filter(p => match(p, keys));
      $$('.prow, .fcard').forEach(r => r.classList.toggle('lit', keys.some(k => (r.dataset.tags || '').toLowerCase().includes(k))));
      if (mapInfo) {
        mapInfo.replaceChildren(el('span', 'node-info-head', n.dataset.label + ' · ' + hits.length + ' projects'));
        const ul = el('ul');
        hits.slice(0, 4).forEach(p => { const li = el('li'); const b = el('button', null, p.title + ' ↗'); b.type = 'button'; b.addEventListener('click', () => openProject(p, b)); li.append(b); ul.append(li); });
        mapInfo.append(ul);
      }
    }
    function clear() { nodes.forEach(x => x.classList.remove('on')); map.classList.remove('focus'); $$('.lit').forEach(r => r.classList.remove('lit')); }
    nodes.forEach(n => {
      n.setAttribute('tabindex', '0'); n.setAttribute('role', 'button');
      n.setAttribute('aria-label', 'Show projects using ' + n.dataset.label);
      n.addEventListener('mouseenter', () => activate(n));
      n.addEventListener('focus', () => activate(n));
      n.addEventListener('click', () => activate(n));
      n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(n); } });
    });
    map.addEventListener('mouseleave', () => { if (!map.contains(document.activeElement)) clear(); });
    activate(nodes[0]);
  }

  $$('[data-count]').forEach(n => io ? io.observe(n) : null);
  observeReveal($$('.reveal, .fcard, .stat'));

  /* ---------- nav + progress ---------- */
  const menu = $('.menu'), nav = $('#navigation');
  if (menu && nav) {
    const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); };
    menu.addEventListener('click', () => { const o = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', o); menu.setAttribute('aria-expanded', String(o)); });
    $$('a', nav).forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); menu.focus(); } });
  }
  const bar = $('.progress');
  if (bar) {
    let sch = false;
    const upd = () => { sch = false; const r = document.documentElement.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (r > 0 ? scrollY / r : 0) + ')'; };
    addEventListener('scroll', () => { if (!sch) { sch = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }
  const clock = $('#clock');
  if (clock) {
    const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/New_York' }) + ' ET'; };
    tick(); setInterval(tick, 1000);
  }
})();
