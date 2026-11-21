# kursant24: strona marketingowa (wersja „awwwards”)

Statyczna strona produktu kursant24 dla właścicieli szkół jazdy. Pomysł: **zeszyt w kratkę, który przewijanie przepisuje na czysto**. Ołówkowe wpisy z biurowego zeszytu zamieniają się w grafik, a zapiski ołówkiem skreślają się, gdy aplikacja je zastępuje. Projekt i decyzje opisuje `DESIGN.md`.

Strony: `/` (główna), `/dla-szkol/`, `/dla-kursantow/`, `/pilotaz/` (formularz demonstracyjny) i 404.

## Stack

Astro 7 (statyczny build, ClientRouter do przejść między stronami), GSAP 3 (ScrollTrigger, SplitText), Lenis. Bez WebGL i bez loadera. Zrzuty aplikacji pochodzą z `../zrzuty` i są optymalizowane przez `astro:assets` (AVIF/WebP).

## Uruchomienie

Wymagany Node 22+.

```sh
npm install
npm run build              # wynik w dist/
npx astro preview          # podgląd buildu: http://localhost:4321
```

Zamiast `astro preview` można serwować `dist/` dowolnym serwerem statycznym, np.:

```sh
node ~/.claude/skills/awwwards/scripts/serve.mjs dist --port 4400   # http://127.0.0.1:4400
```

Tryb deweloperski (bez minifikacji, tylko do pracy nad kodem): `npm run dev`.

## Testy i kontrola jakości

Wszystkie poniższe polecenia zakładają build serwowany na `http://127.0.0.1:4400` (inny adres: zmienna `URL`).

```sh
node scripts/test-funkcje.mjs     # 14 testów: formularz pilotażu, menu mobilne, zeszyt, brak błędów konsoli
node ~/.claude/skills/awwwards/scripts/shoot.mjs http://127.0.0.1:4400/ --crawl --nav   # zrzuty, vitals, axe, klawiatura, hover → .shots/
node ~/.claude/skills/awwwards/scripts/audit.mjs http://127.0.0.1:4400/ > .shots/audit.txt   # SEO, meta, a11y, waga
```

Do zrzutów potrzebny jest Chromium dla Playwrighta: `npx playwright install chromium`.

Ostatni przebieg (3.11.2026): 14/14 testów, audyt 0 FAIL / 0 WARN, 0 poważnych naruszeń axe, brak przepełnień i małych celów dotyku, CLS na telefonie ≤ 0,003. Wybrane zrzuty (komputer 1440 px, telefon 390 px) są w `zrzuty/`. Samoocena w stylu jury: `.jury/127.0.0.1-4400/scorecard.md`.

Znane fałszywe alarmy narzędzi: `keyboard.stuck` na `/pilotaz/` bierze się stąd, że skrypt nazywa pola po ich tekście, więc kolejne pola formularza wyglądają jak jedno „INPUT” (etykiety są powiązane przez for/id, axe nie zgłasza błędów). `skipLinkFirst: false` szuka angielskiego „skip” w treści linku; pierwszym przystankiem fokusu jest „Przejdź do treści” (zrzut k-01). Zrzut `page.screenshot({ fullPage: true })` (Playwright) nie odtwarza poprawnie sekcji sterowanych przez ScrollTrigger/`data-reveal` (np. „Rozdzialy”, `.schody`, `.widzisz`) i pokazuje tam puste miejsca, których nie ma przy realnym przewijaniu. Żeby sprawdzić taką sekcję, przewiń stronę krokowo (`window.scrollTo` albo `page.mouse.wheel`) i rób zrzuty po drodze, nie jeden zrzut całej strony.

## Treść

Cała treść jest w `src/data/site.ts`. Funkcja `sierotki` dokleja twarde spacje po jednoliterowych słowach i między liczbą a jednostką (h, zł, min, km). W literałach w plikach `.astro` trzeba je wstawiać ręcznie.

Mapa szkół jest generowana w czasie developmentu z `../data` (OpenStreetMap, ODbL): `node scripts/mapa.mjs` → `src/data/mapa.json`.

## Do podmiany przed publikacją

- Domena `https://kursant24.pl` (`astro.config.mjs`, canonical, sitemap, OG) i adres `kontakt@kursant24.pl` to założenia.
- Formularz pilotażu niczego nie wysyła (baner „wersja demonstracyjna”). Trzeba go podłączyć do backendu.
- Ceny (Solo 89 zł, Szkoła 179 zł, Pro 299 zł) są robocze. PKK, SMS i płatności online są oznaczone jako „w planach”.
- Zrzuty aplikacji pokazują dane demonstracyjne („OSK Elka Gliwice”, kursanci, instruktorzy). Strona nie zawiera opinii, logotypów ani liczby klientów.

Strona nie jest nigdzie wdrożona.
