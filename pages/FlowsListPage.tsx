import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLUXOS } from '../data';
import { AppButton } from '../components/ui/AppButton';
import { AppCard } from '../components/ui/AppCard';
import { AppInput } from '../components/ui/AppInput';
import { AppChip } from '../components/ui/AppChip';
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
        <AppCard>
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
              <AppButton
                key={cat.id}
                onClick={() => setCategoria(cat.id as CategoriaFluxo)}
                variant={categoria === cat.id ? 'primary' : 'secondary'}
              >
                {cat.icon} {cat.label}
              </AppButton>
            ))}
          </div>
        </AppCard>
      </Section>

      <Section>
        <div className="grid-2">
          {filteredFluxos.length > 0 ? (
            filteredFluxos.map((f) => (
              <AppCard key={f.id} as="article">
                <div className="stack space-2">
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong style={{ color: 'var(--text)' }}>{f.titulo}</strong>
                    <AppChip label={`Protocolo ${f.codigo}`} tone="info" />
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-muted)' }}>{f.descricao}</p>
                  <AppButton variant="ghost" onClick={() => navigate(`/fluxos/${f.id}`)}>
                    Abrir protocolo
                  </AppButton>
                </div>
              </AppCard>
            ))
          ) : (
            <AppCard>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>Nenhum protocolo corresponde à busca</p>
            </AppCard>
          )}
        </div>
      </Section>
    </div>
  );
};
