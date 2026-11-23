// Treść strony v3. Fakty (funkcje, ceny, FAQ) przeniesione ze starej wersji (site.ts),
// ale struktura i długość przycięte pod nowy, krótki układ. Bez wymyślonych liczb/opinii/klientów.

export const site = {
  name: 'kursant24',
  role: 'aplikacja dla szkół jazdy',
  url: 'https://kursant24.pl', // placeholder: domena niewdrożona
  email: 'kontakt@kursant24.pl', // placeholder
  description:
    'kursant24 to aplikacja dla szkół jazdy: grafik jazd i wykładów, kursanci z kodem zamiast hasła, czat z propozycją terminu, postęp godzin i e-karta zajęć. 30 dni za darmo.',
};

export const nav = [
  { href: '/dla-szkol/', label: 'Dla szkół' },
  { href: '/dla-kursantow/', label: 'Dla kursantów' },
  { href: '/cennik/', label: 'Cennik' },
];
export const cta = { href: '/pilotaz/', label: 'Umów prezentację' };

export const home = {
  title: 'Aplikacja dla szkół jazdy',
  hero: {
    eyebrow: 'Aplikacja dla szkół jazdy',
    h1: 'Koniec z zeszytem.',
    lead: 'Jeden grafik jazd i wykładów, który widzi właściciel, instruktor i kursant. Termin proponujesz w czacie, nie przez dziesięć SMS-ów.',
    shot: 'grafik-tel',
    alt: 'Grafik tygodnia w kursant24: lista jazd i wykładów z godzinami i instruktorem.',
  },
  features: {
    eyebrow: 'Funkcje',
    h2: 'Wszystko, co dziś robi zeszyt, kalendarz i telefon',
    items: [
      { title: 'Grafik tygodnia', text: 'Jazdy, wykłady i egzaminy wewnętrzne w jednym grafiku. Widzi go właściciel, instruktor i kursant.' },
      { title: 'Grafik, który się sam układa', text: 'Proponuje terminy z dostępności instruktorów i pilnuje limitu: 2 h dziennie na początku, potem 3 h.' },
      { title: 'Czat z propozycją terminu', text: 'Jedna wiadomość z terminem, kursant odpowiada przyciskiem Przyjmij albo Odrzuć.' },
      { title: 'Zwolnione okienka', text: 'Gdy jazda się odwoła, termin trafia do listy oczekujących. Pierwszy, kto przyjmie, dostaje go.' },
      { title: 'Postęp godzin', text: 'Kursant sam widzi, ile godzin z 30 ma za sobą i kiedy jest następna jazda.' },
      { title: 'E-karta zajęć', text: 'Instruktor odznacza obecność, kursant potwierdza. Karta zajęć jako PDF, bez długopisu.' },
    ],
  },
  roles: {
    eyebrow: 'Dla kogo',
    h2: 'Trzy role, jedna aplikacja',
    items: [
      {
        title: 'Właściciel',
        text: 'Grafik całej szkoły, kursanci, wpłaty i statystyki zdawalności na jednym pulpicie.',
        points: ['Grafik wszystkich instruktorów', 'Wpłaty i raty za kurs', 'Nowy kursant: login i kod w minutę'],
      },
      {
        title: 'Instruktor',
        text: 'Własny grafik jazd, lista kursantów i e-karta zajęć bez długopisu.',
        points: ['Tylko swoje jazdy i kursanci', 'Odznaczanie obecności w telefonie', 'Czat z kursantem o terminie'],
      },
      {
        title: 'Kursant',
        text: 'Dostęp bez hasła na start: kod od szkoły, potem własne logowanie.',
        points: ['Postęp godzin: ile zostało z 30', 'Przypomnienie 24 h i 2 h przed jazdą', 'Zero instalowania, działa w przeglądarce'],
      },
    ],
  },
  cennikCta: {
    eyebrow: 'Cennik',
    h2: 'Cena zależy od wielkości szkoły.',
    text: 'Jeden instruktor i sieć z oddziałami nie potrzebują tego samego. Zobacz, co wpływa na cenę, albo napisz od razu po wycenę.',
    primary: { href: '/cennik/', label: 'Zobacz, jak liczymy cenę' },
    secondary: { href: '/cennik/#wycena', label: 'Poproś o wycenę' },
  },
  cta: {
    eyebrow: 'Prezentacja',
    h2: 'Zamknij zeszyt.',
    text: 'Umów krótką prezentację. Pierwsze 30 dni nic nie płacisz, bez karty płatniczej.',
    primary: { href: '/pilotaz/', label: 'Umów prezentację' },
    secondary: { href: '/dla-kursantow/', label: 'Jestem kursantem' },
  },
};

export const plans = {
  eyebrow: 'Profile',
  h2: 'Trzy profile, wycena indywidualna',
  note: 'Każdy profil to punkt wyjścia do rozmowy, nie gotowa cena. Cenę ustalamy pod wielkość Twojej szkoły.',
  free: '30 dni za darmo, bez karty płatniczej.',
  pick: 'polecamy na start',
  priceLabel: 'Cena ustalana indywidualnie',
  quoteCta: 'Poproś o wycenę',
  rows: [
    { name: 'Solo', who: '1 instruktor', items: ['Grafik jazd i wykładów', 'Kody aktywacji dla kursantów', 'Czat z propozycją terminu', 'E-karta zajęć'] },
    { name: 'Szkoła', who: 'do 5 instruktorów', items: ['Wszystko z planu Solo', 'Grafik, który sam się układa', 'Lista oczekujących na terminy', 'Wpłaty i raty za kurs'] },
    { name: 'Pro', who: 'bez limitu instruktorów', items: ['Wszystko z planu Szkoła', 'Wiele oddziałów'] },
  ],
  compare: [
    { row: 'Instruktorzy', v: ['1', 'do 5', 'bez limitu'] },
    { row: 'Grafik, czat, kody dla kursantów', v: [true, true, true] },
    { row: 'E-karta zajęć', v: [true, true, true] },
    { row: 'Grafik, który sam się układa', v: [false, true, true] },
    { row: 'Lista oczekujących', v: [false, true, true] },
    { row: 'Wpłaty i raty', v: [false, true, true] },
    { row: 'Statystyki zdawalności', v: [false, true, true] },
    { row: 'Wiele oddziałów', v: [false, false, true] },
  ] as { row: string; v: (string | boolean)[] }[],
  soon: 'W planach: integracja z PKK, powiadomienia SMS, płatności online.',
};

export const faqHome = [
  { q: 'Czy kursant płaci za aplikację?', a: 'Nie. Płaci szkoła, w abonamencie. Kursant dostaje dostęp od szkoły i nic nie kupuje.' },
  { q: 'Czy trzeba coś instalować?', a: 'Nie. kursant24 działa w przeglądarce na telefonie i komputerze.' },
  { q: 'Kto widzi dane kursantów?', a: 'Tylko Twoja szkoła: właściciel widzi wszystko, instruktor swoje zajęcia, kursant tylko siebie.' },
  { q: 'Ile trwa wdrożenie?', a: 'Zwykle jeden dzień: dodajesz instruktorów i kursantów, rozdajesz kody. Listę z Excela albo zeszytu przeniesiemy za Ciebie.' },
  { q: 'Czy można zacząć w środku roku?', a: 'Tak. Dodajesz kursantów, którzy są w trakcie kursu, z godzinami, które już wyjeździli.' },
];

export const dlaSzkol = {
  title: 'Dla szkół jazdy',
  description: 'kursant24 dla właścicieli szkół jazdy: funkcje, wycena dopasowana do szkoły i odpowiedzi na pytania właścicieli.',
  eyebrow: 'Dla szkół jazdy',
  h1: 'Dzień właściciela szkoły, przepisany na czysto.',
  lead: 'Nie zmieniasz sposobu pracy. Przenosisz go z zeszytu do aplikacji, którą widzą też instruktorzy i kursanci.',
  day: [
    { t: '7:30', title: 'Kawa i pulpit', text: 'Jazdy w tym tygodniu, zaległe raty i brakujące dokumenty na jednym ekranie.' },
    { t: '9:00', title: 'Nowy kursant', text: 'Wpisujesz imię i telefon. kursant24 tworzy login i kod aktywacyjny do wydruku albo wysłania.' },
    { t: '12:15', title: 'Instruktor odwołuje jazdę', text: 'Zwolnione okienko trafia do listy oczekujących. Pierwszy, kto przyjmie, dostaje termin. Nie dzwonisz do nikogo.' },
    { t: '21:40', title: 'Telefon milczy', text: 'Pytania o termin czekają w czacie do rana. Odpowiadasz, kiedy masz chwilę.' },
  ],
  shot: { name: 'pulpit-pc', alt: 'Pulpit właściciela: aktywni kursanci, jazdy w tym tygodniu, zaległe płatności i grafik tygodnia.' },
  migration: {
    h2: 'Zeszyt przepiszemy za Ciebie.',
    text: 'Na czas pilotażu przenosimy listę kursantów z zeszytu, Excela albo innej aplikacji, bez dodatkowych kosztów. Ty sprawdzasz i rozdajesz kody.',
  },
  faq: [
    { q: 'Czy mogę przenieść dane z Excela albo innego systemu?', a: 'Tak. Na czas pilotażu pomagamy wprowadzić listę kursantów ręcznie albo z arkusza.' },
    { q: 'Czy widzę, co robią moi instruktorzy?', a: 'Tak. Grafik całej szkoły widzi właściciel, instruktor widzi tylko swoje zajęcia i swoich kursantów.' },
    { q: 'Co z kursantami, którzy płacą gotówką?', a: 'Wpłatę gotówkową zapisujesz w aplikacji jak każdą inną. To notatka o płatności, bez obsługi płatności online.' },
    { q: 'Czy muszę podpisywać długą umowę?', a: 'Nie. Na czas pilotażu to abonament miesięczny, który można zakończyć w każdej chwili.' },
    { q: 'Jak działa e-karta zajęć?', a: 'Instruktor oznacza obecność po jeździe, kursant potwierdza zajęcia swoim loginem i hasłem. Z tych wpisów powstaje karta przeprowadzonych zajęć w PDF.' },
  ],
};

export const dlaKursantow = {
  title: 'Dla kursantów',
  description: 'Jak zacząć z kursant24, jeśli Twoja szkoła jazdy z niego korzysta: kod od szkoły, własne hasło, grafik jazd, postęp godzin i czat.',
  eyebrow: 'Dla kursantów',
  h1: 'Twoja szkoła jazdy w telefonie.',
  lead: 'Widzisz swoje jazdy i wykłady, wiesz, ile godzin masz za sobą, a o zmianę terminu piszesz w czacie. Za aplikację płaci szkoła.',
  shot: { name: 'start-tel', alt: 'Ekran startowy kursanta w kursant24: najbliższe zajęcia i postęp godzin.' },
  steps: [
    { n: '1', title: 'Dostajesz kod ze szkoły', text: 'Na kartce albo w wiadomości. Kod ma osiem znaków i jest ważny 7 dni.' },
    { n: '2', title: 'Wpisujesz go w kursant24', text: 'Albo skanujesz QR. Przy pierwszym logowaniu ustawiasz własne hasło.' },
    { n: '3', title: 'Widzisz swój kurs', text: 'Najbliższe zajęcia, postęp godzin i wiadomości ze szkoły. Tyle.' },
  ],
  see: [
    { title: 'Grafik', text: 'Jazdy i wykłady z instruktorem, autem i miejscem startu.' },
    { title: 'Propozycje terminów', text: 'Szkoła proponuje jazdę w czacie, Ty klikasz Przyjmij albo Odrzuć.' },
    { title: 'Przypomnienia', text: 'Dzień przed jazdą i dwie godziny przed nią, potwierdzasz jednym przyciskiem.' },
  ],
  faq: [
    { q: 'Ile kosztuje aplikacja?', a: 'Dla Ciebie nic. Płaci szkoła jazdy.' },
    { q: 'Kod nie działa albo minęło 7 dni.', a: 'Poproś szkołę o nowy. Właściciel może w każdej chwili wygenerować nowy kod i hasło startowe.' },
    { q: 'Muszę coś pobierać ze sklepu?', a: 'Nie. Wystarczy przeglądarka.' },
    { q: 'Kto widzi moje dane?', a: 'Tylko Twoja szkoła jazdy i Twój instruktor. Inni kursanci nie widzą Twoich danych.' },
    { q: 'Mojej szkoły nie ma w kursant24.', a: 'Pokaż jej tę stronę. Szkoła może umówić prezentację, pierwsze 30 dni jest bezpłatne.' },
  ],
};

export const pilotaz = {
  title: 'Umów prezentację',
  description: 'Umów krótką prezentację kursant24 dla swojej szkoły jazdy: pokażemy aplikację na żywo i omówimy pilotaż, 30 dni za darmo, bez karty płatniczej.',
  eyebrow: 'Prezentacja',
  h1: 'Umów prezentację.',
  lead: 'Pokażemy Ci aplikację na żywo i dopasujemy plan do wielkości szkoły. Pierwsze 30 dni za darmo, bez karty płatniczej.',
  promises: ['Bez karty płatniczej', 'Dane przeniesiemy za Ciebie', 'Rezygnujesz w każdej chwili'],
  sizes: ['1 do 10', '11 do 30', '31 do 60', 'ponad 60'],
  consent: 'Zgadzam się na kontakt w sprawie prezentacji kursant24. Dane posłużą tylko do odpowiedzi na to zgłoszenie.',
  demoNote: 'To wersja demonstracyjna strony: formularz niczego nie wysyła.',
  done: {
    h2: 'Zgłoszenie gotowe.',
    text: 'Tak wyglądałoby Twoje zgłoszenie. To wersja demonstracyjna strony, więc nic nie zostało wysłane i nikt się z Tobą nie skontaktuje.',
  },
};

export const cennik = {
  title: 'Cennik',
  description:
    'Cena kursant24 zależy od wielkości szkoły jazdy: liczby instruktorów, kursantów w miesiącu i oddziałów. Poproś o wycenę dopasowaną do Twojej szkoły.',
  eyebrow: 'Cennik',
  h1: 'Cena dopasowana do Twojej szkoły.',
  lead: 'Jeden instruktor i sieć z oddziałami nie potrzebują tego samego serwera. Wycenę przygotowujemy pod konkretną szkołę, nie z cennika na sztywno.',
  factors: {
    eyebrow: 'Od czego zależy cena',
    h2: 'Liczymy to, co faktycznie zużywasz',
    items: [
      { title: 'Liczba instruktorów', text: 'Im więcej osób pracuje w grafiku, tym więcej kont i większy serwer pod obciążenie.' },
      { title: 'Kursanci w miesiącu', text: 'Od kilku do kilkuset osób jeżdżących i logujących się w danym miesiącu.' },
      { title: 'Oddziały i lokalizacje', text: 'Jedna siedziba albo sieć filii z własnymi grafikami i instruktorami.' },
      { title: 'Kategorie prawa jazdy', text: 'B, A, C+E i inne — różne wymagania wobec grafiku i dokumentacji.' },
      { title: 'Potrzebne funkcje', text: 'Podstawowy grafik i czat, albo też wpłaty, listy oczekujących i statystyki zdawalności.' },
      { title: 'Wdrożenie i migracja danych', text: 'Przeniesienie listy kursantów z zeszytu, Excela albo innego systemu.' },
    ],
  },
  profiles: {
    eyebrow: 'Przykładowe profile',
    h2: 'Jak to wygląda w praktyce',
    note: 'Każdy profil to punkt wyjścia do rozmowy, nie gotowa cena. Napisz, co robi Twoja szkoła, a wycenę przygotujemy indywidualnie.',
    items: [
      {
        title: 'Instruktor solo',
        text: 'Jeden instruktor, własny grafik, kursanci jednej kategorii.',
        points: ['1 instruktor, 1 lokalizacja', 'Do kilkunastu kursantów w miesiącu', 'Grafik, czat, e-karta zajęć'],
      },
      {
        title: 'Szkoła lokalna',
        text: 'Kilku instruktorów, jedna siedziba, kilka kategorii prawa jazdy.',
        points: ['Kilku instruktorów, 1 lokalizacja', 'Kilkadziesiąt kursantów w miesiącu', 'Plus wpłaty i lista oczekujących'],
      },
      {
        title: 'Sieć z oddziałami',
        text: 'Wiele filii, osobne grafiki instruktorów, wspólny widok właściciela.',
        points: ['Wiele oddziałów i instruktorów', 'Setki kursantów w miesiącu', 'Plus statystyki zdawalności, migracja danych'],
      },
    ],
  },
  form: {
    h2: 'Poproś o wycenę',
    text: 'Wypełnij formularz. Otworzy się e-mail z gotową treścią — wysyłasz go ze swojej skrzynki, bez logowania się nigdzie.',
    categories: ['AM', 'A1', 'A2', 'A', 'B', 'B+E', 'C', 'C+E', 'D', 'T'],
    submit: 'Wyślij zapytanie e-mailem',
  },
  faq: [
    { q: 'Czy jest okres próbny?', a: 'Tak, 30 dni za darmo, bez karty płatniczej, niezależnie od wielkości szkoły.' },
    { q: 'Czy muszę podpisywać długą umowę?', a: 'Nie. To abonament miesięczny, który można zakończyć w każdej chwili.' },
    { q: 'Co, jeśli szkoła wyraźnie zmieni wielkość?', a: 'Cenę ustalamy na starcie i wracamy do rozmowy, gdy liczba instruktorów albo kursantów zauważalnie się zmieni.' },
    { q: 'Pomagacie przenieść dane z Excela albo zeszytu?', a: 'Tak. Listę kursantów przenosimy za Ciebie, Ty sprawdzasz i rozdajesz kody.' },
  ],
};

export const notFound = {
  title: 'Nie ma takiej strony',
  h1: 'Tej strony nie ma w grafiku.',
  text: 'Adres mógł się zmienić. Wróć na stronę główną albo zobacz, co kursant24 daje szkołom.',
};

export const footer = {
  line: 'Aplikacja dla szkół jazdy. Koniec z zeszytem.',
  status: 'Projekt w fazie testów, przed uruchomieniem.',
  copy: '© 2026 kursant24',
};
