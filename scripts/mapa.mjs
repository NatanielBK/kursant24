#!/usr/bin/env node
// Generuje src/data/mapa.json z danych projektu (../data): kropki szkół jazdy z OpenStreetMap (ODbL)
// i uproszczone kontury województw (polska-geojson, MIT). Uruchom ponownie, gdy zmienią się dane:
//   node scripts/mapa.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dane = path.join(root, '..', 'data');
const osk = JSON.parse(fs.readFileSync(path.join(dane, 'osk.geojson'), 'utf8'));
const woj = JSON.parse(fs.readFileSync(path.join(dane, 'wojewodztwa-granice.geojson'), 'utf8'));

// Rzut równoodległościowy ze skalą cos(52°): Polska wygląda jak na zwykłej mapie.
const W = 1000;
const lon0 = 14.07, lon1 = 24.2, lat0 = 49.0, lat1 = 54.9;
const kx = Math.cos((52 * Math.PI) / 180);
const s = W / ((lon1 - lon0) * kx);
const H = Math.round((lat1 - lat0) * s);
const pr = ([lon, lat]) => [+((lon - lon0) * kx * s).toFixed(1), +((lat1 - lat) * s).toFixed(1)];

// Douglas-Peucker na rzutowanych punktach.
function dp(pts, eps) {
  if (pts.length < 3) return pts;
  let max = 0, idx = 0;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [a, b];
  return [...dp(pts.slice(0, idx + 1), eps).slice(0, -1), ...dp(pts.slice(idx), eps)];
}

const kontury = woj.features.map((f) => {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  const d = polys
    .map((poly) => poly[0].map(pr))
    .filter((r) => r.length > 20)
    // Pierścień jest zamknięty (pierwszy = ostatni punkt): upraszczaj dwie połówki osobno.
    .map((r) => { const m = r.length >> 1; return [...dp(r.slice(0, m + 1), 1.2).slice(0, -1), ...dp(r.slice(m), 1.2)]; })
    .map((r) => 'M' + r.map((p) => p.join(' ')).join('L') + 'Z')
    .join('');
  return { nazwa: f.properties.nazwa, d };
});

const punkty = osk.features
  .filter((f) => f.geometry?.type === 'Point')
  .map((f) => pr(f.geometry.coordinates))
  .filter(([x, y]) => x >= 0 && x <= W && y >= 0 && y <= H);

// Kontury idą do osobnego pliku SVG (ładowany leniwie jako <img>); kropki zostają w HTML, bo się animują.
fs.writeFileSync(
  path.join(root, 'public', 'mapa-wojewodztwa.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    `<g fill="none" stroke="#7FA8FF" stroke-opacity=".35" stroke-width="1.2" stroke-linejoin="round">` +
    kontury.map((k) => `<path d="${k.d}"/>`).join('') +
    `</g></svg>`,
);
fs.writeFileSync(
  path.join(root, 'src', 'data', 'mapa.json'),
  JSON.stringify({ w: W, h: H, liczba: osk.features.length, punkty }),
);
console.log(`mapa.json: ${punkty.length} kropek, ${kontury.length} województw, ${W}x${H}`);
