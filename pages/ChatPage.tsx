import React, { useMemo, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PROTOCOL_DATA } from '../data';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const API_KEY_STORAGE = 'bussola_gemini_api_key_v1';

const applyInlineMarkdown = (text: string) => {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
};

const renderMarkdownSimple = (text: string) => {
  const lines = text.split('\n');
  let html = '';
  let listOpen = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) {
      if (!listOpen) {
        html += '<ul>';
        listOpen = true;
      }
      const item = trimmed.replace(/^(-\s|\d+\.\s)/, '');
      html += `<li>${applyInlineMarkdown(item)}</li>`;
      return;
    }

    if (listOpen) {
      html += '</ul>';
      listOpen = false;
    }

    if (!trimmed) {
      html += '<br />';
      return;
    }

    html += `<p>${applyInlineMarkdown(trimmed)}</p>`;
  });

  if (listOpen) html += '</ul>';
  return html;
};

export const prepareProtocolContext = () => {
  const institution = `Instituição: ${PROTOCOL_DATA.institution.name} (CIE ${PROTOCOL_DATA.institution.cie}, ${PROTOCOL_DATA.institution.diretoriaEnsino})`;

  const scenarios = PROTOCOL_DATA.decisionTree
    .filter((node) => node.isLeaf)
    .map((node) => {
      const actions = (node.guidance || []).join(' | ');
      const contacts = (node.serviceIds || [])
        .map((id) => PROTOCOL_DATA.services.find((service) => service.id === id)?.name)
        .filter(Boolean)
        .join(', ');

      return `- Cenário: ${node.question} | Gravidade: ${node.riskLevel || 'MÉDIO'} | Ações: ${actions || 'Consultar direção'} | Contatos: ${contacts || 'Direção escolar'}`;
    })
    .join('\n');

  const services = PROTOCOL_DATA.services
    .map((service) => `- ${service.name} (${service.phone}) — ${service.address}`)
    .join('\n');

  const docs = PROTOCOL_DATA.documentTemplates
    .map((doc) => `- ${doc.title}: campos obrigatórios -> ${doc.requiredFields.join(', ')}`)
    .join('\n');

  return `## DADOS OFICIAIS\n${institution}\n\n## CENÁRIOS E ENCAMINHAMENTOS\n${scenarios}\n\n## REDE DE SERVIÇOS\n${services}\n\n## DOCUMENTOS\n${docs}`;
};

export const ChatPage: React.FC = () => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(API_KEY_STORAGE) || '');
  const [editingApiKey, setEditingApiKey] = useState(() => !localStorage.getItem(API_KEY_STORAGE));
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Olá! Sou o **Assistente Bússola**. Descreva a situação em linguagem natural e eu vou responder com base no protocolo oficial da escola.'
    }
  ]);

  const protocolContext = useMemo(() => prepareProtocolContext(), []);

  const saveApiKey = () => {
    if (!apiKey.trim()) return;
    localStorage.setItem(API_KEY_STORAGE, apiKey.trim());
    setEditingApiKey(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const key = localStorage.getItem(API_KEY_STORAGE);
      if (!key) throw new Error('Chave de API não configurada.');

      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemInstruction = `
Você é o Assistente Bússola da E.E. Ermelino Matarazzo.

SUA BASE DE CONHECIMENTO (FONTE DA VERDADE):
${protocolContext}

DIRETRIZES:
1. Responda APENAS com base no contexto acima.
2. Se a resposta não estiver no contexto, diga: "Essa informação não consta no protocolo oficial. Por favor, contate a Direção."
3. Seja empático, direto e use formatação Markdown (negrito para ações críticas).
`;

      const history = messages.map((msg) => `${msg.role === 'user' ? 'Professor' : 'Assistente'}: ${msg.content}`).join('\n');

      const result = await model.generateContent(`${systemInstruction}\n\nHISTÓRICO:\n${history}\n\nPERGUNTA ATUAL:\n${userMessage.content}`);
      const text = result.response.text();

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: text || 'Essa informação não consta no protocolo oficial. Por favor, contate a Direção.'
        }
      ]);
    } catch (err: any) {
      setError(err?.message || 'Erro ao consultar IA. Verifique sua conexão e chave API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 pb-24">
      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-widest text-[#007AFF]">IA Assistente</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">Chat do Protocolo Bússola</h1>
        <p className="mt-2 text-sm text-slate-600">
          Faça perguntas em linguagem natural. As respostas são guiadas pela base oficial do protocolo da escola.
        </p>
      </header>

      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
        Chave gratuita: obtenha em <strong>Google AI Studio</strong> e cole abaixo. A chave fica salva apenas neste navegador.
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Insira sua Chave de API do Google Gemini"
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <button onClick={saveApiKey} className="rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white">
            Salvar chave
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(API_KEY_STORAGE);
              setApiKey('');
              setEditingApiKey(true);
            }}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700"
          >
            Limpar
          </button>
        </div>
        {editingApiKey && <p className="mt-2 text-xs text-slate-500">Configure a chave para habilitar respostas da IA.</p>}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="max-h-[480px] space-y-3 overflow-auto p-1">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-[#007AFF] text-white' : 'bg-slate-100 text-slate-800'
                }`}
                dangerouslySetInnerHTML={{ __html: renderMarkdownSimple(msg.content) }}
              />
            </div>
          ))}
          {loading && (
            <div className="text-sm font-semibold text-slate-500">Consultando protocolo...</div>
          )}
        </div>

        {error && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <div className="mt-4 flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: O aluno apareceu com marcas no braço, o que eu faço?"
            rows={3}
            className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="h-fit rounded-xl bg-[#007AFF] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
        <p className="font-bold">Sobre upload de protocolo/link externo</p>
        <p className="mt-1">
          Como o app é client-side, você pode incluir novos dados no próprio <code>data.ts</code> (fonte da verdade) ou criar uma etapa futura
          com upload de arquivo para extração local no navegador. Para links externos, o ideal é um backend intermediário para baixar,
          validar e versionar o conteúdo antes de enviar à IA.
        </p>
      </section>
    </div>
  );
};
