import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/busca.css';

// Mock de dados para busca — você substituirá pelos dados reais do webapp
const SEARCH_INDEX = [
  {
    id: 'dom-suicidio',
    type: 'dominio',
    title: 'Risco de Morte',
    subtitle: 'Fala ou ameaça de suicídio',
    path: '/decisor?domain=suicidio'
  },
  {
    id: 'dom-v-sexual',
    type: 'dominio',
    title: 'Violência Sexual',
    subtitle: 'Abuso, assédio ou suspeita',
    path: '/decisor?domain=v-sexual'
  },
  {
    id: 'rede-ubs',
    type: 'rede',
    title: 'UBS Ermelino Matarazzo',
    subtitle: 'Saúde básica e encaminhamentos',
    path: '/rede#ubs-ermelino'
  },
  {
    id: 'recurso-glossario',
    type: 'recurso',
    title: 'Glossário de Termos',
    subtitle: 'Entenda palavras técnicas',
    path: '/recursos#glossario'
  },
  {
    id: 'recurso-faq',
    type: 'recurso',
    title: 'Perguntas Frequentes (FAQ)',
    subtitle: 'Dúvidas comuns sobre o protocolo',
    path: '/recursos#faq'
  }
  // Adicione todos os domínios, serviços da rede, recursos, etc.
];

type SearchItem = (typeof SEARCH_INDEX)[number];

export function BuscaPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.subtitle.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  const getTypeIcon = (type: SearchItem['type']) => {
    if (type === 'dominio') return '📋';
    if (type === 'rede') return '📞';
    return '📖';
  };

  return (
    <div className="busca-page">
      <header className="busca-header">
        <h1 className="busca-title">🔍 Buscar no Sistema</h1>
        <p className="busca-subtitle">Encontre situações, serviços da rede ou recursos de apoio</p>
      </header>

      <div className="busca-input-wrap">
        <input
          type="search"
          className="busca-input"
          placeholder="Digite uma palavra-chave (ex: violência, UBS, glossário)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {query.trim() ? (
        <div className="busca-results">
          {results.length > 0 ? (
            <>
              <p className="busca-results-count">
                {results.length} resultado{results.length > 1 ? 's' : ''} encontrado
                {results.length > 1 ? 's' : ''}
              </p>
              <div className="busca-results-list">
                {results.map((item) => (
                  <button
                    key={item.id}
                    className="busca-result-card ios-card"
                    onClick={() => navigate(item.path)}
                    type="button"
                  >
                    <span className="busca-result-type">{getTypeIcon(item.type)}</span>
                    <div className="busca-result-text">
                      <span className="busca-result-title">{item.title}</span>
                      <span className="busca-result-subtitle">{item.subtitle}</span>
                    </div>
                    <span className="busca-result-arrow">→</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="busca-empty">
              <span className="busca-empty-icon">🔍</span>
              <p className="busca-empty-text">
                Nenhum resultado encontrado para "<strong>{query}</strong>"
              </p>
              <p className="busca-empty-hint">Tente palavras diferentes ou mais genéricas</p>
            </div>
          )}
        </div>
      ) : (
        <div className="busca-suggestions">
          <h3 className="busca-suggestions-title">Sugestões de busca:</h3>
          <div className="busca-tags">
            {['violência', 'autolesão', 'UBS', 'glossário', 'FAQ'].map((tag) => (
              <button key={tag} className="busca-tag" onClick={() => setQuery(tag)} type="button">
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscaPage;
