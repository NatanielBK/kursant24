# kursant24, strona marketingowa (strona-awwwards): DESIGN

Dokument planistyczny skilla /awwwards (Faza 0 do 2). Źródło prawdy dla kolejnych przebiegów.

## Faza 0: brief

- **Podmiot:** kursant24, aplikacja i SaaS dla ośrodków szkolenia kierowców (OSK). Trzy role: uczeń (kursant), instruktor, właściciel.
- **Odbiorca główny:** właściciel OSK (małej lub średniej szkoły, 1 do kilkunastu instruktorów). Dziś prowadzi grafik w zeszycie, Excelu albo w głowie, odbiera telefony o 22:00. Ma poczuć: nowoczesny, solidny produkt, który rozumie jego dzień.
- **Odbiorca drugi:** kursant (osobna podstrona, prosty język, „Ty”).
- **Zadanie strony:** zgłoszenie szkoły do pilotażu (30 dni za darmo, bez karty). Drugie: zrozumienie, co aplikacja robi, i cen.
- **Zasoby:** marka (marka/BRAND.md: kolory, Inter, logo SVG, favicony), prawdziwe zrzuty aplikacji (zrzuty/u1, zrzuty/p2), teksty z osk-app/strona, PLAN.md, cennik roboczy z docs.
- **Język:** polski, z polskimi znakami. Nazwa zawsze „kursant24” małymi literami.
- **Ograniczenia:** brak klientów, więc zero opinii, liczb klientów i logotypów. Ceny robocze. PKK, SMS i płatności online oznaczone „w planach”. Strona nie jest wdrażana. Formularz bez backendu (komunikat mówi wprost, że nic nie zostało wysłane).

**Założenia (placeholder):**
- domena `https://kursant24.pl` w configu (canonical, sitemap, OG), niewdrożona;
- e-mail kontaktowy `kontakt@kursant24.pl` (z obecnej strony), niezweryfikowany;
- formularz pilotażu działa tylko lokalnie (pokazuje podsumowanie, nic nie wysyła);
- przykładowe dane w zrzutach (OSK Elka Gliwice, kursanci) to dane demonstracyjne z aplikacji, nie klienci.

**Skala teatru:** landing produktu. Bez loadera, bez WebGL. Ta sama staranność w typografii, układzie i ruchu; jeden sygnaturowy moment.

## Faza 1: koncepcja

| | Koncepcja | Kotwica | O | F | Fe | P (niżej lepiej) |
|---|---|---|---|---|---|---|
| A | **Elka.** Niebieska tablica „L” jako struktura: litera L jako rama każdej sekcji, kąt L przecina siatkę. | Znak L w logo i na dachu każdego auta nauki jazdy w Polsce. | 3 | 5 | 4 | 2 |
| B | **Plac manewrowy.** Linie placu, łuk, koperta i pachołki jako stacje przewijania. | Egzamin na placu WORD. | 4 | 4 | 3 | 2 |
| C | **Brudnopis, potem na czysto.** Szkoła jazdy przepisana z zeszytu w kratkę na czystą stronę: każdy ołówkowy wpis ląduje w swoim okienku grafiku. | Właściciele OSK naprawdę prowadzą grafik w zeszycie. Hasło marki: „Koniec z zeszytem.” Kratka szkolnego zeszytu ma te same kolory co marka (biel, jasny błękit, czerwony margines). | 4 | 5 | 4 | 2 |

Odrzucona wcześniej: „licznik 30 h” (za blisko przykładu z concepts.md).

**Wybór: C.** Jedyny pomysł, który pokazuje ból właściciela (zeszyt) i produkt (grafik) w jednym ruchu, a kratka daje gotowy system siatki.

### Concept Card

```
Idea:        Twoja szkoła jazdy przepisana z zeszytu na czysto: każdy ołówkowy dopisek trafia do swojego okienka w grafiku.
Metaphor:    zeszyt w kratkę i przepisywanie brudnopisu na czystopis.
Signature:   sticky stage w hero (190svh desktop, 160svh telefon). Na kratce leżą odręczne wpisy
             („Kowalska wt 16?? przełożyć”, „Nowak ile h?”, „PKK brak!”), skreślenia, strzałki.
             Przewijanie: każdy wpis podnosi się, prostuje i wskakuje w swoje okienko tygodniowego
             grafiku (HTML). Kratka staje się kolumnami kalendarza. Moduł-sterownik (driver) z
             patterns.md: jedna zmienna p (postęp sceny) ustawia pozycję, obrót, krój i kolor wpisów,
             skreślenia i opis stanu („brudnopis” → „na czysto”).
Emotion:     ulga. Pierwsze 3 sekundy: „to mój zeszyt”. Po przewinięciu: „to mój grafik, uporządkowany”.
Motion verb: podnieś, wyprostuj, wepnij (lift, straighten, snap): expo.out, krótki overshoot zero.
Screenshot:  połowa strony w ołówku na kratce, połowa w czystych niebieskich blokach grafiku.
```

Ruch w spoczynku (idle): czerwona linia „teraz” w grafiku jedzie z prawdziwym zegarem (godzina lokalna), a nieprzepisane wpisy lekko dryfują za wskaźnikiem (kilka pikseli), jak kartka pod ręką. Pod reduced motion wszystko stoi, wpisy są od razu w grafiku obok małego brudnopisu (stan końcowy).

## Faza 2: system

### Paleta (role)

| Rola | Hex | Uwagi |
|---|---|---|
| ground (papier) | `#FFFFFF` | |
| ground-2 (tło sekcji) | `#F7F9FE` | „Tło jasne” z marki |
| line (kratka, linie) | `#DCE5F5` | „Linia” z marki; kratka rysowana tym kolorem |
| ink | `#0B1530` | „Tusz” |
| muted | `#55648A` | „Szary”, AA na bieli (5.9:1) |
| accent | `#0B4FD8` | „Niebieski”, jedyny akcent; CTA, wpięte bloki |
| deep (finał, kurtyna) | `#061A45` z tekstem `#FFFFFF` i akcentem `#7FA8FF` | „Noc” |
| graphite (ołówek) | `#3E4452` | tylko wpisy odręczne |
| margin (czerwony margines, linia „teraz”) | `#E5484D` | rzadko: margines zeszytu, linia „teraz”, skreślenia |

Dlaczego niebiesko-biała, choć to bliskie „SaaS niebieski”: marka ją narzuca, a koncepcja (zeszyt szkolny: biel, błękitna kratka, czerwony margines) robi z niej materiał, nie ozdobę. Brak gradientów.

### Typografia

- **Inter** (Google, OFL, 400 do 900, latin + latin-ext): jedyny krój marki (BRAND.md). Display 800, tracking −0.045em przy dużych rozmiarach (−0.035em przy t-l), leading 0.92 do 0.98. Tekst 400/500, 17 px, leading 1.55. Etykiety 700 wersalikami +0.08em, 12 do 13 px.
- **Olowek** (Caveat z Google, OFL, 500 do 700, latin-ext): wyłącznie odręczne wpisy w zeszycie, które niosą informację (nazwiska, godziny, „PKK brak”). Nigdy w nagłówkach ani UI.
- Skala płynna (tokens.css): mega `clamp(3.4rem, 0.9rem + 10.6vw, 12.5rem)`, xl `clamp(2.4rem, 1.2rem + 5vw, 6rem)`, l, m, body, s, xs.
- Liczby: `tabular-nums` w cenach, godzinach, kodach.

### Siatka i rytm

- **Moduł kratki:** `--k` = 28 px na desktopie, 24 px na telefonie. Tło sekcji „zeszytowych” rysuje kratkę tym modułem (`background-size: var(--k) var(--k)`). Odstępy pionowe są wielokrotnościami `--k`.
- 12 kolumn, gutter płynny. Czerwony margines: pionowa linia na lewej krawędzi treści w sekcjach zeszytowych (desktop: kolumna 1; telefon: 18 px od krawędzi).
- Wyrównanie: duże nagłówki z ujemnym wcięciem optycznym (−0.05em), tekst do kolumny 2 lub 7.
- Rytm sekcji zmienny: hero sticky (190svh) → manifest (gęsty, 3 linie display) → rozdziały sticky (długie) → indeks (zwarty) → kod (jedna wielka linia) → cennik (tabela) → mapa (pełna szerokość) → FAQ (wąski) → finał (ciemny, pełny ekran).

### Kształt

Jedna reguła: **14 px** promienia dla elementów interfejsu i zrzutów (jak w aplikacji, spójność z produktem), **0** dla wszystkiego, co jest „papierem” (kartki, linie, tabela cennika). Przyciski: pigułka nie, 14 px.

### Język ruchu

- Ease: `expo.out` dla wejść, `expo.inOut` dla przejść stron, `power3.out` dla hover. Jedna rodzina.
- Czasy: hover 0.3 do 0.5 s, linie tekstu 1.1 s (stagger 0.08), wpięcie wpisu w sygnaturze (scrub), przejście strony 0.8 + 0.9 s.
- Czasownik w praktyce: elementy wchodzą z lekkim obrotem (1 do 3°) i prostują się do 0 („wyprostuj”), a nie lecą z dołu. Zrzuty w rozdziałach podnoszą się (y + rotate → 0).
- **Przejście stron:** świeża kartka w kratkę (z czerwonym marginesem) zakrywa stronę od dołu z tytułem następnej strony pisanym ołówkiem, potem zsuwa się w górę. ≤ 1 s w każdą stronę.
- **Hover (po jednym na rolę):**
  - CTA: wypełnienie od strony wskaźnika (buttonFill), granat → akcent.
  - Nawigacja: podkreślenie rysowane (draw), bieżąca strona podkreślona na stałe.
  - Linki w tekście: podkreślenie w spoczynku, unosi się w pasek zakreślacza.
  - Wiersze indeksu (wyróżniki): wiersz „wpina się” (tekst przesuwa się o 1 kratkę w prawo, pojawia się zakreślenie markerem), podgląd zrzutu podąża za kursorem (indexPreview); na dotyku miniatura w wierszu.
  - Zrzuty: prostują się i lekko powiększają w ramce.
  - Linki użytkowe (stopka): tylko kolor.
- Rama nagłówka usuwa się przy przewijaniu w dół, wraca w górę (frame-away).
- Menu mobilne: nakładka z pułapką fokusu, Escape zamyka.

### Plan kompozycji (ASCII)

**Strona główna `/`**

```
1. HERO, sticky stage (rodzina: scena / pełny ekran)
┌───────────────────────────────────────────────────────────┐
│ [logo]                      Dla szkół  Dla kursantów  [Pilotaż]│
│ │ SZKOŁA JAZDY W TELEFONIE                                 │
│ │ Koniec                    ┌ pn  wt  śr  czw  pt  sob ┐   │
│ │ z zeszytem.               │ ··  ✎Kowalska wt 16??  ·· │   │
│ │ lead 2 zdania             │ ✎Nowak ile h?    ✎PKK!   │   │
│ │ [Zgłoś szkołę] [Zobacz]   │ ... grafik / kratka ...   │   │
│ │                           └───────────────────────────┘   │
│ brudnopis ──●────────── na czysto      (stan, liczba wpiętych)│
└───────────────────────────────────────────────────────────┘
 telefon: tytuł na górze, poniżej scena (kratka 7 kolumn → 3 dni), wpisy wpinają się w listę dnia.

2. MANIFEST (rodzina: typografia na całą szerokość, skreślenia)
   Zeszyt w drugim aucie. ─────  (przekreślone ołówkiem na scrollu)
   Telefon o 22:00, bo „która ta jazda jutro”. ─────
   Dziesięć SMS-ów, żeby przełożyć jedną godzinę. ─────
   → „kursant24 zbiera to w jednym grafiku, który widzą wszyscy.”

3. ROZDZIAŁY (rodzina: sticky media + przewijany tekst, 2 kolumny)
   ┌ 01 Grafik ───────┐   ┌──────── ramka laptop/telefon ┐
   │ 02 Ułóż grafik   │   │   zrzut zmienia się z rozdz. │
   │ 03 Czat z termin.│   │                              │
   │ 04 Postęp 30 h   │   └──────────────────────────────┘
   telefon: każdy rozdział = tekst + własny zrzut pod nim.

4. INDEKS „czego nie ma w zeszycie” (rodzina: lista liniowana jak zeszyt)
   01  E-karta zajęć w każdym planie        podpis loginem i hasłem    →
   02  Grafik układa się sam                limit 2 h / 3 h dziennie   →
   03  Zwolnione okienka                     lista oczekujących         →
   04  Przypomnienia                         24 h i 2 h przed jazdą     →
   + podgląd zrzutu przy kursorze; na dotyku miniatura w wierszu.

5. KOD ZAMIAST HASŁA (rodzina: jedna wielka linia + sekwencja 3 kroków)
             K7QX-4MRT   (mega, tabular, litery wpisują się po kolei)
   1 Szkoła dodaje kursanta   2 Kursant wpisuje kod   3 Ustawia hasło

6. CENNIK (rodzina: księga, tabela z liniami, nie karty)
   Plan     Instruktorzy   Cena/mies.   Co w środku
   Solo     1              89 zł        ...
   Szkoła   do 5           179 zł       ...   (wyróżniona markerem)
   Pro      bez limitu     299 zł       ...
   * ceny robocze; w planach: PKK, SMS, płatności online

7. MAPA (rodzina: pełna szerokość, dane)
   kropki ~900 szkół z OSM na konturze Polski, licznik, atrybucja ODbL.

8. FAQ (rodzina: wąska kolumna, details/summary)

9. FINAŁ (rodzina: ciemna plansza na pełny ekran)
   Noc. „Zgłoś szkołę do pilotażu.” 30 dni za darmo, bez karty. [CTA]
   stopka: linki, „projekt w fazie testów”, © współtwórcy OpenStreetMap.
```

**`/dla-szkol/`**: hero (h1 + kartka „dzień właściciela” z godzinami 7:30, 12:00, 21:40 jako oś), oś dnia z kursant24 (sticky timeline), pełne porównanie planów, migracja z Excela, FAQ właściciela, finał.

**`/dla-kursantow/`**: hero (kod K7QX-4MRT jako h1-obraz obok), 3 kroki aktywacji (zrzuty telefonu), co widzisz (grafik, postęp, czat), FAQ kursanta, link „Twojej szkoły jeszcze nie ma?”.

**`/pilotaz/`**: formularz na kartce w kratkę (pola jak na obecnej stronie), po wysłaniu: wpis „na czysto” z podsumowaniem i jasną informacją, że to wersja demonstracyjna i nic nie zostało wysłane.

**`/404`**: „Tej strony nie ma w grafiku.” Wymazany wpis ołówkiem, linki powrotu.

**Figura objaśniająca (anatomy):** nie. Sygnatura (zeszyt → grafik) już tłumaczy mechanizm. Skill anatomy nie jest zainstalowany; jedyna sekcja, która by mogła z niego skorzystać, to „Grafik układa się sam”.

### Test generyczności

| Odruch generycznego modelu | Co zmieniłem |
|---|---|
| Niebieski hero SaaS: nagłówek po lewej, telefon po prawej, gradient | Hero to zeszyt w kratkę z ołówkowymi wpisami, które przewijanie przepisuje w grafik. Zero gradientów. |
| Trzy karty funkcji z ikonami | Rozdziały ze sticky zrzutem i liniowany indeks wyróżników. |
| Trzy karty cenowe, środkowa „najpopularniejsza” | Księga cen (tabela z liniami). Plan Szkoła podświetlony z dopiskiem ołówkiem „polecamy na start” (rekomendacja, nie dane o popularności). |
| Sekcja opinii i logotypów klientów | Brak (nie ma klientów). Zamiast niej prawdziwe dane: mapa szkół z OSM. |
| Fade-up na każdej sekcji | Wejścia „wyprostuj” (obrót → 0), skreślenia ołówkiem w manifeście, kod wpisujący się znak po znaku. |
| Okrągły kursor-follower i magnetyczne przyciski | Nie ma. Natywny kursor, buttonFill na CTA, podgląd zrzutu w indeksie. |

### Decyzje techniczne

- Stack: **Astro 7** (statyczny HTML, minimalny JS, ClientRouter do przejść), GSAP + SplitText + ScrollTrigger, Lenis. Bez OGL (brak GL).
- Bez loadera (landing produktu; LCP to tekst h1).
- Zrzuty jako `<Image>` z `src/assets` (AVIF/WebP, wymiary).
- Mapa: kropki generowane w czasie budowania z `data/osk.geojson` do SVG (bez kafelków, bez JS).

## Faza 4: QA, decyzje po przeglądach

- **Dopiski ołówkiem** (`.dopisek-r`) przy zrzutach to zdania z zeszytu („SMS do Kowalskiej, 3. raz”). Gdy zrzut wjeżdża w widok, dopisek zostaje skreślony czerwoną kreską (`--kreska`, SVG w tle, `background-size` 0 → 100%): aplikacja zastąpiła zapisek. W scenie na komputerze kopia dopisku idzie z atrybutu `data-note`, żeby tekst nie powtarzał się w DOM. Na telefonie dopisek stoi statycznie nad zrzutem.
- **Manifest** („jak jest dziś”): skreślenie jest tłem z `box-decoration-break: clone`, więc kreska idzie przez każdą złamaną linię. Scrubowane przewijaniem; przy wyłączonym ruchu skreślone od razu.
- Kolory: `--pen` (ołówek), `--c-margin-ink` (czerwony atrament marginesu, kontrast AA), `--kreska` (kreska skreślenia).
- **Znacznik „teraz” w zeszycie** w hero: czerwona linia z godziną w marginesie. Etykieta godziny siatki, na którą najeżdża, chowa się (jak w kalendarzu).
- **Krok 3 na /dla-kursantow/** nie ma zrzutu (żaden nie pokazywał nic nowego): zamiast niego kartka w kratkę z dopiskiem „Gotowe. Dalej już tylko jazdy.”.
- **Sierotki:** `sierotki()` w `site.ts` wstawia twarde spacje po jednoliterowych słowach i między liczbą a jednostką. SplitText domyślnie zwija `\s+` (z twardą spacją włącznie), dlatego w `reveal.ts` jest `reduceWhiteSpace: false` i własne `prepareText`. Porównania z tekstami z danych muszą tolerować twardą spację (np. tag „w planach”).
- Usunięta animacja podpowiedzi przewijania w hero (ruch dla ruchu); została statyczna linia z tekstem.
- **/pilotaz/ w spoczynku stoi** (`idleMotion: false`) z wyboru: to formularz, ruch by rozpraszał. Życie dają hovery, fokus i przejście strony.
- Długi `settledMs` na telefonie wynika z żyjącego zegara „teraz” i ruchu w spoczynku. To decyzja, nie błąd.
- Fałszywe alarmy skryptów QA: `keyboard.stuck` na /pilotaz/ (pola nazywane po tekście, każde to „INPUT”), `skipLinkFirst: false` (szuka „skip”, a link brzmi „Przejdź do treści”).
- **Wynik:** osobni krytycy w kolejnych przebiegach 7,0 → 7,3 → 7,15; /jury (niezależny krytyk) 7,5, szacunek jury ok. 8,6 (zakres Site of the Day). Karta: `.jury/127.0.0.1-4400/scorecard.md`. Po werdykcie jedna runda poprawek: hierarchia cennika (polecany plan), tabela porównania na telefonie, skreślenia w manifeście, dopiski przy zrzutach, sierotki, krok 3.
