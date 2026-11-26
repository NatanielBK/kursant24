// Zrzuty QA tylko dla /dla-kursantow/ (programista C): pełna strona 390/360/1440 + sprawdzenie overflow.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4403';
const OUT = '/Users/nataniel_bk/Documents/NBK/agent-dashboard/agent-workspace/otton/kursant-v7/c';
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: 'm390', width: 390, height: 844 },
  { name: 'm360', width: 360, height: 800 },
  { name: 'd1440', width: 1440, height: 900 },
];

const browser = await chromium.launch();
let hadError = false;

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));

  await page.goto(BASE + '/dla-kursantow/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  const screens = (scrollHeight / vp.height).toFixed(2);

  await page.screenshot({ path: `${OUT}/${vp.name}-dla-kursantow.png`, fullPage: true });

  console.log(`${vp.name}: overflow=${overflow} scrollHeight=${scrollHeight} (~${screens} ekranów) consoleErrors=${consoleErrors.length}`);
  if (overflow) { hadError = true; console.log('  OVERFLOW!'); }
  consoleErrors.forEach((e) => console.log('  ERR:', e));

  await page.close();
  await ctx.close();
}

await browser.close();
if (hadError) process.exit(1);
console.log('OK');
