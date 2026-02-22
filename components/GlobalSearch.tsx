import { forwardRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const GlobalSearch = forwardRef<HTMLInputElement>((_, ref) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/busca?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <Search size={18} className="search-icon" />
      <input
        ref={ref}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca rápida no protocolo..."
        className="search-input"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="search-clear"
          aria-label="Limpar busca"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
});
