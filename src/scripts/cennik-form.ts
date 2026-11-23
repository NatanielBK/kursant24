// Formularz wyceny: bez backendu. Buduje treść e-maila i otwiera domyślny klient pocztowy (mailto:).
import { site } from '../data/content';

const form = document.querySelector<HTMLFormElement>('[data-cennik]');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const kategorie = data.getAll('kategorie').join(', ') || '—';
    const lines = [
      `Szkoła: ${data.get('szkola')}`,
      `Miasto: ${data.get('miasto')}`,
      `Liczba instruktorów: ${data.get('instruktorzy') || '—'}`,
      `Kursantów w miesiącu: ${data.get('kursanci') || '—'}`,
      `Oddziały/lokalizacje: ${data.get('oddzialy') || '—'}`,
      `Kategorie prawa jazdy: ${kategorie}`,
      `Telefon: ${data.get('telefon') || '—'}`,
      `E-mail: ${data.get('email')}`,
      `Uwagi: ${data.get('uwagi') || '—'}`,
    ];
    const subject = `Wycena kursant24 — ${data.get('szkola')}`;
    const body = lines.join('\n');
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
