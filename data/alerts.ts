export interface Alert {
  id: string;
  doNot: string;
  doInstead: string;
  reason: string;
  severity: 'critical' | 'important' | 'standard';
  tags: string[];
}

export const ALERTS_DATA: Alert[] = [
  { id: 'A01', doNot: 'Prometer sigilo absoluto ao aluno', doInstead: 'Explicar que pode ser necessário acionar proteção para garantir cuidado.', reason: 'Evita falsa promessa e preserva proteção legal.', severity: 'critical', tags: ['mental_health', 'violence', 'sexual_abuse', 'self_harm', 'all_intakes'] },
  { id: 'A02', doNot: 'Expor aluno publicamente', doInstead: 'Convidar para espaço privado e discreto.', reason: 'Preserva privacidade e reduz estigma.', severity: 'important', tags: ['all_intakes', 'mental_health', 'bullying'] },
  { id: 'A03', doNot: 'Encaminhar e não dar devolutiva', doInstead: 'Retornar ao aluno com próximos passos e responsáveis.', reason: 'Evita abandono institucional.', severity: 'important', tags: ['all_intakes', 'follow_up'] },
  { id: 'A04', doNot: 'Interrogar vítima com perguntas sugestivas', doInstead: 'Usar escuta aberta e protegida.', reason: 'Evita revitimização e contaminação do relato.', severity: 'critical', tags: ['domestic_violence', 'sexual_abuse', 'neglect', 'R29', 'R30'] },
  { id: 'A05', doNot: 'Repetir relato para confirmar', doInstead: 'Registrar fala literal e acionar rede competente.', reason: 'Repetição reativa trauma.', severity: 'critical', tags: ['domestic_violence', 'sexual_abuse', 'R29', 'R30', 'R32'] },
  { id: 'A06', doNot: 'Culpabilizar a vítima', doInstead: 'Acolher sem julgamento e focar proteção.', reason: 'Reduz dano secundário e silêncio.', severity: 'critical', tags: ['bullying', 'sexual_abuse', 'domestic_violence', 'discrimination', 'R26', 'R27', 'R28'] },
  { id: 'A07', doNot: 'Confrontar agressor antes da proteção', doInstead: 'Acionar Conselho Tutelar (CT) e a rede de proteção, priorizando a vítima.', reason: 'Confronto precoce pode aumentar risco.', severity: 'critical', tags: ['domestic_violence', 'sexual_abuse', 'R29', 'R30'] },
  { id: 'A08', doNot: 'Chamar família do agressor antes da proteção', doInstead: 'Garantir segurança da vítima e depois mediar.', reason: 'Prioridade é reduzir risco imediato.', severity: 'critical', tags: ['domestic_violence', 'bullying', 'R29'] },
  { id: 'A09', doNot: 'Forçar reconciliação imediata', doInstead: 'Mediação gradual, partes separadas inicialmente.', reason: 'Evita intimidação da vítima.', severity: 'important', tags: ['bullying', 'violence_between_peers', 'R21', 'R26', 'R27'] },
  { id: 'A10', doNot: 'Encaminhar aluno sozinho em crise', doInstead: 'Garantir acompanhante adulto/responsável.', reason: 'Reduz risco durante deslocamento.', severity: 'critical', tags: ['all_intakes', 'mental_health', 'emergency', 'R08', 'R09'] },
  { id: 'A11', doNot: 'Resolver internamente sem registro', doInstead: 'Registrar formalmente toda ocorrência.', reason: 'Sem histórico não há proteção institucional.', severity: 'important', tags: ['all_intakes', 'follow_up', 'registration'] },
  { id: 'A12', doNot: 'Compartilhar dados em grupos amplos', doInstead: 'Compartilhar apenas por necessidade de proteção.', reason: 'Conformidade LGPD/ECA e sigilo.', severity: 'important', tags: ['all_intakes', 'privacy', 'lgpd'] },
  { id: 'A13', doNot: 'Fotografar lesões em celular pessoal', doInstead: 'Usar fluxo institucional e registro de saúde formal.', reason: 'Proteção de dados e validade adequada.', severity: 'important', tags: ['domestic_violence', 'sexual_abuse', 'physical_health', 'R29', 'R30'] },
  { id: 'A14', doNot: 'Usar polícia como ameaça pedagógica', doInstead: 'Usar mediação e recursos pedagógicos.', reason: 'Evita criminalização indevida.', severity: 'important', tags: ['discipline', 'conflict', 'police'] },
  { id: 'A15', doNot: 'Chamar polícia para conflito verbal sem crime', doInstead: 'Separar, mediar e acionar família.', reason: 'Evita escalonamento desnecessário.', severity: 'important', tags: ['bullying', 'fight', 'conflict', 'R27'] },
  { id: 'A16', doNot: 'Minimizar autolesão/ideação suicida', doInstead: 'Levar a sério e encaminhar pelo protocolo.', reason: 'Minimização aumenta risco de desfecho grave.', severity: 'critical', tags: ['self_harm', 'suicide_risk', 'mental_health', 'R09', 'R10', 'R11', 'R12', 'R13'] },
  { id: 'A17', doNot: 'Ignorar sinais recorrentes', doInstead: 'Investigar mudança de padrão e registrar.', reason: 'Cronificação costuma preceder agravamento.', severity: 'critical', tags: ['mental_health', 'neglect', 'self_harm'] },
  { id: 'A18', doNot: 'Medicar aluno com remédio próprio/terceiro', doInstead: 'Acionar família e serviço de saúde.', reason: 'Risco clínico e responsabilidade legal.', severity: 'critical', tags: ['physical_health', 'medication', 'all_health_flows'] },
  { id: 'A19', doNot: 'Registrar julgamento/interpretação', doInstead: 'Registrar somente o que viu/ouvu e falas entre aspas.', reason: 'Registro objetivo protege estudante e profissional.', severity: 'important', tags: ['registration', 'all_intakes'] }
];

export const NODE_TAG_MAP: Record<string, string[]> = {
  mental_health: ['mental_health', 'self_harm', 'suicide_risk'],
  violence: ['violence', 'domestic_violence', 'sexual_abuse', 'bullying', 'discrimination'],
  physical_health: ['physical_health', 'medication', 'all_health_flows'],
  pedagogical: ['discipline', 'conflict', 'all_intakes'],
  registration: ['registration', 'privacy', 'lgpd'],
  emergency: ['emergency', 'all_intakes']
};
