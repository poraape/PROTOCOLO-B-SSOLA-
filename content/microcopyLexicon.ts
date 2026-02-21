export type LanguageIntent =
  | 'avisar_gestao'
  | 'acionar_emergencia'
  | 'encaminhar_rede'
  | 'registrar_formalmente'
  | 'notificar_obrigatorio';

/**
 * Regra de linguagem: usar um verbo padrão por intenção.
 * Exceções explícitas devem ser justificadas abaixo (termo legal/técnico obrigatório).
 */
export const MICROCOPY_LEXICON: Record<LanguageIntent, string> = {
  avisar_gestao: 'avisar',
  acionar_emergencia: 'acionar',
  encaminhar_rede: 'encaminhar',
  registrar_formalmente: 'registrar',
  notificar_obrigatorio: 'notificar'
};

export const MICROCOPY_EXPLICIT_EXCEPTIONS: Array<{ context: string; reason: string }> = [
  {
    context: '"escalar para gestão" / "escala"',
    reason: 'Termo técnico de governança interna já consolidado no protocolo.'
  },
  {
    context: '"comunicar" em citações legais/históricas existentes',
    reason: 'Mantido quando reproduz texto normativo ou referência documental literal.'
  }
];

export const verbByIntent = (intent: LanguageIntent): string => MICROCOPY_LEXICON[intent];

export const verbByIntentCapitalized = (intent: LanguageIntent): string => {
  const verb = verbByIntent(intent);
  return `${verb.charAt(0).toUpperCase()}${verb.slice(1)}`;
};
