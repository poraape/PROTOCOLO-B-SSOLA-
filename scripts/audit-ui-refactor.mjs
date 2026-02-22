import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const ERRORS = [];
const WARNINGS = [];

const EXCLUDED_DIRS = new Set(['node_modules', 'dist', '.git', 'coverage']);

const getAllFiles = (dir, exts) => {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory() && !EXCLUDED_DIRS.has(entry.name)) {
      results.push(...getAllFiles(full, exts));
    } else if (entry.isFile() && exts.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
};

const ROOTS = ['components', 'pages', 'styles', 'scripts', '.'];
const codeFiles = Array.from(
  new Set(
    ROOTS
      .filter((root) => {
        try {
          readdirSync(root);
          return true;
        } catch {
          return false;
        }
      })
      .flatMap((root) => getAllFiles(root, ['.tsx', '.ts', '.css', '.mjs']))
  )
).filter((file) => file.replace(/\\/g, '/') !== 'scripts/audit-ui-refactor.mjs');

const rules = [
  { pattern: /--dt-/g, type: 'error', msg: 'Token legado --dt- encontrado' },
  { pattern: /\.btn-(primary|secondary|danger|ghost)/g, type: 'error', msg: 'Classe legada .btn-* encontrada' },
  { pattern: /\.glass-card/g, type: 'error', msg: 'Classe legada .glass-card encontrada' },
  { pattern: /font-size:\s*\d+px/g, type: 'warning', msg: 'font-size em px (usar token rem)' },
  { pattern: /var\(--(danger|warning|info)\)/g, type: 'warning', msg: 'Var legada — usar var(--color-*)' },
  { pattern: /backdropFilter.*blur/g, type: 'warning', msg: 'backdrop-filter inline fora de .card-glass' },
  { pattern: /z-index:\s*(?!var\()(\d+)/g, type: 'warning', msg: 'z-index hardcoded — usar token --z-*' }
];

for (const file of codeFiles) {
  const content = readFileSync(file, 'utf-8');
  for (const rule of rules) {
    const matches = content.match(rule.pattern);
    if (matches) {
      const list = rule.type === 'error' ? ERRORS : WARNINGS;
      list.push(`${rule.type.toUpperCase()}: ${file} — ${rule.msg} (${matches.length}x)`);
    }
  }
}

if (ERRORS.length) {
  console.error('\nERROS CRITICOS:\n' + ERRORS.join('\n'));
}
if (WARNINGS.length) {
  console.warn('\nAVISOS:\n' + WARNINGS.join('\n'));
}
if (!ERRORS.length && !WARNINGS.length) {
  console.log('Auditoria passou — nenhuma violacao encontrada.');
}

process.exit(ERRORS.length > 0 ? 1 : 0);
