import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS, CONTATOS, TECHNICAL_GLOSSARY } from '../data';
import { AppInput } from '../components/ui/AppInput';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';

export const BuscaPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const allResults = useMemo(() => {
    if (query.length < 2) return [];

    const fluxos = Object.values(FLUXOS)
      .filter((f) =>
        f.titulo.toLowerCase().includes(query.toLowerCase()) ||
        f.descricao.toLowerCase().includes(query.toLowerCase()) ||
        f.codigo.toLowerCase() === query.toLowerCase()
      )
      .map((f) => ({ ...f, type: 'Fluxo' }));

    const contatos = CONTATOS
      .filter((c) => c.nome.toLowerCase().includes(query.toLowerCase()) || c.categoria.toLowerCase().includes(query.toLowerCase()))
      .map((c) => ({ ...c, type: 'Contato' }));

    const glossario = TECHNICAL_GLOSSARY
      .filter((g) => {
        const haystack = [
          g.termo,
          g.definicao,
          g.exemplo || '',
          g.observacoes || '',
          g.categoria,
          ...(g.sinonimos || [])
        ].join(' ').toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
      .slice(0, 12)
      .map((g) => ({ ...g, type: 'Glossário' as const }));

    return [...fluxos, ...contatos, ...glossario];
  }, [query]);

  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader title="Busca Global" subtitle="Encontre protocolos, contatos, documentos e termos do glossário técnico." />

      <Section>
        <div className="card-flat">
          <AppInput
            id="busca-global"
            label="Buscar"
            type="search"
            placeholder="O que você está procurando?"
            value={query}
            onChange={setQuery}
          />
        </div>
      </Section>

      <Section>
        <div className="stack space-2">
          {allResults.length > 0 ? (
            allResults.map((res: any, idx) => (
              <div key={idx} className="card-flat">
                <button
                  onClick={() => {
                    if (res.type === 'Fluxo') navigate(`/fluxos/${res.id}`);
                    if (res.type === 'Contato') navigate('/rede');
                    if (res.type === 'Glossário') navigate(`/glossary?q=${encodeURIComponent(res.termo)}`);
                  }}
                  className="ui-btn ui-btn--ghost"
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  {res.type} — {res.titulo || res.nome || res.termo}
                </button>
              </div>
            ))
          ) : query.length >= 2 ? (
            <div className="card-flat">
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Nenhum resultado para "{query}"</p>
            </div>
          ) : (
            <div className="card-flat">
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Digite pelo menos 2 letras para buscar</p>
            </div>
          )}
        </div>
      </Section>

      {query ? (
        <button type="button" className="ui-btn ui-btn--ghost" onClick={() => setQuery('')}>Limpar busca</button>
      ) : null}
    </div>
  );
};
