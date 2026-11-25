// Treść strony /dla-kursantow/. Kopia niezbędnych fragmentów z data/content.ts (ten plik
// zostaje nietknięty, bo należy do wspólnego zestawu danych innych stron).
export const dlaKursantow = {
  title: 'Dla kursantów',
  description:
    'Jak zacząć z kursant24, jeśli Twoja szkoła jazdy z niego korzysta: kod od szkoły, własne hasło, grafik jazd, postęp godzin i czat.',
  eyebrow: 'Dla kursantów',
  h1: 'Twoja szkoła jazdy w telefonie.',
  lead: 'Widzisz swoje jazdy i wykłady, wiesz, ile godzin masz za sobą, a o zmianę terminu piszesz w czacie. Za aplikację płaci szkoła.',
  chips: ['Jazda potwierdzona', 'Postęp 18/30 h', 'Nowa propozycja terminu'],
  gallery: {
    eyebrow: 'W telefonie',
    h2: 'Osiem ekranów, zero zeszytu.',
    items: [
      { name: 'start-tel', title: 'Dziś', text: 'Najbliższa jazda i Twój postęp godzin od razu po wejściu.' },
      { name: 'grafik-tel', title: 'Grafik', text: 'Wszystkie jazdy i wykłady na liście albo w widoku tygodnia.' },
      { name: 'potwierdz-tel', title: 'Potwierdzenie', text: 'Szczegóły jazdy i jeden przycisk, żeby ją potwierdzić.' },
      { name: 'powiadomienia-tel', title: 'Powiadomienia', text: 'Nowa propozycja terminu albo przypomnienie o jeździe.' },
      { name: 'czat-tel', title: 'Czat', text: 'Piszesz do szkoły i odpowiadasz na propozycję terminu.' },
      { name: 'kod-tel', title: 'Logowanie', text: 'Kod ze szkoły albo kod QR, bez zakładania konta od zera.' },
      { name: 'dostep-tel', title: 'Dostęp od szkoły', text: 'Szkoła przekazuje Ci kod aktywacyjny i hasło startowe.' },
      { name: 'dzis-tel', title: 'Plan dnia', text: 'Godziny w grafiku i to, co czeka na potwierdzenie.' },
    ],
  },
  steps: [
    { n: '1', title: 'Dostajesz kod ze szkoły', text: 'Na kartce albo w wiadomości. Kod ma osiem znaków i jest ważny 7 dni.' },
    { n: '2', title: 'Wpisujesz go w kursant24', text: 'Albo skanujesz QR. Przy pierwszym logowaniu ustawiasz własne hasło.' },
    { n: '3', title: 'Widzisz swój kurs', text: 'Najbliższe zajęcia, postęp godzin i wiadomości ze szkoły. Tyle.' },
  ],
  faq: [
    { q: 'Ile kosztuje aplikacja?', a: 'Dla Ciebie nic. Płaci szkoła jazdy.' },
    { q: 'Kod nie działa albo minęło 7 dni.', a: 'Poproś szkołę o nowy. Właściciel może w każdej chwili wygenerować nowy kod i hasło startowe.' },
    { q: 'Muszę coś pobierać ze sklepu?', a: 'Nie. Wystarczy przeglądarka.' },
    { q: 'Kto widzi moje dane?', a: 'Tylko Twoja szkoła jazdy i Twój instruktor. Inni kursanci nie widzą Twoich danych.' },
    { q: 'Mojej szkoły nie ma w kursant24.', a: 'Pokaż jej tę stronę. Szkoła może umówić prezentację, pierwsze 30 dni jest bezpłatne.' },
  ],
};
