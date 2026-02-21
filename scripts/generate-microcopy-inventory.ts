import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const TARGET_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.html']);
const TARGET_DIRS = ['components', 'pages', 'content', 'data', 'src', 'ui'];
const TARGET_FILES = ['App.tsx', 'types.ts', 'data.ts', 'index.html'];

type Row = {
  localizacao: string;
  texto: string;
  contexto: string;
  componente: string;
  prioridade: 'CRÍTICA' | 'ALTA' | 'MÉDIA' | 'BAIXA';
  tags: string;
};

const walk = async (dir: string, out: string[] = []): Promise<string[]> => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
      continue;
    }
    const ext = path.extname(entry.name);
    if (TARGET_EXTENSIONS.has(ext)) out.push(full);
  }
  return out;
};

const looksLikeUserText = (s: string): boolean => {
  if (s.length < 3) return false;
  if (/^[A-Z0-9_\-.:/]+$/.test(s)) return false;
  if (/^#[0-9A-Fa-f]{3,8}$/.test(s)) return false;
  if (/^\.{0,2}\//.test(s)) return false;
  if (/^(https?:|tel:|mailto:)/.test(s)) return false;
  if (/^--[a-z0-9-]+$/.test(s)) return false;
  if (/^[a-z0-9]+(?:[A-Z][a-z0-9]+)+$/.test(s)) return false;
  if (/^[a-z-]+\s[a-z-\s]+$/i.test(s) && s.includes('-') && !/[À-ÿ]/.test(s)) return false;
  return /[A-Za-zÀ-ÿ]/.test(s) && /\s|[?.!,:;()]/.test(s);
};

const lineSuggestsUiCopy = (line: string): boolean => {
  const lower = line.toLowerCase();
  if (/classname=|data-testid|aria-hidden|role=|stroke=|fill=/.test(lower)) return false;
  return /(>[^<]*$|label|placeholder|title|aria-label|helper|error|summary|question|answer|text:|description|actionsummary|whythisservice|mandatorytodayaction|outcome|lesson|doinstead|donot)/.test(lower);
};

const priorityFromText = (text: string, file: string): Row['prioridade'] => {
  const lower = `${file} ${text}`.toLowerCase();
  if (/risco|emerg|conselho tutelar|notific|obrigat|erro|falha|irrevers|violên|autoles/.test(lower)) return 'CRÍTICA';
  if (/botão|continuar|registr|encaminh|acion|confirm|alerta|cta|etapa|triagem/.test(lower)) return 'ALTA';
  if (/menu|label|campo|placeholder|filtro|busca|aba|título|titulo/.test(lower)) return 'MÉDIA';
  return 'BAIXA';
};

const componentFromPath = (relativeFile: string): string => {
  const parts = relativeFile.split('/');
  return parts[parts.length - 1];
};

const csvEscape = (value: string) => `"${value.replace(/"/g, '""')}"`;

const collectFromFile = async (relativeFile: string): Promise<Row[]> => {
  const content = await fs.readFile(path.join(ROOT, relativeFile), 'utf8');
  const rows: Row[] = [];

  const pattern = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(content)) !== null) {
    const literalRaw = match[0].slice(1, -1);
    const literal = literalRaw.replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\'/g, "'").trim();
    if (!looksLikeUserText(literal)) continue;

    const before = content.slice(0, match.index);
    const line = before.split(/\r?\n/).length;
    const lineText = content.split(/\r?\n/)[line - 1] ?? '';
    if (!lineSuggestsUiCopy(lineText)) continue;

    rows.push({
      localizacao: `${relativeFile}:${line}`,
      texto: literal,
      contexto: lineText.trim().slice(0, 120),
      componente: componentFromPath(relativeFile),
      prioridade: priorityFromText(literal, relativeFile),
      tags: [
        relativeFile.includes('decision') ? 'fluxo-decisor' : 'ui-geral',
        /erro|falha|inválid|obrigat/i.test(literal) ? 'erro' : 'microcopy'
      ].join(',')
    });
  }

  return rows;
};

const main = async () => {
  const files = new Set<string>();

  for (const dir of TARGET_DIRS) {
    const full = path.join(ROOT, dir);
    try {
      const stat = await fs.stat(full);
      if (stat.isDirectory()) {
        (await walk(full)).forEach((absPath) => files.add(path.relative(ROOT, absPath)));
      }
    } catch {
      // ignore
    }
  }

  for (const file of TARGET_FILES) {
    try {
      const stat = await fs.stat(path.join(ROOT, file));
      if (stat.isFile()) files.add(file);
    } catch {
      // ignore
    }
  }

  const orderedFiles = Array.from(files).sort();
  const allRows: Row[] = [];
  for (const file of orderedFiles) {
    const rows = await collectFromFile(file);
    allRows.push(...rows);
  }

  const unique = new Map<string, Row>();
  for (const row of allRows) {
    const key = `${row.localizacao}::${row.texto}`;
    if (!unique.has(key)) unique.set(key, row);
  }

  const lines = [
    'Localização,Texto Atual,Contexto/Tela,Componente,Prioridade,Tags',
    ...Array.from(unique.values()).map((row) => [
      csvEscape(row.localizacao),
      csvEscape(row.texto),
      csvEscape(row.contexto),
      csvEscape(row.componente),
      csvEscape(row.prioridade),
      csvEscape(row.tags)
    ].join(','))
  ];

  const outDir = path.join(ROOT, 'docs', 'microcopy');
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, 'inventario-microcopy.csv');
  await fs.writeFile(outPath, `${lines.join('\n')}\n`, 'utf8');

  console.log(`Inventário gerado: ${path.relative(ROOT, outPath)} (${unique.size} entradas)`);
};

await main();
