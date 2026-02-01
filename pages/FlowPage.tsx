
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FLUXOS, CONTATOS } from '../data';

export const FlowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fluxo = FLUXOS[id || ''];

  if (!fluxo) return <div className="p-8 text-center font-bold text-slate-400">Fluxo não encontrado.</div>;

  const contatosRelacionados = CONTATOS.filter(c => fluxo.contatosUteis.includes(c.id));

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <button 
          onClick={() => navigate(-1)}
          className="text-[#007AFF] font-bold text-sm flex items-center gap-1 active:scale-95 transition-transform"
        >
          ← Voltar
        </button>
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${
          fluxo.risco === 'urgencia' ? 'bg-[#FF3B30] text-white' : 
          fluxo.risco === 'alto' ? 'bg-orange-100 text-orange-700' : 
          'bg-green-100 text-green-700'
        }`}>
          Risco {fluxo.risco}
        </span>
      </div>

      <header className="px-2">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-6xl drop-shadow-sm">{fluxo.icon}</span>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {fluxo.titulo}
            </h2>
            <p className="text-slate-500 font-medium">{fluxo.descricao}</p>
          </div>
        </div>
      </header>

      {fluxo.risco === 'urgencia' && (
        <div className="ios-card bg-[#FF3B30] text-white p-6 shadow-xl shadow-red-200 flex items-center gap-4 border border-red-400">
          <div className="text-3xl animate-bounce">🚨</div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest">Atenção Prioritária</h4>
            <p className="text-red-50 font-bold leading-snug">
              Este caso exige comunicação obrigatória em até 24h conforme Art. 13 do ECA.
            </p>
          </div>
        </div>
      )}

      <section className="space-y-8">
        {/* Checklist */}
        <div className="ios-card p-8 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Plano de Ação</h3>
          <ul className="space-y-4">
            {fluxo.checklist.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-100">
                <input type="checkbox" className="mt-1.5 w-6 h-6 rounded-full border-2 border-slate-300 text-[#007AFF] focus:ring-offset-0 focus:ring-0" />
                <span className="text-slate-700 font-bold text-[15px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guidance */}
        <div className="ios-card bg-amber-50 p-8 border border-amber-100">
          <h3 className="text-amber-800 font-extrabold mb-4 flex items-center gap-2">
            <span>🛡️</span> Orientações de Conduta
          </h3>
          <ul className="space-y-3">
            {fluxo.alertas.map((alerta, idx) => (
              <li key={idx} className="flex items-start gap-2 text-amber-700 text-sm font-bold leading-relaxed">
                <span className="text-amber-400">•</span>
                {alerta}
              </li>
            ))}
          </ul>
        </div>

        {/* Network Contacts */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Acionamento Direto</h3>
          <div className="grid grid-cols-1 gap-3">
            {contatosRelacionados.map(contato => (
              <div key={contato.id} className="ios-card p-5 border border-slate-100 flex items-center justify-between shadow-sm active:scale-98 transition-transform">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${contato.urgencia ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
                    {contato.urgencia ? '🚨' : '📍'}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 tracking-tight">{contato.nome}</h4>
                    <p className="text-slate-500 text-xs font-bold">{contato.telefone}</p>
                  </div>
                </div>
                <a 
                  href={`tel:${contato.telefone.replace(/\D/g,'')}`}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
                    contato.urgencia ? 'bg-[#FF3B30] shadow-red-100' : 'bg-[#007AFF] shadow-blue-100'
                  }`}
                >
                  <span className="text-white">📞</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
