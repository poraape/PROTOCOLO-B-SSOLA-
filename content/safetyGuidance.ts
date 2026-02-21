import { SafetyGuidanceGroup } from '../components/decision/SafetyGuidancePanel';

export type SafetyContextId =
  | 'triagem_risco_imediato'
  | 'saude_mental_geral'
  | 'violencia_protecao'
  | 'saude_fisica'
  | 'pedagogico';

const triagemRiscoImediato: SafetyGuidanceGroup[] = [
  {
    id: 'do_not_do',
    title: 'Nunca fazer em situação crítica',
    subtitle: 'Condutas que aumentam risco ou prejudicam a proteção.',
    icon: '⚠️',
    tone: 'danger',
    items: [
      { id: 'n1', type: 'dont', text: 'Não prometer segredo absoluto ao estudante.' },
      { id: 'n2', type: 'dont', text: 'Não expor o estudante em público, nem comentar o caso em corredor ou grupo de WhatsApp.' },
      { id: 'n3', type: 'dont', text: 'Não interrogar o estudante com perguntas detalhadas sobre o fato (não investigar).' },
      { id: 'n4', type: 'dont', text: 'Não confrontar o suposto agressor sozinho nem na frente do estudante.' },
      { id: 'n5', type: 'dont', text: 'Não mandar o estudante voltar para sala como se nada tivesse acontecido.' },
      { id: 'n6', type: 'dont', text: 'Não compartilhar detalhes do caso em grupos de funcionários ou redes sociais.' },
      { id: 'n7', type: 'dont', text: 'Não usar polícia como ameaça pedagógica.' },
      { id: 'n8', type: 'dont', text: 'Não minimizar sinais recorrentes (“isso é fase”, “vai passar”).' },
      { id: 'n9', type: 'dont', text: 'Não medicar estudante com remédio próprio/terceiros sem prescrição registrada.' }
    ]
  },
  {
    id: 'do_first',
    title: 'O que fazer primeiro',
    subtitle: 'Passos iniciais que protegem o estudante e a escola.',
    icon: '✅',
    tone: 'success',
    items: [
      { id: 'f1', type: 'do', text: 'Afastar outros alunos, garantir ambiente calmo e discreto.' },
      { id: 'f2', type: 'do', text: 'Acolher o estudante com escuta calma, sem julgamento.' },
      { id: 'f3', type: 'do', text: 'Acionar gestão (direção/coordenação) assim que identificar risco moderado ou alto.' },
      { id: 'f4', type: 'do', text: 'Registrar de forma objetiva o que foi observado e o que o estudante relatou, com data e hora.' },
      { id: 'f5', type: 'do', text: 'Acionar rede de emergência (SAMU/PM/Bombeiros) quando houver risco imediato à vida.' },
      { id: 'f6', type: 'do', text: 'Garantir que o estudante não fique sozinho em situação de crise.' }
    ]
  },
  {
    id: 'how_to_speak',
    title: 'Como falar com o estudante',
    subtitle: 'Frases seguras que acolhem sem investigar.',
    icon: '💬',
    tone: 'info',
    items: [
      { id: 's1', type: 'do', text: '“Obrigado por confiar em mim. Vamos buscar ajuda de quem pode te proteger.”' },
      { id: 's2', type: 'do', text: '“Você não está sozinho, a escola precisa saber para poder cuidar de você.”' },
      { id: 's3', type: 'do', text: '“Eu não posso prometer segredo, mas vou tomar cuidado com quem vai saber.”' },
      { id: 's4', type: 'do', text: '“Você não é culpado pelo que aconteceu.”' },
      { id: 's5', type: 'do', text: '“Se em algum momento você se sentir pior, avise um adulto de confiança imediatamente.”' }
    ]
  },
  {
    id: 'good_practices',
    title: 'Boas práticas de escuta e proteção',
    subtitle: 'Para revisar com calma e aplicar no dia a dia.',
    icon: '📘',
    tone: 'neutral',
    items: [
      { id: 'b1', type: 'do', text: 'Comece pelo afeto: reconheça o estado emocional antes de qualquer pergunta técnica.' },
      { id: 'b2', type: 'do', text: 'Proteja a privacidade: atenda o estudante em local discreto e protegido.' },
      { id: 'b3', type: 'do', text: 'Mantenha postura corporal acolhedora, sem pressa ou confrontos.' },
      { id: 'b4', type: 'do', text: 'Registre apenas fatos objetivos e falas do estudante entre aspas, sem interpretações.' },
      { id: 'b5', type: 'do', text: 'Combine próximos passos com clareza: quem será acionado, o que vai acontecer em seguida.' }
    ]
  }
];

const violenciaProtecao: SafetyGuidanceGroup[] = [
  {
    id: 'do_not_do',
    title: 'Nunca fazer em casos de violência',
    subtitle: 'Evite atitudes que expõem a vítima ou atrapalham investigação.',
    icon: '🚫',
    tone: 'danger',
    items: [
      { id: 'vd1', type: 'dont', text: 'Não chamar o suposto agressor na frente da vítima para “acertar a versão”.' },
      { id: 'vd2', type: 'dont', text: 'Não pedir detalhes gráficos ou repetidos sobre a violência.' },
      { id: 'vd3', type: 'dont', text: 'Não comunicar primeiro a família se houver suspeita de que ela seja a agressora.' },
      { id: 'vd4', type: 'dont', text: 'Não investigar por conta própria nem confrontar possíveis autores.' }
    ]
  },
  {
    id: 'do_first',
    title: 'Primeiros passos em proteção',
    subtitle: 'O que a escola deve garantir imediatamente.',
    icon: '🛡️',
    tone: 'success',
    items: [
      { id: 'vf1', type: 'do', text: 'Garantir que a vítima esteja acompanhada por um adulto de confiança da escola.' },
      { id: 'vf2', type: 'do', text: 'Notificar Conselho Tutelar no mesmo dia em qualquer suspeita de violência grave.' },
      { id: 'vf3', type: 'do', text: 'Encaminhar para UBS/UPA quando houver lesões visíveis, registrando avaliação médica.' },
      { id: 'vf4', type: 'do', text: 'Acionar a gestão escolar e registrar os fatos objetivos com data e hora.' }
    ]
  },
  {
    id: 'how_to_speak',
    title: 'Como acolher sem revitimizar',
    subtitle: 'Frases e postura para proteção imediata.',
    icon: '💬',
    tone: 'info',
    items: [
      { id: 'vs1', type: 'do', text: '“Você está em segurança agora. Vamos chamar quem pode te proteger.”' },
      { id: 'vs2', type: 'do', text: '“Você não precisa repetir tudo agora; vamos seguir os passos de proteção.”' }
    ]
  },
  {
    id: 'good_practices',
    title: 'Boas práticas em proteção',
    subtitle: 'Condutas de escola protetiva e sigilo responsável.',
    icon: '📘',
    tone: 'neutral',
    items: [
      { id: 'vb1', type: 'do', text: 'Preservar sigilo e compartilhar apenas com profissionais necessários.' },
      { id: 'vb2', type: 'do', text: 'Garantir acompanhamento contínuo da vítima após o primeiro acionamento.' }
    ]
  }
];

export const safetyGuidanceByContext: Record<SafetyContextId, SafetyGuidanceGroup[]> = {
  triagem_risco_imediato: triagemRiscoImediato,
  violencia_protecao: violenciaProtecao,
  saude_mental_geral: triagemRiscoImediato,
  saude_fisica: triagemRiscoImediato,
  pedagogico: triagemRiscoImediato
};

export const getSafetyGuidanceGroups = (contextId: SafetyContextId): SafetyGuidanceGroup[] => {
  return safetyGuidanceByContext[contextId] ?? [];
};
