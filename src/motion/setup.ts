// Ruch strony kursant24. Rejestrowane raz (start(setupMotion) w Base.astro); efekty stron przez onPage.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  onPage, onScroll, setTransition, scrollToTarget, stopScroll, startScroll,
  ease, isTouch, prefersReducedMotion,
} from '../engine';
import { idle, startIdle } from './idle';
import { startPrzepisz } from './przepisz';

export function setupMotion() {
  startIdle();
  kartkaTransition();
  frameAway();
  startPrzepisz();
  kartkaIdle();
  buttonFill();
  menu();
  indexPreview();
  chapters();
  manifest();
  dopiski();
  roleTabs();
  kod();
  pilotaz();
  hashScroll();
}

// Przejście: świeża kartka w kratkę z czerwonym marginesem zakrywa stronę od dołu, na niej ołówkiem
// nazwa miejsca, do którego idziesz. Potem kartka odjeżdża w górę.
function kartkaTransition() {
  let label = '';
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a) return;
    const aria = a.getAttribute('aria-label');
    label = (aria ? aria.split(',')[0] : a.textContent || '').replace(/\s+/g, ' ').trim();
  }, true);
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const title = c.querySelector<HTMLElement>('[data-curtain-title]')!;
      title.textContent = label || 'kursant24';
      label = '';
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.75, ease: ease.inOut })
        .fromTo(title, { clipPath: 'inset(-40% 100% -40% -4%)', rotate: -6 },
          { clipPath: 'inset(-40% -4% -40% -4%)', rotate: -2, duration: 0.45, ease: 'power2.out' }, '-=0.25');
    },
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.8, ease: ease.inOut, delay: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });
}

// Rama nagłówka schodzi przy przewijaniu w dół i wraca w górę (patterns.md).
// Spoczynek na podstronach: kartka z hero leży pod ręką. Oddycha o 1 do 2 px i lekko idzie za
// wskaźnikiem (ten sam idle co wpisy w zeszycie). Jeden zegar, pauza poza ekranem, wyłączone przy reduced motion.
function kartkaIdle() {
  onPage(() => {
    const el = document.querySelector<HTMLElement>('[data-kartka-idle]');
    if (!el || prefersReducedMotion()) return;
    const tick = () => {
      const x = idle.x * 10, y = idle.y * 8 + Math.sin(idle.t * 0.9) * 1.6;
      el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
      el.style.setProperty('--ir', `${(idle.x * 1.2 + Math.sin(idle.t * 0.55) * 0.35).toFixed(3)}deg`);
    };
    let on = false;
    const run = (v: boolean) => { if (v === on) return; on = v; if (v) gsap.ticker.add(tick); else gsap.ticker.remove(tick); };
    const st = ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onToggle: (s) => run(s.isActive) });
    run(st.isActive);
    return () => { run(false); st.kill(); };
  });
}

function frameAway() {
  const html = document.documentElement;
  let last = 0;
  onScroll(({ y }) => {
    html.classList.toggle('is-scrolled', y > 8);
    if (Math.abs(y - last) < 4) return;
    html.classList.toggle('frame-away', y > 160 && y > last && !html.classList.contains('menu-open'));
    last = y;
  });
  onPage(() => {
    last = 0;
    html.classList.remove('frame-away', 'is-scrolled');
    const header = document.querySelector('[data-frame]');
    const back = () => html.classList.remove('frame-away');
    header?.addEventListener('focusin', back);
    return () => header?.removeEventListener('focusin', back);
  });
}

// Wypełnienie przycisku od strony wskaźnika (motion.md, buttonFill).
function buttonFill() {
  onPage(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;
      const from = (e: PointerEvent) => { const r = btn.getBoundingClientRect(); return `${e.clientX - r.left}px ${e.clientY - r.top}px`; };
      let closed = true;
      const open = (at: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${at})` });
        closed = false;
        btn.classList.add('is-filled');
        gsap.to(fill, { clipPath: `circle(150% at ${at})`, duration: 0.6, ease: ease.soft, overwrite: true });
      };
      const close = (at: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, { clipPath: `circle(0% at ${at})`, duration: 0.5, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
      };
      const enter = (e: PointerEvent) => open(from(e));
      const leave = (e: PointerEvent) => close(from(e));
      const focus = () => btn.matches(':focus-visible') && open('50% 50%');
      const blur = () => close('50% 50%');
      btn.addEventListener('pointerenter', enter); btn.addEventListener('pointerleave', leave);
      btn.addEventListener('focus', focus); btn.addEventListener('blur', blur);
      off.push(() => {
        btn.removeEventListener('pointerenter', enter); btn.removeEventListener('pointerleave', leave);
        btn.removeEventListener('focus', focus); btn.removeEventListener('blur', blur);
      });
    });
    return () => off.forEach((f) => f());
  });
}

// Menu na telefonie: nakładka z pułapką fokusu, Escape zamyka (motion.md).
function menu() {
  onPage(() => {
    const html = document.documentElement;
    const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
    const panel = document.querySelector<HTMLElement>('[data-menu]');
    if (!openBtn || !panel) return;
    const closeBtn = panel.querySelector<HTMLButtonElement>('[data-menu-close]')!;
    const focusables = () => [...panel.querySelectorAll<HTMLElement>('a, button')];
    let isOpen = false;

    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      const f = focusables();
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const open = () => {
      isOpen = true;
      panel.hidden = false;
      openBtn.setAttribute('aria-expanded', 'true');
      html.classList.add('menu-open');
      stopScroll();
      if (!prefersReducedMotion()) {
        gsap.fromTo(panel, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: ease.out });
        gsap.fromTo(panel.querySelectorAll('.menu__list span'), { yPercent: 110, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.05, ease: ease.out, delay: 0.1 });
      }
      panel.querySelector<HTMLElement>('.menu__list a')?.focus();
    };
    const close = (restore = true) => {
      if (!isOpen) return;
      isOpen = false;
      openBtn.setAttribute('aria-expanded', 'false');
      html.classList.remove('menu-open');
      const done = () => { panel.hidden = true; startScroll(); };
      if (prefersReducedMotion()) done();
      else gsap.to(panel, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: ease.inOut, onComplete: done });
      if (restore) openBtn.focus();
    };
    const onLink = (e: Event) => { if ((e.target as HTMLElement).closest('a')) { isOpen = false; html.classList.remove('menu-open'); } };
    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', () => close());
    panel.addEventListener('click', onLink);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); html.classList.remove('menu-open'); };
  });
}

// Indeks z podglądem zrzutu przy kursorze (motion.md). Dotyk: miniatury w wierszach (CSS).
function indexPreview() {
  onPage(() => {
    const list = document.querySelector('[data-index]');
    const box = document.querySelector<HTMLElement>('.preview');
    if (!list || !box || isTouch()) return;
    const img = box.querySelector('img')!;
    const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3.out' });
    const rot = gsap.quickTo(box, 'rotate', { duration: 0.8, ease: 'power3.out' });
    let lastX = 0, px = 0, py = 0;
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      // Podgląd wisi nad kursorem, żeby nie zasłaniać tytułu wiersza; przy górnej krawędzi przeskakuje pod wiersz.
      const h = box.offsetHeight;
      x(px + 24); y(py > h + 60 ? py - h - 44 : py + 56); rot(gsap.utils.clamp(-8, 8, (px - lastX) * 0.5)); lastX = px;
    };
    const show = (e: Event) => {
      const a = e.currentTarget as HTMLElement;
      img.src = a.dataset.preview!;
      box.classList.toggle('is-tall', a.hasAttribute('data-tall'));
      if (e.type === 'focus') {
        const r = a.getBoundingClientRect(), h = box.offsetHeight;
        gsap.set(box, { x: r.right - r.width * 0.28, y: r.top > h + 24 ? r.top - h - 12 : r.bottom + 12 });
      }
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: ease.out });
    };
    const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.85, duration: 0.4, ease: ease.out });
    const links = [...list.querySelectorAll<HTMLAnchorElement>('a[data-preview]')];
    links.forEach((a) => {
      a.addEventListener('pointerenter', show); a.addEventListener('focus', show); a.addEventListener('blur', hide);
      const pre = new Image(); pre.src = a.dataset.preview!;
    });
    list.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move);
    const off = onScroll(() => { if (!list.contains(document.elementFromPoint(px, py))) hide(); });
    return () => { removeEventListener('pointermove', move); off(); };
  });
}

// Rozdziały: lepka scena zmienia zrzut z rozdziałem (motion.md, pinned chapters).
function chapters() {
  onPage(() => {
    const stage = document.querySelector<HTMLElement>('[data-stage]');
    const list = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    if (!stage || !list.length) return;
    const shots = [...stage.children] as HTMLElement[];
    const set = (i: number) => {
      stage.dataset.state = String(i);
      shots.forEach((s, j) => s.classList.toggle('is-on', i === j));
      list.forEach((c, j) => c.classList.toggle('is-active', i === j));
    };
    set(0);
    list.forEach((ch, i) => ScrollTrigger.create({
      trigger: ch, start: 'top center', end: 'bottom center',
      onToggle: (s) => s.isActive && set(i),
    }));
    const postep = document.querySelector<HTMLElement>('[data-postep]');
    if (postep && !prefersReducedMotion()) {
      gsap.fromTo(postep, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: postep.parentElement, start: 'top center', end: 'bottom center', scrub: true },
      });
    }
  });
}

// Manifest: każda linia „jak jest dziś” zostaje skreślona ołówkiem, kiedy do niej dojedziesz.
function manifest() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('[data-skreslenie]').forEach((li) => {
      const text = li.querySelector('.manifest__tekst');
      gsap.fromTo(text, { '--s': '0%', color: '#0b1530' }, {
        '--s': '100%', color: '#55648a', ease: 'none',
        scrollTrigger: { trigger: li, start: 'top 78%', end: 'top 42%', scrub: 0.6 },
      });
    });
  });
}

// Dopiski ołówkiem przy zrzutach: gdy zrzut wjeżdża, sprawa jest załatwiona i dopisek zostaje skreślony.
// Na scenie rozdziałów skreśla się dopisek aktywnego rozdziału, kiedy sekcja jest na ekranie.
function dopiski() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('.rozdzial__media .dopisek-r, .widzisz__shot .dopisek-r').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 62%', once: true, onEnter: () => el.classList.add('is-skreslony') });
    });
    document.querySelectorAll<HTMLElement>('.rozdzialy').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 30%', once: true, onEnter: () => el.classList.add('is-widoczne') });
    });
  });
}

// Zakładki ról na stronie głównej: jeden panel widoczny na raz, strzałki lewo/prawo między zakładkami.
function roleTabs() {
  onPage(() => {
    document.querySelectorAll<HTMLElement>('[data-role]').forEach((root) => {
      const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-role-tab]')];
      const panels = [...root.querySelectorAll<HTMLElement>('[data-role-panel]')];
      const show = (idx: number) => {
        tabs.forEach((t, i) => { t.setAttribute('aria-selected', String(i === idx)); t.tabIndex = i === idx ? 0 : -1; });
        panels.forEach((p, i) => { p.hidden = i !== idx; });
      };
      tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => show(i));
        tab.addEventListener('keydown', (e) => {
          if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
          e.preventDefault();
          const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
          tabs[next].focus(); show(next);
        });
      });
    });
  });
}

// Kod aktywacyjny: znaki wpinają się w kratki po kolei.
function kod() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('[data-kod]').forEach((k) => {
      const chars = k.querySelectorAll('.kod__c > span, .kod__kreska');
      gsap.fromTo(chars, { yPercent: -60, rotate: -14, autoAlpha: 0 }, {
        yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.9, ease: ease.out, stagger: 0.07,
        scrollTrigger: { trigger: k, start: 'top 85%', once: true },
      });
    });
  });
}

// Formularz pilotażu: wersja demonstracyjna, nic nie wysyła. Pokazuje zgłoszenie „na czysto”.
function pilotaz() {
  onPage(() => {
    const form = document.querySelector<HTMLFormElement>('[data-pilotaz]');
    const done = document.querySelector<HTMLElement>('[data-gotowe]');
    if (!form || !done) return;
    const plan = new URLSearchParams(location.search).get('plan');
    if (plan) form.querySelector<HTMLInputElement>(`input[name="plan"][value="${CSS.escape(plan)}"]`)?.click();
    const err = form.querySelector<HTMLElement>('[data-blad]')!;
    const fields = [...form.querySelectorAll<HTMLInputElement>('input[required]')];
    const mark = (f: HTMLInputElement) => f.toggleAttribute('aria-invalid', !f.checkValidity());
    fields.forEach((f) => f.addEventListener('blur', () => f.hasAttribute('aria-invalid') && mark(f)));
    const submit = (e: SubmitEvent) => {
      e.preventDefault();
      fields.forEach(mark);
      const bad = fields.find((f) => !f.checkValidity());
      if (bad) { err.hidden = false; bad.focus(); return; }
      err.hidden = true;
      const data = new FormData(form);
      const rows: [string, string][] = [
        ['Szkoła', `${data.get('szkola')}, ${data.get('miasto')}`],
        ['Kontakt', `${data.get('osoba')}, ${data.get('telefon')}`],
        ['E-mail', String(data.get('email'))],
        ['Kursantów w roku', String(data.get('kursanci'))],
        ['Plan', (form.querySelector('input[name="plan"]:checked')?.closest('label')?.textContent ?? '').replace(/\s+/g, ' ').trim()],
      ];
      const dl = done.querySelector('[data-podsumowanie]')!;
      dl.replaceChildren(...rows.flatMap(([k, v]) => {
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = v;
        return [dt, dd];
      }));
      form.hidden = true;
      done.hidden = false;
      done.focus();
      if (!prefersReducedMotion()) gsap.fromTo(done, { y: 28, rotate: -1.5, autoAlpha: 0 }, { y: 0, rotate: 0, autoAlpha: 1, duration: 0.9, ease: ease.out });
      ScrollTrigger.refresh();
    };
    form.addEventListener('submit', submit);
    return () => form.removeEventListener('submit', submit);
  });
}

// Linki do kotwic na innych stronach (/dla-szkol/#cennik): po przejściu przewiń do celu.
function hashScroll() {
  onPage(() => {
    if (!location.hash) return;
    const target = document.querySelector<HTMLElement>(decodeURIComponent(location.hash));
    if (!target) return;
    const id = setTimeout(() => scrollToTarget(target), 120);
    return () => clearTimeout(id);
  });
}
