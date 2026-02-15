export interface ProtocolChunk {
  id: string;
  source: string;
  text: string;
  tokens: string[];
}

export interface ProtocolKnowledgeBase {
  loadedAt: string;
  sourceVersion: string;
  chunks: ProtocolChunk[];
}

const GITHUB_API_ROOT = 'https://api.github.com/repos/poraape/PROTOCOLO-B-SSOLA-/contents/public/protocolo';
const CACHE_KEY = 'bussola_protocol_kb_v1';
const CACHE_MAX_AGE_MS = 1000 * 60 * 30; // 30 minutos

interface GithubEntry {
  type: 'file' | 'dir';
  path: string;
  name: string;
  download_url: string | null;
  url: string;
}

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (text: string) => normalize(text).split(' ').filter((t) => t.length > 2);

const splitIntoSections = (source: string, content: string): ProtocolChunk[] => {
  const parts = content
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.map((part, index) => ({
    id: `${source}-${index}`,
    source,
    text: part,
    tokens: tokenize(part)
  }));
};

const fetchDirectoryRecursive = async (url: string): Promise<GithubEntry[]> => {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error('Falha ao carregar conteúdo oficial do protocolo.');

  const data: GithubEntry[] = await response.json();
  const entries: GithubEntry[] = [];

  for (const item of data) {
    if (item.type === 'file') {
      entries.push(item);
    }
    if (item.type === 'dir') {
      const nested = await fetchDirectoryRecursive(item.url);
      entries.push(...nested);
    }
  }

  return entries;
};

const computeVersionHash = (chunks: ProtocolChunk[]) => {
  const digest = chunks.map((c) => `${c.source}:${c.text.length}`).join('|');
  let hash = 0;
  for (let i = 0; i < digest.length; i += 1) {
    hash = (hash << 5) - hash + digest.charCodeAt(i);
    hash |= 0;
  }
  return String(hash);
};

export const loadProtocolKnowledgeBase = async (): Promise<ProtocolKnowledgeBase> => {
  const cachedRaw = localStorage.getItem(CACHE_KEY);
  if (cachedRaw) {
    try {
      const cached = JSON.parse(cachedRaw) as ProtocolKnowledgeBase;
      const age = Date.now() - new Date(cached.loadedAt).getTime();
      if (age < CACHE_MAX_AGE_MS && cached.chunks?.length) {
        return cached;
      }
    } catch {
      // ignora cache inválido
    }
  }

  const entries = await fetchDirectoryRecursive(GITHUB_API_ROOT);
  const files = entries.filter((entry) => entry.type === 'file' && entry.download_url);

  const chunks: ProtocolChunk[] = [];
  for (const file of files) {
    const response = await fetch(file.download_url as string, { cache: 'no-store' });
    if (!response.ok) continue;
    const text = await response.text();
    chunks.push(...splitIntoSections(file.path, text));
  }

  if (!chunks.length) throw new Error('Protocolo oficial indisponível no momento.');

  const kb: ProtocolKnowledgeBase = {
    loadedAt: new Date().toISOString(),
    sourceVersion: computeVersionHash(chunks),
    chunks
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(kb));
  return kb;
};

export const retrieveProtocolContext = (
  kb: ProtocolKnowledgeBase,
  question: string,
  limit = 6
): string => {
  const questionTokens = tokenize(question);
  if (!questionTokens.length) return '';

  const scored = kb.chunks
    .map((chunk) => {
      const chunkSet = new Set(chunk.tokens);
      const score = questionTokens.reduce((acc, token) => (chunkSet.has(token) ? acc + 1 : acc), 0);
      return { chunk, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => `Fonte: ${item.chunk.source}\n${item.chunk.text}`);

  return scored.join('\n\n---\n\n');
};
