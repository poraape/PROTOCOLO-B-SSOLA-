import React, { useEffect, useMemo, useState } from 'react';
import { GLOSSARY_SEED } from '../data';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: 'Base Legal' | 'Conceitos' | 'Procedimentos' | 'Fluxo Operacional';
  context: string;
  createdAt: string;
}

const STORAGE_KEY = 'bussola_glossary_terms_v1';

export const GlossaryPage: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [context, setContext] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'Todas' | 'Base Legal' | 'Conceitos' | 'Procedimentos' | 'Fluxo Operacional'>('Todas');
  const [category, setCategory] = useState<'Base Legal' | 'Conceitos' | 'Procedimentos' | 'Fluxo Operacional'>('Conceitos');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTerms(JSON.parse(saved));
    } else {
      setTerms(GLOSSARY_SEED);
    }
  }, []);

  useEffect(() => {
    if (terms.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
  }, [terms]);

  const filteredTerms = useMemo(() => {
    const q = search.toLowerCase();
    return terms.filter((item) => {
      const matchesTerm = `${item.term} ${item.definition} ${item.context} ${item.category}`.toLowerCase().includes(q);
      const matchesCategory = categoryFilter === "Todas" || item.category === categoryFilter;
      return matchesTerm && matchesCategory;
    });
  }, [search, terms, categoryFilter]);

  const addTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !definition.trim() || !context.trim()) return;

    const newItem: GlossaryTerm = {
      id: crypto.randomUUID(),
      term: term.trim(),
      definition: definition.trim(),
      category,
      context: context.trim(),
      createdAt: new Date().toISOString()
    };

    setTerms((prev) => [newItem, ...prev]);
    setTerm('');
    setDefinition('');
    setContext('');
    setCategory('Conceitos');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">Glossário Vivo</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Wiki de termos e gírias da escola</h1>
        <p className="mt-2 text-sm text-slate-600">
          Espaço colaborativo para registrar expressões dos estudantes e contexto de uso.
        </p>
      </header>

      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Use este conteúdo como apoio pedagógico. Não rotule estudantes por gírias isoladas; sempre contextualize.
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={addTerm} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">Adicionar novo termo</h2>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Termo / gíria"
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Definição"
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Contexto observado (sala, pátio, rede social etc.)"
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "Base Legal" | "Conceitos" | "Procedimentos" | "Fluxo Operacional")}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="Base Legal">Base Legal</option>
            <option value="Conceitos">Conceitos</option>
            <option value="Procedimentos">Procedimentos</option>
            <option value="Fluxo Operacional">Fluxo Operacional</option>
          </select>

          <button className="rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white">Salvar termo</button>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Buscar no glossário</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar termo, significado ou contexto"
            className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <div className="mt-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as "Todas" | "Base Legal" | "Conceitos" | "Procedimentos" | "Fluxo Operacional")}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="Todas">Todas as categorias</option>
              <option value="Base Legal">Base Legal</option>
              <option value="Conceitos">Conceitos</option>
              <option value="Procedimentos">Procedimentos</option>
              <option value="Fluxo Operacional">Fluxo Operacional</option>
            </select>
          </div>
          <div className="mt-4 max-h-[420px] space-y-3 overflow-auto pr-1">
            {filteredTerms.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900">{item.term}</h3>
                  <span className="text-xs font-bold uppercase text-slate-500">{item.category}</span>
                </div>
                <p className="mt-1 text-sm text-slate-700"><strong>Significado:</strong> {item.definition}</p>
                <p className="mt-1 text-xs text-slate-600"><strong>Contexto:</strong> {item.context}</p>
              </article>
            ))}
            {!filteredTerms.length && (
              <p className="text-sm text-slate-500">Nenhum termo encontrado.</p>
            )}
          </div>
        </section>
      </section>
    </div>
  );
};
