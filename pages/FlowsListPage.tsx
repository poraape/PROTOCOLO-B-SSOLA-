import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS } from '../data';
import { AppInput } from '../components/ui/AppInput';
import { PageHeader } from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';

type CategoriaFluxo = 'todos' | 'saude' | 'violencia' | 'social' | 'pedagogico';

export const FlowsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState<CategoriaFluxo>('todos');

  const fluxosArray = Object.values(FLUXOS);

  const filteredFluxos = useMemo(() => {
    return fluxosArray.filter((f) => {
      const matchesSearch =
        f.titulo.toLowerCase().includes(search.toLowerCase()) ||
        f.descricao.toLowerCase().includes(search.toLowerCase()) ||
        f.convivaFields.some((field) => field.toLowerCase().includes(search.toLowerCase()));

      const matchesCat =
        categoria === 'todos' ||
        (categoria === 'saude' && (f.id.includes('saude') || f.id.includes('suicidio') || f.id.includes('automu'))) ||
        (categoria === 'violencia' && f.id.includes('violencia')) ||
        (categoria === 'pedagogico' && f.id.includes('pedagogico'));

      return matchesSearch && matchesCat;
    });
  }, [search, categoria, fluxosArray]);

  const categorias = [
    { id: 'todos', label: 'Todos', icon: '📚' },
    { id: 'saude', label: 'Saúde Mental', icon: '🧠' },
    { id: 'violencia', label: 'Violência', icon: '⚠️' },
    { id: 'pedagogico', label: 'Pedagógico', icon: '🎓' }
  ];

  return (
    <div className="stack space-3" style={{ paddingBottom: 20 }}>
      <PageHeader
        title="Biblioteca de Protocolos"
        subtitle="Referência Técnica A-P (v4.5)"
      />

      <Section>
        <div className="card-flat">
          <AppInput
            id="flow-search"
            label="Busca por sintoma"
            type="search"
            placeholder="O que você está observando? (Ex: cortes, choro, faltas...)"
            value={search}
            onChange={setSearch}
          />

          <div className="row" style={{ flexWrap: 'wrap', marginTop: 10 }}>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoria(cat.id as CategoriaFluxo)}
                className={`ui-btn ${categoria === cat.id ? 'ui-btn--primary' : 'ui-btn--secondary'}`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid-2">
          {filteredFluxos.length > 0 ? (
            filteredFluxos.map((f) => (
              <div key={f.id} className="card-flat">
                <div className="stack space-2">
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong style={{ color: 'var(--text)' }}>{f.titulo}</strong>
                    <span className="ui-chip ui-chip--info">Protocolo {f.codigo}</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>{f.descricao}</p>
                  <button type="button" className="ui-btn ui-btn--ghost ui-btn--sm" onClick={() => navigate(`/fluxos/${f.id}`)}>
                    Abrir protocolo
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="card-flat">
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Nenhum protocolo corresponde à busca</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};
