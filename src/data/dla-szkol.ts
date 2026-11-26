// Treść dodatkowa tylko dla /dla-szkol/ — rozszerza dlaSzkol z data/content.ts
// (tamtego pliku nie ruszamy, bo jest współdzielony z innymi stronami).

export const hero = {
  shotLaptop: 'pulpit-pc',
  altVisual: 'Pulpit właściciela szkoły: zdawalność 80% i zaległe płatności 12 800 zł.',
};

// Korzyści właściciela: każda karta ma własny, osobny kadr (b-*.png), żeby nie powtarzać
// tego samego zrzutu, który jest już w hero. `kadr` to klucz do mapy obrazów w dla-szkol.astro.
export const benefits = {
  eyebrow: 'Co zyskuje właściciel',
  h2: 'Każdy ekran robi robotę, którą dziś robisz Ty',
  items: [
    {
      kadr: 'grafik',
      title: 'Grafik widzi cała szkoła',
      text: 'Jazdy i wolne terminy wszystkich instruktorów w jednym widoku.',
      alt: 'Grafik tygodnia z jazdami kilku instruktorów.',
    },
    {
      kadr: 'uloz',
      title: 'Grafik układa się sam',
      text: 'Jedno kliknięcie i propozycja na cały tydzień, z raportem nieprzydzielonych.',
      alt: 'Automatyczna propozycja grafiku z raportem nieprzydzielonych kursantów.',
    },
    {
      kadr: 'kursanci',
      title: 'Kursanci i postęp godzin',
      text: 'Aktywni i archiwalni kursanci z paskiem postępu godzin, bez papierowych kart.',
      alt: 'Lista kursantów z paskiem postępu godzin.',
    },
    {
      kadr: 'karta',
      title: 'E-karta zamiast segregatora',
      text: 'Instruktor odznacza obecność, kursant potwierdza. Karta powstaje sama, jako PDF.',
      alt: 'Karta przeprowadzonych zajęć jako dokument PDF.',
    },
  ],
};

export const ctaBand = {
  eyebrow: 'Zobacz na żywo',
  h2: 'Pokażemy Ci to na przykładzie Twojej szkoły.',
  text: 'Krótka prezentacja, bez zobowiązań. Pierwsze 30 dni nic nie płacisz, bez karty płatniczej.',
  primary: { href: '/pilotaz/', label: 'Umów prezentację' },
  secondary: { href: '/cennik/', label: 'Zobacz cennik' },
};
