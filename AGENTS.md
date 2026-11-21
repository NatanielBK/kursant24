# Wskazówki dla agentów

- Przed zmianami przeczytaj `DESIGN.md` (koncepcja, system, decyzje) i `README.md` (uruchomienie, testy).
- Treść tylko w `src/data/site.ts`, po polsku, z polskimi znakami. Bez myślników (— –) w widocznym tekście, bez wymyślonych opinii, logotypów i liczb klientów.
- Ruch: jeden zegar (`gsap.ticker`), efekty strony w `onPage()`, bez własnych `requestAnimationFrame` i nasłuchów `scroll`. Przy `prefers-reduced-motion` cała treść widoczna bez animacji.
- Hover tylko w `@media (hover: hover)`, z lustrzanym stanem `:focus-visible` i `:active`.
- QA zawsze na buildzie produkcyjnym (`npm run build`, serwer na :4400), potem `node scripts/test-funkcje.mjs` i skrypty z README.
- Nie modyfikuj `../strona` (osobna, starsza wersja strony).
