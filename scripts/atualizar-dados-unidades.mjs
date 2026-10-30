// Grava no HTML de cada unidade os dados estruturados definidos em assets/js/site-config.js.
// Rode depois de alterar uma unidade ou o campo googleBusinessProfileEligible:
//   node scripts/atualizar-dados-unidades.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { UNITS } from '../assets/js/site-config.js';
import { buildUnitSchema } from '../assets/js/modules/unit-schema.js';

const BLOCK = /\n  <script type="application\/ld\+json" data-unit-schema="[^"]*">[\s\S]*?<\/script>/;

for (const slug of Object.keys(UNITS)) {
  const file = new URL(`../unidades/${slug}/index.html`, import.meta.url);
  const html = await readFile(file, 'utf8');
  const json = JSON.stringify(buildUnitSchema(slug), null, 2).replace(/\n/g, '\n  ');
  const block = `\n  <script type="application/ld+json" data-unit-schema="${slug}">\n  ${json}\n  </script>`;

  const updated = BLOCK.test(html) ? html.replace(BLOCK, block) : html.replace('\n</head>', `${block}\n</head>`);
  await writeFile(file, updated);
  console.log(`unidades/${slug}/index.html atualizado`);
}
