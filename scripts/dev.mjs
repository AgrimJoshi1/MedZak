// `npm run dev`: starts the Next.js dev server, then visits every page once so each one is already compiled
// when you click through the site (the dev server otherwise builds a page the first time it is asked for, which is
// the one slow moment when moving between pages; `npm run build` output has no such delay).
import { spawn } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 3000;
const appDir = fileURLToPath(new URL('../src/app/', import.meta.url));

/** Every folder under src/app that has a page.tsx, as a URL path. */
function routes(dir = appDir, base = dir) {
  const found = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) found.push(...routes(full, base));
    else if (name === 'page.tsx') found.push('/' + relative(base, dir).split(sep).join('/'));
  }
  return found.map((r) => (r === '/' || r.endsWith('/') ? r : r + '/'));
}

const nextBin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const child = spawn(process.execPath, [nextBin, 'dev', '-p', String(PORT)], { stdio: ['inherit', 'pipe', 'inherit'] });
let warmed = false;

child.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  if (!warmed && /Ready in/.test(chunk.toString())) { warmed = true; void warm(); }
});

async function warm() {
  const list = [...new Set(routes())].sort();
  for (const route of list) {
    try { await fetch(`http://localhost:${PORT}${route}`); } catch { /* the server is shutting down */ }
  }
  console.log(`[warm] ${list.length} pages compiled, so moving between them is instant`);
}

const stop = () => child.kill();
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
child.on('exit', (code) => process.exit(code ?? 0));
