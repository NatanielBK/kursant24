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

Przebieg 22/23.11 (build produkcyjny na `http://127.0.0.1:4400`, Chrome headless): 14/14 testów, audyt 0 FAIL/0 WARN, Lighthouse desktop 100/100/100/100 na wszystkich 4 stronach, Lighthouse mobile Accessibility/Best Practices/SEO 100/100/100 wszędzie, Performance 85–100 (LCP na `/dla-kursantow/` zawyżony przez `serve.mjs` bez HTTP/2 i cache — na realnym hostingu gh-pages ta sama strona dawała 100/LCP 1,8 s, patrz commit z 21/22.11). Zero przewijania w poziomie i zero błędów konsoli na `/`, `/dla-szkol/`, `/dla-kursantow/`, `/pilotaz/`, 404 (390 px i 1440 px), sprawdzone realnym przewijaniem krok po kroku, nie zrzutem `fullPage`. Podgląd `dist-preview/` (przepisany na `/kursant24/`) zweryfikowany osobno: 0 zasobów 404, 0 błędów konsoli, 0 overflow.

Znane fałszywe alarmy narzędzi: `keyboard.stuck` na `/pilotaz/` bierze się stąd, że skrypt nazywa pola po ich tekście, więc kolejne pola formularza wyglądają jak jedno „INPUT” (etykiety są powiązane przez for/id, axe nie zgłasza błędów). `skipLinkFirst: false` szuka angielskiego „skip” w treści linku; pierwszym przystankiem fokusu jest „Przejdź do treści” (zrzut k-01). Zrzut `page.screenshot({ fullPage: true })` (Playwright) nie odtwarza poprawnie sekcji sterowanych przez ScrollTrigger/`data-reveal` (np. „Rozdzialy”, `.schody`, `.widzisz`) i pokazuje tam puste miejsca, których nie ma przy realnym przewijaniu. Żeby sprawdzić taką sekcję, przewiń stronę krokowo (`window.scrollTo` albo `page.mouse.wheel`) i rób zrzuty po drodze, nie jeden zrzut całej strony.

## Treść

Cała treść jest w `src/data/site.ts`. Funkcja `sierotki` dokleja twarde spacje po jednoliterowych słowach i między liczbą a jednostką (h, zł, min, km). W literałach w plikach `.astro` trzeba je wstawiać ręcznie.

Mapa szkół jest generowana w czasie developmentu z `../data` (OpenStreetMap, ODbL): `node scripts/mapa.mjs` → `src/data/mapa.json`.

## Podgląd GitHub Pages

`https://natanielbk.github.io/kursant24/` — zbudowany `dist/` przepisany pod ścieżkę `/kursant24/` (GitHub Pages projektowe serwuje spod subkatalogu, a `site` w `astro.config.mjs` wskazuje już docelową domenę bez `base`).

```sh
npm run build                        # dist/ pod domenę kursant24.pl
node scripts/deploy-gh-pages.mjs     # dist-preview/ przepisany na /kursant24/, robots.txt = Disallow
```

`scripts/deploy-gh-pages.mjs` przepisuje `href=`, `src=`, `srcset=`, `data-preview=` w HTML i `url(...)` w CSS (pomija `data:` URI i adresy absolutne), zostawia `canonical`/`og:url`/`og:image`/sitemap wskazujące na `kursant24.pl` (to i tak ma zostać docelowy adres), i nadpisuje `robots.txt` blokadą `Disallow: /` — podgląd nigdy nie ma być indeksowany, niezależnie od tego, co trafi na właściwą domenę.

Dalej: zawartość `dist-preview/` trafia jako root gałęzi `gh-pages` (osobny checkout/worktree tej gałęzi, nadpisanie plikami z `dist-preview/`, commit, push). `.nojekyll` musi tam zostać, żeby GitHub Pages nie ignorował katalogu `_astro/`.

## Wdrożenie na domenę kursant24.pl

Gdy domena będzie kupiona:

1. **DNS u rejestratora domeny** (apex `kursant24.pl`):
   - rekordy **A** na IP GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - rekordy **AAAA**: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - dla `www.kursant24.pl`: rekord **CNAME** → `natanielbk.github.io`
2. **Plik `CNAME`** w repo `NatanielBK/kursant24`, w gałęzi, z której GitHub Pages ma serwować produkcję, zawierający samą domenę: `kursant24.pl`. Celowo nie jest jeszcze dodany, bo zepsułby obecny podgląd `natanielbk.github.io/kursant24/`, dopóki DNS nie wskazuje na GitHub.
3. **Ustawienia repo → Settings → Pages**: źródło na build produkcyjny (`npm run build`, **bez** przepisanych ścieżek z `deploy-gh-pages.mjs` — ten skrypt jest tylko dla podglądu pod `/kursant24/`), custom domain `kursant24.pl`, poczekać na weryfikację DNS, zaznaczyć **Enforce HTTPS**.
4. Build produkcyjny ma **inny `robots.txt`** niż podgląd: `public/robots.txt` w źródle już jest produkcyjny (`Allow: /` + `Sitemap: https://kursant24.pl/sitemap-index.xml`) — nic nie trzeba zmieniać, to tylko `dist-preview/` nadpisuje go blokadą.
5. Po podpięciu domeny podmienić w `src/data/site.ts` wszystko oznaczone `// placeholder: true` (patrz niżej) i zrobić nowy `npm run build`.

## Do podmiany przed publikacją

Założenia są oznaczone komentarzem `// placeholder: true` w `src/data/site.ts`:

- Domena `https://kursant24.pl` (`astro.config.mjs`, canonical, sitemap, OG) — zostaje, ma być prawdziwa od jutra; tylko upewnić się, że DNS i Pages są podpięte (patrz sekcja wyżej) zanim ktoś zacznie udostępniać linki.
- Adres `kontakt@kursant24.pl` — formularz pilotażu linkuje do niego jako alternatywa dla kogoś, kto nie chce wypełniać formularza; sam e-mail musi faktycznie istnieć (skrzynka na domenie), zanim ktoś na niego napisze.
- Formularz pilotażu (`/pilotaz/`) **nie ma backendu i nic nie wysyła** — pokazuje tylko lokalne podsumowanie z wyraźnym banerem „wersja demonstracyjna”. Żeby zacząć zbierać realne zgłoszenia: podłącz formularz do usługi typu Formspree albo e-mail (handler w `src/motion/setup.ts`, szukaj `[data-pilotaz]`, funkcja `submit`) i usuń baner demo w `src/data/site.ts` (`pilotaz.demoNote`, `pilotaz.done`).
- Ceny (Solo 89 zł, Szkoła 179 zł, Pro 299 zł) są robocze. PKK, SMS i płatności online są oznaczone jako „w planach”.
- Zrzuty aplikacji pokazują dane demonstracyjne („OSK Elka Gliwice”, kursanci, instruktorzy). Strona nie zawiera opinii, logotypów ani liczby klientów.
