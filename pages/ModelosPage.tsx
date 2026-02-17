import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnexoMeta, anexosMeta } from '../data/anexosMeta';

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

const mdToHtml = (markdown: string, term: string) => {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let inList = false;

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

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      closeList();
      const level = heading[1].length;
      const text = escapeHtml(heading[2]);
      const id = slugify(heading[2]);
      html.push(`<h${level} id="${id}">${highlight(text, term)}</h${level}>`);
      continue;
    }

    const list = /^[-*]\s+(.+)$/.exec(trimmed);
    if (list) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${highlight(escapeHtml(list[1]), term)}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${highlight(escapeHtml(trimmed), term)}</p>`);
  }

  closeList();
  return html.join('\n');
};

type TocItem = { id: string; text: string };

export default function ModelosPage() {
  const [selected, setSelected] = useState<AnexoMeta>(anexosMeta[0]);
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [showTop, setShowTop] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch(selected.file)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        const headings = Array.from(text.matchAll(/^##?\s+(.+)/gm)).map((m) => ({
          id: slugify(m[1]),
          text: m[1]
        }));
        setToc(headings);
      });
  }, [selected]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          document.querySelectorAll('.anexo-toc a').forEach((link) => link.classList.remove('font-bold'));
          const active = document.querySelector(`.anexo-toc a[href="#${entry.target.id}"]`);
          active?.classList.add('font-bold');
        });
      },
      { rootMargin: '-50% 0px -45% 0px' }
    );

    document.querySelectorAll('.anexo-content h2, .anexo-content h3').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    const target = scrollerRef.current;
    const handleScroll = () => {
      const containerTop = target?.scrollTop || 0;
      setShowTop(containerTop > 300 || window.scrollY > 300);
    };

    target?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      target?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderedHtml = useMemo(() => mdToHtml(content, search), [content, search]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-72 bg-white border-r p-4 hidden lg:block">
        <h2 className="font-semibold mb-4">Modelos Institucionais</h2>
        <ul className="space-y-2">
          {anexosMeta.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className={`text-left w-full px-3 py-2 rounded focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  selected.id === item.id ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main ref={scrollerRef} className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 gap-3 flex-wrap">
          <h1 className="text-xl font-semibold">{selected.title}</h1>

          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="Buscar neste anexo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded"
            />

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-blue-600 text-white px-4 py-2 rounded focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Imprimir
            </button>
          </div>
        </div>

        {!!toc.length && (
          <div className="anexo-toc mb-4 rounded border border-slate-200 bg-white p-3 text-sm">
            <p className="mb-2 font-semibold text-slate-700">Seções</p>
            <div className="flex flex-wrap gap-3">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="text-blue-700 hover:underline">
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        )}

        <div
          ref={contentRef}
          className="anexo-content prose max-w-4xl mx-auto bg-white p-6 shadow rounded"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />

        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            ↑ Topo
          </button>
        )}
      </main>
    </div>
  );
}
