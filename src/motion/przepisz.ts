// Moduł-sterownik sygnatury „brudnopis → na czysto” (patterns.md: jedna zmienna, wszystkie obrazy).
// p = postęp przewinięcia sceny hero (0..1). Z p wynikają: pozycja, obrót i uniesienie każdego wpisu,
// przenikanie ołówka w czysty blok, zanik kratki, wejście linii grafiku, pasek stanu i licznik.
// Wejście spoczynkowe (idle): nieprzepisane wpisy oddychają o 1 do 2 px i idą za wskaźnikiem jak
// kartka pod ręką, a czerwona linia „teraz” jedzie z prawdziwym zegarem.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion } from '../engine';
import { idle } from './idle';

const clamp01 = gsap.utils.clamp(0, 1);
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const pad = (n: number) => String(n).padStart(2, '0');

type Item = { el: HTMLElement; blok: HTMLElement; olowek: HTMLElement; x: number; y: number; r: number; dx: number; dy: number };
type Refs = {
  sheet: HTMLElement; body: HTMLElement; kratka: HTMLElement; linie: HTMLElement; dni: HTMLElement; godz: HTMLElement;
  teraz: HTMLElement; dot: HTMLElement; label: HTMLElement; pasek: HTMLElement | null; licznik: HTMLElement | null; stan: HTMLElement | null;
};

let refs: Refs | null = null;
let items: Item[] = [];
let current = 0;
let lastDone = -1;
let lastSec = -1;

function measure() {
  if (!refs) return;
  const { sheet, body } = refs;
  const W = sheet.clientWidth, H = sheet.clientHeight;
  const sr = sheet.getBoundingClientRect(), br = body.getBoundingClientRect();
  const ox = br.left - sr.left, oy = br.top - sr.top;
  items.forEach((it) => {
    const bcx = ox + it.el.offsetLeft + it.el.offsetWidth / 2;
    const bcy = oy + it.el.offsetTop + it.el.offsetHeight / 2;
    const nw = it.olowek.offsetWidth, nh = it.olowek.offsetHeight;
    const nl = Math.max(8, Math.min((it.x / 100) * W, W - nw - 8));
    const nt = Math.max(8, Math.min((it.y / 100) * H, H - nh - 8));
    it.dx = nl + nw / 2 - bcx;
    it.dy = nt + nh / 2 - bcy;
  });
  lastSec = -1; // the clock line depends on the body height
}

function apply(p: number) {
  if (!refs) return;
  const g = smooth(0.04, 0.7, p);
  refs.kratka.style.opacity = String(1 - 0.72 * g);
  refs.linie.style.opacity = String(0.14 + 0.86 * g);
  refs.dni.style.opacity = refs.godz.style.opacity = String(0.45 + 0.55 * g);
  let done = 0;
  items.forEach((it, i) => {
    const raw = clamp01((p - (0.04 + i * 0.09)) / 0.38);
    const e = inOut(raw);
    if (raw >= 1) done++;
    const lift = Math.sin(Math.PI * raw); // podnieś
    const k = 1 - e;                      // ile jeszcze z brudnopisu
    const breathe = Math.sin(idle.t * 0.9 + i * 1.7) * 1.6;
    const x = it.dx * k + idle.x * 12 * k;
    const y = it.dy * k + (idle.y * 9 + breathe) * k - lift * 14;
    const r = (it.r + Math.sin(idle.t * 0.55 + i) * 0.5) * k; // wyprostuj
    it.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(3)}deg) scale(${(1 + 0.07 * lift).toFixed(4)})`;
    it.blok.style.opacity = String(smooth(0.55, 0.92, raw)); // wepnij
    it.olowek.style.opacity = String(1 - smooth(0.42, 0.8, raw));
  });
  if (refs.pasek) refs.pasek.style.transform = `scaleX(${p.toFixed(4)})`;
  if (done !== lastDone) {
    lastDone = done;
    if (refs.licznik) refs.licznik.textContent = String(done);
    if (refs.stan) refs.stan.textContent = done === items.length ? 'gotowe' : done ? 'przepisuję' : 'brudnopis';
    refs.sheet.classList.toggle('is-czysto', done === items.length);
  }
}

function clock() {
  if (!refs) return;
  const d = new Date();
  const s = d.getSeconds();
  if (s === lastSec) return;
  lastSec = s;
  const h = d.getHours(), m = d.getMinutes();
  const f = clamp01((h + m / 60 + s / 3600 - 8) / 12);
  const H = refs.body.clientHeight, y = f * H;
  refs.teraz.style.transform = `translateY(${y.toFixed(1)}px)`;
  // Etykieta godziny, na którą najeżdża czerwony znacznik, chowa się (jak w kalendarzu).
  const hs = refs.godz.children, n = hs.length;
  for (let i = 0; i < n; i++) {
    const ly = (i / (n - 1)) * H - (i === n - 1 ? 7 : 0);
    (hs[i] as HTMLElement).style.opacity = Math.abs(ly - y) < 16 ? '0' : '';
  }
  const wd = (d.getDay() + 6) % 7; // 0 = poniedziałek
  refs.dot.hidden = wd > 5;
  refs.dot.style.left = `${((wd + 0.5) / 6) * 100}%`;
  refs.label.innerHTML = `${h}:${pad(m)}<span class="teraz__s">:${pad(s)}</span>`;
}

const tick = () => { clock(); apply(current); };

export function startPrzepisz() {
  onPage(({ intro }) => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const sheet = hero?.querySelector<HTMLElement>('[data-zeszyt]');
    if (!hero || !sheet) return;
    const q = <T extends HTMLElement>(sel: string, root: ParentNode = sheet) => root.querySelector<T>(sel)!;
    refs = {
      sheet, body: q('[data-tydzien]'), kratka: q('[data-kratka]'), linie: q('[data-linie]'), dni: q('[data-dni]'), godz: q('[data-godz]'),
      teraz: q('[data-teraz]'), dot: q('[data-teraz-dot]'), label: q('[data-teraz-label]'),
      pasek: hero.querySelector('[data-pasek]'), licznik: hero.querySelector('[data-licznik]'), stan: hero.querySelector('[data-stan]'),
    };
    items = [...sheet.querySelectorAll<HTMLElement>('[data-wpis]')].map((el) => ({
      el, blok: q('.wpis__blok', el), olowek: q('.wpis__olowek', el),
      x: +el.dataset.x!, y: +el.dataset.y!, r: +el.dataset.r!, dx: 0, dy: 0,
    }));
    lastDone = -1;
    lastSec = -1;
    current = 0;
    measure();

    if (prefersReducedMotion()) {
      apply(1);
      clock();
      sheet.classList.add('is-ready');
      return () => { refs = null; items = []; };
    }

    apply(0);
    clock();
    sheet.classList.add('is-ready');

    // Wpisy pojawiają się, jakby ktoś je właśnie zapisał.
    intro.add(gsap.fromTo(items.map((it) => it.olowek),
      { clipPath: 'inset(-40% 100% -40% -4%)' },
      { clipPath: 'inset(-40% -4% -40% -4%)', duration: 0.6, stagger: 0.11, ease: 'power2.out', clearProps: 'clipPath' }), 0.3);

    ScrollTrigger.create({
      trigger: hero, start: 'top top', end: 'bottom bottom',
      onUpdate: (s) => { current = s.progress; },
      onRefresh: (s) => { measure(); current = s.progress; apply(current); },
    });
    let ticking = false;
    const run = (on: boolean) => {
      if (on === ticking) return;
      ticking = on;
      if (on) gsap.ticker.add(tick); else gsap.ticker.remove(tick);
    };
    const vis = ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: (s) => run(s.isActive) });
    run(vis.isActive || scrollY < hero.offsetHeight);
    document.fonts?.ready.then(() => { measure(); apply(current); });

    return () => { run(false); refs = null; items = []; };
  });
}
