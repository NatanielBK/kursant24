// Cała treść strony w jednym miejscu. Zasady: polskie znaki, „kursant24” zawsze małymi literami,
// bez myślników w tekście, bez wymyślonych liczb, opinii i klientów.
// placeholder: true = założenie do potwierdzenia przez właściciela produktu.

export const site = {
  name: 'kursant24',
  role: 'aplikacja dla szkół jazdy',
  url: 'https://kursant24.pl', // placeholder: true (domena niewdrożona)
  email: 'kontakt@kursant24.pl', // placeholder: true
  description:
    'kursant24 to aplikacja dla szkół jazdy: grafik jazd i wykładów, kursanci z kodem zamiast hasła, czat z propozycją terminu, postęp godzin i e-karta zajęć. 30 dni za darmo.',
  slogan: 'Koniec z zeszytem.',
};

export const nav = [
  { href: '/dla-szkol/', label: 'Dla szkół' },
  { href: '/dla-kursantow/', label: 'Dla kursantów' },
  { href: '/dla-szkol/#cennik', label: 'Cennik' },
];
export const cta = { href: '/pilotaz/', label: 'Umów prezentację' };

// Sygnatura: wpisy ołówkiem z zeszytu i ich miejsca w grafiku tygodnia.
// day: 0 = pn … 5 = sob; start i len w godzinach (siatka 8:00 do 20:00).
// x, y, r: położenie (procent sceny) i obrót wpisu na kartce w stanie „brudnopis”.
export type Wpis = {
  note: string;
  strike?: string; // fragment skreślony ołówkiem
  day: number;
  start: number;
  len: number;
  kind: 'jazda' | 'wyklad' | 'egzamin';
  title: string;
  who: string;
  x: number;
  y: number;
  r: number;
};
export const wpisy: Wpis[] = [
  { note: 'Nowak pn 8:00 plac', day: 0, start: 8, len: 2, kind: 'jazda', title: 'Jazda: plac', who: 'M. Nowak', x: 11, y: 16, r: -4 },
  { note: 'wykład śr 17 sala 2', day: 2, start: 17, len: 2, kind: 'wyklad', title: 'Wykład: znaki', who: 'sala 2', x: 52, y: 8, r: 3 },
  { note: 'Kowalska wt 16?? na czw', strike: 'wt 16??', day: 3, start: 16, len: 2, kind: 'jazda', title: 'Jazda: miasto', who: 'J. Kowalska', x: 30, y: 36, r: -2 },
  { note: 'egz. wewn. pt 12 (Lis)', day: 4, start: 12, len: 1, kind: 'egzamin', title: 'Egzamin wewn.', who: 'M. Lis', x: 60, y: 58, r: 5 },
  { note: 'Dudek śr 10 ronda', day: 2, start: 10, len: 2, kind: 'jazda', title: 'Jazda: ronda', who: 'A. Dudek', x: 14, y: 68, r: 2 },
  { note: 'Wiśniewska sob 9, max 2h!', day: 5, start: 9, len: 2, kind: 'jazda', title: 'Jazda: trasy', who: 'A. Wiśniewska', x: 40, y: 82, r: -3 },
];
export const dni = ['pn', 'wt', 'śr', 'czw', 'pt', 'sob'];

export const home = {
  title: 'Aplikacja dla szkół jazdy',
  hero: {
    label: 'Aplikacja dla szkół jazdy',
    h1: 'Koniec z zeszytem.',
    lead: 'Grafik jazd i wykładów, kursanci, czat i postęp godzin w jednej aplikacji. Ty układasz tydzień, instruktor jeździ, kursant sam widzi swoje godziny.',
    primary: { href: '/pilotaz/', label: 'Umów prezentację' },
    secondary: { href: '#jak-to-dziala', label: 'Zobacz, jak to działa' },
    stateFrom: 'brudnopis',
    stateTo: 'na czysto',
    scrollHint: 'Przewiń, a przepiszemy zeszyt',
    trust: [
      '30 dni za darmo, bez karty',
      'Pilotaż i wdrożenie osobiście, na Śląsku',
      'Właściciel, instruktor i kursant w jednej aplikacji',
    ],
  },
  roles: {
    label: 'Dla całej szkoły',
    h2: 'Jedna aplikacja, trzy role.',
    items: [
      {
        id: 'wlasciciel',
        label: 'Właściciel',
        title: 'Widzisz całą szkołę na raz.',
        text: 'Grafik wszystkich instruktorów, zaległe płatności, brakujące dokumenty i zdawalność w jednym pulpicie. Dodajesz kursanta i wysyłasz mu kod w kilka sekund.',
        shot: 'pulpit-pc',
        frame: 'laptop',
        alt: 'Pulpit właściciela szkoły: liczba aktywnych kursantów, jazdy w tym tygodniu, zdawalność, zaległe płatności i grafik tygodnia z listą kursantów.',
      },
      {
        id: 'instruktor',
        label: 'Instruktor',
        title: 'Twój dzień, bez kartki w aucie.',
        text: 'Lista dzisiejszych jazd, kto zaraz przyjeżdża i ile godzin masz dziś w grafiku. Obecność odznaczasz jednym dotknięciem, zamiast w zeszycie na kolanach.',
        shot: 'dzis-tel',
        frame: 'phone',
        alt: 'Ekran dnia instruktora: powitanie, liczba zajęć i godzin dziś, trwająca jazda i lista dzisiejszych zajęć z kursantami i godzinami.',
      },
      {
        id: 'kursant',
        label: 'Kursant',
        title: 'Wiesz, ile godzin Ci zostało.',
        text: 'Najbliższa jazda, postęp godzin teorii i praktyki oraz czat ze szkołą w jednym miejscu. Nie dzwonisz, żeby się dowiedzieć, ile jeszcze zostało.',
        shot: 'start-tel',
        frame: 'phone',
        alt: 'Ekran startowy kursanta: najbliższe zajęcia z instruktorem, autem i miejscem startu oraz pierścień postępu 12 z 30 godzin jazdy i pasek godzin teorii.',
      },
    ],
  },
  manifest: {
    label: 'Jak jest dziś',
    lines: [
      'Grafik w zeszycie, który został w drugim aucie.',
      'Telefon o 21:40, bo ktoś pyta, o której jutro jazda.',
      'Dziesięć SMS-ów, żeby przełożyć jedną godzinę.',
    ],
    answer: 'W kursant24 grafik jest jeden i widzą go wszyscy: Ty, instruktorzy i kursanci.',
  },
  chapters: {
    label: 'Jak to działa',
    h2: 'Pięć rzeczy, które dziś robisz w zeszycie',
    items: [
      {
        id: 'grafik',
        kicker: 'Grafik',
        title: 'Cały tydzień szkoły na jednym ekranie.',
        text: 'Jazdy, wykłady, egzaminy wewnętrzne i terminy w WORD w jednym grafiku, każdy rodzaj w swoim kolorze. Filtrujesz po instruktorze i od razu widzisz wolne okienka.',
        shot: 'grafik-pc',
        note: 'Lis pn 8:00, sala wolna?',
        frame: 'laptop',
        alt: 'Grafik tygodnia właściciela szkoły w kursant24: kolumny dni, kolorowe bloki jazd i wykładów, filtr instruktorów i lista kursantów z paskami godzin.',
      },
      {
        id: 'uloz',
        kicker: 'Ułóż grafik',
        title: 'Tydzień układa się sam. Ty tylko zatwierdzasz.',
        text: 'Wskazujesz tydzień i instruktorów, kursant24 proponuje terminy z ich dostępności. Pilnuje dziennego limitu jazd kursanta: 2 h przez pierwsze 8 h szkolenia, potem 3 h.',
        shot: 'uloz-pc',
        note: 'Lena: max 2 h dziennie!',
        frame: 'laptop',
        alt: 'Okno „Ułóż grafik” z listą proponowanych jazd na tydzień i przyciskiem Zatwierdź.',
      },
      {
        id: 'czat',
        kicker: 'Czat',
        title: 'Termin proponujesz w czacie, kursant klika Przyjmij.',
        text: 'Zamiast dziesięciu SMS-ów jedna wiadomość z propozycją terminu. Kursant odpowiada jednym przyciskiem, a przyjęty termin trafia do grafiku.',
        shot: 'czat-tel',
        note: 'SMS do Kowalskiej, 3. raz',
        frame: 'phone',
        alt: 'Czat kursanta ze szkołą: karta propozycji terminu jazdy z przyciskami Odrzuć i Przyjmij.',
      },
      {
        id: 'postep',
        kicker: 'Postęp',
        title: 'Kursant sam widzi swoje godziny.',
        text: 'Ile godzin z 30 ma za sobą, kiedy najbliższa jazda, z kim i skąd start. Mniej telefonów z pytaniem, ile jeszcze zostało.',
        shot: 'start-tel',
        note: 'Nowak dzwoni: ile mi zostało?',
        frame: 'phone',
        alt: 'Ekran startowy kursanta: najbliższe zajęcia i pierścień postępu 12 z 30 godzin.',
      },
      {
        id: 'karta',
        kicker: 'E-karta zajęć',
        title: 'Karta zajęć bez długopisu.',
        text: 'Instruktor odznacza obecność, kursant potwierdza jazdę swoim loginem i hasłem. Kartę przeprowadzonych zajęć pobierasz jako PDF, gotową do wydruku.',
        shot: 'karta',
        note: 'karta Dudka: brak podpisu',
        frame: 'paper',
        alt: 'Karta przeprowadzonych zajęć w PDF: tabela jazd i wykładów z datami, godzinami, instruktorem i potwierdzeniem elektronicznym.',
      },
    ],
  },
  index: {
    label: 'Czego nie zrobi zeszyt',
    h2: 'Rzeczy, których zeszyt nie umie',
    rows: [
      { title: 'E-karta zajęć', note: 'w każdym planie, od Solo', shot: 'karta', href: '/dla-szkol/#cennik' },
      { title: 'Grafik, który się układa', note: 'limit 2 h, potem 3 h dziennie', shot: 'uloz-pc', href: '/dla-szkol/#dzien' },
      { title: 'Zwolnione okienka', note: 'lista oczekujących, pierwszy przyjmuje', shot: 'powiadomienia-tel', href: '/dla-szkol/#dzien' },
      { title: 'Przypomnienia o jeździe', note: '24 h i 2 h przed zajęciami', shot: 'potwierdz-tel', href: '/dla-szkol/#dzien' },
      { title: 'Wpłaty i raty', note: 'kto zapłacił, kto zalega', shot: 'pulpit-pc', href: '/dla-szkol/#cennik' },
      { title: 'Kursanci i godziny', note: 'pasek godzin przy każdym nazwisku', shot: 'kursanci-pc', href: '/dla-szkol/#dzien' },
    ],
  },
  kod: {
    label: 'Kod zamiast hasła',
    code: 'K7QX-4MRT',
    h2: 'Kursant nie zakłada konta. Dostaje kod.',
    steps: [
      { n: '1', title: 'Dodajesz kursanta', text: 'kursant24 tworzy login, hasło startowe i kod z QR, ważny 7 dni. Drukujesz kartkę albo wysyłasz zdjęcie.' },
      { n: '2', title: 'Kursant wpisuje kod', text: 'Albo skanuje QR. Nie musi niczego instalować, aplikacja działa też w przeglądarce.' },
      { n: '3', title: 'Ustawia własne hasło', text: 'Przy pierwszym logowaniu. Od tej chwili widzi swój grafik, godziny i czat ze szkołą.' },
    ],
    shot: 'dostep-tel',
    alt: 'Dane dostępu nowego kursanta: kod QR, kod aktywacyjny, login i hasło startowe.',
  },
  map: {
    label: 'Mapa szkół',
    h2: 'Twoja szkoła pewnie już jest na mapie.',
    text: 'Mapa w kursant24 startuje z publicznymi danymi OpenStreetMap: tyle punktów oznaczonych jako szkoła jazdy. To nie są nasi klienci. Kursant szuka na niej szkoły, a Ty możesz zgłosić swoją i uzupełnić jej wpis.',
    attribution: 'Dane o szkołach jazdy: © współtwórcy OpenStreetMap, licencja ODbL',
  },
};

export const plans = {
  label: 'Cennik',
  h2: 'Cennik na czas pilotażu',
  note: 'Ceny robocze. Mogą się zmienić przed uruchomieniem, ostateczny cennik ogłosimy przed pierwszym płatnym miesiącem.',
  free: '30 dni za darmo, bez karty płatniczej.',
  pick: 'polecamy na start',
  rows: [
    { name: 'Solo', who: '1 instruktor', price: 89, items: ['Grafik jazd i wykładów', 'Konta kursantów i kody aktywacji', 'Czat z propozycją terminu', 'E-karta zajęć', 'Postęp godzin i dokumenty'] },
    { name: 'Szkoła', who: 'do 5 instruktorów', price: 179, items: ['Wszystko z planu Solo', 'Grafik, który sam się układa', 'Lista oczekujących na zwolnione terminy', 'Wpłaty i raty za kurs', 'Statystyki zdawalności'] },
    { name: 'Pro', who: 'bez limitu instruktorów', price: 299, items: ['Wszystko z planu Szkoła', 'Wiele oddziałów'] },
  ],
  soon: ['Integracja z PKK', 'Powiadomienia SMS', 'Płatności online'],
  soonLabel: 'W planach, jeszcze niedostępne',
  compare: [
    { row: 'Instruktorzy', v: ['1', 'do 5', 'bez limitu'] },
    { row: 'Grafik, czat, kody dla kursantów', v: [true, true, true] },
    { row: 'E-karta zajęć', v: [true, true, true] },
    { row: 'Postęp godzin i dokumenty', v: [true, true, true] },
    { row: 'Grafik, który sam się układa', v: [false, true, true] },
    { row: 'Lista oczekujących', v: [false, true, true] },
    { row: 'Wpłaty i raty', v: [false, true, true] },
    { row: 'Statystyki zdawalności', v: [false, true, true] },
    { row: 'Wiele oddziałów', v: [false, false, true] },
    { row: 'PKK, SMS, płatności online', v: [false, false, 'w planach'] },
  ] as { row: string; v: (string | boolean)[] }[],
};

export const faqHome = [
  { q: 'Czy kursant płaci za aplikację?', a: 'Nie. Płaci szkoła, w abonamencie. Kursant dostaje dostęp od szkoły i nic nie kupuje.' },
  { q: 'Czy trzeba coś instalować?', a: 'Nie. kursant24 działa w przeglądarce na telefonie i komputerze. Można go też dodać do ekranu głównego jak aplikację.' },
  { q: 'Kto widzi dane kursantów?', a: 'Tylko Twoja szkoła: właściciel widzi wszystko, instruktor swoje zajęcia i swoich kursantów, kursant tylko siebie. Hasła nie są nigdzie zapisane jawnym tekstem.' },
  { q: 'Potrzebujemy nowego sprzętu?', a: 'Nie. Wystarczy telefon albo komputer, którego już używasz.' },
  { q: 'Ile trwa wdrożenie?', a: 'Zwykle jeden dzień: dodajesz instruktorów i kursantów, rozdajesz kody. Listę kursantów z Excela albo zeszytu przeniesiemy za Ciebie.' },
  { q: 'Czy można zacząć w środku roku?', a: 'Tak. Dodajesz tylko kursantów, którzy są w trakcie kursu, z godzinami, które już wyjeździli.' },
];

export const dlaSzkol = {
  title: 'Dla szkół jazdy',
  description: 'kursant24 dla właścicieli szkół jazdy: dzień z aplikacją, cennik roboczy (89 zł, 179 zł, 299 zł miesięcznie) i odpowiedzi na pytania właścicieli.',
  label: 'Dla szkół jazdy',
  h1: 'Dzień właściciela szkoły, przepisany na czysto.',
  lead: 'Nie zmieniasz sposobu pracy. Przenosisz go z zeszytu do aplikacji, którą widzą też instruktorzy i kursanci.',
  dayLabel: 'Twój dzień z kursant24',
  day: [
    { t: '7:30', note: 'raty: kto nie zapłacił?', title: 'Kawa i pulpit', text: 'Jazdy w tym tygodniu, brakujące dokumenty i zaległe raty na jednym ekranie, zanim zadzwoni pierwszy telefon.', shot: 'pulpit-pc', alt: 'Pulpit właściciela: liczba aktywnych kursantów, jazdy w tym tygodniu, zaległe płatności, brakujące dokumenty i grafik tygodnia.' },
    { t: '9:00', note: 'nowa: Wiśniewska, tel?', title: 'Nowy kursant', text: 'Wpisujesz imię, nazwisko i telefon. kursant24 tworzy login i kod aktywacyjny, który drukujesz albo wysyłasz.', shot: 'dostep-tel', alt: 'Dane dostępu nowego kursanta: kod QR, kod aktywacyjny, login i hasło startowe.' },
    { t: '12:15', note: 'Lis odwołał 14:00, dzwonić po kolei', title: 'Instruktor odwołuje jazdę', text: 'Zwolnione okienko trafia do kursantów z listy oczekujących. Pierwszy, który przyjmie, dostaje termin. Nie dzwonisz do nikogo.', shot: 'powiadomienia-tel', alt: 'Powiadomienia kursanta: propozycja jazdy od instruktora, przypomnienie o dokumencie i nowa jazda do potwierdzenia.' },
    { t: '16:00', note: 'Dudek: przypomnieć!', title: 'Kursant jest na czas', text: 'Przypomnienie przyszło 24 h i 2 h przed jazdą, kursant potwierdził termin w aplikacji.', shot: 'potwierdz-tel', alt: 'Szczegóły jazdy u kursanta: data, godzina, instruktor, samochód, miejsce startu i przyciski Nie pasuje oraz Potwierdzam.' },
    { t: '21:40', note: '21:40, dzwoni Nowak…', title: 'Telefon milczy', text: 'Pytania o termin czekają w czacie do rana. Odpowiadasz, kiedy masz chwilę.', shot: 'czat-tel', alt: 'Czat kursanta ze szkołą z kartą propozycji terminu jazdy.' },
  ],
  migration: {
    h2: 'Zeszyt przepiszemy za Ciebie.',
    text: 'Na czas pilotażu przenosimy listę kursantów z zeszytu, Excela albo innej aplikacji, bez dodatkowych kosztów. Ty sprawdzasz i rozdajesz kody.',
  },
  faq: [
    { q: 'Czy mogę przenieść dane z Excela albo innego systemu?', a: 'Tak. Na czas pilotażu pomagamy wprowadzić listę kursantów ręcznie albo z arkusza.' },
    { q: 'Czy widzę, co robią moi instruktorzy?', a: 'Tak. Grafik całej szkoły widzi właściciel, instruktor widzi tylko swoje zajęcia i swoich kursantów.' },
    { q: 'Co z kursantami, którzy płacą gotówką?', a: 'Wpłatę gotówkową zapisujesz w aplikacji jak każdą inną. To notatka o płatności, bez obsługi płatności online.' },
    { q: 'Czy muszę podpisywać długą umowę?', a: 'Nie. Na czas pilotażu to abonament miesięczny, który można zakończyć w każdej chwili.' },
    { q: 'Jak działa e-karta zajęć?', a: 'Instruktor oznacza obecność po jeździe, kursant potwierdza zajęcia w aplikacji swoim loginem i hasłem. Z tych wpisów powstaje karta przeprowadzonych zajęć w PDF.' },
  ],
};

export const dlaKursantow = {
  title: 'Dla kursantów',
  description: 'Jak zacząć z kursant24, jeśli Twoja szkoła jazdy z niego korzysta: kod od szkoły, własne hasło, grafik jazd, postęp godzin i czat.',
  label: 'Dla kursantów',
  h1: 'Twoja szkoła jazdy w telefonie.',
  lead: 'Widzisz swoje jazdy i wykłady, wiesz, ile godzin masz za sobą, a o zmianę terminu piszesz w czacie. Za aplikację płaci szkoła.',
  stepsLabel: 'Jak zacząć',
  steps: [
    { n: '1', title: 'Dostajesz kod ze szkoły', text: 'Na kartce albo w wiadomości. Kod ma osiem znaków, na przykład K7QX-4MRT, i jest ważny 7 dni.', shot: 'dostep-tel', alt: 'Kartka z danymi dostępu: kod QR, kod aktywacyjny i login.' },
    { n: '2', title: 'Wpisujesz go w kursant24', text: 'Wybierasz „Kod ze szkoły” albo skanujesz QR. Przy pierwszym logowaniu ustawiasz własne hasło.', shot: 'kod-tel', alt: 'Ekran logowania z polem na kod aktywacyjny i przyciskiem Zeskanuj kod QR.' },
    { n: '3', title: 'Widzisz swój kurs', text: 'Najbliższe zajęcia, postęp godzin i wiadomości ze szkoły. Tyle.', note: 'Gotowe. Dalej już tylko jazdy.' },
  ],
  seeLabel: 'Co widzisz w aplikacji',
  see: [
    { title: 'Grafik', note: 'jazda w czwartek, o której?', text: 'Jazdy i wykłady na liście albo w tygodniu, z instruktorem, autem i miejscem startu.', shot: 'grafik-tel', alt: 'Grafik kursanta: lista zajęć z godzinami, instruktorem i miejscem startu.' },
    { title: 'Propozycje terminów', note: 'dzwonić do szkoły czy pisać?', text: 'Szkoła proponuje jazdę w czacie, Ty klikasz Przyjmij albo Odrzuć.', shot: 'czat-tel', alt: 'Czat ze szkołą z kartą propozycji terminu.' },
    { title: 'Przypomnienia', note: 'znowu zapomniana jazda', text: 'Dzień przed jazdą i dwie godziny przed nią. Potwierdzasz jednym przyciskiem.', shot: 'potwierdz-tel', alt: 'Szczegóły jazdy z przyciskami Nie pasuje i Potwierdzam.' },
  ],
  faq: [
    { q: 'Ile kosztuje aplikacja?', a: 'Dla Ciebie nic. Płaci szkoła jazdy.' },
    { q: 'Kod nie działa albo minęło 7 dni.', a: 'Poproś szkołę o nowy. Właściciel może w każdej chwili wygenerować nowy kod i hasło startowe.' },
    { q: 'Muszę coś pobierać ze sklepu?', a: 'Nie. Wystarczy przeglądarka. Jeśli chcesz, dodaj kursant24 do ekranu głównego.' },
    { q: 'Kto widzi moje dane?', a: 'Tylko Twoja szkoła jazdy i Twój instruktor. Inni kursanci nie widzą Twoich danych.' },
    { q: 'Mojej szkoły nie ma w kursant24.', a: 'Pokaż jej tę stronę. Szkoła może umówić prezentację, pierwsze 30 dni jest bezpłatne.' },
  ],
};

export const pilotaz = {
  title: 'Umów prezentację',
  description: 'Umów krótką prezentację kursant24 dla swojej szkoły jazdy: pokażemy aplikację na żywo i omówimy pilotaż, 30 dni za darmo, bez karty płatniczej.',
  label: 'Prezentacja',
  h1: 'Umów prezentację.',
  lead: 'Pokażemy Ci aplikację na żywo, dopasujemy plan do wielkości szkoły i, jeśli zechcesz, przeniesiemy Twoich kursantów. Pierwsze 30 dni za darmo, bez karty płatniczej.',
  promises: ['Bez karty płatniczej', 'Dane przeniesiemy za Ciebie', 'Rezygnujesz w każdej chwili'],
  sizes: ['1 do 10', '11 do 30', '31 do 60', 'ponad 60'],
  consent: 'Zgadzam się na kontakt w sprawie prezentacji kursant24. Dane posłużą tylko do odpowiedzi na to zgłoszenie.',
  demoNote: 'To wersja demonstracyjna strony: formularz niczego nie wysyła.',
  done: {
    h2: 'Przepisane na czysto.',
    text: 'Tak wyglądałoby Twoje zgłoszenie. To wersja demonstracyjna strony, więc nic nie zostało wysłane i nikt się z Tobą nie skontaktuje.',
    alt: 'Napisz do nas bezpośrednio:',
  },
};

export const notFound = {
  title: 'Nie ma takiej strony',
  h1: 'Tej strony nie ma w grafiku.',
  note: 'jazda o 25:00??',
  text: 'Adres mógł się zmienić albo ktoś pomylił godzinę. Wróć na stronę główną albo zobacz, co kursant24 daje szkołom.',
};

// Ciemna plansza na końcu strony (finał). Kursanci dostają własny wariant.
export type Finale = { kicker: string; h: string; text: string; cta: { href: string; label: string } };
export const finaleSzkoly: Finale = {
  kicker: 'Prezentacja',
  h: 'Zamknij zeszyt.',
  text: 'Umów krótką prezentację, a potem decyzja, czy zostać, należy do Ciebie. Pierwsze 30 dni nic nie płacisz.',
  cta: { href: '/pilotaz/', label: 'Umów prezentację' },
};
export const finaleKursanci: Finale = {
  kicker: 'Twojej szkoły tu nie ma?',
  h: 'Pokaż ją swojej szkole.',
  text: 'kursant24 włącza szkoła jazdy. Wyślij właścicielowi link do strony dla szkół.',
  cta: { href: '/dla-szkol/', label: 'Strona dla szkół jazdy' },
};

export const footer = {
  line: 'Aplikacja dla szkół jazdy. Koniec z zeszytem.',
  status: 'Projekt w fazie testów, przed uruchomieniem. Ceny są robocze.',
  osm: '© współtwórcy OpenStreetMap, ODbL',
  copy: '© 2026 kursant24',
};

// Polska typografia: jednoliterowe spójniki i przyimki nie zostają na końcu wiersza
// (twarda spacja do następnego słowa). Wpisy ołówkiem zostają jak są.
const sierotki = (s: string) => s.replace(/(^|[\s(„])([aiouwzAIOUWZ])\s+/g, '$1$2 ').replace(/(^|[\s(„])([aiouwzAIOUWZ])\s+/g, '$1$2 ').replace(/(\d) (h|zł|min|km)(?=[\s.,;:)!?]|$)/g, '$1 $2');
function popraw(o: any): any {
  if (typeof o === 'string') return sierotki(o);
  if (Array.isArray(o)) { o.forEach((v, i) => (o[i] = popraw(v))); return o; }
  if (o && typeof o === 'object') { for (const k of Object.keys(o)) if (k !== 'href') o[k] = popraw(o[k]); return o; }
  return o;
}
[site, home, plans, faqHome, dlaSzkol, dlaKursantow, pilotaz, notFound, finaleSzkoly, finaleKursanci, footer].forEach(popraw);
