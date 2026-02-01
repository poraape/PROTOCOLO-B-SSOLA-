
import React, { useState } from 'react';
import { RECURSOS } from '../data';
import { BussolaLogoRefined } from '../components/BussolaLogoRefined';

const FAQ_ITEMS = [
  {
    pergunta: "Como faço para registrar uma nova demanda?",
    resposta: "O aplicativo é uma ferramenta de consulta. Para registrar oficialmente, utilize o 'Decisor de Risco' para identificar o protocolo correto, preencha o Anexo I (Ficha de Acolhimento) manualmente e siga as instruções de encaminhamento do fluxo correspondente.",
    icon: "📝"
  },
  {
    pergunta: "O sigilo das informações é garantido?",
    resposta: "Sim. Este guia não armazena dados nominais de estudantes. Todas as informações sensíveis devem ser registradas apenas nos documentos físicos oficiais (Anexos) e guardadas em local seguro na escola.",
    icon: "🔐"
  },
  {
    pergunta: "Quando o acionamento do Conselho Tutelar é obrigatório?",
    resposta: "Conforme o Art. 13 do ECA, o acionamento é obrigatório em qualquer suspeita ou confirmação de maus-tratos, violência ou negligência grave. O prazo para comunicação oficial é de no máximo 24 horas.",
    icon: "⚠️"
  },
  {
    pergunta: "Qual a diferença entre encaminhar para o CRAS ou CREAS?",
    resposta: "O CRAS (Centro de Referência de Assistência Social) atua na prevenção e situações de vulnerabilidade (ex: insegurança alimentar, falta de documentos). O CREAS (Centro de Referência Especializado) atua quando já houve violação de direitos (ex: violência doméstica, trabalho infantil).",
    icon: "🏠"
  },
  {
    pergunta: "A escola pode levar o aluno ao hospital sem os pais?",
    resposta: "Em emergências extremas com risco de vida, chame o SAMU (192). O socorro médico fará o transporte. A escola deve enviar um representante e tentar contatar os responsáveis incessantemente. A escola não deve realizar transporte em veículo particular.",
    icon: "🚑"
  },
  {
    pergunta: "O que é 'Escuta Qualificada' e como devo proceder?",
    resposta: "É o acolhimento do relato do estudante sem métodos investigativos. Você deve ouvir, oferecer suporte e validar os sentimentos. NUNCA interrogue, confronte versões ou peça para o estudante repetir o relato várias vezes.",
    icon: "👂"
  },
  {
    pergunta: "O que fazer se o contato da rede não atender?",
    resposta: "Em situações de emergência com risco de vida ou crime em flagrante, acione imediatamente a Polícia Militar (190) ou o SAMU (192). Para outros serviços, utilize os números de plantão ou whatsapp listados na aba 'Rede'.",
    icon: "📞"
  },
  {
    pergunta: "O que acontece se a escola omitir uma denúncia?",
    resposta: "A omissão de comunicação de maus-tratos à autoridade competente é infração administrativa punível com multa (ECA Art. 245), além de possível responsabilização criminal e civil dos envolvidos.",
    icon: "⚖️"
  },
  {
    pergunta: "Posso denunciar anonimamente pelo Disque 100?",
    resposta: "Sim. O Disque 100 é o canal nacional para denúncias de violações de direitos humanos. Ele funciona 24h e aceita denúncias anônimas. É um recurso importante quando há dúvida sobre o canal local ou medo de retaliação.",
    icon: "💯"
  },
  {
    pergunta: "Quem deve assinar os ofícios de encaminhamento?",
    resposta: "Documentos de comunicação externa (especialmente para o Conselho Tutelar e Ministério Público) devem ser assinados pelo Diretor de Escola ou seu substituto legal em exercício.",
    icon: "✍️"
  }
];

export const ResourcesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [viewerUrl, setViewerUrl] = useState<string | null>(null);
  const [activeTitle, setActiveTitle] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filtered = RECURSOS.filter(r => 
    r.titulo.toLowerCase().includes(search.toLowerCase()) || 
    r.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const openViewer = (id: string, title: string) => {
    const path = `/downloads/${id}.pdf`;
    setViewerUrl(path);
    setActiveTitle(title);
  };

  const closeViewer = () => {
    setViewerUrl(null);
    setActiveTitle('');
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Header Refinado com Novo Logo */}
      <section className="relative px-2 py-8 flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 rounded-[3rem] -z-10"></div>
        
        <BussolaLogoRefined className="w-32 h-32 mb-6" />
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Documentação <span className="text-[#007AFF]">Oficial</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
            Orientação • Acolhimento • Proteção
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></span>
            <span className="text-[11px] font-black text-slate-400">VERSÃO 4.0</span>
            <span className="h-[1px] w-8 bg-slate-200 dark:bg-slate-800"></span>
          </div>
        </div>
      </section>

      {/* Busca de Documentos */}
      <div className="px-2">
        <div className="relative group">
          <input 
            type="text"
            placeholder="Pesquisar formulários e anexos..."
            className="w-full p-5 pl-14 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-ios focus:ring-2 focus:ring-[#007AFF] outline-none transition-all font-medium text-slate-800 dark:text-slate-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-2xl group-focus-within:text-[#007AFF] transition-colors">🔍</span>
        </div>
      </div>

      {/* Grid de Recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(rec => (
          <div key={rec.id} className="ios-card p-6 border border-slate-100 dark:border-slate-800 shadow-ios flex flex-col justify-between group bg-white dark:bg-slate-900">
            <div className="mb-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm ${
                  rec.obrigatorio 
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
                  : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                }`}>
                  📄
                </div>
                {rec.obrigatorio && (
                  <span className="bg-[#FF3B30] text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm animate-pulse">
                    Uso Obrigatório
                  </span>
                )}
              </div>
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-lg mb-2 leading-tight group-hover:text-[#007AFF] transition-colors">
                {rec.titulo}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-[13px] leading-relaxed font-medium">
                {rec.descricao}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex gap-2">
                <button 
                  onClick={() => openViewer(rec.id, rec.titulo)}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>👁️</span> Ver
                </button>
                <a 
                  href={`/downloads/${rec.id}.${rec.formato}`}
                  download
                  className="flex-[1.5] bg-[#007AFF] text-white py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                  <span>📥</span> Baixar {rec.formato.toUpperCase()}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seção FAQ */}
      <section className="px-2 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Perguntas Frequentes</h3>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] uppercase tracking-widest">Suporte e Orientações Rápidas</p>
          </div>
          <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl shadow-ios flex items-center justify-center text-2xl">🙋‍♂️</div>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => (
            <div 
              key={idx} 
              className="ios-card border border-slate-100 dark:border-slate-800 shadow-ios overflow-hidden bg-white dark:bg-slate-900 transition-all duration-300"
            >
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-5">
                  <span className="text-2xl drop-shadow-sm">{faq.icon}</span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 text-base leading-tight">{faq.pergunta}</span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 transition-transform duration-500 ${expandedFaq === idx ? 'rotate-180 bg-[#007AFF] text-white' : ''}`}>
                  <span className="text-xs">▼</span>
                </div>
              </button>
              
              <div 
                className={`px-6 bg-slate-50/50 dark:bg-slate-800/20 transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedFaq === idx ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed font-medium">
                    {faq.resposta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {viewerUrl && (
        <div className="fixed inset-0 z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={closeViewer} />
          
          <div className="relative flex-1 m-4 md:m-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 dark:border-slate-800">
            <div className="h-20 flex items-center justify-between px-8 border-b border-slate-100 dark:border-slate-800 glass z-10">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#007AFF] uppercase tracking-[0.2em]">Visualização Documental</span>
                <h3 className="text-sm font-black text-slate-800 dark:text-white truncate max-w-[200px] md:max-w-md">{activeTitle}</h3>
              </div>
              <button 
                onClick={closeViewer}
                className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-inner"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            <div className="flex-1 bg-slate-200/30 dark:bg-black/20 flex items-center justify-center overflow-hidden">
              <iframe 
                src={viewerUrl} 
                className="w-full h-full border-none"
                title="Visualizador de Documento"
              />
            </div>

            <div className="p-6 md:p-8 border-t border-slate-100 dark:border-slate-800 flex gap-4 bg-white dark:bg-slate-900">
              <button 
                onClick={closeViewer}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-5 rounded-2xl font-black text-sm active:scale-95 transition-all"
              >
                FECHAR
              </button>
              <a 
                href={viewerUrl}
                download
                className="flex-[2] bg-[#007AFF] text-white py-5 rounded-2xl font-black text-sm shadow-2xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <span>📥</span> BAIXAR ARQUIVO
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="ios-card bg-slate-900 dark:bg-slate-800 p-10 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl border border-white/5">
        <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner border border-white/10 animate-pulse">🔐</div>
        <div className="text-center md:text-left space-y-2">
          <h4 className="font-black text-xl tracking-tight">Protocolo de Confidencialidade</h4>
          <p className="text-slate-400 text-[15px] leading-relaxed max-w-xl">
            Este acervo documental é de uso exclusivo para profissionais da educação. Informações sobre estudantes são protegidas por lei e o vazamento de dados implica em responsabilidade administrativa e civil.
          </p>
        </div>
      </div>
    </div>
  );
};
