# kursant24, strona marketingowa (strona-v5): DESIGN

Dokument opisuje faktyczne decyzje wizualne v5. Zastępuje poprzednią wersję (koncepcja „zeszyt w kratkę”, GSAP/Lenis, sticky stage), która została odrzucona razem z całym ruchem scroll-triggered.

## Powód przebudowy

Poprzednia koncepcja opierała całe „wow” na scrollowanym ruchu (pinning, sticky stage, GSAP ScrollTrigger). Nowe twarde ograniczenie: zero scroll-triggered animacji, pinningu, parallaxy, GSAP. „Wow” ma wynikać z jakości wizualnej (typografia, światło, realne zrzuty UI), nie z ruchu. Dopuszczony jest tylko CSS: hover/focus, jedno łagodne wejście hero przy starcie strony (≤600 ms), pełne wsparcie `prefers-reduced-motion`.

## Kierunek: premium SaaS (Linear / Stripe / Vercel / Raycast), w kolorach marki

- **Paleta:** niebiesko-biała, czerwień tylko jako mały akcent („kolor tablicy L”) — kropka przed eyebrow, podkreślenie aktywnego linku w nawigacji, czasem ikona ostrzeżenia. Nigdy jako duża powierzchnia.
- **Header:** trwały, ciemny, szklany (`backdrop-filter: blur` + `color-mix` na granat) na każdej stronie i w każdym miejscu scrolla — nie tylko nad hero. Rozwiązanie bez JS: unika stanu zależnego od scrolla (co naruszałoby zasadę zero scroll-triggered), a jednocześnie daje efekt znany z Linear/Vercel (ciemny pasek nawigacji nad jaśniejszą treścią).
- **Hero:** ciemny granat z teksturą szumu (SVG `feTurbulence` w `::before`, `mix-blend-mode: overlay`) i poświatą (radial-gradient). Kompozycja urządzeń: laptop + telefon nachodzące na siebie (prawdziwe zrzuty `src/assets/zrzuty`, nie płaska grafika), z 3 unoszącymi się „chipami” pokazującymi realne stany UI („Jazda potwierdzona”, „Zwolnione okienko → przyjęte”, „Postęp 18/30 h”). Na desktopie urządzenia i chipy pozycjonowane bezwzględnie (procentowe inset); na telefonie (<900px) układ liniowy z zachodzeniem przez ujemny margines, żeby uniknąć crop/nakładania się tekstu.
- **Sekcja funkcji:** siatka bento (CSS grid, `nth-child`-owe rozpiętości, `grid-auto-flow: dense` od 1100px) z fragmentami prawdziwych zrzutów w każdym kaflu (crop przez `object-fit`/`object-position`), gradientowa ramka (`background: … padding-box, … border-box`), hover = uniesienie (`translateY(-4px)`), bez podążania za kursorem (brief dawał wybór uniesienie/kursor, wybrano prostszą opcję bez JS).
- **Role (właściciel / instruktor / kursant):** karty z własnym zrzutem u góry (`role-card--media`), krój 180px (laptop) / 260px (telefon — podbite po przeglądzie, żeby było widać treść ekranu, nie sam nagłówek aplikacji).
- **CTA band:** ciemna granatowa plansza z tą samą teksturą szumu co hero, duży nagłówek, jasny przycisk.
- **Typografia:** Inter (self-hosted, już w repo) w dużej, ciasnej skali (`h-xl`/`h-l`/`h-m`), bez zmiany kroju.

## Mapowanie zrzutów (żeby nic się nie powtarzało 1:1 w obrębie strony)

- **Hero:** `grafik-pc` (laptop) + `potwierdz-tel` (telefon).
- **Bento (funkcje):** `grafik-pc` (inny crop niż w hero — zbliżenie na listę godzin), `uloz-pc`, `czat-tel`, `powiadomienia-tel`, `dzis-tel`, `karta`.
- **Role:** `pulpit-pc` (właściciel), `grafik-tel` (instruktor), `kod-tel` (kursant).
- **`/dla-szkol/`:** podhero `pulpit-pc` (już istniejące), sekcja „Twój dzień” rozszerzona o `kursanci-pc` w układzie `.split` (tekst + zrzut).
- **`/dla-kursantow/`:** podhero `start-tel`, sekcja „Jak zacząć” rozszerzona o `dostep-tel` w `.split`.

`grafik-pc` użyty dwukrotnie na stronie głównej (hero + bento) celowo, z innym kadrowaniem — jak ujęcie ustanawiające, potem zbliżenie, nie powtórzony identyczny obraz.

## Techniczne decyzje warte zapamiętania

- **Obraz w `<Image>` zawsze z `widths`/`sizes`, nigdy z gołym `width` równym pełnej rozdzielczości źródła** — w bento kaflach początkowo ustawiono stały `width`/`height` na rozmiar źródła (960×600 itd.), co Lighthouse wyłapał jako zbędne ~100 KB transferu (obraz renderowany w ~200 px, pobierany w 960 px). Poprawione przez dodanie `widths`+`sizes` analogicznie do `Shot.astro`.
- **`.hero`/`.cta-band` mają `position:relative; overflow:hidden; isolation:isolate`**, żeby tekstura szumu i bezwzględnie pozycjonowane chipy nie wywoływały poziomego scrolla.
- **Chipy w hero wymagają klasy modyfikatora** (`chip--1/2/3`), sama klasa bazowa `chip` nie pozycjonuje — realny błąd złapany dopiero przez zrzut ekranu (`getBoundingClientRect` pokazywał identyczne współrzędne dla wszystkich trzech).
- **`.features-grid`/`.feature-card` (proste karty tekstowe, używane też na `/cennik`) celowo nie scalone z nowym `.bento`** — `/cennik` używa tych samych klas bez zrzutów; bento to osobny, addytywny system tylko dla strony głównej.

## QA

- Zero poziomego scrolla przy 390/768/1440/1920 px (zmierzone automatycznie, nie tylko wizualnie).
- Wysokość strony głównej na telefonie (390×844): ok. 5827 px ≈ 6,9 ekranu — zgodnie z limitem ok. 7 ekranów.
- Lighthouse mobile: patrz RAPORT.md.
