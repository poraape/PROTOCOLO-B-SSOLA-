
import React, { useState, useEffect, useMemo } from 'react';
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
  html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;" class="marker-pin">
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
    <div className="space-y-4 animate-in fade-in duration-500 pb-24">
      <div className="px-2 flex justify-between items-end mb-2">
        <div>
          <p className="text-[10px] font-black text-[#007AFF] uppercase tracking-widest mb-1">Guia de Contatos</p>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Rede de Apoio</h2>
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl flex gap-1 shadow-inner border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-[#007AFF] shadow-sm' : 'text-slate-400'
            }`}
          >
            Lista
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              viewMode === 'map' ? 'bg-white dark:bg-slate-700 text-[#007AFF] shadow-sm' : 'text-slate-400'
            }`}
          >
            Mapa
          </button>
        </div>
      </div>

      {/* Search and Filters Stickiness */}
      <div className="sticky top-16 md:top-24 z-40 bg-ios-bg/95 dark:bg-ios-darkBg/95 backdrop-blur-xl -mx-4 px-4 py-4 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="relative mb-4">
          <input 
            type="text"
            placeholder="Buscar por nome, categoria ou rua..."
            className="w-full p-4 pl-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-ios focus:ring-2 focus:ring-[#007AFF] outline-none transition-all font-bold text-slate-800 dark:text-slate-200 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-xs text-slate-500">✕</button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black whitespace-nowrap transition-all flex items-center gap-2 border ${
                filter === cat.id 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
        
        {smartSuggestions.length > 0 && (
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar animate-in fade-in slide-in-from-top-1">
             <span className="text-[9px] font-black text-slate-400 uppercase shrink-0">Atalhos:</span>
             {smartSuggestions.map(cat => (
               <button
                 key={cat}
                 onClick={() => setFilter(cat as any)}
                 className="bg-[#007AFF]/10 text-[#007AFF] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-[#007AFF]/20 whitespace-nowrap"
               >
                 {cat}
               </button>
             ))}
          </div>
        )}
      </div>

      <div className={`transition-all duration-500 overflow-hidden ${viewMode === 'map' ? 'h-[40vh] opacity-100 mb-4' : 'h-0 opacity-0 pointer-events-none'}`}>
        <div className="h-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl mx-2">
          <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full z-10" scrollWheelZoom={false}>
            <ChangeView center={mapCenter} zoom={mapZoom} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filtered.map(contato => contato.lat && contato.lng && (
              <Marker key={contato.id} position={[contato.lat, contato.lng]} icon={createCustomIcon(CATEGORY_COLORS[contato.categoria])}
                eventHandlers={{ click: () => setSelectedContact(contato) }}>
                <Popup>
                  <div className="p-1 text-center">
                    <h4 className="font-black text-slate-900 leading-tight mb-2 text-xs">{contato.nome}</h4>
                    <a href={`tel:${contato.telefone.replace(/\D/g,'')}`} className="inline-block bg-[#007AFF] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Chamar</a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="space-y-4 px-2">
        {filtered.length > 0 ? filtered.map(contato => (
          <div 
            key={contato.id} 
            className={`ios-card border transition-all duration-300 relative overflow-hidden flex flex-col ${
              contato.urgencia 
                ? 'bg-red-50/20 dark:bg-red-900/10 border-red-200/50 dark:border-red-900/30' 
                : 'bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800 shadow-ios'
            }`}
          >
            {/* Top Indicator */}
            <div className={`h-1 w-full ${contato.urgencia ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-800 opacity-50'}`} />
            
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {contato.categoria}
                    </span>
                    {contato.urgencia && (
                      <span className="bg-[#FF3B30] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm animate-pulse">
                        Urgência
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-black tracking-tight leading-tight ${contato.urgencia ? 'text-red-900 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    {contato.nome}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => focusOnMap(contato)} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-lg shadow-sm">🧭</button>
                  <button onClick={() => handleCopy(contato.telefone)} className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-lg shadow-sm">📋</button>
                </div>
              </div>

              {/* Minimalist Details Grid */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {contato.endereco && (
                  <div className="flex gap-2 items-start">
                    <span className="text-xs opacity-40">📍</span>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-tight">{contato.endereco}</p>
                  </div>
                )}
                {contato.horario && (
                  <div className="flex gap-2 items-start">
                    <span className="text-xs opacity-40">🕒</span>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 leading-tight">{contato.horario}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons Optimized for Mobile */}
              <div className="flex gap-3">
                <a 
                  href={`tel:${contato.telefone.replace(/\D/g,'')}`}
                  className={`flex-[1.5] py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl ${
                    contato.urgencia ? 'bg-[#FF3B30] text-white shadow-red-200 dark:shadow-red-950/30' : 'bg-[#007AFF] text-white shadow-blue-200 dark:shadow-blue-950/30'
                  }`}
                >
                  <span className="text-lg">📞</span>
                  Ligar Agora
                </a>
                
                {contato.whatsapp && (
                  <a 
                    href={`https://wa.me/55${contato.whatsapp.replace(/\D/g,'')}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 bg-[#34C759] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-green-100 dark:shadow-green-950/30"
                  >
                    <span className="text-lg">💬</span>
                    Zap
                  </a>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 px-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800">
            <span className="text-5xl block mb-4 opacity-20">🔎</span>
            <h4 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Nenhum contato encontrado</h4>
            <p className="text-slate-300 dark:text-slate-600 text-xs mt-2">Tente ajustar sua busca ou filtro.</p>
          </div>
        )}
      </div>

      {/* Info Banner at the Bottom */}
      <div className="mx-2 mt-8 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-[2rem] border border-amber-100 dark:border-amber-800/30 flex items-start gap-4">
        <span className="text-2xl drop-shadow-sm">⚠️</span>
        <div>
          <h4 className="font-black text-amber-900 dark:text-amber-300 text-[10px] uppercase tracking-widest mb-1">Aviso da Rede</h4>
          <p className="text-amber-800/80 dark:text-amber-400/80 text-[11px] font-bold leading-relaxed">
            A escola aciona a rede, mas não controla prazos, vagas ou o resultado final dos serviços externos. Documente sempre cada tentativa de contato no Anexo IV.
          </p>
        </div>
      </div>
    </div>
  );
};
