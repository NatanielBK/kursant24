// Treść strony /cennik/. Twarda decyzja: bez kwot i pakietów — tylko wycena indywidualna.
export const cennik = {
  title: 'Cennik',
  description:
    'Cena kursant24 zależy od wielkości szkoły jazdy: liczby instruktorów, kursantów w miesiącu i oddziałów. Poproś o wycenę dopasowaną do Twojej szkoły.',
  eyebrow: 'Cennik',
  h1: 'Cena dopasowana do Twojej szkoły.',
  lead: 'Jeden instruktor i sieć z oddziałami nie potrzebują tego samego zakresu. Wycenę przygotowujemy pod konkretną szkołę, nie z cennika na sztywno.',
  factors: {
    eyebrow: 'Od czego zależy cena',
    h2: 'Liczymy to, co faktycznie zużywasz',
    items: [
      { title: 'Liczba instruktorów', text: 'Im więcej osób pracuje w grafiku, tym więcej kont i większy serwer pod obciążenie.' },
      { title: 'Kursanci w miesiącu', text: 'Od kilku do kilkuset osób jeżdżących i logujących się w danym miesiącu.' },
      { title: 'Oddziały i lokalizacje', text: 'Jedna siedziba albo sieć filii z własnymi grafikami i instruktorami.' },
      { title: 'Kategorie prawa jazdy', text: 'B, A, C+E i inne — różne wymagania wobec grafiku i dokumentacji.' },
      { title: 'Wdrożenie i migracja danych', text: 'Przeniesienie listy kursantów z zeszytu, Excela albo innego systemu.' },
      { title: 'Szkolenie zespołu', text: 'Wdrożenie instruktorów i biura w aplikację, żeby start poszedł bez chaosu.' },
    ],
  },
  included: {
    eyebrow: 'Co jest w cenie',
    h2: 'Jeden abonament, bez dopłat za podstawę',
    text: 'Niezależnie od wielkości szkoły, w cenie zawsze dostajesz pełny zestaw funkcji — płacisz za skalę, nie za moduły.',
    items: [
      { title: 'Grafik i rezerwacje jazd', icon: 'calendar' },
      { title: 'Czat z kursantami', icon: 'chat' },
      { title: 'E-karta zajęć', icon: 'card' },
      { title: 'Lista oczekujących', icon: 'list' },
      { title: 'Statystyki zdawalności', icon: 'chart' },
      { title: 'Wdrożenie i migracja danych', icon: 'migrate' },
      { title: 'Szkolenie zespołu', icon: 'users' },
      { title: 'Wsparcie techniczne', icon: 'support' },
    ],
  },
  process: {
    eyebrow: 'Jak to wygląda',
    h2: 'Od rozmowy do startu',
    steps: [
      { n: '01', title: 'Rozmowa', text: 'Poznajemy Twoją szkołę: liczbę instruktorów, kursantów i oddziałów.' },
      { n: '02', title: 'Prezentacja', text: 'Pokazujemy aplikację na żywo i odpowiadamy na pytania na bieżąco.' },
      { n: '03', title: 'Wycena', text: 'Przygotowujemy ofertę dopasowaną do wielkości i potrzeb szkoły.' },
      { n: '04', title: 'Start', text: '30 dni za darmo, bez karty płatniczej. Dane przenosimy za Ciebie.' },
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
  cta: {
    h2: 'Gotowy poznać wycenę swojej szkoły?',
    text: 'Odpowiedz na kilka pytań o szkole, a wrócimy z konkretną ofertą, nie z cennika na sztywno.',
  },
};
