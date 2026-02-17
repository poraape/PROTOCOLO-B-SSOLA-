import { SourceReference } from '../types';

interface SourceLink {
  href: string;
  isExternal: boolean;
}

const normalizePublicPath = (filePath: string) => {
  const normalized = filePath.replace(/^\/+/, '');
  return normalized.startsWith('public/') ? `/${normalized.replace(/^public\//, '')}` : `/${normalized}`;
};

export const getSourceLink = (sourceRef?: SourceReference): SourceLink | null => {
  if (!sourceRef) return null;

  if (sourceRef.filePath) {
    const href = normalizePublicPath(sourceRef.filePath);
    return { href, isExternal: true };
  }

  if (sourceRef.section) {
    return { href: '/#/recursos', isExternal: false };
  }

  return { href: '/#/recursos', isExternal: false };
};
