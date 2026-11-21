// Testy funkcjonalne zbudowanej strony (formularz pilotażu, menu mobilne, zeszyt).
// Użycie: zbuduj i serwuj dist na :4400, potem `node scripts/test-funkcje.mjs`.
import { chromium } from 'playwright';

const B = process.env.URL || 'http://127.0.0.1:4400';
const b = await chromium.launch();
const errs = [];
let fails = 0;
const ok = (c, m) => { if (!c) fails++; console.log((c ? 'OK  ' : 'FAIL') + ' ' + m); };
const watch = (p) => {
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
};

// Formularz pilotażu
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
watch(p);
await p.goto(B + '/pilotaz/?plan=pro'); await p.waitForTimeout(1200);
ok(await p.locator('input[name=plan][value=pro]').isChecked(), 'plan z ?plan=pro zaznaczony');
await p.click('form[data-pilotaz] button[type=submit]'); await p.waitForTimeout(300);
ok(await p.locator('[data-blad]').isVisible(), 'puste wysłanie pokazuje błąd');
ok((await p.locator('[aria-invalid]').count()) > 0, 'pola oznaczone aria-invalid');
ok(await p.evaluate(() => document.activeElement?.getAttribute('aria-invalid') != null), 'fokus na pierwszym złym polu');
await p.fill('#f-szkola', 'OSK Test'); await p.fill('#f-miasto', 'Gliwice'); await p.fill('#f-osoba', 'Jan Test');
await p.fill('#f-tel', '600 100 200'); await p.fill('#f-mail', 'jan@example.com');
await p.check('input[name=zgoda]', { force: true });
await p.click('form[data-pilotaz] button[type=submit]'); await p.waitForTimeout(900);
ok(await p.locator('[data-gotowe]').isVisible(), 'po poprawnym wysłaniu panel „gotowe”');
ok((await p.locator('[data-podsumowanie]').innerText()).includes('OSK Test'), 'podsumowanie zawiera dane');
await p.screenshot({ path: '.shots/test-pilotaz-gotowe.png' });

// Menu mobilne
p = await b.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
watch(p);
await p.goto(B + '/'); await p.waitForTimeout(1200);
await p.click('[data-menu-open]'); await p.waitForTimeout(900);
ok(await p.locator('#menu').isVisible(), 'menu się otwiera');
ok((await p.getAttribute('[data-menu-open]', 'aria-expanded')) === 'true', 'aria-expanded=true');
await p.screenshot({ path: '.shots/test-menu.png' });
await p.keyboard.press('Escape'); await p.waitForTimeout(900);
ok(!(await p.locator('#menu').isVisible()), 'Escape zamyka menu');
ok(await p.evaluate(() => document.activeElement?.hasAttribute('data-menu-open')), 'fokus wraca do przycisku');
await p.click('[data-menu-open]'); await p.waitForTimeout(900);
await p.click('#menu a[href="/dla-kursantow/"]'); await p.waitForTimeout(2500);
ok(p.url().endsWith('/dla-kursantow/'), 'link z menu prowadzi do podstrony');
ok(!(await p.locator('#menu').isVisible()), 'menu zamknięte po nawigacji');

// Zeszyt: koniec sceny = 6/6 na czysto
p = await b.newPage({ viewport: { width: 1440, height: 900 } });
watch(p);
await p.goto(B + '/'); await p.waitForTimeout(1500);
await p.evaluate(() => scrollTo(0, document.querySelector('[data-hero]').offsetHeight - innerHeight + 5));
await p.waitForTimeout(2500);
const lic = (await p.locator('[data-licznik]').innerText()).trim();
ok(lic === '6', 'po przewinięciu sceny licznik = 6 (jest ' + lic + ')');
await p.screenshot({ path: '.shots/test-zeszyt-czysto.png' });

ok(errs.length === 0, 'brak błędów konsoli ' + JSON.stringify(errs));
await b.close();
process.exit(fails ? 1 : 0);
