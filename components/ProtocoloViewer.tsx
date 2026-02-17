import React, { useEffect, useMemo, useRef, useState } from 'react';

type TocItem = { id: string; text: string };

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const highlight = (value: string, term: string) => {
  if (!term.trim()) return value;
  const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return value.replace(new RegExp(`(${safe})`, 'gi'), '<mark>$1</mark>');
};

const renderInline = (value: string, term: string) => {
  const escaped = escapeHtml(value);
  const parts = escaped.split(/(\*\*[^*]+\*\*)/g);
  return parts
    .map((part) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        const inner = part.slice(2, -2);
        return `<strong>${highlight(inner, term)}</strong>`;
      }
      return highlight(part, term);
    })
    .join('');
};

const markdownToHtml = (markdown: string, term: string) => {
  const lines = markdown.split(/\r?\n/);
  let inList = false;
  const html: string[] = [];

  const closeList = () => {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeList();
      html.push('<hr />');
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${renderInline(text, term)}</h${level}>`);
      continue;
    }

    const listMatch = /^[-*]\s+(.+)$/.exec(trimmed);
    if (listMatch) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${renderInline(listMatch[1], term)}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInline(trimmed, term)}</p>`);
  }

  closeList();
  return html.join('\n');
};

export default function ProtocoloViewer() {
  const [content, setContent] = useState('');
  const [toc, setToc] = useState<TocItem[]>([]);
  const [search, setSearch] = useState('');
  const [showTop, setShowTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProtocol = async () => {
      const primary = await fetch('/protocol/protocolo.md');
      const text = primary.ok ? await primary.text() : await (await fetch('/protocolo')).text();
      setContent(text);

      const headings = Array.from(text.matchAll(/^##?\s+(.*)/gm)).map((match) => ({
        id: slugify(match[1]),
        text: match[1]
      }));
      setToc(headings);
    };

    loadProtocol();
  }, []);

  const renderedHtml = useMemo(() => markdownToHtml(content, search), [content, search]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document
              .querySelectorAll('aside a')
              .forEach((link) => link.classList.remove('font-bold'));

            const active = document.querySelector(`aside a[href="#${entry.target.id}"]`);
            active?.classList.add('font-bold');
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    document.querySelectorAll('h2, h3').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="flex min-h-screen bg-gray-50 protocol-viewer">
      <aside className="w-64 border-r bg-white p-4 overflow-y-auto hidden lg:block">
        <h2 className="font-semibold mb-3">Índice</h2>
        <ul className="space-y-2 text-sm">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Buscar no protocolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-64 max-w-full"
          />

          <button
            type="button"
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Imprimir
          </button>
        </div>

        <div
          ref={contentRef}
          className="prose max-w-4xl mx-auto bg-white p-6 shadow-sm rounded"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      </main>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          ↑ Topo
        </button>
      )}
    </div>
  );
}
