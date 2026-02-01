
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CONTATOS } from '../data';
import { Contato } from '../types';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const SUGGESTION_MAP: Record<string, 'saude' | 'protecao' | 'assistencia' | 'justica'> = {
  'medico': 'saude',
  'saude': 'saude',
  'hospital': 'saude',
  'remedio': 'saude',
  'psicologo': 'saude',
  'crise': 'saude',
  'surto': 'saude',
  'ubs': 'saude',
  'caps': 'saude',
  'violencia': 'protecao',
  'abuso': 'protecao',
  'conselho': 'protecao',
  'tutelar': 'protecao',
  'policia': 'protecao',
  'seguranca': 'protecao',
  'fome': 'assistencia',
  'cras': 'assistencia',
  'creas': 'assistencia',
  'social': 'assistencia',
  'comida': 'assistencia',
  'pobreza': 'assistencia',
  'vulnerabilidade': 'assistencia',
  'oficio': 'justica',
  'delegacia': 'justica',
  'lei': 'justica',
  'justica': 'justica',
  'ddm': 'justica',
  'boletim': 'justica'
};

const createCustomIcon = (color: string) => L.divIcon({
  className: 'custom-icon',
  html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; transform: scale(1); transition: all 0.3s;" class="marker-pin">
           <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const CATEGORY_COLORS = {
  saude: '#34C759',
  protecao: '#007AFF',
  assistencia: '#FF9500',
  justica: '#AF52DE'
};

const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

export const NetworkPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'todos' | 'saude' | 'protecao' | 'assistencia' | 'justica'>('todos');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedContact, setSelectedContact] = useState<Contato | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-23.491, -46.478]);
  const [mapZoom, setMapZoom] = useState(15);
  
  const listRef = useRef<HTMLDivElement>(null);

  const smartSuggestions = useMemo(() => {
    if (!search || search.length < 2) return [];
    const words = search.toLowerCase().split(' ');
    const matchedCategories = new Set<string>();
    words.forEach(word => {
      Object.keys(SUGGESTION_MAP).forEach(key => {
        if (key.includes(word) || word.includes(key)) matchedCategories.add(SUGGESTION_MAP[key]);
      });
    });
    return Array.from(matchedCategories).filter(cat => cat !== filter);
  }, [search, filter]);

  const filtered = CONTATOS.filter(c => {
    const matchesSearch = c.nome.toLowerCase().includes(search.toLowerCase()) ||
                         c.categoria.toLowerCase().includes(search.toLowerCase()) ||
                         c.endereco?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'todos' || c.categoria === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'todos', label: 'Tudo', icon: '🌟' },
    { id: 'saude', label: 'Saúde', icon: '🏥' },
    { id: 'protecao', label: 'Apoio', icon: '🛡️' },
    { id: 'assistencia', label: 'Social', icon: '🏠' },
    { id: 'justica', label: 'Justiça', icon: '⚖️' },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Feedback visual simples poderia ser adicionado aqui
  };

  const focusOnMap = (contact: Contato) => {
    if (contact.lat && contact.lng) {
      setMapCenter([contact.lat, contact.lng]);
      setMapZoom(17);
      setSelectedContact(contact);
      setViewMode('map');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <div className="px-2 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Rede de Apoio</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Contatos Ermelino Matarazzo</p>
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex gap-1 shadow-inner border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-[#007AFF] shadow-sm' : 'text-slate-400'
            }`}
          >
            Lista
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'map' ? 'bg-white dark:bg-slate-700 text-[#007AFF] shadow-sm' : 'text-slate-400'
            }`}
          >
            Mapa
          </button>
        </div>
      </div>

      <div className="space-y-4 sticky top-16 md:top-24 z-40 bg-ios-bg/90 dark:bg-ios-darkBg/90 backdrop-blur-xl pt-2 pb-4 px-2 -mx-2 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="relative group mx-2">
          <input 
            type="text"
            placeholder="Buscar serviço ou local..."
            className="w-full p-4 pl-12 rounded-[1.25rem] border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900 shadow-ios focus:ring-2 focus:ring-[#007AFF] outline-none transition-all font-bold text-slate-800 dark:text-slate-200 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-[#007AFF]">🔍</span>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-[8px] font-black">✕</button>
          )}
        </div>

        {smartSuggestions.length > 0 && (
          <div className="px-2 flex items-center gap-2 animate-in slide-in-from-top-1 duration-300">
             <span className="text-[9px] font-black text-[#007AFF] uppercase tracking-tighter">Sugestão:</span>
             <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {smartSuggestions.map(cat => {
                  const categoryInfo = categories.find(c => c.id === cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat as any)}
                      className="bg-[#007AFF]/10 dark:bg-[#007AFF]/20 text-[#007AFF] px-3 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 border border-[#007AFF]/20"
                    >
                      <span>{categoryInfo?.icon}</span>
                      {categoryInfo?.label}
                    </button>
                  );
                })}
             </div>
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar px-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filter === cat.id 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' 
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`transition-all duration-500 overflow-hidden ${viewMode === 'map' ? 'h-[50vh] opacity-100 mb-6' : 'h-0 opacity-0 pointer-events-none'}`}>
        <div className="h-full rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl relative mx-2">
          <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full z-10" scrollWheelZoom={false}>
            <ChangeView center={mapCenter} zoom={mapZoom} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filtered.map(contato => contato.lat && contato.lng && (
              <Marker key={contato.id} position={[contato.lat, contato.lng]} icon={createCustomIcon(CATEGORY_COLORS[contato.categoria])}
                eventHandlers={{ click: () => setSelectedContact(contato) }}>
                <Popup className="ios-popup">
                  <div className="p-1">
                    <h4 className="font-black text-slate-900 leading-tight mb-1 text-xs">{contato.nome}</h4>
                    <a href={`tel:${contato.telefone.replace(/\D/g,'')}`} className="block w-full text-center bg-[#007AFF] text-white py-2 rounded-lg text-[9px] font-black">LIGAR AGORA</a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className={`space-y-3 px-2 transition-opacity duration-300 ${viewMode === 'map' ? 'opacity-50' : 'opacity-100'}`}>
        {filtered.length > 0 ? filtered.map(contato => (
          <div 
            id={`contact-${contato.id}`}
            key={contato.id} 
            className={`ios-card p-4 border transition-all duration-300 relative overflow-hidden ${
              contato.urgencia 
                ? 'bg-red-50/30 dark:bg-red-900/10 border-red-200 dark:border-red-900/30' 
                : 'border-slate-100 dark:border-slate-800 shadow-sm'
            } ${selectedContact?.id === contato.id ? 'ring-2 ring-[#007AFF]' : ''}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-3 items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner shrink-0 ${
                  contato.urgencia ? 'bg-[#FF3B30] text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}>
                  {contato.urgencia ? '🚨' : '🏛️'}
                </div>
                <div className="min-w-0">
                  <h3 className={`font-black text-[15px] tracking-tight leading-tight truncate ${contato.urgencia ? 'text-red-900 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    {contato.nome}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-slate-200/50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
                      {contato.categoria}
                    </span>
                    {contato.urgencia && (
                      <span className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                        Emergência
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => focusOnMap(contato)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm shadow-sm">🧭</button>
                <button onClick={() => handleCopy(contato.telefone)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm shadow-sm">📋</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5 px-1">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Localização</p>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight line-clamp-2">{contato.endereco || '—'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">Atendimento</p>
                <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight line-clamp-2">{contato.horario || '—'}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a 
                href={`tel:${contato.telefone.replace(/\D/g,'')}`}
                className={`flex-[2] py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all ${
                  contato.urgencia ? 'bg-[#FF3B30] text-white' : 'bg-[#007AFF] text-white'
                }`}
              >
                📞 Ligar
              </a>
              {contato.whatsapp && (
                <a 
                  href={`https://wa.me/55${contato.whatsapp.replace(/\D/g,'')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-[#34C759] text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                >
                  💬 Zap
                </a>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <span className="text-4xl block mb-2 opacity-30">🔦</span>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Sem Resultados</p>
          </div>
        )}
      </div>

      <div className="mx-2 p-5 bg-yellow-400 dark:bg-yellow-500 rounded-[2rem] shadow-xl flex items-start gap-4">
        <span className="text-2xl drop-shadow-md">💡</span>
        <div className="min-w-0">
          <h4 className="font-black text-slate-900 text-[11px] uppercase tracking-tighter mb-0.5">Ação Prioritária</h4>
          <p className="text-slate-900 text-[10px] font-bold leading-relaxed">
            Em risco iminente, use o botão vermelho de <strong>Ligar</strong> imediatamente. O sistema BÚSSOLA é suporte, o atendimento rápido é sobrevivência.
          </p>
        </div>
      </div>
    </div>
  );
};
