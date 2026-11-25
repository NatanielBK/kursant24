// Treść dodatkowa tylko dla /dla-szkol/ — rozszerza dlaSzkol z data/content.ts
// (tamtego pliku nie ruszamy, bo jest współdzielony z innymi stronami).

export const hero = {
  shotLaptop: 'pulpit-pc',
  altLaptop: 'Pulpit właściciela szkoły: aktywni kursanci, jazdy w tym tygodniu, zaległe płatności i zdawalność.',
  shotPhone: 'powiadomienia-tel',
  altPhone: 'Powiadomienie o propozycji terminu jazdy od instruktora.',
  chips: ['Zaległe płatności: 12 800 zł', 'Zwolnione okienko → przyjęte', 'Zdawalność 80%'],
};

// Zrzuty przy krokach dnia właściciela (inny kadr niż w hero/benefits — zbliżenie, nie ten sam obraz).
export const dayMedia = [
  { name: 'pulpit-pc', alt: 'Zbliżenie na pulpit: liczba kursantów, jazd i zaległych płatności.' },
  { name: 'kursanci-pc', alt: 'Lista kursantów z nowo dodaną osobą.' },
  { name: 'grafik-pc', alt: 'Grafik tygodnia ze zwolnionym terminem jazdy.' },
  { name: 'czat-tel', alt: 'Czat z pytaniem kursanta o termin, czekającym na odpowiedź.' },
];

export const benefits = {
  eyebrow: 'Co zyskuje właściciel',
  h2: 'Każdy ekran robi robotę, którą dziś robisz Ty',
  items: [
    {
      title: 'Grafik, który widzi cała szkoła',
      text: 'Jazdy, wykłady i wolne terminy wszystkich instruktorów w jednym widoku. Ty widzisz całość, instruktor tylko swoje auto.',
      shot: { name: 'grafik-pc', alt: 'Grafik tygodnia wszystkich instruktorów szkoły.', frame: 'laptop' as const },
    },
    {
      title: 'Grafik układa się sam',
      text: 'Jedno kliknięcie i aplikacja proponuje terminy na cały tydzień, z raportem, których kursantów nie udało się zmieścić.',
      shot: { name: 'uloz-pc', alt: 'Automatyczna propozycja grafiku na tydzień z raportem nieprzydzielonych kursantów.', frame: 'laptop' as const },
    },
    {
      title: 'Kursanci i postęp godzin',
      text: 'Aktywni i archiwalni kursanci, pasek postępu godzin i przypisany instruktor, bez przeklikiwania się przez karty papierowe.',
      shot: { name: 'kursanci-pc', alt: 'Lista kursantów szkoły z postępem godzin i przypisanym instruktorem.', frame: 'laptop' as const },
    },
    {
      title: 'E-karta zamiast segregatora',
      text: 'Instruktor odznacza obecność, kursant potwierdza swoim loginem. Karta przeprowadzonych zajęć powstaje sama, jako PDF.',
      shot: { name: 'karta', alt: 'Karta przeprowadzonych zajęć jako dokument PDF.', frame: 'paper' as const },
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
