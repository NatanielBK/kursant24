// Formularz pilotażu: wersja demonstracyjna, nic nie wysyła. Pokazuje zgłoszenie „na czysto”. Zero animacji.
const form = document.querySelector<HTMLFormElement>('[data-pilotaz]');
const done = document.querySelector<HTMLElement>('[data-gotowe]');

if (form && done) {
  const plan = new URLSearchParams(location.search).get('plan');
  if (plan) form.querySelector<HTMLInputElement>(`input[name="plan"][value="${CSS.escape(plan)}"]`)?.click();

  const err = form.querySelector<HTMLElement>('[data-blad]')!;
  const fields = [...form.querySelectorAll<HTMLInputElement>('input[required]')];
  const mark = (f: HTMLInputElement) => f.toggleAttribute('aria-invalid', !f.checkValidity());
  fields.forEach((f) => f.addEventListener('blur', () => f.hasAttribute('aria-invalid') && mark(f)));

  form.addEventListener('submit', (e) => {
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
  });
}
