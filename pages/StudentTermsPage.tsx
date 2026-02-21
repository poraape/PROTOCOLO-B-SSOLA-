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

type CategoryFilter = 'Todas' | 'Base Legal' | 'Conceitos' | 'Procedimentos' | 'Fluxo Operacional';
type Category = Exclude<CategoryFilter, 'Todas'>;

export const StudentTermsPage: React.FC = () => {
  const [terms, setTerms] = useState<GlossaryTerm[]>([]);
  const [search, setSearch] = useState('');
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [context, setContext] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Todas');
  const [category, setCategory] = useState<Category>('Conceitos');

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
      const matchesCategory = categoryFilter === 'Todas' || item.category === categoryFilter;
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
      <header className="rounded-3xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-purple-600">Wiki Colaborativa</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Gírias e Expressões dos Estudantes</h1>
        <p className="mt-2 text-sm text-slate-600">
          Espaço colaborativo para registrar expressões da juventude, contexto de uso e apoio pedagógico.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          💡 <strong>Novo!</strong> Procurando termos técnicos da rede (CAPS, CRAS, CT)? Acesse o menu <strong>"Glossário Técnico"</strong>.
        </p>
      </header>

      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        ⚠️ Use este conteúdo como apoio pedagógico. Não rotule estudantes por gírias isoladas; sempre contextualize.
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={addTerm} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
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
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="Base Legal">Base Legal</option>
            <option value="Conceitos">Conceitos</option>
            <option value="Procedimentos">Procedimentos</option>
            <option value="Fluxo Operacional">Fluxo Operacional</option>
          </select>

          <button className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-purple-700">
            Salvar termo
          </button>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900">Buscar na wiki</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar termo, significado ou contexto"
            className="mt-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <div className="mt-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
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
