import { chromium } from 'playwright';

const BASE = 'http://localhost:4401';
const OUT = process.argv[2] || '/tmp/qa-a';
const viewport = JSON.parse(process.argv[3] || '{"width":390,"height":844}');

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(150);
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
await page.screenshot({ path: OUT, fullPage: true });
console.log(JSON.stringify({ overflow, scrollHeight, viewportHeight: viewport.height, screens: scrollHeight / viewport.height, errors }));
await browser.close();
