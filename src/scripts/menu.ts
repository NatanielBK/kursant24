// Menu na telefonie: otwórz/zamknij, pułapka fokusu, Escape zamyka. Zero animacji JS.
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const panel = document.querySelector<HTMLElement>('[data-menu]');

if (openBtn && panel) {
  const closeBtn = panel.querySelector<HTMLButtonElement>('[data-menu-close]')!;
  const html = document.documentElement;
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
    panel.querySelector<HTMLElement>('.mobile-menu__list a')?.focus();
  };
  const close = () => {
    isOpen = false;
    openBtn.setAttribute('aria-expanded', 'false');
    html.classList.remove('menu-open');
    panel.hidden = true;
    openBtn.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  panel.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) close(); });
  document.addEventListener('keydown', onKey);
}
