import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
await page.goto('http://localhost:4401/', { waitUntil: 'networkidle' });
await page.waitForTimeout(150);
await page.screenshot({ path: '/tmp/a-hero-390.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
await browser.close();
