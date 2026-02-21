import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  TECHNICAL_GLOSSARY,
  searchGlossary,
  filterByCategory,
  GLOSSARY_CATEGORIES
} from '../content/glossaryData';

const INITIAL_VISIBLE = 12;

export const TechnicalGlossaryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filteredTerms = useMemo(() => {
    let results = [...TECHNICAL_GLOSSARY];

    if (categoryFilter !== 'Todas') {
      results = filterByCategory(categoryFilter, results);
    }

    if (searchQuery.trim()) {
      results = searchGlossary(searchQuery, results);
    }

    return results.sort((a, b) => a.termo.localeCompare(b.termo));
  }, [searchQuery, categoryFilter]);

  const visibleTerms = useMemo(
    () => filteredTerms.slice(0, visibleCount),
    [filteredTerms, visibleCount]
  );

  const stats = useMemo(() => {
    const categories = TECHNICAL_GLOSSARY.reduce((acc, term) => {
      acc[term.categoria] = (acc[term.categoria] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: TECHNICAL_GLOSSARY.length,
      categories,
      filtered: filteredTerms.length
    };
  }, [filteredTerms]);

  const sortedCategories = useMemo(() => [...GLOSSARY_CATEGORIES].sort(), []);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [searchQuery, categoryFilter]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() }, { replace: true });
      return;
    }

    if (searchParams.get('q')) {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, searchQuery, setSearchParams]);

  const toggleExpand = (id: string) => {
    setExpandedTermId(expandedTermId === id ? null : id);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-20">
      <header className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Protocolo Bússola
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Glossário Técnico-Operacional
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Termos essenciais da rede intersetorial, fluxos de proteção e uso do webapp.
              Base: território Ermelino Matarazzo (Zona Leste SP).
            </p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-3xl font-black text-blue-600">{stats.total}</p>
            <p className="text-xs font-bold uppercase text-slate-500">Termos</p>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        <strong>⚠️ Importante:</strong> Este glossário é ferramenta de trabalho para decisões rápidas em situações críticas.
        Em dúvida, consulte coordenação ou direção. Nunca tome decisões sozinho(a) em casos graves.
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <label className="mb-2 block text-sm font-bold text-slate-700">
            🔍 Buscar termo, sigla, definição ou exemplo
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ex: CAPS, ideação suicida, encaminhamento..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <p className="mt-2 text-xs text-slate-600">
            Mostrando {visibleTerms.length} de {filteredTerms.length} resultado(s).
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-slate-700">
            📂 Filtrar por categoria
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="Todas">Todas as categorias ({stats.total})</option>
            {sortedCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat} ({stats.categories[cat]})
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-3">
        {filteredTerms.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-sm text-slate-500">
              Nenhum termo encontrado para "{searchQuery}". Tente outro termo ou limpe a busca.
            </p>
          </div>
        ) : (
          visibleTerms.map((term) => {
            const isExpanded = expandedTermId === term.id;

            return (
              <article
                key={term.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => toggleExpand(term.id)}
                  className="flex w-full items-start justify-between gap-4 p-4 text-left"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-black text-slate-900">
                        {term.termo}
                      </h3>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold uppercase text-blue-700">
                        {term.categoria}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">
                      {term.definicao}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                      isExpanded ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isExpanded ? '−' : '+'}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="space-y-3 border-t border-slate-200 bg-slate-50 p-4">
                    {term.exemplo && (
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-green-700">
                          💡 Como usar no webapp
                        </p>
                        <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-slate-700">
                          {term.exemplo}
                        </p>
                      </div>
                    )}

                    {term.sinonimos && term.sinonimos.length > 0 && (
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-slate-600">
                          🔄 Também conhecido como
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {term.sinonimos.map((sin, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-slate-200 px-2 py-1 text-xs text-slate-700"
                            >
                              {sin}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {term.relacionados && term.relacionados.length > 0 && (
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-purple-700">
                          🔗 Termos relacionados
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {term.relacionados.map((rel, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSearchQuery(rel)}
                              className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 transition-colors hover:bg-purple-200"
                            >
                              {rel}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {term.observacoes && (
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-orange-700">
                          ⚠️ Observações importantes
                        </p>
                        <p className="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-slate-700">
                          {term.observacoes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}

        {filteredTerms.length > visibleTerms.length ? (
          <div className="pt-2 text-center">
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
              onClick={() => setVisibleCount((prev) => prev + INITIAL_VISIBLE)}
            >
              Carregar mais termos ({filteredTerms.length - visibleTerms.length} restantes)
            </button>
          </div>
        ) : null}
      </section>

      <footer className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        <h3 className="mb-2 font-bold text-slate-900">📚 Como usar este glossário</h3>
        <ul className="list-inside list-disc space-y-1">
          <li>Use a <strong>busca</strong> para localizar termos rapidamente durante atendimentos</li>
          <li>Clique em <strong>termos relacionados</strong> para navegar entre conceitos conectados</li>
          <li>Os <strong>exemplos práticos</strong> indicam como usar o termo no contexto do webapp</li>
          <li>Termos com <strong>⚠️ observações</strong> exigem atenção especial (protocolos obrigatórios, prazos, restrições)</li>
          <li>Sugestões de novos termos: envie para coordenação pedagógica</li>
        </ul>
      </footer>
    </div>
  );
};
