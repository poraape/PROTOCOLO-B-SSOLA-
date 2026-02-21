import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

type Issue = {
  file: string;
  line: number;
  code: 'FORBIDDEN_TERM' | 'MISSING_URGENCY_PATTERN';
  message: string;
  excerpt?: string;
};

type ForbiddenRule = {
  forbidden: RegExp;
  required: string;
  note: string;
};

type UrgencyRule = {
  id: string;
  files: string[];
  requiredPatterns: Array<{ regex: RegExp; label: string }>;
};

const CRITICAL_FILES = [
  'components/ActionCard.tsx',
  'components/DecisionWizard.tsx',
  'components/decision/EmergencyCTA.tsx',
  'components/decision-v2/ContextualControls.tsx',
  'components/decision-v2/ManagementContactModal.tsx',
  'components/decision-v2/DecisionTreeNavigator.tsx'
] as const;

const FORBIDDEN_RULES: ForbiddenRule[] = [
  {
    forbidden: /\bfalar com gest[ãa]o\b/i,
    required: 'comunicar a gestão',
    note: 'Use o verbo obrigatório da taxonomia para contato institucional.'
  },
  {
    forbidden: /avis(ar|e).{0,40}gest[ãa]o/i,
    required: 'comunicar a gestão',
    note: 'Quando houver equivalente obrigatório, evite variações informais de aviso.'
  }
];

const URGENCY_RULES: UrgencyRule[] = [
  {
    id: 'EMERGENCIA_CTA',
    files: ['components/decision/EmergencyCTA.tsx', 'components/decision-v2/DecisionTreeNavigator.tsx'],
    requiredPatterns: [
      { regex: /(agora|imediat|emerg[êe]ncia|190|192)/i, label: 'marcador de urgência' },
      { regex: /(acion|ligar|chamar)/i, label: 'verbo de ação imediata' }
    ]
  },
  {
    id: 'GESTAO_CTA',
    files: [
      'components/ActionCard.tsx',
      'components/DecisionWizard.tsx',
      'components/decision-v2/ContextualControls.tsx',
      'components/decision-v2/ManagementContactModal.tsx',
      'components/decision-v2/DecisionTreeNavigator.tsx'
    ],
    requiredPatterns: [
      { regex: /comunicar.{0,30}gest[ãa]o|gest[ãa]o.{0,30}comunicar/i, label: 'verbo obrigatório para gestão' },
      { regex: /(agora|imediat|mesmo dia)/i, label: 'marcador de urgência para gestão' }
    ]
  },
  {
    id: 'REGISTRO_CTA',
    files: ['components/ActionCard.tsx'],
    requiredPatterns: [
      { regex: /(registro formal|registrar|registro no canal oficial)/i, label: 'referência de registro formal' },
      { regex: /(agora|hoje|imediat|prazo|SlaChip)/i, label: 'marcador temporal de urgência' }
    ]
  }
];

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const findFirstLine = (content: string, regex: RegExp): number => {
  const lines = content.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    if (regex.test(lines[index])) return index + 1;
  }
  return 1;
};

const run = async () => {
  const issues: Issue[] = [];

  for (const relativeFile of CRITICAL_FILES) {
    const absoluteFile = path.join(rootDir, relativeFile);
    const content = await readFile(absoluteFile, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      FORBIDDEN_RULES.forEach((rule) => {
        if (!rule.forbidden.test(line)) return;
        issues.push({
          file: relativeFile,
          line: index + 1,
          code: 'FORBIDDEN_TERM',
          message: `${rule.note} Evite termo proibido e prefira: "${rule.required}".`,
          excerpt: line.trim()
        });
      });
    });
  }

  for (const rule of URGENCY_RULES) {
    for (const relativeFile of rule.files) {
      const absoluteFile = path.join(rootDir, relativeFile);
      const content = await readFile(absoluteFile, 'utf8');

      for (const pattern of rule.requiredPatterns) {
        if (pattern.regex.test(content)) continue;

        issues.push({
          file: relativeFile,
          line: findFirstLine(content, /export|const|function|return/),
          code: 'MISSING_URGENCY_PATTERN',
          message: `[${rule.id}] ausência de ${pattern.label}.`
        });
      }
    }
  }

  if (issues.length > 0) {
    console.error('❌ Auditoria de microcopy falhou. Inconsistências encontradas:');
    issues.forEach((issue) => {
      const excerpt = issue.excerpt ? ` | ${issue.excerpt}` : '';
      console.error(`- ${issue.file}:${issue.line} [${issue.code}] ${issue.message}${excerpt}`);
    });
    process.exit(1);
  }

  console.log('✅ Auditoria textual de microcopy concluída sem inconsistências.');
  console.log(`ℹ️ Arquivos críticos auditados: ${CRITICAL_FILES.length}`);
};

await run();
