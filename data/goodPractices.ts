export interface GoodPractice {
  id: string;
  title: string;
  description: string;
  example?: string;
}

export const GOOD_PRACTICES_DATA: GoodPractice[] = [
  { id: 'GP01', title: 'Comece pelo afeto', description: 'Reconheça o estado emocional antes de qualquer pergunta técnica.', example: 'Percebi que você não está bem. Posso sentar com você um momento?' },
  { id: 'GP02', title: 'Espaço reservado sempre', description: 'Trate temas pessoais em local discreto e protegido.', example: 'Posso te chamar na coordenação por um segundo?' },
  { id: 'GP03', title: 'Postura corporal aberta', description: 'Sente-se na mesma altura e mantenha linguagem corporal acolhedora.' },
  { id: 'GP04', title: 'Escuta ativa com silêncio', description: 'Permita pausas sem pressionar o estudante.' },
  { id: 'GP05', title: 'Valide sem julgar', description: 'Reconheça sofrimento sem culpabilizar ou tomar partido antecipado.', example: 'Entendo que isso está sendo muito difícil para você.' },
  { id: 'GP06', title: 'Não minimize, não dramatize', description: 'Mantenha tom firme e acolhedor para orientar próximos passos.', example: 'O que você sente importa. Vamos ver juntos o que fazer agora.' },
  { id: 'GP07', title: 'Transparência dos próximos passos', description: 'Explique com clareza quais encaminhamentos serão feitos.', example: 'Vou acionar a coordenação para garantir seu cuidado.' },
  { id: 'GP08', title: 'Devolutiva sempre', description: 'Retorne ao aluno com atualização do caso para manter vínculo.' },
  { id: 'GP09', title: 'Honestidade sobre sigilo', description: 'Evite promessas impossíveis; explique proteção da rede.', example: 'Não posso guardar só para mim, mas posso te proteger.' },
  { id: 'GP10', title: 'Registro com fala literal', description: 'Transcreva frases relevantes entre aspas e sem interpretação.', example: "O aluno disse: 'não aguento mais' — 10h32." }
];
