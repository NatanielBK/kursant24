// Skrypt QA: realne przewijanie (nie fullPage), zrzuty + sprawdzenie overflow/konsoli.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4521';
const OUT = '/Users/nataniel_bk/Documents/NBK/agent-dashboard/agent-workspace/otton/kursant-v4/po';
const pages = ['/', '/dla-szkol/', '/dla-kursantow/', '/cennik/', '/pilotaz/', '/404.html'];
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
];

mkdirSync(`${OUT}/mobile`, { recursive: true });
mkdirSync(`${OUT}/desktop`, { recursive: true });

const browser = await chromium.launch();
let hadError = false;

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  for (const path of pages) {
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));

    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(200);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

    const slug = path === '/' ? 'index' : path.replace(/\//g, '').replace('.html', '');
    const dir = `${OUT}/${vp.name}`;

    // Zrzuty krokowe realnym przewijaniem (viewport, nie fullPage).
    const totalHeight = await page.evaluate(() => document.body.scrollHeight);
    const steps = Math.max(1, Math.ceil(totalHeight / vp.height));
    for (let i = 0; i < steps; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), i * vp.height);
      await page.waitForTimeout(80);
      await page.screenshot({ path: `${dir}/${slug}-${String(i).padStart(2, '0')}.png` });
    }

    console.log(`${vp.name} ${path}: overflow=${overflow} scrollHeight=${scrollHeight} consoleErrors=${consoleErrors.length}`);
    if (overflow) { hadError = true; console.log('  OVERFLOW!'); }
    if (consoleErrors.length) { hadError = true; consoleErrors.forEach((e) => console.log('  ERR:', e)); }

    await page.close();
  }
  await ctx.close();
}

await browser.close();
if (hadError) process.exit(1);
console.log('OK');
