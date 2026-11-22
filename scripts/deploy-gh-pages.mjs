// Przygotowuje podgląd GitHub Pages (natanielbk.github.io/kursant24/) z buildu produkcyjnego.
// Build jest robiony pod domenę (site: kursant24.pl w astro.config.mjs, ścieżki root-relative "/...").
// GitHub Pages projektowe serwuje spod "/kursant24/", więc trzeba przepisać ścieżki wewnętrzne
// (linki, skrypty, obrazy, fonty w CSS) na "/kursant24/...". canonical/og:url/og:image zostają
// bez zmian — mają wskazywać na docelową domenę, nie na adres podglądu.
//
// Użycie:
//   npm run build            (najpierw, produkuje dist/ pod domenę)
//   node scripts/deploy-gh-pages.mjs   (tworzy dist-preview/ gotowy do wrzucenia na gh-pages)

import { cp, readdir, readFile, writeFile, rm } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SRC = new URL('../dist/', import.meta.url);
const OUT = new URL('../dist-preview/', import.meta.url);
const PREFIX = '/kursant24';

// Przepisuje atrybuty href="/...", src="/..." i data-preview="/..." (Indeks.astro, podgląd kafelka)
// (pomija już-prefiksowane, protokoły, kotwice, mailto).
function rewriteAttrs(text) {
  return text.replace(/(href|src|data-preview)="\/(?!kursant24\/)([^"]*)"/g, (_m, attr, rest) => `${attr}="${PREFIX}/${rest}"`);
}

// srcset="/a.webp 640w, /b.webp 960w" -> przepisuje każdy adres w liście.
function rewriteSrcset(text) {
  return text.replace(/srcset="([^"]*)"/g, (_m, list) => {
    const rewritten = list
      .split(',')
      .map((part) => part.replace(/^\s*\/(?!kursant24\/)(\S*)(\s+\S+)?$/, (_p, rest, size) => ` ${PREFIX}/${rest}${size ?? ''}`.trim()))
      .join(', ');
    return `srcset="${rewritten}"`;
  });
}

// url(/fonts/...) w CSS (nieotoczone cudzysłowem; data:-URI zawsze mają cudzysłów, więc nie są ruszane).
function rewriteCssUrl(text) {
  return text.replace(/url\(\/(?!kursant24\/)([^)"']*)\)/g, (_m, rest) => `url(${PREFIX}/${rest})`);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, { recursive: true });

const files = await walk(new URL(OUT).pathname);
for (const file of files) {
  const ext = extname(file);
  if (ext === '.html') {
    let text = await readFile(file, 'utf8');
    text = rewriteSrcset(text);
    text = rewriteAttrs(text);
    await writeFile(file, text);
  } else if (ext === '.css') {
    let text = await readFile(file, 'utf8');
    text = rewriteCssUrl(text);
    await writeFile(file, text);
  }
}

// Podgląd nie jest domeną produkcyjną: blokada indeksowania niezależnie od canonical/meta robots.
await writeFile(join(new URL(OUT).pathname, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

console.log(`Gotowe: ${new URL(OUT).pathname}`);
console.log('Dalej: wrzuć zawartość tego katalogu na gałąź gh-pages (patrz README.md, sekcja „Podgląd GitHub Pages”).');
