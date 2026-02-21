import React, { useMemo, useState } from 'react';
import { FAQ_CONTENT_META } from '../content/protocolData';
import {
  AlertTriangle,
  BookOpenCheck,
  ClipboardCheck,
  FileLock2,
  HeartPulse,
  HelpCircle,
  MessageCircleHeart,
  Scale,
  Search,
  ShieldAlert,
  Users,
  UserRoundCheck,
} from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    id: 'papeis-responsabilidades',
    title: 'Papéis e Responsabilidades',
    icon: UserRoundCheck,
    items: [
      {
        question: 'Identifiquei um sinal de alerta (hematoma, mudança de comportamento). O que devo fazer?',
        answer:
          'Você deve comunicar imediatamente o POC (Professor Orientador de Convivência) ou a Coordenação/Direção. Não tente investigar sozinho nem interrogue o estudante sobre a origem do sinal.',
      },
      {
        question: 'Sou eu quem deve ligar para o Conselho Tutelar (CT) ou para os pais?',
        answer:
          'Não. Segundo o protocolo, qualquer profissional identifica os sinais, mas a Gestão (Direção) é quem decide o acionamento de rede externa e as notificações obrigatórias, visando a proteção institucional.',
      },
      {
        question: 'O que acontece se eu me omitir diante de uma suspeita de violência?',
        answer:
          'A comunicação de maus-tratos é uma obrigação legal (Art. 13 do ECA). Omitir-se pode gerar responsabilidade administrativa e civil. O protocolo serve justamente para te dar respaldo institucional ao relatar.',
      },
    ],
  },
  {
    id: 'acolhimento-escuta',
    title: 'Acolhimento e Escuta',
    icon: MessageCircleHeart,
    items: [
      {
        question: 'O estudante começou a me contar sobre uma violência. Como devo agir?',
        answer:
          'Pratique a Escuta Qualificada: seja empático, não julgue e, acima de tudo, não faça perguntas investigativas (como "onde", "quando" ou "quem"). Deixe o estudante falar espontaneamente para evitar a revitimização.',
      },
      {
        question: 'Qual a diferença entre Escuta Qualificada e Escuta Especializada?',
        answer:
          'A escola faz a Qualificada (acolhimento e escuta sem julgamento). A Especializada é feita por órgãos de proteção (Polícia, Judiciário) para fins de prova. A escola NÃO deve tentar realizar escuta especializada.',
      },
      {
        question: 'Devo comunicar a família imediatamente em casos de suspeita de abuso sexual?',
        answer:
          'CUIDADO. Se houver suspeita de que o agressor é um familiar ou alguém próximo, a família NÃO deve ser comunicada pela escola para não colocar o estudante em risco. A gestão acionará diretamente o Conselho Tutelar (CT)/Delegacia.',
      },
    ],
  },
  {
    id: 'fluxos-rede-territorial',
    title: 'Fluxos e Rede Territorial',
    icon: Users,
    items: [
      {
        question: 'Quando o caso é para a UBS e quando é para o CAPS IJ?',
        answer:
          'UBS (Jd. Belém): Saúde física geral, vacinas e saúde mental leve. CAPS IJ (Rua Antônio Bonici): Casos graves de saúde mental, autolesão, ideação suicida e transtornos severos em crianças e adolescentes.',
      },
      {
        question: 'O aluno está com cortes nos braços (autolesão). Qual o procedimento?',
        answer:
          'Não deixe o aluno sozinho. Comunique a gestão imediatamente. O encaminhamento prioritário é o CAPS IJ. Se houver ferimento grave ou tentativa em curso, acione o SAMU (192).',
      },
      {
        question: 'O que é a "Busca Ativa" e quando acionar o Conselho Tutelar (CT) por faltas?',
        answer:
          'A Busca Ativa começa após 3 dias de faltas consecutivas ou 5 alternadas. O Conselho Tutelar (CT) só deve ser acionado após a escola esgotar todos os recursos de contato com a família (Anexo II).',
      },
    ],
  },
  {
    id: 'documentacao-sigilo',
    title: 'Documentação e Sigilo',
    icon: FileLock2,
    items: [
      {
        question: 'O que é o Anexo I e onde ele fica guardado?',
        answer:
          'É o Formulário de Acolhimento Inicial. É obrigatório e deve ser guardado no dossiê do aluno na secretaria, sob sigilo.',
      },
      {
        question: 'O que é o PLACON e quem o alimenta?',
        answer:
          'É o sistema digital do programa CONVIVA/SP. O POC ou a Direção registram as ocorrências de violência e proteção no sistema via Secretaria Escolar Digital (SED).',
      },
      {
        question: 'Posso tirar foto do relato do aluno no meu celular?',
        answer:
          'PROIBIDO. Informações de estudantes são protegidas por sigilo e pela LGPD. Use apenas os instrumentais físicos ou o app oficial e entregue os registros para a gestão.',
      },
    ],
  },
  {
    id: 'bullying-clima-escolar',
    title: 'Bullying e Clima Escolar',
    icon: ShieldAlert,
    items: [
      {
        question: 'Presenciei uma situação de Bullying. Isso entra no protocolo de proteção?',
        answer:
          'Sim. O Bullying é uma forma de violência que gera sofrimento mental. Deve ser registrado e mediado pelo POC. Se houver agressão física ou perseguição sistemática (Cyberbullying), a gestão deve avaliar o acionamento dos responsáveis e, se grave, do Conselho Tutelar (CT).',
      },
      {
        question: 'O que fazer em casos de Cyberbullying que acontecem fora da escola?',
        answer:
          'Se o conflito impacta a convivência escolar ou o bem-estar do estudante na escola, a instituição deve intervir. Oriente a família a preservar provas (prints) e procure a coordenação para mediação e acolhimento da vítima.',
      },
    ],
  },
  {
    id: 'saude-bem-estar',
    title: 'Saúde e Bem-Estar',
    icon: HeartPulse,
    items: [
      {
        question: 'Uma estudante menor de 14 anos revelou gravidez. O que a norma diz?',
        answer:
          'Pela lei brasileira, gravidez abaixo dos 14 anos é presunção de Estupro de Vulnerável. É um caso de notificação compulsória imediata à rede de proteção e órgãos de segurança. Acolha sem julgamento e reporte à Direção no mesmo instante.',
      },
      {
        question: 'A escola pode administrar medicamentos trazidos pelos alunos?',
        answer:
          'Apenas com prescrição médica e autorização assinada pelos pais/responsáveis entregue na secretaria. Nunca ofereça medicamentos por conta própria, mesmo analgésicos comuns.',
      },
      {
        question: 'O estudante está em crise de ansiedade aguda (falta de ar, choro, pânico).',
        answer:
          'Leve-o para um local calmo e arejado. Não force a fala. Chame o POC ou um gestor. Se a crise não cessar ou houver desmaio, contate a família e a UBS ou o SAMU.',
      },
    ],
  },
  {
    id: 'vulnerabilidade-direitos',
    title: 'Vulnerabilidade Social e Direitos',
    icon: Scale,
    items: [
      {
        question: 'O estudante relatou que está passando fome em casa. Como ajudar?',
        answer:
          'Garanta a alimentação escolar imediata. Registre a demanda e encaminhe para o POC. O caso deve ser direcionado ao CRAS Ermelino Matarazzo para inclusão em programas de segurança alimentar (Cesta básica, Bolsa Família).',
      },
      {
        question: 'O estudante não possui documentos básicos (RG/CPF). A escola pode intervir?',
        answer:
          'Sim. A falta de documentação é uma forma de exclusão social. A gestão escolar deve orientar a família e, se necessário, articular com o Poupatempo ou CRAS para garantir o direito à identidade.',
      },
      {
        question: 'Estudantes trans têm direito ao uso do Nome Social?',
        answer:
          'Sim, é um direito garantido por lei estadual e federal. O nome social deve constar na lista de chamada e ser respeitado por todos os profissionais, independentemente da alteração no registro civil.',
      },
    ],
  },
  {
    id: 'conduta-sigilo',
    title: 'Conduta Profissional e Sigilo',
    icon: ClipboardCheck,
    items: [
      {
        question: 'Posso compartilhar o caso de um aluno na sala dos professores?',
        answer:
          'NÃO. Informações sobre vulnerabilidade devem ser compartilhadas apenas com quem precisa atuar no caso (Direção, POC, Coordenação). Conversas informais em locais comuns violam a privacidade do aluno e a LGPD.',
      },
      {
        question: 'O que fazer se eu me sentir emocionalmente sobrecarregado após um acolhimento difícil?',
        answer:
          'O protocolo prevê o "Cuidar de quem cuida". Procure o POC ou a Gestão para uma conversa de suporte. Casos de violência pesada podem causar estresse secundário nos profissionais.',
      },
      {
        question: 'O estudante pediu "segredo absoluto" sobre uma violência. Devo manter?',
        answer:
          'Explique que você manterá o sigilo, mas que não pode manter o segredo se a vida dele estiver em risco. Diga: "Eu vou contar apenas para quem pode nos ajudar a te proteger".',
      },
    ],
  },
  {
    id: 'convivencia-disciplina',
    title: 'Convivência e Disciplina',
    icon: BookOpenCheck,
    items: [
      {
        question: 'O protocolo de proteção substitui as medidas disciplinares do Regimento Escolar?',
        answer:
          'Não, eles são complementares. Uma indisciplina pode ser sinal de um sofrimento oculto. O protocolo busca entender a causa, enquanto o regimento cuida da norma de convivência.',
      },
      {
        question: 'O aluno causou danos ao patrimônio da escola. Como proceder?',
        answer:
          'Siga o Regimento Escolar para a reparação do dano, mas peça ao POC para avaliar se o comportamento destrutivo é um sinal de alerta para questões de saúde mental ou violência doméstica.',
      },
    ],
  },
];

export const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredCategories = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    return faqCategories
      .filter((category) => selectedCategory === 'all' || category.id === selectedCategory)
      .map((category) => {
        const items = category.items.filter((item) => {
          if (!normalizedTerm) return true;

          return (
            item.question.toLowerCase().includes(normalizedTerm) ||
            item.answer.toLowerCase().includes(normalizedTerm) ||
            category.title.toLowerCase().includes(normalizedTerm)
          );
        });

        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }, [searchTerm, selectedCategory]);

  const totalVisibleItems = useMemo(
    () => filteredCategories.reduce((total, category) => total + category.items.length, 0),
    [filteredCategories],
  );

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-blue-100 p-4 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-800">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-white p-2 text-sky-700 shadow-sm dark:bg-slate-800 dark:text-sky-300">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">FAQ do Protocolo Bússola</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Base completa para consulta rápida, segura e alinhada ao protocolo da E.E. Ermelino Matarazzo.
            </p>
            <p className="mt-2 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800 dark:bg-slate-800 dark:text-sky-200">
              {`Orientação operacional derivada · ${FAQ_CONTENT_META.sourceRef}`}
            </p>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por pergunta, resposta ou categoria"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
          />
        </label>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
            selectedCategory === 'all'
              ? 'bg-sky-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Todas
        </button>
        {faqCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                selectedCategory === category.id
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {category.title}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-sky-100 bg-white px-4 py-3 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
        Exibindo {totalVisibleItems} pergunta{totalVisibleItems === 1 ? '' : 's'}
      </div>

      {filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="h-4 w-4" />
            Nenhuma resposta encontrada
          </div>
          <p className="mt-1">Nenhuma pergunta corresponde aos filtros atuais. Ajuste a busca ou selecione outra categoria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <section key={category.id} className="rounded-2xl border border-sky-100 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-2 flex items-center gap-2 border-b border-slate-100 pb-2 dark:border-slate-800">
                  <div className="rounded-lg bg-sky-100 p-1.5 text-sky-700 dark:bg-slate-800 dark:text-sky-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{category.title}</h2>
                </div>

                <div className="space-y-2">
                  {category.items.map((item) => {
                    const itemId = `${category.id}-${item.question}`;
                    const isOpen = openItems.has(itemId);

                    return (
                      <article key={itemId} className="rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/40">
                        <button
                          type="button"
                          onClick={() => toggleItem(itemId)}
                          className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
                        >
                          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.question}</span>
                          <span className="text-sky-600 dark:text-sky-300">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen && <p className="border-t border-slate-200 px-3 py-3 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200">{item.answer}</p>}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
};
