# kursant24 (strona-awwwards, build lokalny): jury score
Estimate, not affiliated with Awwwards. Independent critic (fresh subagent, evidence only), from 5 pages on 2026-11-03.
Note: the site was built in this same session; the critic saw only screenshots, reports and the audit.

**The idea, as the critic read it:** kursant24 sells "the end of the paper notebook" and the site takes the notebook literally (graph paper, red margin, handwriting, red strike-throughs); scrolling rewrites a handwritten schedule into clean calendar blocks.
**Critic overall: 7.5** (0.4 Design + 0.3 Usability + 0.2 Creativity + 0.1 Content, on the critic's strict scale)
**Jury estimate: about 8.6** (critic + 1.1, measured on two recent Sites of the Day)
**Band, from the estimate:** Site of the Day range (7.2 and up)

| Criterion | Score | Evidence |
|---|---|---|
| Design (40%) | 7.5 | Clear system (heavy grotesk + handwriting, red margin, navy/blue/red/paper); memorable frames home d-01, d-02, d-06, 404 d-01; designed hover/focus/footer/404. Generic SaaS rows in places (home d-03), half-empty images (home d-04, dla-szkol d-03, dla-kursantow d-03). |
| Usability (30%) | 7.5 | Mobile LCP 1.42–1.54 s, CLS ≤ 0.003, no loader, 60 fps; current page marked (d-91); reduced motion complete (r-01). Demo-form banner on pilotaz d-01; pilotaz `keyboard.stuck`. |
| Creativity (20%) | 7.5 | Hero rewrite d-01 → r-01, handwritten page transition d-90-b/c, 7:30→21:40 day timeline (dla-szkol d-02/d-03), circled pricing note, 404. Concept fades mid-page (home features, dla-kursantow d-02..d-05). |
| Content (10%) | 7.5 | Voiced, specific copy ("Dziesięć SMS-ów, żeby przełożyć jedną godzinę", 2 h/3 h limit, 12/30 h), real app screenshots, honest "Ceny robocze"/"w planach". Repeated screen "Cześć, Julia!", repeated "przepiszemy/przeniesiemy za Ciebie". |

| Developer | Score | Evidence |
|---|---|---|
| Semantics/SEO | 8 | audit 0 FAIL / 0 WARN; one h1 and unique title per page; real 404 status |
| Animations/Transitions | 8 | continuous transition d-90 a→c; `noHoverChange` and `colorOnly` empty; scrollFps 60; long mobile settledMs |
| Accessibility | 7.5 | 0 axe violations, every focus stop visible, skip link first in k-01; `skipLinkFirst: false` and pilotaz `stuck` flagged |
| WPO | 8 | LCP ~1.5 s throttled, CLS ≤ 0.003, JS 61 KB gz, heaviest page 588 KB |
| Responsive | 8 | no overflow, 0 small targets, recomposed phone layouts; "teraz" chip over 20:00 (home m-01), notes crossing the rule (dla-szkol m-02/m-03) |
| Markup/Meta-data | 8 | audit 0 FAIL / 0 WARN on OG/Twitter, og:image, favicon, viewport, alt, names |

## Fixes, most score first
1. [Usability/Content] pilotaz d-01: the demo form banner. Not fixable here by decision (no backend; nothing may be sent from this build). Owner connects the endpoint.
2. [Accessibility] pilotaz `keyboard.stuck`: false positive. The checker names fields by innerText, so consecutive inputs all read "INPUT"; labels are linked with for/id and axe is clean.
3. [Accessibility] `skipLinkFirst: false`: false positive. The check looks for "skip"/"#main" in the link text; the first stop is "Przejdź do treści" (k-01).
4. [Creativity/Design] home d-03, dla-kursantow d-02..d-05: carry the notebook mid-page; strike out each pencil note as its screenshot arrives.
5. [Design] half-empty screenshots: home d-04 e-karta, dla-szkol d-03 notifications, dla-kursantow d-03 login.
6. [Content] repeated screens ("Cześć, Julia!" three times).
7. [WPO/Animations] mobile settledMs 7–11 s; CTAs at ~40% at first paint (d-00).
8. [Design] hard spaces after one-letter words in headings passed from page markup ("Cennik i / porównanie").
9. [Responsive] home m-01 "teraz" chip over the 20:00 label; dla-szkol m-02/m-03 notes crossing the rule.
10. [Content] "Zeszyt przepiszemy za Ciebie" right before "przeniesiemy za Ciebie"; "Statystyki i zdawalność" vs "Statystyki zdawalności".
11. [Design] dla-kursantow "Co zrobić z kodem" link has no underline at rest; current nav item loses its squiggle on hover.

## Measured
Mobile LCP 1424–1536 ms, CLS ≤ 0.003, no loader, desktop/mobile FPS 60, 0 serious axe violations, no overflow, `noHoverChange` 0, `colorOnly` 0, idle motion true on all pages except pilotaz (still form by decision), audit 0 FAIL / 0 WARN. Console errors: only the expected 404 response.

Not scored: anything stills can't show (how motion feels, sound).
