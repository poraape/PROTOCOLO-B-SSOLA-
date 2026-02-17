import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchIndex } from '../search/searchIndex';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (query.trim().length <= 2) return [];
    const q = query.toLowerCase();
    return searchIndex.filter((item) => item.content.includes(q)).slice(0, 10);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar no sistema..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-64 max-w-full"
      />

      {results.length > 0 && (
        <div className="absolute right-0 md:right-auto bg-white shadow-lg mt-2 w-72 max-h-80 overflow-y-auto rounded border border-slate-200 z-50">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              onClick={() => {
                navigate(result.route);
                setQuery('');
              }}
              className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(result.route);
                  setQuery('');
                }
              }}
            >
              <div className="font-semibold">{result.title}</div>
              <div className="text-gray-500">{result.type}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
